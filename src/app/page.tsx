// app/page.tsx - Home Page with Translation Support
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
  ChevronRight,
  Volume2,
  VolumeX
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
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // Text content for slider below video with translation attributes
  const textSlides = [
    {
      title: "राजस्थानी कहानियाँ",
      subtitle: "राजस्थान के पर्दे पर",
      description: "Reviving the legacy of Rajasthani cinema, arts, and culture through vision, unity, and structured development"
    },
    {
      title: "Experience the Vision",
      subtitle: "See Our Mission in Action", 
      description: "Watch how we're transforming Rajasthan's cultural landscape through innovative initiatives"
    },
    {
      title: "Palaces, Pearls",
      subtitle: "And Pure Majesty",
      description: "Experience the grandeur of Rajasthan's royal heritage through immersive storytelling"
    },
    {
      title: "Folk Traditions",
      subtitle: "Cultural Renaissance",
      description: "Preserving and promoting centuries-old folk art, music, and dance traditions"
    }
  ];

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

  // Auto-advance text slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTextSlide((prev) => (prev + 1) % textSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [textSlides.length]);

  const nextTextSlide = () => {
    setCurrentTextSlide((prev) => (prev + 1) % textSlides.length);
  };

  const prevTextSlide = () => {
    setCurrentTextSlide((prev) => (prev - 1 + textSlides.length) % textSlides.length);
  };

  const currentTextData = textSlides[currentTextSlide];

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
      {/* Hero Section with Video Only */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted={isVideoMuted}
            playsInline
            style={{ animationDelay: '2s' }}
          >
            <source src="/vid2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Video overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Video Controls */}
          <button
            onClick={() => setIsVideoMuted(!isVideoMuted)}
            className="absolute top-4 right-4 p-3 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm transition-all z-10"
            aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
          >
            {isVideoMuted ? (
              <VolumeX className="h-5 w-5 text-white" />
            ) : (
              <Volume2 className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </section>

      {/* Content Section with Text Slider - Translation Ready */}
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
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-royal font-bold text-gray-900 mb-6 translate-content">
                  {currentTextData.title}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 translate-content">
                    {currentTextData.subtitle}
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-4xl mx-auto translate-content">
                  {currentTextData.description}
                </p>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link href="/support">
                <Button size="lg" className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 hover:from-amber-700 hover:via-yellow-700 hover:to-amber-800 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <Users className="mr-2 h-5 w-5" />
                  <span className="translate-content">Join Movement</span>
                </Button>
              </Link>
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
                {textSlides.map((_, index) => (
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

      {/* Stats Section - Translation Ready */}
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
                <div className="text-gray-600 font-medium translate-content stat-label">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Overview - Translation Ready */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-royal font-bold text-gray-900 mb-6 translate-content">
              Why Did Rajasthani Cinema Fall Behind?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto translate-content">
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
                <h3 className="text-xl font-semibold mb-3 text-gray-900 translate-content problem-title">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed translate-content">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/overview">
              <Button size="lg" className="bg-gradient-to-r from-amber-600 to-yellow-700 hover:from-amber-700 hover:to-yellow-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <span className="translate-content">Learn More About the Challenge</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Vision Section with Image - Translation Ready */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-royal font-bold text-white mb-6 translate-content">
                Our Vision for Revival
              </h2>
              <p className="text-xl text-gray-300 mb-8 translate-content vision-text">
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
                    <span className="translate-content">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/overview">
                  <Button size="lg" className="bg-gradient-to-r from-amber-600 to-yellow-700 hover:from-amber-700 hover:to-yellow-800 text-black shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <span className="translate-content">View Complete Overview</span>
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
                <span className="font-bold text-black text-lg translate-content">2025-2030 Roadmap</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action - Translation Ready */}
      <section className="py-20 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-royal font-bold text-white mb-6 translate-content cta-text">
              Be Part of the Renaissance
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto translate-content">
              Whether you&apos;re an artist, educator, policymaker, or cultural enthusiast - 
              your voice matters in this movement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/support">
                <Button size="lg" className="bg-black text-amber-400 hover:bg-gray-900 shadow-xl transform hover:scale-105 transition-all duration-300">
                  <Users className="mr-2 h-5 w-5" />
                  <span className="translate-content">Join Movement</span>
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 shadow-lg">
                  <span className="translate-content">Get in Touch</span>
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