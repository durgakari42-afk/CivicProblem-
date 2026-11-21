import React, { useState, useRef } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { GrievanceProvider, useGrievance } from './context/GrievanceContext';
import { Navbar } from './components/Navbar';
import { CitizenView } from './components/CitizenView';
import { AuthorityView } from './components/AuthorityView';
import { WardPulseMap } from './components/WardPulseMap';
import { TicketDetailModal } from './components/TicketDetailModal';
import { GrievanceTicket } from './types';
import { ShieldCheck, Heart, Sparkles, Building2, Globe } from 'lucide-react';

const MainApp: React.FC = () => {
  const { language, t } = useLanguage();
  const { activeTicket, setActiveTicket } = useGrievance();

  const [currentView, setCurrentView] = useState<'citizen' | 'authority' | 'map'>('citizen');
  const composerRef = useRef<HTMLDivElement | null>(null);

  const handleOpenReport = () => {
    setCurrentView('citizen');
    setTimeout(() => {
      composerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Top Navbar */}
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        onOpenReport={handleOpenReport}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'citizen' && (
          <CitizenView 
            onSelectTicket={(ticket) => setActiveTicket(ticket)} 
            composerRef={composerRef}
          />
        )}

        {currentView === 'authority' && (
          <AuthorityView 
            onSelectTicket={(ticket) => setActiveTicket(ticket)} 
          />
        )}

        {currentView === 'map' && (
          <WardPulseMap 
            onSelectTicket={(ticket) => setActiveTicket(ticket)} 
          />
        )}
      </main>

      {/* Ticket Details Lifecycle Modal */}
      <TicketDetailModal 
        ticket={activeTicket} 
        onClose={() => setActiveTicket(null)} 
      />

      {/* High-Trust Civic Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-white mt-16 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">CivicResolve</span>
              <p className="text-[11px] text-slate-400">
                {language === 'ta' 
                  ? 'தமிழ்நாடு நகராட்சி நிர்வாகம் & குடிமக்கள் குறைதீர்ப்பு அமைப்பு' 
                  : 'Municipal Corporation Operations & Citizen Pulse Engine'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-xs">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>{t('app.liveStatus')}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>{t('app.aiModel')}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span>Bilingual (English / தமிழ்)</span>
            </span>
          </div>

          <p className="text-[11px] text-slate-400 text-center md:text-right">
            &copy; 2026 CivicResolve. {language === 'ta' ? 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.' : 'All rights reserved.'}
          </p>

        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <GrievanceProvider>
        <MainApp />
      </GrievanceProvider>
    </LanguageProvider>
  );
}
