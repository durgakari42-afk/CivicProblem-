import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AudioVoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export const AudioVoiceInput: React.FC<AudioVoiceInputProps> = ({ onTranscript, disabled }) => {
  const { language, t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = language === 'ta' ? 'ta-IN' : 'en-IN';

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        onTranscript(finalTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, [language, onTranscript]);

  const toggleListening = () => {
    if (!supported) {
      alert(language === 'ta' 
        ? 'உங்கள் உலாவியில் குரல் உள்ளீடு ஆதரவு இல்லை. தயவுசெய்து Chrome உலாவியைப் பயன்படுத்தவும்.' 
        : 'Web Speech API is not supported in this browser. Please use Google Chrome.'
      );
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {}
      setIsListening(false);
    } else {
      try {
        if (recognitionRef.current) {
          recognitionRef.current.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
          recognitionRef.current.start();
          setIsListening(true);
        }
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
      }
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={toggleListening}
        disabled={disabled}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
          isListening
            ? 'bg-red-500 text-white animate-pulse shadow-red-500/30'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
        }`}
        title={isListening ? t('composer.voiceStop') : t('composer.voiceStart')}
      >
        {isListening ? (
          <>
            <MicOff className="w-3.5 h-3.5 text-white" />
            <span>{t('composer.voiceListening')}</span>
            {/* Animated speech wave bars */}
            <div className="flex items-center space-x-0.5 ml-1">
              <span className="w-1 h-3 bg-white rounded-full animate-bounce"></span>
              <span className="w-1 h-4 bg-white rounded-full animate-bounce [animation-delay:0.15s]"></span>
              <span className="w-1 h-2 bg-white rounded-full animate-bounce [animation-delay:0.3s]"></span>
            </div>
          </>
        ) : (
          <>
            <Mic className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'ta' ? t('composer.voiceLangTa') : t('composer.voiceLangEn')}</span>
          </>
        )}
      </button>
    </div>
  );
};
