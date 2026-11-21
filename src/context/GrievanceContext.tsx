import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GrievanceTicket, TicketStatus, TriageResult, TimelineEvent } from '../types';
import { INITIAL_TICKETS } from '../data/seedData';

interface GrievanceContextType {
  tickets: GrievanceTicket[];
  activeTicket: GrievanceTicket | null;
  setActiveTicket: (ticket: GrievanceTicket | null) => void;
  createGrievance: (triage: TriageResult, rawText: string, ward: string, ward_ta: string, landmark: string, landmark_ta: string, photoUrl?: string) => GrievanceTicket;
  upvoteTicket: (ticketId: string) => void;
  updateTicketStatus: (ticketId: string, newStatus: TicketStatus, note_en: string, note_ta: string, actor: string) => void;
  overrideDepartment: (ticketId: string, newDept_en: string, newDept_ta: string, subTeam_en: string, subTeam_ta: string) => void;
  assignCrew: (ticketId: string, crew_en: string, crew_ta: string) => void;
  resolveTicket: (ticketId: string, notes_en: string, notes_ta: string, proofUrl?: string) => void;
  resetToSeedData: () => void;
}

const GrievanceContext = createContext<GrievanceContextType | undefined>(undefined);

export const GrievanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<GrievanceTicket[]>(() => {
    const saved = localStorage.getItem('civicresolve_tickets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved tickets, using initial seed data', e);
      }
    }
    return INITIAL_TICKETS;
  });

  const [activeTicket, setActiveTicket] = useState<GrievanceTicket | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('civicresolve_tickets', JSON.stringify(tickets));
  }, [tickets]);

  // Keep active ticket in sync with updated list
  useEffect(() => {
    if (activeTicket) {
      const updated = tickets.find(t => t.id === activeTicket.id);
      if (updated) {
        setActiveTicket(updated);
      }
    }
  }, [tickets]);

  const createGrievance = (
    triage: TriageResult,
    rawText: string,
    ward: string,
    ward_ta: string,
    landmark: string,
    landmark_ta: string,
    photoUrl?: string
  ): GrievanceTicket => {
    const nextNum = 100 + tickets.length + 1;
    const newId = `CR-2026-${nextNum}`;
    const nowIso = new Date().toISOString();

    // Coordinate approximation based on ward
    const latBase = 13.0400 + (Math.random() - 0.5) * 0.04;
    const lngBase = 80.2300 + (Math.random() - 0.5) * 0.04;

    const initialTimeline: TimelineEvent[] = [
      {
        status: 'Submitted',
        timestamp: nowIso,
        note_en: 'Grievance submitted by citizen via CivicResolve Intake.',
        note_ta: 'குடிமகன் சிவிக்ரிசால்வ் வாயிலாக புகாரைப் பதிவு செய்தார்.',
        actor: 'Citizen Intake'
      },
      {
        status: 'AI Triaged & Routed',
        timestamp: new Date(Date.now() + 2000).toISOString(),
        note_en: `Gemini 2.5 Flash analyzed issue: ${triage.urgency} urgency (${triage.priority_score}/100 priority). Auto-routed to ${triage.recommended_department_en}.`,
        note_ta: `ஜெமினி 2.5 ஃப்ளாஷ் ஆய்வு செய்தது: ${triage.urgency} அவசர நிலை (${triage.priority_score}/100 முன்னுரிமை). ${triage.recommended_department_ta}-க்கு மாற்றப்பட்டது.`,
        actor: 'Gemini AI Engine'
      }
    ];

    const newTicket: GrievanceTicket = {
      id: newId,
      raw_text: rawText,
      title_en: triage.title_en,
      title_ta: triage.title_ta,
      summary_en: triage.summary_en,
      summary_ta: triage.summary_ta,
      category: triage.category,
      urgency: triage.urgency,
      priority_score: triage.priority_score,
      rationale_en: triage.rationale_en,
      rationale_ta: triage.rationale_ta,
      department_en: triage.recommended_department_en,
      department_ta: triage.recommended_department_ta,
      sub_team_en: triage.sub_team_en,
      sub_team_ta: triage.sub_team_ta,
      status: 'AI Triaged & Routed',
      ward: ward,
      ward_ta: ward_ta || ward,
      landmark: landmark,
      landmark_ta: landmark_ta || landmark,
      lat: latBase,
      lng: lngBase,
      created_at: nowIso,
      updated_at: nowIso,
      photo_url: photoUrl,
      multimodal: triage.multimodal,
      cluster: triage.cluster,
      upvotes: 1,
      has_upvoted: true,
      timeline: initialTimeline
    };

    setTickets(prev => [newTicket, ...prev]);
    return newTicket;
  };

  const upvoteTicket = (ticketId: string) => {
    setTickets(prev =>
      prev.map(ticket => {
        if (ticket.id === ticketId) {
          const alreadyUpvoted = ticket.has_upvoted;
          const delta = alreadyUpvoted ? -1 : 1;
          const newUpvotes = Math.max(0, ticket.upvotes + delta);
          // Dynamically boost priority score with upvotes!
          const priorityBoost = alreadyUpvoted ? -2 : 2;
          const newScore = Math.min(100, Math.max(1, ticket.priority_score + priorityBoost));

          return {
            ...ticket,
            upvotes: newUpvotes,
            has_upvoted: !alreadyUpvoted,
            priority_score: newScore
          };
        }
        return ticket;
      })
    );
  };

  const updateTicketStatus = (
    ticketId: string,
    newStatus: TicketStatus,
    note_en: string,
    note_ta: string,
    actor: string
  ) => {
    const nowIso = new Date().toISOString();
    setTickets(prev =>
      prev.map(ticket => {
        if (ticket.id === ticketId) {
          const newEvent: TimelineEvent = {
            status: newStatus,
            timestamp: nowIso,
            note_en: note_en || `Status transitioned to ${newStatus}`,
            note_ta: note_ta || `நிலை ${newStatus}-ஆக மாற்றப்பட்டது`,
            actor: actor || 'Municipal Officer'
          };
          return {
            ...ticket,
            status: newStatus,
            updated_at: nowIso,
            timeline: [...ticket.timeline, newEvent]
          };
        }
        return ticket;
      })
    );
  };

  const overrideDepartment = (
    ticketId: string,
    newDept_en: string,
    newDept_ta: string,
    subTeam_en: string,
    subTeam_ta: string
  ) => {
    const nowIso = new Date().toISOString();
    setTickets(prev =>
      prev.map(ticket => {
        if (ticket.id === ticketId) {
          const newEvent: TimelineEvent = {
            status: ticket.status,
            timestamp: nowIso,
            note_en: `Department re-routed to ${newDept_en} (${subTeam_en}) by Operations Dispatcher.`,
            note_ta: `அதிகாரியால் துறை ${newDept_ta} (${subTeam_ta})-க்கு மாற்றப்பட்டது.`,
            actor: 'Operations Dispatcher'
          };
          return {
            ...ticket,
            department_en: newDept_en,
            department_ta: newDept_ta,
            sub_team_en: subTeam_en,
            sub_team_ta: subTeam_ta,
            updated_at: nowIso,
            timeline: [...ticket.timeline, newEvent]
          };
        }
        return ticket;
      })
    );
  };

  const assignCrew = (ticketId: string, crew_en: string, crew_ta: string) => {
    const nowIso = new Date().toISOString();
    setTickets(prev =>
      prev.map(ticket => {
        if (ticket.id === ticketId) {
          const newEvent: TimelineEvent = {
            status: 'Assigned to Department',
            timestamp: nowIso,
            note_en: `Field crew assigned: ${crew_en}. Work orders dispatched.`,
            note_ta: `களப்பணி குழு ஒதுக்கப்பட்டது: ${crew_ta}. பணி ஆணை பிறப்பிக்கப்பட்டது.`,
            actor: 'Dispatch Command'
          };
          return {
            ...ticket,
            status: 'Assigned to Department',
            assigned_crew_en: crew_en,
            assigned_crew_ta: crew_ta,
            updated_at: nowIso,
            timeline: [...ticket.timeline, newEvent]
          };
        }
        return ticket;
      })
    );
  };

  const resolveTicket = (
    ticketId: string,
    notes_en: string,
    notes_ta: string,
    proofUrl?: string
  ) => {
    const nowIso = new Date().toISOString();
    setTickets(prev =>
      prev.map(ticket => {
        if (ticket.id === ticketId) {
          const newEvent: TimelineEvent = {
            status: 'Resolved',
            timestamp: nowIso,
            note_en: notes_en || 'Grievance resolved and verified by field supervisor.',
            note_ta: notes_ta || 'கள மேற்பார்வையாளரால் பணி முடிக்கப்பட்டு சரிபார்க்கப்பட்டது.',
            actor: 'Field Supervisor'
          };
          return {
            ...ticket,
            status: 'Resolved',
            resolution_notes_en: notes_en,
            resolution_notes_ta: notes_ta,
            resolution_proof_url: proofUrl || ticket.photo_url || 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80',
            updated_at: nowIso,
            timeline: [...ticket.timeline, newEvent]
          };
        }
        return ticket;
      })
    );
  };

  const resetToSeedData = () => {
    localStorage.removeItem('civicresolve_tickets');
    setTickets(INITIAL_TICKETS);
    setActiveTicket(null);
  };

  return (
    <GrievanceContext.Provider
      value={{
        tickets,
        activeTicket,
        setActiveTicket,
        createGrievance,
        upvoteTicket,
        updateTicketStatus,
        overrideDepartment,
        assignCrew,
        resolveTicket,
        resetToSeedData
      }}
    >
      {children}
    </GrievanceContext.Provider>
  );
};

export const useGrievance = (): GrievanceContextType => {
  const context = useContext(GrievanceContext);
  if (!context) {
    throw new Error('useGrievance must be used within a GrievanceProvider');
  }
  return context;
};
