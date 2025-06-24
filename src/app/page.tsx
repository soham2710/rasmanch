// app/page.tsx - Homepage with Image Slider
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, 
  Film, 
  Users, 
  Award, 
  ArrowRight, 
  Star,
  MapPin,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Stats } from '@/types';

const HomePage = () => {
  const [stats, setStats] = useState<Stats>({
    supporters: 0,
    events: 0,
    artists: 0,
    cities: 0
  });
  const [currentTextSlide, setCurrentTextSlide] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Image data with file extensions
  const imageData = [
    { name: '114', ext: 'jpg' },
    { name: '115', ext: 'jpg' },
    { name: '117', ext: 'jpeg' },
    { name: '111', ext: 'jpg' },
    { name: '116', ext: 'jpeg' },
    { name: '112', ext: 'jpg' }
  ];

  // Auto-advance image slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTextSlide((prev) => (prev + 1) % imageData.length); // Dynamic length based on imageData
    }, 5000); // Change every 5 seconds for better viewing
    return () => clearInterval(timer);
  }, [imageData.length]);

  useEffect(() => {
    // Animate counter on mount
    const interval = setInterval(() => {
      setStats((prev: Stats) => ({
        supporters: Math.min(prev.supporters + 13, 1247),
        events: Math.min(prev.events + 1, 12),
        artists: Math.min(prev.artists + 3, 89),
        cities: Math.min(prev.cities + 2, 33)
      }));
    }, 100);

    setTimeout(() => clearInterval(interval), 3000);
    return () => clearInterval(interval);
  }, []);

  const nextTextSlide = () => {
    setCurrentTextSlide((prev) => (prev + 1) % imageData.length);
  };

  const prevTextSlide = () => {
    setCurrentTextSlide((prev) => (prev - 1 + imageData.length) % imageData.length);
  };

  const currentTextData = {
    title: "राजस्थानी कहानियाँ",
    subtitle: "राजस्थान के पर्दे पर",
    description: "Reviving the legacy of Rajasthani cinema, arts, and culture through vision, unity, and structured development"
  };

  const problems = [
    {
      icon: <Film className="h-8 w-8" />,
      title: "No System or Process",
      description: "Local creatives lack standard operating practices for filmmaking."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Lack of Unity",
      description: "Artists and technicians remain unorganised, scattered, and unsupported."
    },
    {
      icon: <Crown className="h-8 w-8" />,
      title: "No Industry Body",
      description: "Unlike Bollywood or Tollywood, we have no unions or creative councils."
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "No Infrastructure",
      description: "There's no Rajasthan-based Film City or equipment hub."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "No Education",
      description: "Youth are deprived of access to film studies and workshops."
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "No Recognition",
      description: "Folk artists often die nameless. Talent goes unrecognised."
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Image Slider */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTextSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="w-full h-full"
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('/${imageData[currentTextSlide]?.name || '114'}.${imageData[currentTextSlide]?.ext || 'jpg'}')`
                }}
              />
              {/* Image overlay - Lower opacity for clearer images (0.15 = 15% opacity, lower number = more transparent) */}
              <div className="absolute inset-0 bg-black/15"></div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Dots - Enhanced visibility with better contrast */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex space-x-3">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTextSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-500 border-2 ${
                    index === currentTextSlide 
                      ? 'bg-amber-500 border-amber-300 scale-125 shadow-lg shadow-amber-500/50' 
                      : 'bg-white/70 border-white/90 hover:bg-white/90 hover:scale-110'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsVideoModalOpen(false)}
        >
          <motion.div 
            className="relative bg-black rounded-2xl overflow-hidden max-w-4xl w-full aspect-video shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm transition-all"
              aria-label="Close video"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Video Player */}
            <video
              className="w-full h-full object-cover"
              controls
              autoPlay
              playsInline
            >
              <source src="/vid2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </motion.div>
      )}

      {/* Content Section with Text Slider */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTextSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-royal font-bold text-gray-900 mb-6">
                  {currentTextData.title}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700">
                    {currentTextData.subtitle}
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
                  {currentTextData.description}
                </p>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link href="/support">
                <Button size="lg" className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 hover:from-amber-700 hover:via-yellow-700 hover:to-amber-800 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <Users className="mr-2 h-5 w-5" />
                  Join the Movement
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setIsVideoModalOpen(true)}
                className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Film className="mr-2 h-5 w-5" />
                Watch Video
              </Button>
            </div>

            {/* Text Slider Controls */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={prevTextSlide}
                className="p-2 bg-amber-100 hover:bg-amber-200 rounded-full transition-all hover:scale-110"
                aria-label="Previous text"
              >
                <ChevronLeft className="h-5 w-5 text-amber-700" />
              </button>
              
              <div className="flex space-x-2">
                {imageData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTextSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTextSlide 
                        ? 'bg-amber-600 scale-125 shadow-lg' 
                        : 'bg-amber-300 hover:bg-amber-400'
                    }`}
                    aria-label={`Go to text ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTextSlide}
                className="p-2 bg-amber-100 hover:bg-amber-200 rounded-full transition-all hover:scale-110"
                aria-label="Next text"
              >
                <ChevronRight className="h-5 w-5 text-amber-700" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: stats.artists, label: "Artists Registered", delay: 0.2 },
              { value: stats.cities, label: "Cities Reached", delay: 0.3 },
              { value: stats.events, label: "Events Planned", delay: 0.4 },
              { value: stats.supporters, label: "Supporters", delay: 0.5 }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: stat.delay }}
              >
                <div className="text-3xl md:text-4xl font-bold text-amber-700 mb-2">
                  {stat.value}+
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-royal font-bold text-gray-900 mb-6">
              Why Did Rajasthani Cinema Fall Behind?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Despite being the backdrop for countless global productions, 
              Rajasthan&apos;s own cinematic voice remains unheard.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {problems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-amber-50/30 p-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-amber-700 mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/overview">
              <Button size="lg" className="bg-gradient-to-r from-amber-600 to-yellow-700 hover:from-amber-700 hover:to-yellow-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Learn More About the Challenge
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Vision Section with Image */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-royal font-bold text-white mb-6">
                Our Vision for Revival
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                A comprehensive roadmap to rebuild Rajasthan&apos;s cultural and cinematic 
                identity from the roots up, creating a sustainable ecosystem for 
                artists, filmmakers, and cultural practitioners.
              </p>
              <ul className="space-y-4 text-gray-300">
                {[
                  "4 statewide cultural festivals annually",
                  "Film & Television education in universities",
                  "Purpose-built Rajasthan Film City",
                  "Single Window Policy with 60% local content rule"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-3 mt-1 text-amber-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/overview">
                  <Button size="lg" className="bg-gradient-to-r from-amber-600 to-yellow-700 hover:from-amber-700 hover:to-yellow-800 text-black shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    View Complete Overview
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div 
                className="aspect-video bg-cover bg-center rounded-xl shadow-2xl"
                style={{
                  backgroundImage: "url('/5.jpeg')",
                }}
              >
                <div className="absolute inset-0 bg-black/30 rounded-xl"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-amber-500 to-yellow-600 p-6 rounded-xl shadow-xl">
                <span className="font-bold text-black text-lg">2025-2030 Roadmap</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-royal font-bold text-white mb-6">
              Be Part of the Renaissance
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Whether you&apos;re an artist, educator, policymaker, or cultural enthusiast - 
              your voice matters in this movement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/support">
                <Button size="lg" className="bg-black text-amber-400 hover:bg-gray-900 shadow-xl transform hover:scale-105 transition-all duration-300">
                  <Users className="mr-2 h-5 w-5" />
                  Join the Movement
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 shadow-lg">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;