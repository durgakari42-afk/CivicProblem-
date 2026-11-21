import React from 'react';
import { CheckCircle2, Clock, ShieldCheck, Wrench, CheckCheck, FileText } from 'lucide-react';
import { GrievanceTicket, TicketStatus } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface TicketTimelineProps {
  ticket: GrievanceTicket;
}

export const TicketTimeline: React.FC<TicketTimelineProps> = ({ ticket }) => {
  const { language, t } = useLanguage();

  const STEPS: { status: TicketStatus; labelKey: string; icon: React.ReactNode }[] = [
    { status: 'Submitted', labelKey: 'timeline.status_Submitted', icon: <Clock className="w-3.5 h-3.5" /> },
    { status: 'AI Triaged & Routed', labelKey: 'timeline.status_Triaged', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { status: 'Assigned to Department', labelKey: 'timeline.status_Assigned', icon: <Wrench className="w-3.5 h-3.5" /> },
    { status: 'In Progress', labelKey: 'timeline.status_InProgress', icon: <Clock className="w-3.5 h-3.5" /> },
    { status: 'Resolved', labelKey: 'timeline.status_Resolved', icon: <CheckCheck className="w-3.5 h-3.5" /> },
  ];

  const statusOrder: TicketStatus[] = [
    'Submitted',
    'AI Triaged & Routed',
    'Assigned to Department',
    'In Progress',
    'Resolved'
  ];

  const currentIndex = statusOrder.indexOf(ticket.status);

  return (
    <div className="space-y-6">
      
      {/* Visual Step-by-Step Horizontal Stepper */}
      <div className="relative">
        <div className="absolute top-4 left-0 right-0 h-1 bg-slate-200 -z-0">
          <div 
            className="h-full bg-teal-600 transition-all duration-500"
            style={{ width: `${(currentIndex / (statusOrder.length - 1)) * 100}%` }}
          />
        </div>

        <div className="flex justify-between relative z-10">
          {STEPS.map((step, idx) => {
            const isCompleted = idx <= currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <div key={step.status} className="flex flex-col items-center text-center max-w-[80px] sm:max-w-[110px]">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
                    isCompleted 
                      ? isCurrent 
                        ? 'bg-teal-600 text-white ring-4 ring-teal-100 scale-110' 
                        : 'bg-teal-500 text-white' 
                      : 'bg-white text-slate-400 border-2 border-slate-300'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.icon}
                </div>
                <span className={`text-[10px] sm:text-xs mt-2 font-medium leading-tight ${
                  isCurrent ? 'font-bold text-teal-900' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                }`}>
                  {t(step.labelKey)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Chronological History Log */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
          {t('timeline.lifecycle')} ({ticket.timeline.length} {language === 'ta' ? 'நிகழ்வுகள்' : 'Events'})
        </h4>

        <div className="space-y-4">
          {ticket.timeline.map((event, idx) => (
            <div key={idx} className="flex items-start space-x-3 text-xs">
              <div className="w-2 h-2 rounded-full bg-teal-600 mt-1.5 shrink-0"></div>
              <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-slate-900">
                    {t(`statuses.${event.status}`)}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {new Date(event.timestamp).toLocaleString(language === 'ta' ? 'ta-IN' : 'en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {language === 'ta' ? event.note_ta : event.note_en}
                </p>
                <span className="inline-block mt-1 text-[10px] font-semibold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                  👤 {event.actor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resolution Proof Section (if ticket is marked Resolved) */}
      {ticket.status === 'Resolved' && (
        <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
            <CheckCheck className="w-5 h-5 text-emerald-600" />
            <span>{t('timeline.resolutionNotes')}</span>
          </div>

          <p className="text-xs text-emerald-900 font-medium leading-relaxed bg-white p-3 rounded-xl border border-emerald-200">
            {language === 'ta' ? (ticket.resolution_notes_ta || ticket.resolution_notes_en) : ticket.resolution_notes_en}
          </p>

          {ticket.resolution_proof_url && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1.5">
                {t('timeline.viewProof')}:
              </span>
              <img 
                src={ticket.resolution_proof_url} 
                alt="Resolution Clearance Proof" 
                className="rounded-xl border border-emerald-200 max-h-48 w-auto object-cover shadow-sm"
              />
            </div>
          )}
        </div>
      )}

    </div>
  );
};
