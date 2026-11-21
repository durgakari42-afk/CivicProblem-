import React from 'react';
import { 
  X, MapPin, Building2, ThumbsUp, ShieldCheck, 
  Layers, Camera, CheckCircle2, AlertTriangle, Calendar
} from 'lucide-react';
import { GrievanceTicket } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useGrievance } from '../context/GrievanceContext';
import { TicketTimeline } from './TicketTimeline';

interface TicketDetailModalProps {
  ticket: GrievanceTicket | null;
  onClose: () => void;
}

export const TicketDetailModal: React.FC<TicketDetailModalProps> = ({ ticket, onClose }) => {
  const { language, t } = useLanguage();
  const { upvoteTicket } = useGrievance();

  if (!ticket) return null;

  const getUrgencyBadge = (urgency: string) => {
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-20 bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <span className="font-mono font-bold text-sm bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2.5 py-1 rounded-lg">
              {ticket.id}
            </span>
            <div className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getUrgencyBadge(ticket.urgency)} bg-white`}>
              {t(`urgencies.${ticket.urgency}`)}
            </div>
            <span className="text-xs font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
              {t(`statuses.${ticket.status}`)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Title and Summary */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              {language === 'ta' ? ticket.title_ta : ticket.title_en}
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {language === 'ta' ? ticket.summary_ta : ticket.summary_en}
            </p>
          </div>

          {/* Location and Department Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">
                  {language === 'ta' ? ticket.ward_ta : ticket.ward}
                </span>
                <span className="text-slate-500">
                  {language === 'ta' ? ticket.landmark_ta : ticket.landmark}
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Building2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">
                  {language === 'ta' ? ticket.department_ta : ticket.department_en}
                </span>
                <span className="text-slate-500">
                  {language === 'ta' ? ticket.sub_team_ta : ticket.sub_team_en}
                </span>
              </div>
            </div>
          </div>

          {/* Photo Preview & Multimodal Analysis */}
          {ticket.photo_url && (
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm max-h-72 w-full bg-slate-950 flex items-center justify-center">
                <img 
                  src={ticket.photo_url} 
                  alt="Incident Visual Evidence" 
                  className="max-h-72 w-full object-cover" 
                />
              </div>

              {ticket.multimodal && (
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-xs space-y-2">
                  <div className="flex items-center space-x-1.5 font-bold text-sky-900">
                    <Camera className="w-4 h-4 text-sky-600" />
                    <span>{t('triageCard.multimodalTitle')}</span>
                  </div>
                  <p className="text-sky-950 font-medium">
                    {language === 'ta' ? ticket.multimodal.visual_evidence_ta : ticket.multimodal.visual_evidence_en}
                  </p>
                  {(() => {
                    const risks = language === 'ta'
                      ? (ticket.multimodal?.safety_risks_ta || ticket.multimodal?.safetyRisks_ta || [])
                      : (ticket.multimodal?.safety_risks_en || ticket.multimodal?.safetyRisks_en || []);
                    if (risks.length === 0) return null;
                    return (
                      <ul className="list-disc list-inside space-y-1 text-sky-900 pt-1 border-t border-sky-200">
                        {risks.map((risk, i) => (
                          <li key={i}>{risk}</li>
                        ))}
                      </ul>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* AI Priority Assessment Rationale */}
          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-teal-950 uppercase tracking-wider block mb-1">
                {t('triageCard.rationale')} (Score: {ticket.priority_score}/100)
              </span>
              <p className="text-teal-900 leading-relaxed font-medium">
                {language === 'ta' ? ticket.rationale_ta : ticket.rationale_en}
              </p>
            </div>
          </div>

          {/* Upvote / Community Support Action */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                {language === 'ta' ? 'சமூக ஆதரவு மற்றும் முன்னுரிமை' : 'Community Support & Priority Boost'}
              </span>
              <span className="text-[11px] text-slate-500">
                {language === 'ta' ? 'ஆதரவு அளித்தால் முன்னுரிமை மதிப்பெண் உயரும்.' : 'Every citizen upvote increases dispatch urgency.'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => upvoteTicket(ticket.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${
                ticket.has_upvoted
                  ? 'bg-teal-600 text-white shadow-teal-600/30'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{ticket.has_upvoted ? t('feed.upvotedBtn') : t('feed.upvoteBtn')}</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-slate-900 text-white text-[10px]">
                {ticket.upvotes}
              </span>
            </button>
          </div>

          {/* Step-by-Step Resolution Lifecycle Timeline */}
          <div className="pt-4 border-t border-slate-200">
            <TicketTimeline ticket={ticket} />
          </div>

        </div>

      </div>
    </div>
  );
};
