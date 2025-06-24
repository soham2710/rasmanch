// app/overview/page.tsx - Enhanced Overview Page with Images and Animations
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  AlertTriangle, 
  BarChart3, 
  Users, 
  Building, 
  Download,
  Play,
  Award,
  Film,
  Music,
  ArrowRight,
  CheckCircle,
  Target,
  Calendar,
  Star,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProblemItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  impact: string;
  solution: string;
}

interface RoadmapPhase {
  year: string;
  title: string;
  items: string[];
}

interface ShowcaseItem {
  title: string;
  year?: string;
  location?: string;
  region?: string;
  count?: string;
  description: string;
}

interface ShowcaseData {
  cinema: ShowcaseItem[];
  folk: ShowcaseItem[];
  youth: ShowcaseItem[];
  heritage: ShowcaseItem[];
}

const OverviewPage = () => {
  const [activeShowcaseCategory, setActiveShowcaseCategory] = useState<keyof ShowcaseData>('cinema');

  // Problem Data
  const problems: ProblemItem[] = [
    {
      icon: <AlertTriangle className="h-8 w-8" />,
      title: "No System or Process",
      description: "Local creatives lack standard operating practices for filmmaking.",
      impact: "85% of local projects fail due to poor planning",
      solution: "Establish industry-standard SOPs and training programs"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Lack of Unity & Discipline", 
      description: "Artists and technicians remain unorganised, scattered, and unsupported.",
      impact: "Fragmented talent pool reduces collective bargaining power",
      solution: "Create unified artist associations and guilds"
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "No Industry Infrastructure",
      description: "No Film City, editing suites, or equipment hubs in Rajasthan.",
      impact: "Projects move to Mumbai/Hyderabad, losing local employment",
      solution: "Develop Rajasthan Film City and technical infrastructure"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "No Recognition System",
      description: "Folk artists die nameless, talent goes unrecognised.",
      impact: "Cultural knowledge and skills are being lost forever",
      solution: "Annual awards, documentation projects, and artist welfare"
    }
  ];

  // Vision/Roadmap Data
  const roadmap: RoadmapPhase[] = [
    {
      year: "2025",
      title: "Foundation Year",
      items: [
        "Launch 4 statewide cultural festivals",
        "Establish artist registration portal", 
        "Create policy framework document",
        "Begin university partnerships"
      ]
    },
    {
      year: "2026", 
      title: "Infrastructure Development",
      items: [
        "Secure land allocation for Film City",
        "Launch film education courses",
        "Create equipment sharing network",
        "Establish single window clearance"
      ]
    },
    {
      year: "2027",
      title: "Production & Recognition",
      items: [
        "First Rajasthan Film City phase",
        "Annual awards ceremony launch",
        "Documentary preservation project",
        "International festival partnerships"
      ]
    },
    {
      year: "2028-2030",
      title: "Sustainable Ecosystem",
      items: [
        "Complete Film City infrastructure",
        "Self-sustaining cultural economy",
        "Global recognition for Rajasthani cinema",
        "Artist welfare and pension system"
      ]
    }
  ];

  // Showcase Data
  const showcaseCategories = [
    { id: 'cinema' as const, label: 'Global Cinema', icon: <Film className="h-4 w-4" /> },
    { id: 'folk' as const, label: 'Folk Traditions', icon: <Music className="h-4 w-4" /> },
    { id: 'youth' as const, label: 'Rising Talent', icon: <Users className="h-4 w-4" /> },
    { id: 'heritage' as const, label: 'Cultural Heritage', icon: <Award className="h-4 w-4" /> }
  ];

  const showcaseData: ShowcaseData = {
    cinema: [
      { title: 'The Dark Knight Rises', year: '2012', location: 'Mehrangarh Fort', description: 'Christopher Nolan chose Jodhpur as a key location' },
      { title: 'Jodha Akbar', year: '2008', location: 'Multiple Palaces', description: 'Ashutosh Gowariker showcased Rajasthani architecture' },
      { title: 'The Fall', year: '2006', location: 'Amber Fort', description: 'Tarsem Singh created visual poetry with our heritage' }
    ],
    folk: [
      { title: 'Manganiyar Musicians', region: 'Barmer', description: 'Hereditary musicians keeping alive centuries-old traditions' },
      { title: 'Kalbelia Dance', region: 'Jaisalmer', description: 'UNESCO recognized intangible cultural heritage' },
      { title: 'Kathputli Puppetry', region: 'Jaipur', description: 'Traditional string puppet art form' }
    ],
    youth: [
      { title: 'Student Film Festival Winners', count: '25+', description: 'Young filmmakers creating compelling narratives' },
      { title: 'College Theatre Groups', count: '40+', description: 'Active drama societies across universities' },
      { title: 'Digital Content Creators', count: '100+', description: 'YouTube and Instagram influencers from Rajasthan' }
    ],
    heritage: [
      { title: 'UNESCO World Heritage Sites', count: '6', description: 'Forts and palaces recognized globally' },
      { title: 'Documented Folk Songs', count: '500+', description: 'Archived traditional music and lyrics' },
      { title: 'Handicraft Traditions', count: '50+', description: 'Diverse artisan skills and techniques' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 to-yellow-50/50 pt-24 pb-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-8 py-16 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-royal font-bold text-gray-900 mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Complete Overview
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-700 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Understanding the challenges, celebrating our heritage, and charting the path forward 
            for Rajasthan&apos;s cultural renaissance
          </motion.p>
        </motion.div>

        {/* Animated Navigation Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16 sticky top-20 py-4 rounded-2xl z-40"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a href="#problems" className="flex items-center px-6 py-3 bg-gradient-to-r from-red-100 to-red-200 text-red-700 rounded-full hover:from-red-200 hover:to-red-300 transition-all transform hover:scale-105 shadow-lg">
            <AlertTriangle className="h-4 w-4 mr-2" />
            The Problems
          </a>
          <a href="#showcase" className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full hover:from-blue-200 hover:to-blue-300 transition-all transform hover:scale-105 shadow-lg">
            <Award className="h-4 w-4 mr-2" />
            Our Heritage
          </a>
          <a href="#vision" className="flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-green-200 text-green-700 rounded-full hover:from-green-200 hover:to-green-300 transition-all transform hover:scale-105 shadow-lg">
            <Target className="h-4 w-4 mr-2" />
            Our Vision
          </a>
        </motion.div>

        {/* Problems Section with Image Integration */}
        <section id="problems" className="mb-32">
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

          {/* Problems with Vertical Image */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/14.jpeg"
                  alt="Rajasthan Palace"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Global Backdrop</h3>
                  <p className="text-sm">Yet no local stories</p>
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-amber-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="text-amber-600 mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {problem.icon}
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">{problem.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{problem.description}</p>
                  <div className="bg-red-50 p-3 rounded-lg mb-3">
                    <p className="text-red-700 text-xs"><strong>Impact:</strong> {problem.impact}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-green-700 text-xs"><strong>Solution:</strong> {problem.solution}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Showcase Section */}
        <section id="showcase" className="mb-32">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-royal font-bold text-gray-900 mb-6">
              What Rajasthan Has Given the World
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our land has been the canvas for countless stories. 
              Now it&apos;s time to tell our own.
            </p>
          </motion.div>

          {/* Animated Category Tabs */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {showcaseCategories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveShowcaseCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-full transition-all text-sm font-medium shadow-lg ${
                  activeShowcaseCategory === category.id
                    ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white scale-110'
                    : 'bg-white/80 text-gray-700 hover:bg-amber-50 hover:scale-105'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {category.icon}
                <span className="ml-2">{category.label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Showcase Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            key={activeShowcaseCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {showcaseData[activeShowcaseCategory].map((item, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-2xl shadow-xl border border-amber-100 overflow-hidden group hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="aspect-video bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-black/20"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Play className="h-10 w-10 text-white drop-shadow-lg" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-amber-700 transition-colors">{item.title}</h3>
                  <div className="text-amber-600 text-sm font-semibold mb-3 flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    {item.year || item.region || `${item.count} Items`}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Enhanced Vision & Roadmap Section */}
        <section id="vision" className="mb-20">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-royal font-bold text-gray-900 mb-6">
              Our Vision & 5-Year Roadmap
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              A comprehensive plan to rebuild Rajasthan&apos;s cultural and cinematic 
              identity from the ground up.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                onClick={() => window.open('/proposal.pdf', '_blank')}
                className="bg-gradient-to-r from-amber-600 to-yellow-700 hover:from-amber-700 hover:to-yellow-800 shadow-xl"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Full Proposal
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Roadmap Timeline with Vertical Images */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-600 via-yellow-500 to-amber-600"></div>
            
            {roadmap.map((phase, index) => (
              <motion.div
                key={index}
                className={`relative mb-16 flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {/* Timeline dot */}
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full border-4 border-white shadow-xl z-20 flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <Calendar className="h-6 w-6 text-white" />
                </motion.div>

                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <motion.div 
                    className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-amber-200 hover:shadow-2xl transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="text-3xl font-bold text-amber-600 mb-3 flex items-center">
                      {phase.year}
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      >
                        <Star className="h-8 w-8 ml-3 text-yellow-500" />
                      </motion.div>
                    </div>
                    <h3 className="text-2xl font-royal font-bold text-gray-900 mb-6">{phase.title}</h3>
                    <ul className="space-y-4">
                      {phase.items.map((item, itemIndex) => (
                        <motion.li 
                          key={itemIndex} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-4 flex-shrink-0" />
                          </motion.div>
                          <span className="text-gray-700">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Vertical Image */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                  <motion.div 
                    className="relative h-[600px] rounded-2xl overflow-hidden shadow-xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Image
                      src={index === 0 ? "/4.jpeg" : index === 1 ? "/16.jpeg" : index === 2 ? "/12.jpeg" : "/13.jpeg"}
                      alt={`Vision ${phase.year}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{phase.year}</h3>
                      <p className="text-lg">{phase.title}</p>
                    </div>
                    <motion.div 
                      className="absolute top-6 right-6"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <TrendingUp className="h-10 w-10 text-amber-300" />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Enhanced Call to Action */}
        <motion.section 
          className="relative bg-gradient-to-br from-amber-900 via-yellow-800 to-amber-800 rounded-3xl p-12 text-center text-white overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated background elements */}
          <motion.div 
            className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full"
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full"
            animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <div className="relative z-10">
            <motion.h2 
              className="text-3xl md:text-4xl font-royal font-bold mb-6"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Ready to Be Part of the Solution?
            </motion.h2>
            <motion.p 
              className="text-xl text-white/90 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              From identifying problems to showcasing our heritage and planning our future - 
              every step requires your support and participation.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-white text-amber-800 hover:bg-gray-100 shadow-xl"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Join the Movement
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white/10"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default OverviewPage;