// app/page.tsx - Home Page
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Film, 
  Users, 
  Award, 
  ArrowRight, 
  Play,
  Star,
  MapPin 
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

  useEffect(() => {
    // Animate counter on mount
    const interval = setInterval(() => {
      setStats(prev => ({
        supporters: Math.min(prev.supporters + 13, 1247),
        events: Math.min(prev.events + 1, 12),
        artists: Math.min(prev.artists + 3, 89),
        cities: Math.min(prev.cities + 2, 33)
      }));
    }, 100);

    setTimeout(() => clearInterval(interval), 3000);
    return () => clearInterval(interval);
  }, []);

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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-bg hero-pattern">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-royal font-bold text-white mb-6">
              राजस्थान की कहानियाँ
              <br />
              <span className="text-yellow-300">राजस्थान के पर्दे पर</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Reviving the legacy of Rajasthani cinema, arts, and culture through 
              vision, unity, and structured development
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/support">
                <Button size="lg" className="bg-white text-royal-600 hover:bg-gray-100">
                  <Users className="mr-2 h-5 w-5" />
                  Join the Movement
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Play className="mr-2 h-5 w-5" />
                Watch Vision Video
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-royal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-royal-600 mb-2">
                {stats.artists}+
              </div>
              <div className="text-gray-600">Artists Registered</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-royal-600 mb-2">
                {stats.cities}+
              </div>
              <div className="text-gray-600">Cities Reached</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-royal-600 mb-2">
                {stats.events}+
              </div>
              <div className="text-gray-600">Events Planned</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-royal-600 mb-2">
                {stats.supporters}+
              </div>
              <div className="text-gray-600">Supporters</div>
            </motion.div>
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
                className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-royal-600 mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/problem">
              <Button size="lg">
                Learn More About the Challenge
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gradient-to-r from-royal-600 to-desert-600">
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
              <p className="text-xl text-white/90 mb-8">
                A comprehensive roadmap to rebuild Rajasthan&apos;s cultural and cinematic 
                identity from the roots up, creating a sustainable ecosystem for 
                artists, filmmakers, and cultural practitioners.
              </p>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-3 mt-1 text-yellow-300" />
                  4 statewide cultural festivals annually
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-3 mt-1 text-yellow-300" />
                  Film & Television education in universities
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-3 mt-1 text-yellow-300" />
                  Purpose-built Rajasthan Film City
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-3 mt-1 text-yellow-300" />
                  Single Window Policy with 60% local content rule
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/vision">
                  <Button size="lg" className="bg-white text-royal-600 hover:bg-gray-100">
                    Download Full Proposal
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
              <div className="aspect-video bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <Play className="h-16 w-16 text-white/80" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-yellow-400 p-4 rounded-lg">
                <span className="font-bold text-royal-900">2025-2030 Roadmap</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-royal-900">
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
                <Button size="lg" className="bg-yellow-400 text-royal-900 hover:bg-yellow-300">
                  <Users className="mr-2 h-5 w-5" />
                  Join the Movement
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
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