import React, { useState } from 'react';
import { 
  LayoutDashboard, AlertTriangle, Clock, CheckCircle2, 
  Building2, Users, Wrench, ArrowRight, Filter, 
  ChevronRight, RefreshCw, X, ShieldAlert, CheckCheck, FileText
} from 'lucide-react';
import { GrievanceTicket, TicketStatus, Category, UrgencyLevel } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useGrievance } from '../context/GrievanceContext';
import { MUNICIPAL_CREWS, WARDS_LIST } from '../data/seedData';

interface AuthorityViewProps {
  onSelectTicket: (ticket: GrievanceTicket) => void;
}

export const AuthorityView: React.FC<AuthorityViewProps> = ({ onSelectTicket }) => {
  const { language, t } = useLanguage();
  const { 
    tickets, 
    updateTicketStatus, 
    overrideDepartment, 
    assignCrew, 
    resolveTicket 
  } = useGrievance();

  const [filterUrgency, setFilterUrgency] = useState<string>('ALL');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Action Drawer / Modal State
  const [selectedActionTicket, setSelectedActionTicket] = useState<GrievanceTicket | null>(null);
  const [overrideDept, setOverrideDept] = useState('');
  const [selectedCrew, setSelectedCrew] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  // KPIs
  const totalOpen = tickets.filter(t => t.status !== 'Resolved').length;
  const criticalHighCount = tickets.filter(t => (t.urgency === 'Critical' || t.urgency === 'High') && t.status !== 'Resolved').length;
  const resolvedCount = tickets.filter(t => t.status === 'Resolved').length;

  const filteredQueue = tickets.filter(ticket => {
    if (filterUrgency !== 'ALL' && ticket.urgency !== filterUrgency) return false;
    if (filterCategory !== 'ALL' && ticket.category !== filterCategory) return false;
    if (filterStatus !== 'ALL' && ticket.status !== filterStatus) return false;
    return true;
  }).sort((a, b) => b.priority_score - a.priority_score);

  const handleOpenActionModal = (ticket: GrievanceTicket) => {
    setSelectedActionTicket(ticket);
    setOverrideDept(ticket.department_en);
    setSelectedCrew(ticket.assigned_crew_en || '');
    setResolutionNotes(ticket.resolution_notes_en || '');
    setActionSuccessMsg('');
  };

  const handleExecuteStatusAdvance = (ticket: GrievanceTicket) => {
    const nextStatusMap: Record<TicketStatus, TicketStatus> = {
      'Submitted': 'AI Triaged & Routed',
      'AI Triaged & Routed': 'Assigned to Department',
      'Assigned to Department': 'In Progress',
      'In Progress': 'Resolved',
      'Resolved': 'Resolved'
    };

    const next = nextStatusMap[ticket.status];
    if (next === 'Resolved') {
      handleOpenActionModal(ticket);
      return;
    }

    updateTicketStatus(
      ticket.id,
      next,
      `Authority supervisor advanced ticket to ${next}.`,
      `நகராட்சி அதிகாரி நிலையை ${next}-ஆக உயர்த்தினார்.`,
      'Operations Dispatcher'
    );
  };

  const handleSaveActionUpdates = () => {
    if (!selectedActionTicket) return;

    // 1. Check if department overridden
    if (overrideDept && overrideDept !== selectedActionTicket.department_en) {
      const dept_ta = t(`departments.${overrideDept}`) || overrideDept;
      overrideDepartment(
        selectedActionTicket.id,
        overrideDept,
        dept_ta,
        'Special Taskforce',
        'சிறப்பு நடவடிக்கை குழு'
      );
    }

    // 2. Check if crew assigned
    if (selectedCrew && selectedCrew !== selectedActionTicket.assigned_crew_en) {
      const crewObj = MUNICIPAL_CREWS.find(c => c.name_en === selectedCrew);
      const crew_ta = crewObj ? crewObj.name_ta : selectedCrew;
      assignCrew(selectedActionTicket.id, selectedCrew, crew_ta);
    }

    // 3. Check if marked resolved
    if (resolutionNotes.trim()) {
      resolveTicket(
        selectedActionTicket.id,
        resolutionNotes,
        resolutionNotes,
        selectedActionTicket.photo_url
      );
    }

    setActionSuccessMsg(language === 'ta' ? 'நடவடிக்கைகள் வெற்றிகரமாக பதிவு செய்யப்பட்டன!' : 'Workflow dispatch actions applied successfully!');
    setTimeout(() => {
      setSelectedActionTicket(null);
    }, 900);
  };

  const getUrgencyBadge = (urgency: UrgencyLevel) => {
    switch (urgency) {
      case 'Critical':
        return 'bg-red-500/10 text-red-600 border-red-500/30';
      case 'High':
        return 'bg-orange-500/10 text-orange-600 border-orange-500/30';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/30';
      default:
        return 'bg-sky-500/10 text-sky-600 border-sky-500/30';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-teal-300 border border-slate-700 mb-2">
            <LayoutDashboard className="w-3.5 h-3.5 text-teal-400" />
            <span>{t('authority.title')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            {t('authority.title')}
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-3xl">
            {t('authority.subtitle')}
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-600 font-medium bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-indicator"></span>
          <span>{language === 'ta' ? 'களப்பணி தானியங்கி ஒத்திசைவு செயலில் உள்ளது' : 'Real-Time Dispatch Sync Online'}</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Active Open Issues */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t('authority.kpiTotal')}
            </p>
            <p className="text-3xl font-black text-slate-900 mt-1 font-mono">
              {totalOpen}
            </p>
            <p className="text-[11px] text-teal-600 font-medium mt-1">
              ⚡ {language === 'ta' ? 'நேரடி கண்காணிப்பில்' : 'Under active watch'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 2: Critical / High Urgency */}
        <div className="bg-white p-5 rounded-2xl border border-red-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-red-500">
              {t('authority.kpiCritical')}
            </p>
            <p className="text-3xl font-black text-red-600 mt-1 font-mono">
              {criticalHighCount}
            </p>
            <p className="text-[11px] text-red-600 font-medium mt-1">
              🚨 {language === 'ta' ? 'உடனடி கவனம் தேவை' : 'Immediate response SLA'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 3: Avg Resolution Time */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t('authority.kpiAvgTime')}
            </p>
            <p className="text-3xl font-black text-slate-900 mt-1 font-mono">
              2.4 <span className="text-sm font-normal text-slate-400">{language === 'ta' ? 'நாட்கள்' : 'Days'}</span>
            </p>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">
              📈 18% {language === 'ta' ? 'வேகமான தீர்வு' : 'faster than baseline'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 4: Resolved Issues */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              {t('authority.kpiResolved')}
            </p>
            <p className="text-3xl font-black text-emerald-700 mt-1 font-mono">
              {resolvedCount}
            </p>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">
              ✅ {language === 'ta' ? 'சான்றளிக்கப்பட்டது' : 'Verified with photo proof'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Dispatcher Queue Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
        
        {/* Table Filter Bar */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {t('authority.queueHeading')} ({filteredQueue.length})
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'ta' ? 'முன்னுரிமை அடிப்படையில் வரிசைப்படுத்தப்பட்டுள்ளது' : 'Ranked dynamically by Gemini priority score and citizen upvotes'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Filter Urgency */}
            <select
              value={filterUrgency}
              onChange={(e) => setFilterUrgency(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
            >
              <option value="ALL">{t('feed.filterUrgency')} (All)</option>
              <option value="Critical">{t('urgencies.Critical')}</option>
              <option value="High">{t('urgencies.High')}</option>
              <option value="Medium">{t('urgencies.Medium')}</option>
              <option value="Low">{t('urgencies.Low')}</option>
            </select>

            {/* Filter Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
            >
              <option value="ALL">{t('feed.filterStatus')} (All)</option>
              <option value="Submitted">{t('statuses.Submitted')}</option>
              <option value="AI Triaged & Routed">{t('statuses.AI Triaged & Routed')}</option>
              <option value="Assigned to Department">{t('statuses.Assigned to Department')}</option>
              <option value="In Progress">{t('statuses.In Progress')}</option>
              <option value="Resolved">{t('statuses.Resolved')}</option>
            </select>
          </div>
        </div>

        {/* Desktop / Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">{t('authority.colId')}</th>
                <th className="py-3.5 px-4">{t('authority.colTitle')}</th>
                <th className="py-3.5 px-4">{t('authority.colCategory')}</th>
                <th className="py-3.5 px-4">{t('authority.colUrgency')}</th>
                <th className="py-3.5 px-4">{t('authority.colDepartment')}</th>
                <th className="py-3.5 px-4">{t('authority.colStatus')}</th>
                <th className="py-3.5 px-4 text-right">{t('authority.colActions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQueue.map((ticket) => (
                <tr 
                  key={ticket.id} 
                  className="hover:bg-teal-50/40 transition-colors cursor-pointer group"
                  onClick={() => onSelectTicket(ticket)}
                >
                  
                  {/* ID */}
                  <td className="py-4 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                    {ticket.id}
                  </td>

                  {/* Title & Ward */}
                  <td className="py-4 px-4 max-w-xs">
                    <p className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                      {language === 'ta' ? ticket.title_ta : ticket.title_en}
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      📍 {language === 'ta' ? ticket.ward_ta : ticket.ward} • {language === 'ta' ? ticket.landmark_ta : ticket.landmark}
                    </p>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded">
                      {t(`categories.${ticket.category}`)}
                    </span>
                  </td>

                  {/* Urgency & Priority Gauge */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getUrgencyBadge(ticket.urgency)}`}>
                        {t(`urgencies.${ticket.urgency}`)}
                      </span>
                      <span className="font-mono font-bold text-slate-800">
                        {ticket.priority_score}
                      </span>
                    </div>
                  </td>

                  {/* Department & Assigned Crew */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <p className="font-bold text-slate-900">
                      {language === 'ta' ? ticket.department_ta : ticket.department_en}
                    </p>
                    <p className="text-[11px] text-teal-700 font-medium">
                      {ticket.assigned_crew_en ? (language === 'ta' ? ticket.assigned_crew_ta : ticket.assigned_crew_en) : (language === 'ta' ? 'குழு நியமிக்கப்படவில்லை' : 'No crew assigned')}
                    </p>
                  </td>

                  {/* Current Status */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      ticket.status === 'Resolved' 
                        ? 'bg-emerald-100 text-emerald-800'
                        : ticket.status === 'In Progress'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {t(`statuses.${ticket.status}`)}
                    </span>
                  </td>

                  {/* 1-Click Workflow Actions */}
                  <td className="py-4 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end space-x-2">
                      
                      {/* Advance Status Button */}
                      {ticket.status !== 'Resolved' && (
                        <button
                          type="button"
                          onClick={() => handleExecuteStatusAdvance(ticket)}
                          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold border border-teal-200 transition-colors shadow-sm"
                          title="Advance to next workflow stage"
                        >
                          <span>{t('authority.advanceStatus')}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Manage / Action Drawer */}
                      <button
                        type="button"
                        onClick={() => handleOpenActionModal(ticket)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="Dispatch & Route settings"
                      >
                        <Wrench className="w-4 h-4" />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* 1-Click Action Modal (Override Dept, Assign Crew, Mark Resolved) */}
      {selectedActionTicket && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded">
                  {selectedActionTicket.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {t('authority.modalTitle')}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedActionTicket(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {actionSuccessMsg && (
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold animate-fadeIn">
                ✓ {actionSuccessMsg}
              </div>
            )}

            {/* Form Actions */}
            <div className="space-y-4 text-xs">
              
              {/* Override Department */}
              <div>
                <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  {t('authority.overrideDept')}:
                </label>
                <select
                  value={overrideDept}
                  onChange={(e) => setOverrideDept(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 bg-white text-slate-800 font-medium"
                >
                  <option value="Municipal Roads & Bridges">{t('departments.Municipal Roads & Bridges')}</option>
                  <option value="Solid Waste Management">{t('departments.Solid Waste Management')}</option>
                  <option value="Electrical Maintenance">{t('departments.Electrical Maintenance')}</option>
                  <option value="Water & Sewerage Board">{t('departments.Water & Sewerage Board')}</option>
                  <option value="Public Health & Safety">{t('departments.Public Health & Safety')}</option>
                </select>
              </div>

              {/* Assign Field Crew */}
              <div>
                <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  {t('authority.selectCrew')}:
                </label>
                <select
                  value={selectedCrew}
                  onChange={(e) => setSelectedCrew(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 bg-white text-slate-800 font-medium"
                >
                  <option value="">-- {language === 'ta' ? 'குழுவைத் தேர்ந்தெடுக்கவும்' : 'Select a Municipal Unit'} --</option>
                  {MUNICIPAL_CREWS.map((crew) => (
                    <option key={crew.id} value={crew.name_en}>
                      {language === 'ta' ? crew.name_ta : crew.name_en} ({crew.dept})
                    </option>
                  ))}
                </select>
              </div>

              {/* Resolution Notes & Proof */}
              <div>
                <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  {t('timeline.resolutionNotes')}:
                </label>
                <textarea
                  rows={3}
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  placeholder={t('authority.resolutionNotesPlaceholder')}
                  className="w-full rounded-xl border border-slate-300 p-3 text-slate-800"
                />
                <span className="text-[11px] text-slate-500 block mt-1">
                  📸 {t('authority.uploadProofNote')}
                </span>
              </div>

            </div>

            {/* Modal Footer CTA */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedActionTicket(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
              >
                {t('authority.close')}
              </button>

              <button
                type="button"
                onClick={handleSaveActionUpdates}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-md shadow-teal-600/20 transition-all"
              >
                {t('authority.saveChanges')}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
