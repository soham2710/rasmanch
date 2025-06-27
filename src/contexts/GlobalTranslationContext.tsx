// contexts/GlobalTranslationContext.tsx - Fixed Type Safety Issues
'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define language type
export type Language = 'en' | 'hi' | 'mr';

interface TranslationContextType {
  currentLanguage: Language;
  isTranslating: boolean;
  error: string | null;
  setLanguage: (lang: Language) => void;
}

const TranslationContext = createContext<TranslationContextType>({
  currentLanguage: 'en',
  isTranslating: false,
  error: null,
  setLanguage: () => {},
});

export const useTranslation = () => useContext(TranslationContext);

// Comprehensive translation dictionaries - Hindi and Rajasthani Marwadi
const translations = {
  // NAVIGATION & HEADER
  'Home': {
    hi: 'होम',
    mr: 'घर'
  },
  'Overview': {
    hi: 'अवलोकन',
    mr: 'जांच'
  },
  'Support': {
    hi: 'समर्थन',
    mr: 'साथ'
  },
  'News': {
    hi: 'समाचार',
    mr: 'खबर'
  },
  'Contact': {
    hi: 'संपर्क',
    mr: 'मिलणो'
  },
  'Sign In': {
    hi: 'साइन इन',
    mr: 'भीतर आवो'
  },
  'Join Movement': {
    hi: 'आंदोलन में शामिल हों',
    mr: 'चळवळ में जुड़ो'
  },
  'Admin Panel': {
    hi: 'एडमिन पैनल',
    mr: 'व्यवस्थापक पट्टी'
  },
  'Sign Out': {
    hi: 'साइन आउट',
    mr: 'बाहर जावो'
  },

  // HOME PAGE HERO
  'राजस्थानी कहानियाँ': {
    hi: 'राजस्थानी कहानियाँ',
    mr: 'राजस्थानी कथावां'
  },
  'राजस्थान के पर्दे पर': {
    hi: 'राजस्थान के पर्दे पर',
    mr: 'राजस्थान रै पर्दै माथै'
  },
  'Reviving the legacy of Rajasthani cinema, arts, and culture through vision, unity, and structured development': {
    hi: 'दृष्टि, एकता और संरचित विकास के माध्यम से राजस्थानी सिनेमा, कला और संस्कृति की विरासत को पुनर्जीवित करना',
    mr: 'राजस्थानी सिनेमा, कला अर संस्कृति री विरासत नै दृष्टि, एकता अर व्यवस्थित विकास रै जरियै नवो जीवन देणो'
  },

  // STATISTICS
  'Artists Registered': {
    hi: 'पंजीकृत कलाकार',
    mr: 'नाम लिखावण कलाकार'
  },
  'Cities Reached': {
    hi: 'शहरों तक पहुंच',
    mr: 'शहरां तक पहुंच'
  },
  'Events Planned': {
    hi: 'नियोजित कार्यक्रम',
    mr: 'योजना बणायोड़ा कार्यक्रम'
  },
  'Supporters': {
    hi: 'समर्थक',
    mr: 'साथ देणिया'
  },

  // PROBLEMS SECTION
  'Why Did Rajasthani Cinema Fall Behind?': {
    hi: 'राजस्थानी सिनेमा क्यों पीछे रह गया?',
    mr: 'राजस्थानी सिनेमा क्यूं पाछै रह्यो?'
  },
  'Despite being the backdrop for countless global productions, Rajasthan\'s own cinematic voice remains unheard.': {
    hi: 'अनगिनत वैश्विक प्रोडक्शन की पृष्ठभूमि होने के बावजूद, राजस्थान की अपनी सिनेमाई आवाज अनसुनी रह जाती है।',
    mr: 'दुनिया भर री फिल्मां रो केंद्र होणै रै बावजूद, राजस्थान री अपणी सिनेमाई आवाज सुणीजै कोनी।'
  },
  'No System or Process': {
    hi: 'कोई सिस्टम या प्रक्रिया नहीं',
    mr: 'कोई व्यवस्था या तरीको कोनी'
  },
  'Local creatives lack standard operating practices for filmmaking.': {
    hi: 'स्थानीय रचनाकारों में फिल्म निर्माण के लिए मानक संचालन प्रथाओं की कमी है।',
    mr: 'स्थानीय कलाकारां कनै फिल्म बणावण री मानक प्रक्रिया कोनी।'
  },
  'Lack of Unity': {
    hi: 'एकता की कमी',
    mr: 'एकता री कमी'
  },
  'Artists and technicians remain unorganised, scattered, and unsupported.': {
    hi: 'कलाकार और तकनीशियन असंगठित, बिखरे हुए और असहाय रहते हैं।',
    mr: 'कलाकार अर तकनीशियन असंगठित, बिखर्या होड़ा अर बिना सहारै रैवै।'
  },
  'No Industry Body': {
    hi: 'कोई उद्योग निकाय नहीं',
    mr: 'कोई उद्योग संस्था कोनी'
  },
  'Unlike Bollywood or Tollywood, we have no unions or creative councils.': {
    hi: 'बॉलीवुड या टॉलीवुड के विपरीत, हमारे पास कोई यूनियन या रचनात्मक परिषद नहीं है।',
    mr: 'बॉलीवुड या टॉलीवुड रै उल्टै, म्हारै कनै कोई यूनियन या कलाकार परिषद कोनी।'
  },
  'No Infrastructure': {
    hi: 'कोई बुनियादी ढांचा नहीं',
    mr: 'कोई बुनियादी ढांचो कोनी'
  },
  'There\'s no Rajasthan-based Film City or equipment hub.': {
    hi: 'यहाँ कोई राजस्थान-आधारित फिल्म सिटी या उपकरण हब नहीं है।',
    mr: 'राजस्थान में कोई फिल्म सिटी या उपकरण केंद्र कोनी।'
  },
  'No Education': {
    hi: 'कोई शिक्षा नहीं',
    mr: 'कोई शिक्षा कोनी'
  },
  'Youth are deprived of access to film studies and workshops.': {
    hi: 'युवाओं को फिल्म अध्ययन और कार्यशालाओं तक पहुंच से वंचित कर दिया गया है।',
    mr: 'जवानां नै फिल्म री पढ़ाई अर कार्यशाळावां री सुविधा कोनी मिलै।'
  },
  'No Recognition': {
    hi: 'कोई पहचान नहीं',
    mr: 'कोई पिछाण कोनी'
  },
  'Folk artists often die nameless. Talent goes unrecognised.': {
    hi: 'लोक कलाकार अक्सर बेनाम मर जाते हैं। प्रतिभा की पहचान नहीं होती।',
    mr: 'लोक कलाकार अकसर बिना नाम मर जावै। हुनर री कदर कोनी होती।'
  },

  // VISION SECTION
  'Our Vision for Revival': {
    hi: 'पुनरुत्थान के लिए हमारा दृष्टिकोण',
    mr: 'पुनरुत्थान खातर म्हारो दृष्टिकोण'
  },
  'A comprehensive roadmap to rebuild Rajasthan\'s cultural and cinematic identity from the roots up, creating a sustainable ecosystem for artists, filmmakers, and cultural practitioners.': {
    hi: 'जड़ों से राजस्थान की सांस्कृतिक और सिनेमाई पहचान को फिर से बनाने का एक व्यापक रोडमैप, कलाकारों, फिल्म निर्माताओं और सांस्कृतिक चिकित्सकों के लिए एक स्थायी पारिस्थितिकी तंत्र बनाना।',
    mr: 'जड़ सूं राजस्थान री सांस्कृतिक अर सिनेमाई पिछाण नै फेर सूं बणावण रो एक व्यापक रोडमैप, कलाकारां, फिल्म निर्माताओं अर सांस्कृतिक कार्यकर्ताओं खातर एक टिकाऊ वातावरण बणावणो।'
  },
  '4 statewide cultural festivals annually': {
    hi: 'वार्षिक रूप से 4 राज्यव्यापी सांस्कृतिक उत्सव',
    mr: 'हर साल 4 राज्यव्यापी सांस्कृतिक त्योहार'
  },
  'Film & Television education in universities': {
    hi: 'विश्वविद्यालयों में फिल्म और टेलीविजन शिक्षा',
    mr: 'विश्वविद्यालयां में फिल्म अर टेलीविजन री शिक्षा'
  },
  'Purpose-built Rajasthan Film City': {
    hi: 'विशेष रूप से निर्मित राजस्थान फिल्म सिटी',
    mr: 'खास बणायोड़ो राजस्थान फिल्म सिटी'
  },
  'Single Window Policy with 60% local content rule': {
    hi: '60% स्थानीय सामग्री नियम के साथ सिंगल विंडो नीति',
    mr: '60% स्थानीय सामग्री रै नियम रै साथै एक खिड़की नीति'
  },
  'View Complete Overview': {
    hi: 'पूरा अवलोकन देखें',
    mr: 'पूरी जांच देखो'
  },
  'Learn More About the Challenge': {
    hi: 'चुनौती के बारे में और जानें',
    mr: 'चुनौती रै बारै में और जाणो'
  },

  // CALL TO ACTION
  'Be Part of the Renaissance': {
    hi: 'पुनर्जागरण का हिस्सा बनें',
    mr: 'नवजागृति रो हिस्सो बणो'
  },
  'Whether you\'re an artist, educator, policymaker, or cultural enthusiast - your voice matters in this movement.': {
    hi: 'चाहे आप कलाकार हों, शिक्षक हों, नीति निर्माता हों, या सांस्कृतिक उत्साही हों - इस आंदोलन में आपकी आवाज महत्वपूर्ण है।',
    mr: 'चाहे थे कलाकार हो, शिक्षक हो, नीति बणावणियो हो, या सांस्कृतिक प्रेमी हो - इ चळवळ में थारी आवाज जरूरी है।'
  },
  'Get in Touch': {
    hi: 'संपर्क में रहें',
    mr: 'संपर्क राखो'
  },

  // MISC UTILITY PHRASES
  'Loading...': {
    hi: 'लोड हो रहा है...',
    mr: 'लोड हो रह्यो है...'
  },
  'Save': {
    hi: 'सेव करें',
    mr: 'सेव करो'
  },
  'Cancel': {
    hi: 'रद्द करें',
    mr: 'रद्द करो'
  },
  'Delete': {
    hi: 'हटाएं',
    mr: 'हटावो'
  },
  'Edit': {
    hi: 'संपादित करें',
    mr: 'संपादित करो'
  },
  'View': {
    hi: 'देखें',
    mr: 'देखो'
  },
  'Close': {
    hi: 'बंद करें',
    mr: 'बंद करो'
  },
  'Yes': {
    hi: 'हां',
    mr: 'हां'
  },
  'No': {
    hi: 'नहीं',
    mr: 'कोनी'
  },
  'Submit': {
    hi: 'जमा करें',
    mr: 'जमा करो'
  },
  'Back': {
    hi: 'वापस',
    mr: 'वापस'
  },
  'Next': {
    hi: 'अगला',
    mr: 'अगलो'
  },
  'Previous': {
    hi: 'पिछला',
    mr: 'पिछलो'
  },
  'Continue': {
    hi: 'जारी रखें',
    mr: 'जारी राखो'
  },
  'Finish': {
    hi: 'समाप्त करें',
    mr: 'समाप्त करो'
  },
  'Optional': {
    hi: 'वैकल्पिक',
    mr: 'वैकल्पिक'
  },
  'Required': {
    hi: 'आवश्यक',
    mr: 'जरूरी'
  },
  'Success': {
    hi: 'सफलता',
    mr: 'सफलता'
  },
  'Error': {
    hi: 'त्रुटि',
    mr: 'त्रुटि'
  },
  'Warning': {
    hi: 'चेतावनी',
    mr: 'चेतावनी'
  },
  'Information': {
    hi: 'जानकारी',
    mr: 'जानकारी'
  }
} as const;

