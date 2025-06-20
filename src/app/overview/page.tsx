// app/overview/page.tsx - Combined Problem, Vision & Showcase Page
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
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
  Calendar
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
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-royal font-bold text-gray-900 mb-6">
            Complete Overview
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Understanding the challenges, celebrating our heritage, and charting the path forward 
            for Rajasthan&apos;s cultural renaissance
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 sticky top-20 bg-white/80 backdrop-blur-lg py-4 rounded-2xl shadow-lg z-40">
          <a href="#problems" className="flex items-center px-6 py-3 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors">
            <AlertTriangle className="h-4 w-4 mr-2" />
            The Problems
          </a>
          <a href="#showcase" className="flex items-center px-6 py-3 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
            <Award className="h-4 w-4 mr-2" />
            Our Heritage
          </a>
          <a href="#vision" className="flex items-center px-6 py-3 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors">
            <Target className="h-4 w-4 mr-2" />
            Our Vision
          </a>
        </div>

        {/* Problems Section */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-royal-600 mb-4">{problem.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
                <p className="text-gray-600 mb-4">{problem.description}</p>
                <div className="bg-red-50 p-3 rounded-lg mb-3">
                  <p className="text-red-700 text-sm"><strong>Impact:</strong> {problem.impact}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-green-700 text-sm"><strong>Solution:</strong> {problem.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Showcase Section */}
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

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {showcaseCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveShowcaseCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-full transition-all text-sm ${
                  activeShowcaseCategory === category.id
                    ? 'bg-royal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon}
                <span className="ml-2">{category.label}</span>
              </button>
            ))}
          </div>

          {/* Showcase Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            key={activeShowcaseCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {showcaseData[activeShowcaseCategory].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-royal-400 to-desert-400 flex items-center justify-center">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <div className="text-royal-600 text-sm font-medium mb-2">
                    {item.year || item.region || `${item.count} Items`}
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Vision & Roadmap Section */}
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
            <Button size="lg" onClick={() => window.open('/proposal.pdf', '_blank')}>
              <Download className="mr-2 h-5 w-5" />
              Download Full Proposal
            </Button>
          </motion.div>

          {/* Roadmap Timeline */}
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-royal-200"></div>
            
            {roadmap.map((phase, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-royal-600 rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                
                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-royal-100">
                    <div className="text-2xl font-bold text-royal-600 mb-2">{phase.year}</div>
                    <h3 className="text-xl font-royal font-bold text-gray-900 mb-4">{phase.title}</h3>
                    <ul className="space-y-2">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <motion.section 
          className="bg-gradient-to-r from-royal-600 to-desert-600 rounded-2xl p-12 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-royal font-bold mb-6">
            Ready to Be Part of the Solution?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            From identifying problems to showcasing our heritage and planning our future - 
            every step requires your support and participation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-royal-600 hover:bg-gray-100">
              <Users className="mr-2 h-5 w-5" />
              Join the Movement
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default OverviewPage;