import React, { useState } from 'react';
import { 
  MapPin, AlertCircle, Layers, ShieldAlert, 
  Eye, Compass, CheckCircle2, ChevronRight, X 
} from 'lucide-react';
import { GrievanceTicket, UrgencyLevel } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useGrievance } from '../context/GrievanceContext';
import { WARDS_LIST } from '../data/seedData';

interface WardPulseMapProps {
  onSelectTicket: (ticket: GrievanceTicket) => void;
}

export const WardPulseMap: React.FC<WardPulseMapProps> = ({ onSelectTicket }) => {
  const { language, t } = useLanguage();
  const { tickets } = useGrievance();

  const [selectedWardFilter, setSelectedWardFilter] = useState<string>('ALL');
  const [selectedUrgencyFilter, setSelectedUrgencyFilter] = useState<string>('ALL');
  const [hoveredTicket, setHoveredTicket] = useState<GrievanceTicket | null>(null);

  // SVG Map Coordinates Bounds for Chennai
  // Lat: 12.95 to 13.12 (Y axis, inverted)
  // Lng: 80.18 to 80.29 (X axis)
  const minLat = 12.96;
  const maxLat = 13.11;
  const minLng = 80.19;
  const maxLng = 80.285;

  const projectToMap = (lat: number, lng: number) => {
    // Clamp
    const clampedLat = Math.min(maxLat, Math.max(minLat, lat));
    const clampedLng = Math.min(maxLng, Math.max(minLng, lng));

    const x = ((clampedLng - minLng) / (maxLng - minLng)) * 800 + 50;
    const y = ((maxLat - clampedLat) / (maxLat - minLat)) * 500 + 40;
    return { x, y };
  };

  const filteredTickets = tickets.filter(ticket => {
    if (selectedWardFilter !== 'ALL' && ticket.ward !== selectedWardFilter) return false;
    if (selectedUrgencyFilter !== 'ALL' && ticket.urgency !== selectedUrgencyFilter) return false;
    return true;
  });

  const getPinColor = (urgency: UrgencyLevel) => {
    switch (urgency) {
      case 'Critical': return '#ef4444'; // Red
      case 'High': return '#f97316';     // Orange
      case 'Medium': return '#f59e0b';   // Amber
      case 'Low': return '#0284c7';      // Sky Blue
      default: return '#64748b';
    }
  };

  // Group tickets by ward for the summary card
  const wardSummaries = WARDS_LIST.map(ward => {
    const wardTickets = tickets.filter(t => t.ward === ward.id && t.status !== 'Resolved');
    const criticalCount = wardTickets.filter(t => t.urgency === 'Critical').length;
    return {
      ...ward,
      count: wardTickets.length,
      criticalCount
    };
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-800 border border-teal-500/30 mb-2">
            <Compass className="w-3.5 h-3.5 text-teal-600" />
            <span>{t('map.title')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            {t('map.title')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            {t('map.subtitle')}
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={selectedWardFilter}
            onChange={(e) => setSelectedWardFilter(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 font-semibold text-slate-700 shadow-sm"
          >
            <option value="ALL">{t('feed.filterWard')} (All)</option>
            {WARDS_LIST.map((w) => (
              <option key={w.id} value={w.id}>
                {language === 'ta' ? w.name_ta : w.name_en}
              </option>
            ))}
          </select>

          <select
            value={selectedUrgencyFilter}
            onChange={(e) => setSelectedUrgencyFilter(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 font-semibold text-slate-700 shadow-sm"
          >
            <option value="ALL">{t('feed.filterUrgency')} (All)</option>
            <option value="Critical">{t('urgencies.Critical')}</option>
            <option value="High">{t('urgencies.High')}</option>
            <option value="Medium">{t('urgencies.Medium')}</option>
            <option value="Low">{t('urgencies.Low')}</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Ward Breakdown Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Interactive SVG Ward Pulse Map Canvas */}
        <div className="lg:col-span-3 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative min-h-[580px] flex flex-col justify-between">
          
          {/* Top Bar inside Map Canvas */}
          <div className="p-4 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-teal-400 pulse-indicator"></span>
              <span className="font-semibold text-white">
                {language === 'ta' ? 'சென்னை பெருநகர நகராட்சி மண்டல வரைபடம்' : 'Greater Chennai Municipal Corporation Grid'}
              </span>
              <span className="text-slate-500 hidden sm:inline">|</span>
              <span className="text-slate-400 hidden sm:inline">
                {filteredTickets.length} {language === 'ta' ? 'செயலில் உள்ள புகார்கள்' : 'active pins plotted'}
              </span>
            </div>

            <div className="flex items-center space-x-3 text-[11px] font-mono">
              <span className="text-teal-400">13.04° N, 80.23° E</span>
            </div>
          </div>

          {/* SVG Map Render */}
          <div className="relative w-full h-[500px] overflow-hidden flex items-center justify-center p-2">
            <svg 
              viewBox="0 0 900 580" 
              className="w-full h-full select-none"
              style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
            >
              {/* Grid Background Pattern */}
              <defs>
                <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" />
                </pattern>
                
                {/* Glowing Pulse Filters */}
                <filter id="glow-critical" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="900" height="580" fill="#090d16" />
              <rect width="900" height="580" fill="url(#gridPattern)" />

              {/* Bay of Bengal Coastline Representation (Eastern boundary) */}
              <path 
                d="M 850 0 Q 820 180 840 320 T 830 580" 
                fill="none" 
                stroke="#0e7490" 
                strokeWidth="6" 
                strokeDasharray="4 4"
                opacity="0.3"
              />
              <text x="840" y="40" fill="#0891b2" fontSize="11" fontFamily="sans-serif" opacity="0.4" textAnchor="end">
                BAY OF BENGAL
              </text>

              {/* Arterial Roadways Network Lines */}
              <g stroke="#334155" strokeWidth="1.5" opacity="0.5">
                <line x1="120" y1="180" x2="780" y2="280" />
                <line x1="280" y1="80" x2="680" y2="480" />
                <line x1="450" y1="40" x2="520" y2="520" />
                <line x1="200" y1="420" x2="800" y2="400" />
              </g>

              {/* Administrative Ward Boundary Zones */}
              {WARDS_LIST.map((ward) => {
                const { x, y } = projectToMap(ward.lat, ward.lng);
                return (
                  <g key={ward.id}>
                    {/* Ward Zone Circle */}
                    <circle 
                      cx={x} 
                      cy={y} 
                      r="65" 
                      fill="#0f172a" 
                      fillOpacity="0.6"
                      stroke="#1e293b" 
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                    <text 
                      x={x} 
                      y={y + 55} 
                      fill="#94a3b8" 
                      fontSize="10" 
                      fontWeight="bold"
                      textAnchor="middle"
                      className="font-sans"
                    >
                      {language === 'ta' ? ward.name_ta : ward.name_en}
                    </text>
                  </g>
                );
              })}

              {/* Plot Grievance Pins */}
              {filteredTickets.map((ticket) => {
                const { x, y } = projectToMap(ticket.lat, ticket.lng);
                const color = getPinColor(ticket.urgency);
                const isCritical = ticket.urgency === 'Critical';

                return (
                  <g 
                    key={ticket.id} 
                    className="cursor-pointer transition-transform transform hover:scale-125"
                    onClick={() => onSelectTicket(ticket)}
                    onMouseEnter={() => setHoveredTicket(ticket)}
                  >
                    {/* Animated Ripple for Critical Issues */}
                    {isCritical && (
                      <circle 
                        cx={x} 
                        cy={y} 
                        r="18" 
                        fill="none" 
                        stroke="#ef4444" 
                        strokeWidth="2" 
                        opacity="0.8"
                      >
                        <animate 
                          attributeName="r" 
                          values="10;32" 
                          dur="1.8s" 
                          repeatCount="indefinite" 
                        />
                        <animate 
                          attributeName="opacity" 
                          values="0.9;0" 
                          dur="1.8s" 
                          repeatCount="indefinite" 
                        />
                      </circle>
                    )}

                    {/* Outer Pin Body */}
                    <circle 
                      cx={x} 
                      cy={y} 
                      r={isCritical ? "11" : "8"} 
                      fill={color} 
                      stroke="#ffffff" 
                      strokeWidth="2"
                      filter={isCritical ? "url(#glow-critical)" : undefined}
                    />

                    {/* Center Core */}
                    <circle 
                      cx={x} 
                      cy={y} 
                      r={isCritical ? "4" : "2.5"} 
                      fill="#ffffff" 
                    />
                  </g>
                );
              })}
            </svg>

            {/* Interactive Pin Hover / Click Popover Card */}
            {hoveredTicket && (
              <div 
                className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-sm bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 text-slate-900 animate-fadeIn z-30"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-mono text-[10px] font-bold bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded">
                      {hoveredTicket.id}
                    </span>
                    <span 
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                      style={{ backgroundColor: getPinColor(hoveredTicket.urgency) }}
                    >
                      {t(`urgencies.${hoveredTicket.urgency}`)} ({hoveredTicket.priority_score}/100)
                    </span>
                  </div>
                  <button 
                    onClick={() => setHoveredTicket(null)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="text-xs font-bold text-slate-900 mt-2 line-clamp-1">
                  {language === 'ta' ? hoveredTicket.title_ta : hoveredTicket.title_en}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  📍 {language === 'ta' ? hoveredTicket.landmark_ta : hoveredTicket.landmark}
                </p>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-medium">
                    {language === 'ta' ? hoveredTicket.department_ta : hoveredTicket.department_en}
                  </span>
                  <button
                    onClick={() => onSelectTicket(hoveredTicket)}
                    className="text-[11px] font-bold text-teal-700 hover:text-teal-900 flex items-center space-x-0.5"
                  >
                    <span>{t('feed.viewDetails')}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Map Legend Footer */}
          <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">
              {t('map.legendTitle')}:
            </span>

            <div className="flex flex-wrap items-center gap-4 text-[11px]">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block shadow-sm"></span>
                <span>{t('map.legendCritical')}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-orange-500 inline-block"></span>
                <span>{t('map.legendHigh')}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                <span>{t('map.legendMedium')}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-sky-500 inline-block"></span>
                <span>{t('map.legendLow')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Sidebar: Ward Breakdown & Hotspots */}
        <div className="space-y-4">
          
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-1">
              {t('map.wardSummary')}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {t('map.clusterNote')}
            </p>

            {/* Ward list */}
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {wardSummaries.map((w) => (
                <div
                  key={w.id}
                  onClick={() => setSelectedWardFilter(selectedWardFilter === w.id ? 'ALL' : w.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedWardFilter === w.id
                      ? 'border-teal-500 bg-teal-50/50 shadow-sm'
                      : 'border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">
                      {language === 'ta' ? w.name_ta : w.name_en}
                    </h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {w.count} {language === 'ta' ? 'நடப்பு புகார்கள்' : 'open issues'}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    {w.criticalCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">
                        {w.criticalCount} {language === 'ta' ? 'தீவிரம்' : 'Crit'}
                      </span>
                    )}
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {w.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
