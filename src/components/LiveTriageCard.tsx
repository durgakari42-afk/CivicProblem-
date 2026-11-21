import React from 'react';
import { 
  AlertTriangle, ShieldAlert, CheckCircle2, Building2, 
  Layers, Camera, AlertOctagon, ThumbsUp, Send, ArrowRight
} from 'lucide-react';
import { TriageResult, UrgencyLevel, Category } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface LiveTriageCardProps {
  triage: TriageResult;
  onConfirm: () => void;
  onUpvoteExisting?: (ticketId: string) => void;
  isFiling?: boolean;
}

export const LiveTriageCard: React.FC<LiveTriageCardProps> = ({
  triage,
  onConfirm,
  onUpvoteExisting,
  isFiling = false
}) => {
  const { language, t } = useLanguage();

  const getUrgencyBadge = (urgency: UrgencyLevel) => {
    switch (urgency) {
      case 'Critical':
        return 'bg-red-500/10 text-red-600 border-red-500/30';
      case 'High':
        return 'bg-orange-500/10 text-orange-600 border-orange-500/30';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/30';
      case 'Low':
        return 'bg-sky-500/10 text-sky-600 border-sky-500/30';
      default:
        return 'bg-slate-500/10 text-slate-600 border-slate-500/30';
    }
  };

  const getUrgencyText = (urgency: UrgencyLevel) => {
    return t(`urgencies.${urgency}`) || urgency;
  };

  const getCategoryText = (cat: Category) => {
    return t(`categories.${cat}`) || cat;
  };

  const score = Math.min(100, Math.max(1, triage.priority_score));

  // Gauge bar color
  const getScoreColor = (val: number) => {
    if (val >= 85) return 'bg-gradient-to-r from-orange-500 to-red-600';
    if (val >= 65) return 'bg-gradient-to-r from-amber-500 to-orange-500';
    if (val >= 45) return 'bg-gradient-to-r from-teal-500 to-amber-500';
    return 'bg-gradient-to-r from-sky-400 to-teal-500';
  };

  return (
    <div className="bg-white rounded-2xl border border-teal-500/40 shadow-xl overflow-hidden transition-all duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 px-6 py-4 text-white flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center">
            <ShieldAlert className="w-4 h-4 text-teal-400" />
          </div>
          <div>
            <h3 className="text-base font-bold tracking-tight text-white">
              {t('triageCard.badge')}
            </h3>
            <p className="text-xs text-teal-200">
              {language === 'ta' ? triage.title_ta : triage.title_en}
            </p>
          </div>
        </div>

        {/* Urgency Badge */}
        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getUrgencyBadge(triage.urgency)} bg-white shadow-sm`}>
          {getUrgencyText(triage.urgency)}
        </div>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Metric Grid: Priority Score Gauge & Routing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Priority Score Gauge */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {t('triageCard.priorityScore')}
              </span>
              <span className="text-2xl font-black text-slate-900 font-mono">
                {score}<span className="text-sm font-normal text-slate-400">/100</span>
              </span>
            </div>

            {/* Gauge Bar */}
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${getScoreColor(score)}`}
                style={{ width: `${score}%` }}
              ></div>
            </div>

            <p className="text-xs text-slate-500 mt-3 italic">
              {language === 'ta' ? triage.rationale_ta : triage.rationale_en}
            </p>
          </div>

          {/* Department & Sub-Team Routing */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                {t('triageCard.category')}
              </span>
              <div className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                <Layers className="w-3.5 h-3.5 mr-1.5 text-teal-600" />
                {getCategoryText(triage.category)}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                {t('triageCard.recommendedDept')}
              </span>
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-bold text-slate-900">
                  {language === 'ta' ? triage.recommended_department_ta : triage.recommended_department_en}
                </span>
              </div>
              <p className="text-xs text-slate-500 pl-6 mt-0.5 font-medium">
                ↳ {language === 'ta' ? triage.sub_team_ta : triage.sub_team_en}
              </p>
            </div>
          </div>

        </div>

        {/* Multimodal Photo Inspection Result (if image was processed) */}
        {triage.multimodal && (
          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 space-y-2.5">
            <div className="flex items-center space-x-2 text-sky-900 font-bold text-sm">
              <Camera className="w-4 h-4 text-sky-600" />
              <span>{t('triageCard.multimodalTitle')}</span>
              <span className="ml-auto inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                {t('triageCard.hazardVerified')}
              </span>
            </div>

            <p className="text-xs text-sky-950 font-medium">
              <strong className="text-sky-900">{t('triageCard.visualEvidence')}:</strong>{' '}
              {language === 'ta' ? triage.multimodal.visual_evidence_ta : triage.multimodal.visual_evidence_en}
            </p>

            {/* Safety Risks List */}
            {(() => {
              const risks = language === 'ta'
                ? (triage.multimodal?.safety_risks_ta || triage.multimodal?.safetyRisks_ta || [])
                : (triage.multimodal?.safety_risks_en || triage.multimodal?.safetyRisks_en || []);
              if (risks.length === 0) return null;
              return (
                <div className="mt-2 pt-2 border-t border-sky-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-900 block mb-1">
                    {t('triageCard.safetyRisks')}:
                  </span>
                  <ul className="text-xs text-sky-900 space-y-1 list-disc list-inside">
                    {risks.map((risk, idx) => (
                      <li key={idx} className="leading-relaxed">{risk}</li>
                    ))}
                  </ul>
                </div>
              );
            })()}
          </div>
        )}

        {/* Duplicate / Nearby Cluster Alert */}
        {triage.cluster && triage.cluster.is_duplicate && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-900">
                  {t('triageCard.duplicateAlert')}
                </h4>
                <p className="text-xs text-amber-800 mt-0.5">
                  {language === 'ta' ? triage.cluster.reason_ta : triage.cluster.reason_en}
                </p>
              </div>
            </div>

            {triage.cluster.matched_ticket_id && onUpvoteExisting && (
              <button
                type="button"
                onClick={() => onUpvoteExisting(triage.cluster!.matched_ticket_id!)}
                className="shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{t('triageCard.upvoteExisting')}</span>
              </button>
            )}
          </div>
        )}

        {/* Final Confirmation CTA Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isFiling}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-sm shadow-lg shadow-teal-600/20 hover:shadow-xl transition-all transform active:scale-[0.99] disabled:opacity-50"
          >
            {isFiling ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{t('triageCard.filingTicket')}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{t('triageCard.confirmSubmission')}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
