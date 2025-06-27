// components/layout/Header.tsx - Complete Fixed Header with Translation
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Crown, User, ChevronDown, LogOut, Shield, Sparkles, Star, Globe, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation, type Language } from '@/contexts/GlobalTranslationContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { currentLanguage, isTranslating, error, setLanguage } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuOpen && !(event.target as Element).closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Overview', href: '/overview' },
    { name: 'Support', href: '/support' },
    { name: 'News', href: '/news' },
    { name: 'Contact', href: '/contact' },
  ];

  const languages = [
    { code: 'en' as Language, name: 'EN', fullName: 'English' },
    { code: 'hi' as Language, name: 'हि', fullName: 'हिन्दी' },
    { code: 'mr' as Language, name: 'मर', fullName: 'मारवाड़ी' },
  ];

  const handleLanguageChange = (langCode: Language) => {
    if (langCode === currentLanguage || isTranslating) return;
    setLanguage(langCode);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUserMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-amber-200/30' 
        : 'bg-gradient-to-b from-black/40 via-black/20 to-transparent backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Enhanced Logo with Actual Logo Image */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Logo container with actual image */}
              <div className={`relative p-2 rounded-full transition-all duration-500 ${
                scrolled ? 'bg-white shadow-lg' : 'bg-white/15 backdrop-blur-sm border border-white/20'
              } group-hover:scale-110`}>
                {/* Actual Logo Image */}
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src="/RACC_Logo.png"
                    alt="RACC Forum Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </div>
              <Sparkles className={`absolute -top-1 -right-1 h-3 w-3 transition-all duration-500 ${
                scrolled ? 'text-amber-500' : 'text-amber-200'
              } animate-pulse`} />
              <Star className={`absolute -bottom-0.5 -left-0.5 h-2.5 w-2.5 transition-all duration-500 ${
                scrolled ? 'text-amber-500' : 'text-amber-100'
              } animate-spin`} style={{ animationDuration: '4s' }} />
            </div>
            <div className="flex flex-col">
              <span className={`font-royal font-bold text-xl tracking-wide transition-all duration-500 ${
                scrolled ? 'text-gray-900' : 'text-white'
              } group-hover:text-amber-700 no-translate`}>
                RACC Forum
              </span>
              <span className={`text-xs font-medium transition-all duration-500 ${
                scrolled ? 'text-amber-600' : 'text-amber-200'
              } -mt-0.5 font-hindi no-translate`}>
                राजस्थान कला, संस्कृति और सिनेमा मंच
              </span>
            </div>
          </Link>

          {/* Clean Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm font-medium transition-all duration-300 group nav-item ${
                  pathname === item.href
                    ? scrolled 
                      ? 'text-amber-700' 
                      : 'text-amber-300'
                    : scrolled 
                      ? 'text-gray-700 hover:text-amber-700' 
                      : 'text-white/90 hover:text-amber-300'
                }`}
              >
                {item.name}
                {/* Underline indicator */}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full ${
                  pathname === item.href ? 'w-full' : ''
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Auth Section with Integrated Translation Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Integrated Translation Toggle */}
            <div className="flex items-center space-x-2">
              {/* Error indicator */}
              {error && (
                <div 
                  className={`${scrolled ? 'text-amber-600' : 'text-yellow-300'}`} 
                  title={error}
                >
                  <AlertCircle className="h-3 w-3" />
                </div>
              )}
              
              {/* Loading indicator */}
              {isTranslating && (
                <div className={`${scrolled ? 'text-amber-600' : 'text-white/80'}`}>
                  <Loader2 className="h-3 w-3 animate-spin" />
                </div>
              )}
              
              {/* Language toggle buttons */}
              <div className={`flex items-center rounded-full p-1 ${
                scrolled 
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
                        ? scrolled
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'bg-white/90 text-gray-900 shadow-sm'
                        : scrolled
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
              <div className={`${scrolled ? 'text-amber-600' : 'text-white/60'}`}>
                <Globe className="h-3.5 w-3.5" />
              </div>
            </div>

            {user ? (
              <div className="relative user-menu-container">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-full transition-all duration-300 ${
                    scrolled 
                      ? 'bg-amber-50 hover:bg-amber-100 text-gray-800' 
                      : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20'
                  }`}
                  aria-label="User menu"
                >
                  <div className={`p-1.5 rounded-full ${
                    scrolled ? 'bg-amber-100' : 'bg-white/20'
                  }`}>
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-medium max-w-24 truncate">
                    {user.email?.split('@')[0]}
                  </span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${
                    userMenuOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-amber-100 overflow-hidden z-50">
                    <div className="p-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-black">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white/20 rounded-full">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{user.email?.split('@')[0]}</p>
                          <p className="text-sm text-black/70 truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      {user.email === 'soham@gmail.com' && (
                        <Link
                          href="/admin"
                          className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-amber-50 rounded-lg transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Shield className="h-4 w-4 text-amber-600" />
                          <span className="font-medium translate-content">Admin Panel</span>
                        </Link>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="font-medium translate-content">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/auth">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`transition-all duration-300 rounded-full font-medium ${
                      scrolled 
                        ? 'border-amber-300 text-amber-700 hover:bg-amber-50' 
                        : 'border-white/40 text-white hover:bg-white/10 backdrop-blur-sm'
                    }`}
                  >
                    <span className="translate-content">Sign In</span>
                  </Button>
                </Link>
                <Link href="/support">
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-black rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    <span className="translate-content">Join Movement</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button with Translation Toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Translation Toggle */}
            <div className="flex items-center space-x-1">
              {isTranslating && (
                <div className={`${scrolled ? 'text-amber-600' : 'text-white/80'}`}>
                  <Loader2 className="h-3 w-3 animate-spin" />
                </div>
              )}
              
              <div className={`flex items-center rounded-full p-0.5 ${
                scrolled 
                  ? 'bg-amber-50 border border-amber-200' 
                  : 'bg-white/10 border border-white/20 backdrop-blur-sm'
              }`}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    disabled={isTranslating}
                    className={`translate-btn px-1.5 py-0.5 text-xs font-medium rounded-full transition-all duration-300 ${
                      currentLanguage === lang.code
                        ? scrolled
                          ? 'bg-amber-600 text-white'
                          : 'bg-white/90 text-gray-900'
                        : scrolled
                          ? 'text-amber-700 hover:bg-amber-100'
                          : 'text-white/80 hover:bg-white/20'
                    } ${isTranslating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2.5 rounded-full transition-all duration-300 ${
                scrolled 
                  ? 'text-gray-800 hover:bg-amber-50' 
                  : 'text-white hover:bg-white/10 backdrop-blur-sm'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="bg-white/95 backdrop-blur-xl border-t border-amber-100 rounded-b-2xl shadow-xl mx-4 mb-4 overflow-hidden">
              <div className="p-4 space-y-2">
                {/* Mobile Translation Toggle - Full Width */}
                <div className="pb-3 border-b border-amber-100 flex justify-center">
                  <div className="flex items-center space-x-2">
                    {error && (
                      <div className="text-amber-600" title={error}>
                        <AlertCircle className="h-3 w-3" />
                      </div>
                    )}
                    
                    {isTranslating && (
                      <div className="text-amber-600">
                        <Loader2 className="h-3 w-3 animate-spin" />
                      </div>
                    )}
                    
                    <div className="flex items-center rounded-full p-1 bg-amber-50 border border-amber-200">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          disabled={isTranslating}
                          className={`translate-btn px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                            currentLanguage === lang.code
                              ? 'bg-amber-600 text-white shadow-sm'
                              : 'text-amber-700 hover:bg-amber-100'
                          } ${isTranslating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                    
                    <div className="text-amber-600">
                      <Globe className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>

                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 nav-item ${
                      pathname === item.href
                        ? 'text-black bg-gradient-to-r from-amber-600 to-yellow-600'
                        : 'text-gray-700 hover:bg-amber-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-amber-100">
                  {user ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 px-4 py-3 bg-amber-50 rounded-xl">
                        <div className="p-2 bg-amber-100 rounded-full">
                          <User className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-amber-800">{user.email?.split('@')[0]}</p>
                          <p className="text-sm text-amber-600 truncate">{user.email}</p>
                        </div>
                      </div>
                      
                      {user.email === 'soham@gmail.com' && (
                        <Link
                          href="/admin"
                          className="flex items-center space-x-3 px-4 py-3 text-amber-700 hover:bg-amber-50 rounded-xl transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <Shield className="h-4 w-4" />
                          <span className="translate-content">Admin Panel</span>
                        </Link>
                      )}
                      
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="translate-content">Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        href="/auth"
                        className="block px-4 py-3 text-center text-amber-700 border border-amber-200 rounded-xl hover:bg-amber-50 transition-colors font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="translate-content">Sign In</span>
                      </Link>
                      <Link
                        href="/support"
                        className="block px-4 py-3 text-center text-black bg-gradient-to-r from-amber-600 to-yellow-600 rounded-xl hover:from-amber-700 hover:to-yellow-700 transition-all font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        <Crown className="inline mr-2 h-4 w-4" />
                        <span className="translate-content">Join Movement</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;