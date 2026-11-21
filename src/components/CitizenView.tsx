import React from 'react';
import { ShieldCheck, Sparkles, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useGrievance } from '../context/GrievanceContext';
import { SmartComposer } from './SmartComposer';
import { CommunityFeed } from './CommunityFeed';
import { GrievanceTicket } from '../types';

interface CitizenViewProps {
  onSelectTicket: (ticket: GrievanceTicket) => void;
  composerRef?: React.RefObject<HTMLDivElement | null>;
}

export const CitizenView: React.FC<CitizenViewProps> = ({ onSelectTicket, composerRef }) => {
  const { language, t } = useLanguage();
  const { tickets } = useGrievance();

  return (
    <div className="space-y-12 animate-fadeIn">
      
      {/* High-Trust Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl">
        
        {/* Subtle Decorative Civic Watermark Pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <ShieldCheck className="w-96 h-96 text-teal-400" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/30">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>{t('hero.badge')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {t('hero.title')}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-800/80">
            <div>
              <p className="text-xl sm:text-2xl font-black text-teal-400 font-mono">
                {t('hero.stat1Val')}
              </p>
              <p className="text-xs text-slate-400 font-medium">
                {t('hero.stat1Label')}
              </p>
            </div>

            <div>
              <p className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">
                {t('hero.stat2Val')}
              </p>
              <p className="text-xs text-slate-400 font-medium">
                {t('hero.stat2Label')}
              </p>
            </div>

            <div>
              <p className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                {t('hero.stat3Val')}
              </p>
              <p className="text-xs text-slate-400 font-medium">
                {t('hero.stat3Label')}
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* Smart Intake Composer Section */}
      <section ref={composerRef} className="scroll-mt-24">
        <SmartComposer />
      </section>

      {/* Community Grievance Feed & Real-Time Pulse */}
      <section>
        <CommunityFeed onSelectTicket={onSelectTicket} />
      </section>

    </div>
  );
};