// Helper function to get translation
const getTranslation = (key: string, language: Language): string => {
  if (language === 'en') return key;
  
  const translation = translations[key as keyof typeof translations];
  if (translation && translation[language]) {
    return translation[language];
  }
  
  // Fallback to original text if translation not found
  return key;
};

// Helper function to validate language
const isValidLanguage = (lang: string): lang is Language => {
  return lang === 'en' || lang === 'hi' || lang === 'mr';
};

// Main translation provider component
interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setLanguage = async (lang: Language) => {
    if (lang === currentLanguage || isTranslating) return;
    
    setIsTranslating(true);
    setError(null);
    
    try {
      // Set language immediately for instant UI feedback
      setCurrentLanguage(lang);
      
      // Apply translations to all elements with translate-content class
      const elementsToTranslate = document.querySelectorAll('.translate-content');
      
      elementsToTranslate.forEach((element) => {
        const originalText = element.getAttribute('data-original-text') || element.textContent || '';
        
        // Store original text if not already stored
        if (!element.getAttribute('data-original-text')) {
          element.setAttribute('data-original-text', originalText);
        }
        
        // Get translation
        const translatedText = getTranslation(originalText, lang);
        
        // Update element text
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          const inputElement = element as HTMLInputElement;
          if (inputElement.placeholder) {
            const originalPlaceholder = inputElement.getAttribute('data-original-placeholder') || inputElement.placeholder;
            if (!inputElement.getAttribute('data-original-placeholder')) {
              inputElement.setAttribute('data-original-placeholder', originalPlaceholder);
            }
            inputElement.placeholder = getTranslation(originalPlaceholder, lang);
          }
        } else {
          element.textContent = translatedText;
        }
      });
      
      // Also translate navigation items
      const navItems = document.querySelectorAll('.nav-item');
      navItems.forEach((element) => {
        const originalText = element.getAttribute('data-original-text') || element.textContent || '';
        
        if (!element.getAttribute('data-original-text')) {
          element.setAttribute('data-original-text', originalText);
        }
        
        element.textContent = getTranslation(originalText, lang);
      });
      
      // Translate button text
      const buttons = document.querySelectorAll('.translate-btn, button[data-translate]');
      buttons.forEach((element) => {
        const originalText = element.getAttribute('data-original-text') || element.textContent || '';
        
        if (!element.getAttribute('data-original-text')) {
          element.setAttribute('data-original-text', originalText);
        }
        
        element.textContent = getTranslation(originalText, lang);
      });
      
      // Store language preference
      localStorage.setItem('preferred-language', lang);
      
    } catch (err) {
      console.error('Translation error:', err);
      setError('Translation failed. Using offline mode.');
    } finally {
      // Add a small delay to show loading state
      setTimeout(() => {
        setIsTranslating(false);
      }, 500);
    }
  };

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && isValidLanguage(savedLanguage) && savedLanguage !== 'en') {
      setLanguage(savedLanguage);
    }
  }, []);

  const contextValue: TranslationContextType = {
    currentLanguage,
    isTranslating,
    error,
    setLanguage,
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};