// components/Layout/Header.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Crown, User, ChevronDown, LogOut, Shield, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
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
    { name: 'Support Movement', href: '/support' },
    { name: 'News & Events', href: '/news' },
    { name: 'Contact', href: '/contact' },
  ];

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
    <header className={`fixed w-full top-0 z-50 transition-all duration-700 ease-in-out ${
      scrolled 
        ? 'bg-white/98 backdrop-blur-xl shadow-2xl shadow-royal-500/10 border-b border-royal-200/50' 
        : 'bg-gradient-to-b from-black/30 via-black/20 to-transparent backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Enhanced Logo with Rasmanch Branding */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className={`absolute inset-0 rounded-full blur-lg opacity-50 transition-all duration-500 ${
                scrolled ? 'bg-royal-400/30' : 'bg-gold-400/50'
              } group-hover:opacity-75`}></div>
              <div className={`relative p-2 rounded-full transition-all duration-500 ${
                scrolled ? 'bg-white shadow-lg' : 'bg-white/10 backdrop-blur-sm'
              } group-hover:scale-110 group-hover:rotate-6`}>
                <Crown className={`h-8 w-8 transition-all duration-500 ${
                  scrolled ? 'text-royal-700' : 'text-gold-300'
                }`} />
              </div>
              <Sparkles className={`absolute -top-1 -right-1 h-4 w-4 transition-all duration-500 ${
                scrolled ? 'text-royal-500' : 'text-gold-200'
              } animate-pulse`} />
              <Star className={`absolute -bottom-0.5 -left-0.5 h-3 w-3 transition-all duration-500 ${
                scrolled ? 'text-amber-500' : 'text-gold-100'
              } animate-spin`} style={{ animationDuration: '4s' }} />
            </div>
            <div className="flex flex-col">
              <span className={`font-royal font-bold text-2xl tracking-wide transition-all duration-500 ${
                scrolled ? 'text-gray-900' : 'text-white'
              } group-hover:text-royal-700`}>
                Rasmanch
              </span>
              <span className={`text-sm font-medium tracking-wider transition-all duration-500 ${
                scrolled ? 'text-royal-600' : 'text-gold-200'
              } -mt-1 font-hindi`}>
                रसमंच - राजस्थानी कलाओं का मंच
              </span>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-5 py-2.5 text-sm font-medium transition-all duration-500 rounded-xl group overflow-hidden ${
                  pathname === item.href
                    ? scrolled 
                      ? 'text-white bg-gradient-to-r from-royal-600 to-purple-600 shadow-lg shadow-royal-500/25' 
                      : 'text-black bg-white/90 backdrop-blur-sm shadow-lg'
                    : scrolled 
                      ? 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-royal-500 hover:to-purple-500' 
                      : 'text-white/90 hover:text-black hover:bg-white/20 backdrop-blur-sm'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{item.name}</span>
                
                {/* Animated background for hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ${
                  scrolled 
                    ? 'bg-gradient-to-r from-royal-500 to-purple-500' 
                    : 'bg-white/20'
                } rounded-xl`}></div>
                
                {/* Active indicator */}
                {pathname === item.href && (
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full transition-all duration-500 ${
                    scrolled ? 'bg-white/80' : 'bg-royal-600'
                  }`} />
                )}
              </Link>
            ))}
          </nav>

          {/* Enhanced Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="relative user-menu-container">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center space-x-3 px-5 py-2.5 rounded-xl transition-all duration-500 ${
                    scrolled 
                      ? 'bg-royal-50 hover:bg-royal-100 text-gray-800 shadow-md' 
                      : 'bg-white/15 hover:bg-white/25 text-white backdrop-blur-md'
                  } group`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full transition-all duration-300 ${
                      scrolled ? 'bg-royal-100' : 'bg-white/20'
                    } group-hover:scale-105`}>
                      <User className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium max-w-32 truncate">
                      {user.email?.split('@')[0]}
                    </span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-all duration-300 ${
                    userMenuOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Enhanced User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-royal-100 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-300">
                    {/* Header with gradient */}
                    <div className="p-5 bg-gradient-to-r from-royal-600 via-purple-600 to-royal-700 text-white relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-royal-400/50 to-purple-400/50 animate-pulse"></div>
                      <div className="relative flex items-center space-x-4">
                        <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                          <User className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{user.email?.split('@')[0]}</p>
                          <p className="text-sm text-white/80">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="p-2">
                      {user.email === 'soham@gmail.com' && (
                        <Link
                          href="/admin"
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-royal-50 rounded-xl transition-all duration-200 group"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <div className="p-1.5 bg-royal-100 rounded-lg group-hover:bg-royal-200 transition-colors">
                            <Shield className="h-4 w-4 text-royal-600" />
                          </div>
                          <span className="font-medium">Admin Panel</span>
                        </Link>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
                      >
                        <div className="p-1.5 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                          <LogOut className="h-4 w-4" />
                        </div>
                        <span className="font-medium">Sign Out</span>
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
                    className={`transition-all duration-500 rounded-xl font-medium ${
                      scrolled 
                        ? 'border-royal-300 text-royal-700 hover:bg-royal-50 shadow-md' 
                        : 'border-white/40 text-white hover:bg-white/10 backdrop-blur-sm'
                    } hover:scale-105`}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/support">
                  <Button 
                    size="sm"
                    className={`relative overflow-hidden transition-all duration-500 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 ${
                      scrolled 
                        ? 'bg-gradient-to-r from-royal-600 via-purple-600 to-royal-700 hover:from-royal-700 hover:via-purple-700 hover:to-royal-800' 
                        : 'bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 hover:from-gold-600 hover:via-amber-600 hover:to-gold-700'
                    } text-white`}
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Join Movement
                    <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Enhanced Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-3 rounded-xl transition-all duration-500 ${
              scrolled 
                ? 'text-gray-800 hover:bg-royal-50 shadow-md' 
                : 'text-white hover:bg-white/10 backdrop-blur-sm'
            } hover:scale-105`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="bg-white/98 backdrop-blur-xl border-t border-royal-100 rounded-b-3xl shadow-2xl mx-4 mb-4 overflow-hidden">
              <div className="p-6 space-y-3">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-5 py-4 text-base font-medium rounded-2xl transition-all duration-300 ${
                      pathname === item.href
                        ? 'text-white bg-gradient-to-r from-royal-600 to-purple-600 shadow-lg'
                        : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-royal-500 hover:to-purple-500'
                    }`}
                    onClick={() => setIsOpen(false)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-6 border-t border-royal-100">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4 px-5 py-4 bg-royal-50 rounded-2xl">
                        <div className="p-2 bg-royal-100 rounded-full">
                          <User className="h-5 w-5 text-royal-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-royal-800">{user.email?.split('@')[0]}</p>
                          <p className="text-sm text-royal-600">{user.email}</p>
                        </div>
                      </div>
                      
                      {user.email === 'soham@gmail.com' && (
                        <Link
                          href="/admin"
                          className="flex items-center space-x-3 px-5 py-4 text-royal-700 hover:bg-royal-50 rounded-2xl transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <Shield className="h-5 w-5" />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-5 py-4 text-red-600 hover:bg-red-50 rounded-2xl transition-colors"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        href="/auth"
                        className="block px-5 py-4 text-center text-royal-700 border-2 border-royal-200 rounded-2xl hover:bg-royal-50 transition-colors font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/support"
                        className="block px-5 py-4 text-center text-white bg-gradient-to-r from-royal-600 to-purple-600 rounded-2xl hover:from-royal-700 hover:to-purple-700 transition-all shadow-lg font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        <Crown className="inline mr-2 h-5 w-5" />
                        Join Movement
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