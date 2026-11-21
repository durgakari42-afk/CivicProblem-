import React, { useState } from 'react';
import { 
  Sparkles, Upload, Image as ImageIcon, MapPin, 
  Trash2, X, AlertCircle, CheckCircle, Flame, 
  Droplets, ZapOff, Construction
} from 'lucide-react';
import { SAMPLE_PRESETS, WARDS_LIST } from '../data/seedData';
import { SamplePreset, TriageResult } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useGrievance } from '../context/GrievanceContext';
import { AudioVoiceInput } from './AudioVoiceInput';
import { LiveTriageCard } from './LiveTriageCard';
import { triageGrievance, fileToBase64 } from '../services/geminiService';

export const SmartComposer: React.FC<{ onSuccess?: (ticketId: string) => void }> = ({ onSuccess }) => {
  const { language, t } = useLanguage();
  const { createGrievance, tickets, upvoteTicket, setActiveTicket } = useGrievance();

  const [text, setText] = useState('');
  const [selectedWard, setSelectedWard] = useState('Ward 114 - T. Nagar');
  const [landmark, setLandmark] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [photoBase64, setPhotoBase64] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);
  const [isFiling, setIsFiling] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  // Quick preset loader
  const handleSelectPreset = (preset: SamplePreset) => {
    setText(language === 'ta' ? preset.text_ta : preset.text_en);
    setSelectedWard(preset.ward);
    setLandmark(language === 'ta' ? preset.landmark_ta : preset.landmark);
    setPhotoUrl(preset.photo_url);
    setPhotoBase64('');
    setTriageResult(null);
    setSuccessId(null);
  };

  // Image file handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const b64 = await fileToBase64(file);
        setPhotoBase64(b64);
        setPhotoUrl(b64);
      } catch (err) {
        console.error('Failed to convert file to base64', err);
      }
    }
  };

  const handleClearPhoto = () => {
    setPhotoUrl('');
    setPhotoBase64('');
  };

  // Run Gemini Triage
  const handleTriage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      alert(language === 'ta' ? 'தயவுசெய்து உங்கள் புகாரை விவரிக்கவும்.' : 'Please enter a description for your grievance.');
      return;
    }

    setIsLoading(true);
    setTriageResult(null);
    setSuccessId(null);

    const targetWardObj = WARDS_LIST.find(w => w.id === selectedWard);

    try {
      const result = await triageGrievance({
        text,
        ward: selectedWard,
        landmark: landmark || (language === 'ta' ? 'முக்கிய சாலை' : 'Main Road'),
        photo_url: photoUrl,
        photo_base64: photoBase64,
        existing_tickets: tickets
      });

      setTriageResult(result);
    } catch (err) {
      console.error('Triage failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Final confirmation to add ticket
  const handleConfirmFiling = () => {
    if (!triageResult) return;
    setIsFiling(true);

    const targetWardObj = WARDS_LIST.find(w => w.id === selectedWard);
    const ward_ta = targetWardObj?.name_ta || selectedWard;

    setTimeout(() => {
      const newTicket = createGrievance(
        triageResult,
        text,
        selectedWard,
        ward_ta,
        landmark || 'Main Road',
        landmark || 'முக்கிய சாலை',
        photoUrl
      );

      setIsFiling(false);
      setSuccessId(newTicket.id);
      setActiveTicket(newTicket);
      if (onSuccess) {
        onSuccess(newTicket.id);
      }
    }, 600);
  };

  const handleUpvoteExisting = (matchedId: string) => {
    upvoteTicket(matchedId);
    const matched = tickets.find(t => t.id === matchedId);
    if (matched) {
      setActiveTicket(matched);
    }
    alert(language === 'ta' 
      ? `ஏற்கனவே உள்ள புகார் (${matchedId})-க்கு உங்கள் ஆதரவு பதிவு செய்யப்பட்டது! முன்னுரிமை உயர்த்தப்பட்டது.` 
      : `Upvote recorded for existing ticket ${matchedId}! Priority boosted dynamically.`
    );
    setTriageResult(null);
  };

  const renderPresetIcon = (iconName: string) => {
    switch (iconName) {
      case 'AlertTriangle':
        return <AlertCircle className="w-3.5 h-3.5 text-amber-500" />;
      case 'Trash2':
        return <Trash2 className="w-3.5 h-3.5 text-emerald-500" />;
      case 'ZapOff':
        return <ZapOff className="w-3.5 h-3.5 text-indigo-500" />;
      case 'Droplets':
        return <Droplets className="w-3.5 h-3.5 text-sky-500" />;
      case 'Construction':
        return <Construction className="w-3.5 h-3.5 text-rose-500" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-teal-500" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>{t('hero.badge')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {t('composer.heading')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {t('composer.subheading')}
            </p>
          </div>

          {/* Preset Buttons Header */}
          <span className="text-xs text-slate-400 font-medium">
            ⏱️ &lt; 60s Intake
          </span>
        </div>

        {/* 1-Click Demo Scenario Presets */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-2.5">
            ⚡ {t('composer.presetsTitle')}
          </p>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white text-xs font-medium border border-slate-700/80 hover:border-teal-500/40 transition-all shadow-sm active:scale-95"
              >
                {renderPresetIcon(preset.icon)}
                <span>{language === 'ta' ? preset.label_ta : preset.label_en}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Composer Form */}
      <form onSubmit={handleTriage} className="p-6 sm:p-8 space-y-6">
        
        {/* Success Alert Banner */}
        {successId && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center space-x-3 text-emerald-900 animate-fadeIn">
            <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-sm">{t('triageCard.ticketGenerated')}</p>
              <p className="text-xs text-emerald-700">
                {language === 'ta' ? `புகார் எண்: ${successId}. தளம் மற்றும் வரைபடத்தில் சேர்க்கப்பட்டது.` : `Tracking ID: ${successId}. Live on feed and authority console.`}
              </p>
            </div>
          </div>
        )}

        {/* Text Input with Web Speech API Audio Button */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {language === 'ta' ? 'புகார் விவரம் (தமிழ் / English):' : 'Grievance Description (English / தமிழ்):'}
            </label>
            {/* Audio Voice Input Integration */}
            <AudioVoiceInput 
              onTranscript={(spokenText) => setText(prev => prev ? `${prev} ${spokenText}` : spokenText)}
              disabled={isLoading}
            />
          </div>

          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('composer.inputPlaceholder')}
            className="w-full rounded-xl border border-slate-300 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-inner leading-relaxed resize-y"
            required
          />

          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
            <span>{language === 'ta' ? 'குரல் உள்ளீடு அல்லது மாதிரி புகாரைத் தேர்வு செய்யவும்' : 'Type freely in English or Tamil, or click voice / sample presets'}</span>
            <span>{text.length} {language === 'ta' ? 'எழுத்துக்கள்' : 'characters'}</span>
          </div>
        </div>

        {/* Location Selectors: Ward & Landmark */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              <MapPin className="w-3.5 h-3.5 inline mr-1 text-teal-600" />
              {t('composer.wardLabel')}
            </label>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
            >
              {WARDS_LIST.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {language === 'ta' ? ward.name_ta : ward.name_en}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              {t('composer.landmarkLabel')}
            </label>
            <input
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder={t('composer.landmarkPlaceholder')}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
            />
          </div>
        </div>

        {/* Optional Photo Attachment */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
            <ImageIcon className="w-3.5 h-3.5 inline mr-1 text-teal-600" />
            {t('composer.photoUpload')}
          </label>

          {photoUrl ? (
            <div className="relative rounded-2xl overflow-hidden border border-slate-300 bg-slate-900 shadow-md max-h-56 w-full flex items-center justify-center group">
              <img 
                src={photoUrl} 
                alt="Hazard preview" 
                className="max-h-56 w-auto object-cover rounded-xl"
              />
              <button
                type="button"
                onClick={handleClearPhoto}
                className="absolute top-3 right-3 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-transform active:scale-90"
                title={t('composer.photoRemove')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* File input dropzone */}
              <label className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-dashed border-slate-300 hover:border-teal-500 bg-slate-50/70 hover:bg-teal-50/40 cursor-pointer transition-all">
                <Upload className="w-6 h-6 text-slate-400 mb-1" />
                <span className="text-xs font-semibold text-slate-600">
                  {t('composer.photoDropzone')}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">JPG, PNG up to 10MB</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />
              </label>

              {/* Sample Photo Chips for instant testing */}
              <div className="flex items-center space-x-2 pt-1">
                <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                  {language === 'ta' ? 'மாதிரி படங்கள்:' : 'Quick Photos:'}
                </span>
                <button
                  type="button"
                  onClick={() => setPhotoUrl('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80')}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 font-medium border border-slate-200 transition-colors"
                >
                  📸 {t('composer.photoSample1')}
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoUrl('https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=600&q=80')}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 font-medium border border-slate-200 transition-colors"
                >
                  📸 {t('composer.photoSample2')}
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoUrl('https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80')}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 font-medium border border-slate-200 transition-colors"
                >
                  📸 {t('composer.photoSample3')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div className="flex items-center space-x-3 pt-2">
          <button
            type="submit"
            disabled={isLoading || !text.trim()}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-700 hover:from-teal-500 hover:to-cyan-600 text-white font-bold text-sm shadow-md shadow-teal-700/20 hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{t('composer.submitting')}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-teal-300" />
                <span>{t('composer.submitBtn')}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setText('');
              setLandmark('');
              setPhotoUrl('');
              setPhotoBase64('');
              setTriageResult(null);
            }}
            className="px-4 py-3.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-600 text-sm font-semibold transition-colors"
          >
            {t('composer.clearForm')}
          </button>
        </div>

      </form>

      {/* Render Live AI Triage Card upon analysis */}
      {triageResult && (
        <div className="p-6 sm:p-8 pt-0 border-t border-slate-100">
          <LiveTriageCard
            triage={triageResult}
            onConfirm={handleConfirmFiling}
            onUpvoteExisting={handleUpvoteExisting}
            isFiling={isFiling}
          />
        </div>
      )}

    </div>
  );
};
