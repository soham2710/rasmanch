// components/Translation/GlobalTranslationToggle.tsx - Fixed Type Safety Issues
'use client';
import { Globe, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation, type Language } from '@/contexts/GlobalTranslationContext';

interface GlobalTranslationToggleProps {
  isScrolled?: boolean;
}

const GlobalTranslationToggle = ({ isScrolled = false }: GlobalTranslationToggleProps) => {
  const { currentLanguage, isTranslating, error, setLanguage } = useTranslation();

  const languages = [
    { code: 'en' as Language, name: 'EN', fullName: 'English' },
    { code: 'hi' as Language, name: 'हि', fullName: 'हिन्दी' },
    { code: 'mr' as Language, name: 'मर', fullName: 'मारवाड़ी' },
  ];

  const handleLanguageChange = (langCode: Language) => {
    if (langCode === currentLanguage || isTranslating) return;
    setLanguage(langCode);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Error indicator */}
      {error && (
        <div 
          className={`${isScrolled ? 'text-amber-600' : 'text-yellow-300'}`} 
          title={error}
        >
          <AlertCircle className="h-3 w-3" />
        </div>
      )}
      
      {/* Loading indicator */}
      {isTranslating && (
        <div className={`${isScrolled ? 'text-amber-600' : 'text-white/80'}`}>
          <Loader2 className="h-3 w-3 animate-spin" />
        </div>
      )}
      
      {/* Language toggle buttons */}
      <div className={`flex items-center rounded-full p-1 ${
        isScrolled 
          ? 'bg-amber-50 border border-amber-200' 
          : 'bg-white/10 border border-white/20 backdrop-blur-sm'
      }`}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            disabled={isTranslating}
            className={`translate-btn px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
              currentLanguage === lang.code
                ? isScrolled
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white/90 text-gray-900 shadow-sm'
                : isScrolled
                  ? 'text-amber-700 hover:bg-amber-100'
                  : 'text-white/80 hover:bg-white/20'
            } ${isTranslating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            title={`${lang.fullName}${error && currentLanguage === lang.code ? ' (Offline)' : ''}`}
          >
            {lang.name}
          </button>
        ))}
      </div>
      
      {/* Language indicator icon */}
      <div className={`${isScrolled ? 'text-amber-600' : 'text-white/60'}`}>
        <Globe className="h-3.5 w-3.5" />
      </div>
    </div>
  );
};

export default GlobalTranslationToggle;