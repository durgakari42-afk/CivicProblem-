import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, ThumbsUp, ArrowUpDown, ChevronRight, 
  MapPin, Clock, Building2, Layers, AlertCircle
} from 'lucide-react';
import { GrievanceTicket, Category, UrgencyLevel, TicketStatus } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useGrievance } from '../context/GrievanceContext';
import { WARDS_LIST } from '../data/seedData';

interface CommunityFeedProps {
  onSelectTicket: (ticket: GrievanceTicket) => void;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({ onSelectTicket }) => {
  const { language, t } = useLanguage();
  const { tickets, upvoteTicket } = useGrievance();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedWard, setSelectedWard] = useState<string>('ALL');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'recent' | 'priority' | 'upvotes'>('priority');

  const CATEGORIES: Category[] = [
    'Roads & Potholes',
    'Sanitation & Waste',
    'Streetlights & Electrical',
    'Water Supply & Drainage',
    'Public Safety / Other'
  ];

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      // Search match
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesEn = ticket.title_en.toLowerCase().includes(query) ||
                          ticket.summary_en.toLowerCase().includes(query) ||
                          ticket.id.toLowerCase().includes(query) ||
                          ticket.landmark.toLowerCase().includes(query);
        const matchesTa = ticket.title_ta.toLowerCase().includes(query) ||
                          ticket.summary_ta.toLowerCase().includes(query) ||
                          ticket.landmark_ta.toLowerCase().includes(query);
        if (!matchesEn && !matchesTa) return false;
      }

      // Category filter
      if (selectedCategory !== 'ALL' && ticket.category !== selectedCategory) {
        return false;
      }

      // Ward filter
      if (selectedWard !== 'ALL' && ticket.ward !== selectedWard) {
        return false;
      }

      // Urgency filter
      if (selectedUrgency !== 'ALL' && ticket.urgency !== selectedUrgency) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'ALL' && ticket.status !== selectedStatus) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority_score - a.priority_score;
      }
      if (sortBy === 'upvotes') {
        return b.upvotes - a.upvotes;
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [tickets, search, selectedCategory, selectedWard, selectedUrgency, selectedStatus, sortBy]);

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

  const getStatusBadge = (status: TicketStatus) => {
    switch (status) {
      case 'Resolved':
        return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30';
      case 'In Progress':
        return 'bg-indigo-500/10 text-indigo-700 border-indigo-500/30';
      case 'Assigned to Department':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/30';
      default:
        return 'bg-slate-500/10 text-slate-700 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Feed Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            {t('feed.heading')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t('feed.subheading')}
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            {t('feed.sortBy')}:
          </span>
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="priority">{t('feed.sortPriority')}</option>
            <option value="recent">{t('feed.sortRecent')}</option>
            <option value="upvotes">{t('feed.sortUpvotes')}</option>
          </select>
        </div>
      </div>

      {/* Filter Toolbar: Search Bar + Dropdowns */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('feed.searchPlaceholder')}
            className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
          <button
            type="button"
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'ALL'
                ? 'bg-slate-900 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t('feed.allCategories')}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t(`categories.${cat}`)}
            </button>
          ))}
        </div>

        {/* Secondary Dropdown Filters: Ward, Urgency, Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
          
          {/* Ward filter */}
          <div>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 bg-slate-50 text-slate-700"
            >
              <option value="ALL">{t('feed.filterWard')} (All)</option>
              {WARDS_LIST.map((w) => (
                <option key={w.id} value={w.id}>
                  {language === 'ta' ? w.name_ta : w.name_en}
                </option>
              ))}
            </select>
          </div>

          {/* Urgency filter */}
          <div>
            <select
              value={selectedUrgency}
              onChange={(e) => setSelectedUrgency(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 bg-slate-50 text-slate-700"
            >
              <option value="ALL">{t('feed.filterUrgency')} (All)</option>
              <option value="Critical">{t('urgencies.Critical')}</option>
              <option value="High">{t('urgencies.High')}</option>
              <option value="Medium">{t('urgencies.Medium')}</option>
              <option value="Low">{t('urgencies.Low')}</option>
            </select>
          </div>

          {/* Status filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 bg-slate-50 text-slate-700"
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

      </div>

      {/* Grievance Ticket Cards Feed */}
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-medium">{t('feed.noResults')}</p>
          </div>
        ) : (
          filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-400 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col md:flex-row group"
            >
              
              {/* Optional Photo Thumbnail */}
              {ticket.photo_url && (
                <div 
                  className="md:w-48 h-40 md:h-auto shrink-0 bg-slate-900 cursor-pointer overflow-hidden relative"
                  onClick={() => onSelectTicket(ticket)}
                >
                  <img 
                    src={ticket.photo_url} 
                    alt={ticket.title_en} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-white font-mono text-[10px] font-bold">
                    {ticket.id}
                  </div>
                </div>
              )}

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-2">
                      {!ticket.photo_url && (
                        <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                          {ticket.id}
                        </span>
                      )}
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getUrgencyBadge(ticket.urgency)}`}>
                        {t(`urgencies.${ticket.urgency}`)}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        {t(`categories.${ticket.category}`)}
                      </span>
                    </div>

                    {/* Status Pill */}
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(ticket.status)}`}>
                      {t(`statuses.${ticket.status}`)}
                    </span>
                  </div>

                  {/* Title & Summary (Natural Bilingual) */}
                  <h4 
                    onClick={() => onSelectTicket(ticket)}
                    className="text-base font-bold text-slate-900 hover:text-teal-600 cursor-pointer transition-colors leading-snug line-clamp-1"
                  >
                    {language === 'ta' ? ticket.title_ta : ticket.title_en}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {language === 'ta' ? ticket.summary_ta : ticket.summary_en}
                  </p>

                  {/* Location & Routing Info */}
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-100">
                    <span className="inline-flex items-center font-medium text-slate-700">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-teal-600 shrink-0" />
                      {language === 'ta' ? ticket.ward_ta : ticket.ward} • {language === 'ta' ? ticket.landmark_ta : ticket.landmark}
                    </span>
                    <span className="inline-flex items-center">
                      <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                      {language === 'ta' ? ticket.department_ta : ticket.department_en}
                    </span>
                  </div>

                </div>

                {/* Bottom Actions: Upvote / Me Too & Lifecycle Link */}
                <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100">
                  
                  {/* Upvote Button with Dynamic Counter */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      upvoteTicket(ticket.id);
                    }}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 ${
                      ticket.has_upvoted
                        ? 'bg-teal-600 text-white shadow-teal-600/30'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{ticket.has_upvoted ? t('feed.upvotedBtn') : t('feed.upvoteBtn')}</span>
                    <span className="ml-1 px-1.5 py-0.2 rounded-full bg-slate-900 text-white text-[10px]">
                      {ticket.upvotes}
                    </span>
                  </button>

                  {/* Priority Gauge & Lifecycle link */}
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        {t('triageCard.priorityScore')}
                      </span>
                      <span className="text-xs font-black font-mono text-slate-900">
                        {ticket.priority_score}/100
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectTicket(ticket)}
                      className="flex items-center space-x-1 text-xs font-bold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg border border-teal-200 transition-colors"
                    >
                      <span>{t('feed.viewDetails')}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
