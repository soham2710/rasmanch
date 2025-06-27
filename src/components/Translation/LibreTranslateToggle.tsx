// components/Translation/LibreTranslateToggle.tsx - Fixed LibreTranslate with Toggle Design
'use client';
import { useState, useEffect } from 'react';
import { Globe, Loader2, AlertCircle } from 'lucide-react';

interface LibreTranslateToggleProps {
  isScrolled?: boolean;
}

const LibreTranslateToggle = ({ isScrolled = false }: LibreTranslateToggleProps) => {
  const [currentLang, setCurrentLang] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [originalTexts, setOriginalTexts] = useState<Map<Element, string>>(new Map());
  const [error, setError] = useState<string | null>(null);

  const languages = [
    { code: 'en', name: 'EN', fullName: 'English' },
    { code: 'hi', name: 'हि', fullName: 'हिन्दी' },
    { code: 'mr', name: 'मर', fullName: 'मारवाड़ी' },
  ];

  // Fallback translations for when API fails
  const fallbackTranslations: { [key: string]: { [key: string]: string } } = {
    'hi': {
      'Home': 'होम',
      'Overview': 'अवलोकन',
      'Support': 'समर्थन',
      'News': 'समाचार',
      'Contact': 'संपर्क',
      'Join Movement': 'आंदोलन में शामिल हों',
      'Sign In': 'साइन इन',
      'Sign Out': 'साइन आउट',
      'Admin Panel': 'एडमिन पैनल',
    },
    'mr': {
      'Home': 'घर',
      'Overview': 'ओवरव्यू',
      'Support': 'सपोर्ट',
      'News': 'न्यूज',
      'Contact': 'कॉन्टैक्ट',
      'Join Movement': 'मूवमेंट ज्वाइन करो',
      'Sign In': 'साइन इन',
      'Sign Out': 'साइन आउट',
      'Admin Panel': 'एडमिन पैनल',
    }
  };

  const translateText = async (text: string, targetLang: string): Promise<string> => {
    if (!text.trim() || targetLang === 'en') return text;
    
    // Try LibreTranslate first
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: 'en',
          target: targetLang === 'mr' ? 'hi' : targetLang, // Use Hindi for Marwari
          format: 'text'
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.translatedText) {
        setError(null); // Clear any previous errors
        return data.translatedText;
      } else {
        throw new Error('No translation returned');
      }
      
    } catch (error) {
      console.warn('LibreTranslate API failed, using fallback:', error);
      
      // Fallback to local translations
      const trimmedText = text.trim();
      const translations = fallbackTranslations[targetLang];
      
      if (translations && translations[trimmedText]) {
        setError('Using offline translations');
        return translations[trimmedText];
      }
      
      // If no fallback available, return original text
      setError('Translation unavailable');
      return text;
    }
  };

  const translatePage = async (targetLang: string) => {
    setIsTranslating(true);
    setError(null);
    
    try {
      if (targetLang === 'en') {
        // Restore original texts
        originalTexts.forEach((originalText, element) => {
          if (element.textContent !== null) {
            element.textContent = originalText;
          }
        });
        setOriginalTexts(new Map());
        setIsTranslating(false);
        return;
      }

      // Find elements to translate (selective approach)
      const selectors = [
        'nav a:not([aria-label])', 
        'button:not([aria-label]):not(.translate-btn)', 
        'h1:not(.no-translate)', 
        'h2:not(.no-translate)', 
        'h3:not(.no-translate)',
        '.nav-item',
        '.stat-label'
      ].join(', ');
      
      const elements = document.querySelectorAll(selectors);
      const elementsToTranslate: Element[] = [];
      
      elements.forEach(element => {
        const text = element.textContent?.trim();
        if (text && 
            text.length > 1 && 
            text.length < 50 && // Shorter text for better API performance
            !text.match(/^\d+[\+\-\%]*$/) && // Not just numbers
            !text.match(/^[^\w\s]+$/) && // Not just symbols
            !element.closest('script, style, code, pre, .no-translate') && // Not in excluded areas
            !element.querySelector('*') // No child elements (leaf nodes only)
        ) {
          elementsToTranslate.push(element);
        }
      });

      // Store original texts if not already stored
      if (originalTexts.size === 0) {
        const newOriginalTexts = new Map();
        elementsToTranslate.forEach(element => {
          if (element.textContent) {
            newOriginalTexts.set(element, element.textContent);
          }
        });
        setOriginalTexts(newOriginalTexts);
      }

      // Translate in smaller batches with delays to avoid overwhelming the API
      const batchSize = 3;
      for (let i = 0; i < elementsToTranslate.length; i += batchSize) {
        const batch = elementsToTranslate.slice(i, i + batchSize);
        
        await Promise.all(
          batch.map(async (element) => {
            const originalText = originalTexts.get(element) || element.textContent || '';
            if (originalText && element.textContent !== null) {
              try {
                const translatedText = await translateText(originalText, targetLang);
                if (translatedText !== originalText) {
                  element.textContent = translatedText;
                }
              } catch (error) {
                console.error('Error translating element:', error);
                // Keep original text on individual element error
              }
            }
          })
        );
        
        // Add delay between batches to be respectful to the API
        if (i + batchSize < elementsToTranslate.length) {
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
      
    } catch (error) {
      console.error('Translation error:', error);
      setError('Translation failed');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleLanguageChange = async (langCode: string) => {
    if (langCode === currentLang || isTranslating) return;
    
    setCurrentLang(langCode);
    await translatePage(langCode);
  };

  // Clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex items-center space-x-2">
      {/* Error indicator */}
      {error && (
        <div className={`${isScrolled ? 'text-amber-600' : 'text-yellow-300'}`} title={error}>
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
              currentLang === lang.code
                ? isScrolled
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white/90 text-gray-900 shadow-sm'
                : isScrolled
                  ? 'text-amber-700 hover:bg-amber-100'
                  : 'text-white/80 hover:bg-white/20'
            } ${isTranslating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            title={`${lang.fullName}${error && currentLang === lang.code ? ' (Offline)' : ''}`}
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

export default LibreTranslateToggle;