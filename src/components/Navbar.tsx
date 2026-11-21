import React from 'react';
import { ShieldCheck, Radio, Activity, LayoutDashboard, MapPin, PlusCircle, Globe, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useGrievance } from '../context/GrievanceContext';

interface NavbarProps {
  currentView: 'citizen' | 'authority' | 'map';
  setCurrentView: (view: 'citizen' | 'authority' | 'map') => void;
  onOpenReport?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, onOpenReport }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { resetToSeedData, tickets } = useGrievance();

  const openIssuesCount = tickets.filter(t => t.status !== 'Resolved').length;

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-lg backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Live Pulse */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('citizen')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center shadow-md shadow-teal-500/20">
              <ShieldCheck className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-white font-sans">
                  {t('app.title')}
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-1.5 pulse-indicator"></span>
                  {t('app.aiModel')}
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden md:block">
                {t('app.tagline')}
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setCurrentView('citizen')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'citizen'
                  ? 'bg-teal-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>{t('app.navCitizen')}</span>
            </button>

            <button
              onClick={() => setCurrentView('authority')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                currentView === 'authority'
                  ? 'bg-teal-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{t('app.navAuthority')}</span>
              {openIssuesCount > 0 && (
                <span className={`ml-1 px-1.5 py-0.2 rounded-full text-xs font-bold ${
                  currentView === 'authority' ? 'bg-slate-900 text-white' : 'bg-red-500 text-white'
                }`}>
                  {openIssuesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentView('map')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'map'
                  ? 'bg-teal-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{t('app.navMap')}</span>
            </button>
          </nav>

          {/* Right Action: Language Toggle & Quick CTA */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Global Language Toggle Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-all shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-400"
              title="Switch Language / மொழியை மாற்றுக"
            >
              <Globe className="w-4 h-4 text-teal-400" />
              <span className="font-semibold">{language === 'en' ? 'தமிழ்' : 'English'}</span>
              <span className="text-[10px] uppercase tracking-wider px-1 py-0.5 rounded bg-slate-900 text-slate-400 font-mono">
                {language === 'en' ? 'EN' : 'TA'}
              </span>
            </button>

            {/* Quick Demo Reset */}
            <button
              onClick={() => {
                if (window.confirm(language === 'ta' ? 'அனைத்து புகார்களையும் ஆரம்ப மாதிரி நிலைக்கு மீட்டமைக்கவா?' : 'Reset all grievances back to clean initial demo data?')) {
                  resetToSeedData();
                }
              }}
              title="Reset Demo Data"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Action CTA Button */}
            {onOpenReport && (
              <button
                onClick={onOpenReport}
                className="hidden lg:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-950 text-sm font-bold shadow-md shadow-teal-500/20 transition-all transform hover:-translate-y-0.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t('app.newReport')}</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
