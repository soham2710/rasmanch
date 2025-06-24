// app/news/page.tsx - News Page with Gold Colors and Readable Text
'use client';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Star, Award, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const NewsPage = () => {
  // Static data - no useState/useEffect to avoid the React error
  const upcomingEvents = [
    {
      title: "IIFFCA Rajasthan Edition 2026",
      date: "May 5-7, 2026",
      location: "Jaipur Exhibition & Convention Centre",
      description: "Iconic International Film & Creative Awards showcasing cinematic excellence and digital innovation",
      status: "upcoming" as const
    },
    {
      title: "IIFA 26th Press Confluence",
      date: "March 7-9, 2026",
      location: "Jaipur",
      description: "Bollywood and digital media confluence bringing global attention to Rajasthan",
      status: "upcoming" as const
    },
    {
      title: "Rajasthan International Film Festival",
      date: "January 31 - February 4, 2026",
      location: "Jodhpur",
      description: "Regional cinema showcase celebrating local and international films",
      status: "registration" as const
    },
    {
      title: "MTV India Music Summit Rajasthan",
      date: "October 12-14, 2025",
      location: "Jaipur",
      description: "Music industry summit focusing on brand partnerships and artist development",
      status: "registration" as const
    }
  ];

  const newsItems = [
    {
      title: "IIFFCA Announces Major Rajasthan Partnership",
      date: "February 25, 2025",
      summary: "Iconic International Film & Creative Awards selects Rajasthan as premier destination, bringing global recognition to regional content creation",
      category: "Awards"
    },
    {
      title: "Complete Media & Entertainment Calendar Unveiled",
      date: "February 22, 2025",
      summary: "Rajasthan to host 8 major M&E events in 2025-26, positioning state as India's cultural and cinematic hub",
      category: "Industry"
    },
    {
      title: "Jaipur Exhibition Centre Upgrades for IIFFCA 2026",
      date: "February 20, 2025",
      summary: "₹25 crore infrastructure enhancement to accommodate international film awards and tech expo",
      category: "Infrastructure"
    },
    {
      title: "Screen Stage Forum Gains 1500+ Members",
      date: "February 18, 2025",
      summary: "Milestone reached as Rajasthan Arts, Culture and Cinema Forum gains momentum across the state",
      category: "Community"
    },
    {
      title: "OTT Platforms Show Interest in Rajasthani Content",
      date: "February 15, 2025",
      summary: "Major streaming services commit to funding regional language productions following forum initiatives",
      category: "Digital"
    },
    {
      title: "Film City Project Gets Government Approval",
      date: "February 12, 2025",
      summary: "Rajasthan government approves 500-acre film city project near Jaipur with international standards",
      category: "Government"
    }
  ];

  // IIFFCA Event Details
  const iiffcaAgenda = [
    "Opening Gala & Red Carpet: Celebration of cinematic and digital content",
    "IIFFCA Awards Night: Live recognition across film, web series, podcasts, short films",
    "Panel: 'Bridging Regional Content with Global Markets'",
    "Tech Expo: OTT analytics, AR/VR storytelling, AI-driven post-production",
    "Workshops: Multilingual content, digital distribution, NFT in media",
    "Networking: Roundtables with distributors, festival jurors, global buyers",
    "Closing Cinematic Concert: Live performance synced with film scores"
  ];

  // Complete Event Calendar
  const eventCalendar = [
    { city: "Jaipur", event: "IIFFCA Rajasthan Edition 2026", type: "Awards & Expo", dates: "May 5–7, 2026", focus: "Film, digital content, tech" },
    { city: "Jaipur", event: "IIFA 26th Press Confluence", type: "Confluence", dates: "March 7–9, 2026", focus: "Bollywood, digital media" },
    { city: "Jaipur", event: "IIFA Digital Awards & Media Tech Expo", type: "Expo", dates: "March 7–9, 2026", focus: "Web series, AR/VR, OTT tech" },
    { city: "Jaipur", event: "Jaipur Film Market 2026", type: "Market & Summit", dates: "Jan 10–12, 2026", focus: "Film finance, co-productions" },
    { city: "Jodhpur", event: "Rajasthan International Film Festival", type: "Festival", dates: "Jan 31–Feb 4, 2026", focus: "Regional cinema showcase" },
    { city: "Jaipur", event: "MTV India Music Summit Rajasthan", type: "Summit", dates: "Oct 12–14, 2025", focus: "Music industry, partnerships" },
    { city: "Udaipur", event: "Media & Storytelling Summit UGX", type: "Summit", dates: "Jan 11–13, 2026", focus: "Podcasts, immersive media" },
    { city: "Jaipur", event: "Rajasthan Film Festival Awards 2025", type: "Awards", dates: "Sep 27–29, 2025", focus: "Regional cinema excellence" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-royal font-bold text-gray-900 mb-6">
            News & Events
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Stay updated with the latest developments in our cultural revival movement
          </p>
        </motion.div>

        {/* IIFFCA Spotlight - Gold with Dark Text for Readability */}
        <motion.div 
          className="mb-16 bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-200 rounded-2xl p-8 text-gray-900 border border-amber-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center mb-6">
            <Award className="h-10 w-10 mr-4 text-amber-700" />
            <div>
              <h2 className="text-3xl font-royal font-bold text-gray-900">IIFFCA Rajasthan Edition 2026</h2>
              <p className="text-lg text-amber-800">Iconic International Film & Creative Awards</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 mr-2 text-amber-700" />
                <span className="font-semibold text-gray-900">May 5–7, 2026</span>
              </div>
              <div className="flex items-center mb-6">
                <MapPin className="h-5 w-5 mr-2 text-amber-700" />
                <span className="font-semibold text-gray-900">Jaipur Exhibition & Convention Centre</span>
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-amber-800">Event Agenda:</h3>
              <ul className="space-y-2">
                {iiffcaAgenda.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Star className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-amber-600" />
                    <span className="text-sm text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-amber-200/50 rounded-xl p-6 border border-amber-300">
              <h3 className="text-xl font-bold mb-4 flex items-center text-amber-800">
                <Globe className="h-5 w-5 mr-2" />
                Why IIFFCA in Rajasthan?
              </h3>
              <ul className="space-y-3 text-sm text-gray-800">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">✅</span>
                  Complements existing IIFA + Digital initiatives
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">✅</span>
                  Bridges traditional film, OTT, audio, and immersive media
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">✅</span>
                  Leverages Jaipur&apos;s infrastructure and media spotlight
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">✅</span>
                  Creates pan-India content awards platform
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Complete Event Calendar */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-royal font-bold text-gray-900 mb-8 text-center">
            Complete Media & Entertainment Calendar
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg border border-amber-200">
              <thead className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">City</th>
                  <th className="px-6 py-4 text-left font-semibold">Event</th>
                  <th className="px-6 py-4 text-left font-semibold">Type</th>
                  <th className="px-6 py-4 text-left font-semibold">Dates</th>
                  <th className="px-6 py-4 text-left font-semibold">Focus Areas</th>
                </tr>
              </thead>
              <tbody>
                {eventCalendar.map((event, index) => (
                  <tr key={index} className="border-b border-amber-50 hover:bg-amber-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-amber-700">{event.city}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{event.event}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                        {event.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{event.dates}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{event.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upcoming Events */}
          <div>
            <h2 className="text-3xl font-royal font-bold text-gray-900 mb-8 flex items-center">
              <Calendar className="h-8 w-8 mr-3 text-amber-600" />
              Upcoming Events
            </h2>
            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg border border-amber-100 hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.status === 'registration' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {event.status === 'registration' ? 'Open Registration' : 'Upcoming'}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-2 text-amber-600" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2 text-amber-600" />
                    {event.location}
                  </div>
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
                  >
                    {event.status === 'registration' ? 'Register Now' : 'Learn More'}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Latest News */}
          <div>
            <h2 className="text-3xl font-royal font-bold text-gray-900 mb-8 flex items-center">
              <ExternalLink className="h-8 w-8 mr-3 text-amber-600" />
              Latest News
            </h2>
            <div className="space-y-6">
              {newsItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg border border-amber-100 hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.category === 'Government' ? 'bg-blue-100 text-blue-800' :
                      item.category === 'Awards' ? 'bg-purple-100 text-purple-800' :
                      item.category === 'Industry' ? 'bg-indigo-100 text-indigo-800' :
                      item.category === 'Infrastructure' ? 'bg-orange-100 text-orange-800' :
                      item.category === 'Community' ? 'bg-green-100 text-green-800' :
                      item.category === 'Digital' ? 'bg-cyan-100 text-cyan-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.category}
                    </span>
                    <span className="text-gray-500 text-sm">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-700 mb-4">{item.summary}</p>
                  <button className="flex items-center text-amber-600 hover:text-amber-700 transition-colors">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Read Full Article
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup - Improved Readability */}
        <motion.div 
          className="mt-20 bg-gradient-to-r from-amber-700 via-yellow-700 to-amber-800 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-royal font-bold text-white mb-4">
            Stay Updated with Our Newsletter
          </h3>
          <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
            Get the latest news, event announcements, and opportunities 
            directly in your inbox. Be the first to know about our initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg flex-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-amber-700 hover:bg-gray-100 font-semibold">
              Subscribe
            </Button>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-royal font-bold text-gray-900 mb-4">
            Want to be Part of These Events?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our movement and be among the first to participate in 
            upcoming festivals, workshops, and cultural celebrations.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
          >
            Join the Movement
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NewsPage;