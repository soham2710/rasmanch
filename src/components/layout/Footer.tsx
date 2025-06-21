// components/Layout/Footer.tsx - Improved Footer with Better Contrast
import Link from 'next/link';
import { Crown, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin, Heart, Star } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-amber-400/30 rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-amber-400/30 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-amber-400/30 rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-20 h-20 border border-amber-400/30 rounded-full"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Enhanced Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-4 mb-8 group">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative p-3 bg-amber-500/10 backdrop-blur-sm rounded-full border border-amber-400/30 group-hover:scale-110 transition-all duration-300">
                  <Crown className="h-10 w-10 text-amber-400" />
                </div>
                <Star className="absolute -top-1 -right-1 h-4 w-4 text-amber-300 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-royal font-bold text-2xl text-white group-hover:text-amber-300 transition-colors">
                  Rajasthan Screen Stage Forum
                </span>
                <span className="text-base text-amber-300 font-hindi mt-1">
                  राजस्थान स्क्रीन स्टेज फोरम - राजस्थानी कलाओं का मंच
                </span>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-8 max-w-lg text-base leading-relaxed">
              Reviving the legacy of Rajasthani cinema, arts, and culture through 
              vision, unity, and structured development. Join us in bringing 
              Rajasthan&apos;s stories to Rajasthan&apos;s screens.
            </p>
            
            {/* Enhanced Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Youtube, href: "#", label: "YouTube" },
                { icon: Linkedin, href: "#", label: "LinkedIn" }
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  className="group p-3 bg-gray-800 hover:bg-amber-600 rounded-xl border border-gray-700 hover:border-amber-500 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-royal font-bold text-lg mb-6 text-white flex items-center">
              <div className="w-2 h-6 bg-amber-400 rounded-full mr-3"></div>
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Overview", href: "/overview" },
                { name: "Support Us", href: "/support" },
                { name: "News", href: "/news" },
                { name: "Contact", href: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-amber-400 transition-all duration-300 flex items-center group text-sm"
                  >
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-3 group-hover:bg-amber-400 transition-colors"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-royal font-bold text-lg mb-6 text-white flex items-center">
              <div className="w-2 h-6 bg-amber-400 rounded-full mr-3"></div>
              Contact
            </h3>
            <div className="space-y-4">
              {[
                { icon: Mail, text: "rajcinemarevival@gmail.com", href: "mailto:rajcinemarevival@gmail.com" },
                { icon: Phone, text: "+91 XXXXX XXXXX", href: "tel:+91XXXXXXXXX" },
                { icon: MapPin, text: "Jaipur, Rajasthan", href: "#" }
              ].map((contact, index) => (
                <a 
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-3 text-gray-300 hover:text-amber-400 transition-all duration-300 group text-sm"
                >
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-amber-600 transition-colors">
                    <contact.icon className="h-4 w-4" />
                  </div>
                  <span>{contact.text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-300 flex items-center justify-center md:justify-start text-sm">
                © 2025 Rajasthan Screen Stage Forum. Made with 
                <Heart className="h-4 w-4 mx-1 text-red-400 animate-pulse" /> 
                for Rajasthani Culture
              </p>
              <p className="text-gray-400 text-sm mt-2 font-hindi">
                &quot;राजस्थान की कहानियाँ, राजस्थान के पर्दे पर&quot;
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
              <Link href="/sitemap" className="hover:text-amber-400 transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;