// app/overview/page.tsx - Enhanced Overview Page with Detailed Content
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  AlertTriangle,  
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
  GraduationCap,
  Shield,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProblemItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  impact: string;
  solution: string;
  detailed: string[];
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
  const [expandedProblem, setExpandedProblem] = useState<number | null>(null);

  // Timeline images with flexible extensions
  const timelineImages = [
    { name: '112', ext: 'jpg' },    // 2025 Foundation Year
    { name: '116', ext: 'jpg' },    // 2026 Infrastructure 
    { name: '115', ext: 'jpg' },   // 2027 Production
    { name: '118', ext: 'jpeg' }     // 2028-2030 Sustainable
  ];

  // Enhanced Problem Data with detailed content
  const problems: ProblemItem[] = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "No System or Process",
      description: "Local creatives lack standard operating practices for filmmaking.",
      impact: "85% of local projects fail due to poor planning and lack of structured workflows",
      solution: "Establish industry-standard SOPs and comprehensive training programs",
      detailed: [
        "Unorganized filming workflows lead to delays and cost overruns",
        "Lack of proper training in technical and business aspects of filmmaking",
        "Failed projects due to unrealistic deadlines and rushed production schedules",
        "No standardized practices for managing production schedules or tracking locations"
      ]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Lack of Unity & Discipline", 
      description: "Artists and technicians remain unorganised, scattered, and unsupported.",
      impact: "Fragmented talent pool reduces collective bargaining power and professional standards",
      solution: "Create unified artist associations, guilds, and professional bodies",
      detailed: [
        "Artists work in isolation without structured support or collaboration",
        "Inconsistent work standards due to lack of collective oversight",
        "Missed opportunities for mentorship and professional development",
        "No unified voice for fair wages and working conditions"
      ]
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "No Industry Infrastructure",
      description: "No Film City, editing suites, or equipment hubs in Rajasthan.",
      impact: "Projects relocate to Mumbai/Hyderabad, resulting in loss of local employment",
      solution: "Develop comprehensive Rajasthan Film City and technical infrastructure",
      detailed: [
        "Complete absence of centralized film production facilities",
        "No post-production studios, sound stages, or equipment rental hubs",
        "Higher costs for local filmmakers who must outsource to other states",
        "Rich locations underutilized due to missing backend support infrastructure"
      ]
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "No Film Education",
      description: "Youth are deprived of access to film studies and workshops.",
      impact: "Limited career opportunities and untapped creative potential",
      solution: "Establish film schools, workshops, and mentorship programs",
      detailed: [
        "No formal education programs in filmmaking or media arts",
        "Youth lack technical knowledge in cinematography, editing, and sound design",
        "Absence of mentorship from industry veterans",
        "Creative potential remains unrealized due to lack of structured learning"
      ]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "No Industry Body",
      description: "Unlike Bollywood or Tollywood, no unions or creative councils exist.",
      impact: "No protection for artists, lack of standards, and difficulty securing funding",
      solution: "Establish regulated bodies, unions, and creative councils",
      detailed: [
        "No protection against exploitation or unfair working conditions",
        "Absence of industry standards and guidelines",
        "Difficulty accessing funding and distribution channels",
        "No formal dispute resolution mechanisms for industry conflicts"
      ]
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "No Recognition System",
      description: "Folk artists die nameless, traditional knowledge is being lost forever.",
      impact: "Cultural heritage and invaluable artistic skills disappearing without documentation",
      solution: "Create annual awards, documentation projects, and comprehensive artist welfare programs",
      detailed: [
        "Folk artists lack financial support and institutional recognition",
        "Traditional practices face extinction as younger generations lose interest",
        "No archives or documentation systems for preserving cultural knowledge",
        "Gradual loss of stories, techniques, and cultural connections"
      ]
    }
  ];

  // Vision/Roadmap Data
  const roadmap: RoadmapPhase[] = [
    {
      year: "2025",
      title: "Foundation Year",
      items: [
        "Launch 4 statewide cultural festivals showcasing Rajasthani talent",
        "Establish comprehensive artist registration portal and database", 
        "Create detailed policy framework document for government approval",
        "Begin strategic partnerships with universities for film education courses",
        "Set up initial equipment sharing networks and rental hubs",
        "Form Rajasthan Film Council as regulatory body"
      ]
    },
    {
      year: "2026", 
      title: "Infrastructure Development",
      items: [
        "Secure land allocation and begin construction of Rajasthan Film City",
        "Launch formal film education courses in major universities",
        "Establish regional equipment banks and technical training centers",
        "Implement single window clearance system for film productions",
        "Create artist welfare fund and support systems",
        "Launch documentation project for folk artists and traditions"
      ]
    },
    {
      year: "2027",
      title: "Production & Recognition",
      items: [
        "Complete first phase of Rajasthan Film City with basic facilities",
        "Host inaugural Rajasthan Film Awards ceremony",
        "Launch comprehensive folk arts documentation and archive project",
        "Establish partnerships with international film festivals",
        "Begin regular film production with local talent and crews",
        "Create artist mentorship and training exchange programs"
      ]
    },
    {
      year: "2028-2030",
      title: "Sustainable Ecosystem",
      items: [
        "Complete full Film City infrastructure with world-class facilities",
        "Achieve self-sustaining cultural and film economy",
        "Gain global recognition for Rajasthani cinema and arts",
        "Implement comprehensive artist welfare and pension systems",
        "Establish Rajasthan as premier film shooting destination",
        "Export Rajasthani content to national and international markets"
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
      { title: 'The Dark Knight Rises', year: '2012', location: 'Mehrangarh Fort', description: 'Christopher Nolan chose Jodhpur as a key location for epic scenes' },
      { title: 'Jodha Akbar', year: '2008', location: 'Multiple Palaces', description: 'Ashutosh Gowariker showcased magnificent Rajasthani architecture' },
      { title: 'The Fall', year: '2006', location: 'Amber Fort', description: 'Tarsem Singh created stunning visual poetry with our heritage' }
    ],
    folk: [
      { title: 'Manganiyar Musicians', region: 'Barmer', description: 'Hereditary musicians preserving centuries-old musical traditions' },
      { title: 'Kalbelia Dance', region: 'Jaisalmer', description: 'UNESCO recognized intangible cultural heritage performance art' },
      { title: 'Kathputli Puppetry', region: 'Jaipur', description: 'Traditional string puppet art form with intricate storytelling' }
    ],
    youth: [
      { title: 'Student Film Festival Winners', count: '25+', description: 'Young filmmakers creating compelling narratives and winning recognition' },
      { title: 'College Theatre Groups', count: '40+', description: 'Active drama societies across universities promoting performing arts' },
      { title: 'Digital Content Creators', count: '100+', description: 'YouTube and Instagram influencers showcasing Rajasthani culture' }
    ],
    heritage: [
      { title: 'UNESCO World Heritage Sites', count: '6', description: 'Forts and palaces recognized globally for architectural significance' },
      { title: 'Documented Folk Songs', count: '500+', description: 'Archived traditional music and lyrics preserving oral traditions' },
      { title: 'Handicraft Traditions', count: '50+', description: 'Diverse artisan skills passed down through generations' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 to-yellow-50/50 pt-20 pb-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-8 py-8 md:py-16 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-6xl font-royal font-bold text-gray-900 mb-4 md:mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Complete Overview
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto"
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
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 md:mb-16 sticky top-20 py-4 rounded-2xl z-40"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a href="#problems" className="flex items-center px-3 md:px-6 py-2 md:py-3 bg-gradient-to-r from-red-100 to-red-200 text-red-700 rounded-full hover:from-red-200 hover:to-red-300 transition-all transform hover:scale-105 shadow-lg text-sm">
            <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            The Problems
          </a>
          <a href="#showcase" className="flex items-center px-3 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full hover:from-blue-200 hover:to-blue-300 transition-all transform hover:scale-105 shadow-lg text-sm">
            <Award className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            Our Heritage
          </a>
          <a href="#vision" className="flex items-center px-3 md:px-6 py-2 md:py-3 bg-gradient-to-r from-green-100 to-green-200 text-green-700 rounded-full hover:from-green-200 hover:to-green-300 transition-all transform hover:scale-105 shadow-lg text-sm">
            <Target className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            Our Vision
          </a>
        </motion.div>

        {/* Enhanced Problems Section */}
        <section id="problems" className="mb-20 md:mb-32">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-royal font-bold text-gray-900 mb-4 md:mb-6">
              Why Did Rajasthani Cinema Fall Behind?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Despite being the backdrop for countless global productions, 
              Rajasthan&apos;s own cinematic voice remains unheard.
            </p>
          </motion.div>

          {/* Enhanced Problems Grid with Mobile Optimization */}
          <div className="space-y-6 md:space-y-8">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-200 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="p-4 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                    {/* Icon and Title */}
                    <div className="flex items-center gap-4 md:flex-col md:items-center md:gap-2 md:min-w-[120px]">
                      <motion.div 
                        className="text-amber-600 flex-shrink-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {problem.icon}
                      </motion.div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 md:text-center">{problem.title}</h3>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p className="text-gray-600 mb-4 text-sm md:text-base">{problem.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-red-50 p-3 md:p-4 rounded-lg">
                          <p className="text-red-700 text-xs md:text-sm"><strong>Impact:</strong> {problem.impact}</p>
                        </div>
                        <div className="bg-green-50 p-3 md:p-4 rounded-lg">
                          <p className="text-green-700 text-xs md:text-sm"><strong>Solution:</strong> {problem.solution}</p>
                        </div>
                      </div>

                      {/* Expandable Details */}
                      <button
                        onClick={() => setExpandedProblem(expandedProblem === index ? null : index)}
                        className="flex items-center text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors"
                      >
                        {expandedProblem === index ? 'Show Less' : 'Learn More'}
                        <ArrowRight className={`h-4 w-4 ml-1 transition-transform ${expandedProblem === index ? 'rotate-90' : ''}`} />
                      </button>

                      {/* Expanded Content */}
                      {expandedProblem === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-gray-200"
                        >
                          <h4 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">Key Issues:</h4>
                          <ul className="space-y-2">
                            {problem.detailed.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start text-sm md:text-base">
                                <CheckCircle className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-gray-700">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Single Problem Illustration Image with flexible format */}
          <motion.div 
            className="mt-8 md:mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl mx-auto max-w-4xl">
              <Image
                src="/14.jpeg"
                alt="Rajasthan's Rich Heritage"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 text-white">
                <h3 className="text-base sm:text-lg md:text-2xl font-bold mb-1 md:mb-2">Global Backdrop, Local Silence</h3>
                <p className="text-xs sm:text-sm md:text-base opacity-90">World-famous locations, yet no platform for our own stories</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Enhanced Showcase Section */}
        <section id="showcase" className="mb-20 md:mb-32">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-royal font-bold text-gray-900 mb-4 md:mb-6">
              What Rajasthan Has Given the World
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Our land has been the canvas for countless stories. 
              Now it&apos;s time to tell our own.
            </p>
          </motion.div>

          {/* Animated Category Tabs */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {showcaseCategories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveShowcaseCategory(category.id)}
                className={`flex items-center px-3 md:px-6 py-2 md:py-3 rounded-full transition-all text-xs md:text-sm font-medium shadow-lg ${
                  activeShowcaseCategory === category.id
                    ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white scale-105 md:scale-110'
                    : 'bg-white/80 text-gray-700 hover:bg-amber-50 hover:scale-105'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {category.icon}
                <span className="ml-1 md:ml-2">{category.label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Showcase Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
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
                whileHover={{ y: -5, scale: 1.02 }}
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
                    <Play className="h-8 md:h-10 w-8 md:w-10 text-white drop-shadow-lg" />
                  </motion.div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-base md:text-lg group-hover:text-amber-700 transition-colors">{item.title}</h3>
                  <div className="text-amber-600 text-sm font-semibold mb-3 flex items-center">
                    <Star className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    {item.year || item.region || `${item.count} Items`}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Enhanced Vision & Roadmap Section */}
        <section id="vision" className="mb-12 md:mb-20">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-royal font-bold text-gray-900 mb-4 md:mb-6">
              Our Vision & 5-Year Roadmap
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-6 md:mb-8">
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
                className="bg-gradient-to-r from-amber-600 to-yellow-700 hover:from-amber-700 hover:to-yellow-800 shadow-xl text-sm md:text-base"
              >
                <Download className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Download Full Proposal
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Mobile-Friendly Roadmap Timeline */}
          <div className="relative">
            {/* Timeline line - hidden on mobile for cleaner look */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-600 via-yellow-500 to-amber-600"></div>
            
            {roadmap.map((phase, index) => (
              <motion.div
                key={index}
                className={`relative mb-6 md:mb-16 flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: 0, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {/* Timeline dot - repositioned for mobile */}
                <motion.div 
                  className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full border-4 border-white shadow-xl z-20 items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <Calendar className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
                </motion.div>

                {/* Mobile timeline indicator */}
                <div className="md:hidden flex items-center mb-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full flex items-center justify-center mr-3">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-amber-600">{phase.year}</div>
                </div>

                {/* Content */}
                <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:pr-6 lg:pr-8' : 'md:pl-6 lg:pl-8'}`}>
                  <motion.div 
                    className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border border-amber-200 hover:shadow-2xl transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="hidden md:flex text-2xl lg:text-3xl font-bold text-amber-600 mb-3 items-center">
                      {phase.year}
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      >
                        <Star className="h-6 w-6 lg:h-8 lg:w-8 ml-3 text-yellow-500" />
                      </motion.div>
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-royal font-bold text-gray-900 mb-3 md:mb-6">{phase.title}</h3>
                    <ul className="space-y-2 md:space-y-4">
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
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-500 mt-0.5 mr-2 md:mr-4 flex-shrink-0" />
                          </motion.div>
                          <span className="text-xs sm:text-sm md:text-base leading-relaxed text-gray-700">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Vision Image - Show for all phases with different images */}
                <div className={`w-full md:w-[55%] ${index % 2 === 0 ? 'md:pl-6 lg:pl-8' : 'md:pr-6 lg:pr-8'} mt-4 md:mt-0`}>
                  <motion.div 
                    className="relative h-48 sm:h-56 md:h-[350px] lg:h-[400px] rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Image
                      src={`/${timelineImages[index]?.name || '4'}.${timelineImages[index]?.ext || 'jpeg'}`}
                      alt={`Vision ${phase.year} - ${phase.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 text-white">
                      <h3 className="text-base sm:text-lg md:text-2xl font-bold mb-1 md:mb-2">{phase.year}</h3>
                      <p className="text-xs sm:text-sm md:text-lg opacity-90">{phase.title}</p>
                    </div>
                    <motion.div 
                      className="absolute top-3 md:top-6 right-3 md:right-6"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 md:h-10 md:w-10 text-amber-300" />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Enhanced Call to Action */}
        <motion.section 
          className="relative bg-gradient-to-br from-amber-900 via-yellow-800 to-amber-800 rounded-2xl md:rounded-3xl p-6 md:p-12 text-center text-white overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated background elements */}
          <motion.div 
            className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full"
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-white/10 rounded-full"
            animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <div className="relative z-10">
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl font-royal font-bold mb-4 md:mb-6"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Ready to Be Part of the Solution?
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto"
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
                  className="bg-white text-amber-800 hover:bg-gray-100 shadow-xl w-full sm:w-auto"
                >
                  <Users className="mr-2 h-4 w-4 md:h-5 md:w-5" />
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
                  className="border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
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