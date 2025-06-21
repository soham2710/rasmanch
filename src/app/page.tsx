// app/page.tsx - Improved Home Page with Visible Images
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
  Play,
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
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider content with image paths
  const slides = [
    {
      image: "/12.jpeg",
      title: "राजस्थानी कहानियाँ",
      subtitle: "राजस्थान के पर्दे पर",
      description: "Reviving the legacy of Rajasthani cinema, arts, and culture through vision, unity, and structured development"
    },
    {
      image: "/5.jpeg", 
      title: "Palaces, Pearls",
      subtitle: "And Pure Majesty",
      description: "Experience the grandeur of Rajasthan's royal heritage through immersive storytelling"
    },
    {
      image: "/4.jpeg",
      title: "Folk Traditions",
      subtitle: "Cultural Renaissance",
      description: "Preserving and promoting centuries-old folk art, music, and dance traditions"
    },
    {
      image: "/4.jpeg",
      title: "Future of Cinema",
      subtitle: "Regional Excellence",
      description: "Building world-class infrastructure for Rajasthani film and media production"
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

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
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
      {/* Hero Section with Slider */}
      <section className="relative min-h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${slides[currentSlide].image}')`,
              }}
            >
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/50"></div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40"></div>
              
              {/* Royal pattern overlay */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.3) 2px, transparent 2px),
                  radial-gradient(circle at 80% 50%, rgba(220, 38, 127, 0.2) 2px, transparent 2px),
                  radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.2) 2px, transparent 2px)
                `,
                backgroundSize: '100px 100px, 150px 150px, 200px 200px'
              }}></div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-royal font-bold text-white mb-6 drop-shadow-lg">
              {slides[currentSlide].title}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600">
                {slides[currentSlide].subtitle}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-4xl mx-auto drop-shadow-md">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/support">
                <Button size="lg" className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 hover:from-amber-700 hover:via-yellow-700 hover:to-amber-800 text-black shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <Users className="mr-2 h-5 w-5" />
                  Join the Movement
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/15 backdrop-blur-sm shadow-xl">
                <Play className="mr-2 h-5 w-5" />
                Watch Vision Video
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center space-x-4 bg-black/30 backdrop-blur-md rounded-full px-6 py-3">
            <button
              onClick={prevSlide}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-amber-500 scale-125 shadow-lg' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50">
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

      {/* Vision Section */}
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
              <div className="aspect-video bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-xl backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-2xl">
                <Play className="h-20 w-20 text-white/80 hover:text-white transition-colors cursor-pointer" />
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
            <h2 className="text-3xl md:text-5xl font-royal font-bold text-black mb-6">
              Be Part of the Renaissance
            </h2>
            <p className="text-xl text-black/80 mb-8 max-w-3xl mx-auto">
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
                <Button size="lg" variant="outline" className="border-2 border-black text-black hover:bg-black/10 shadow-lg">
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