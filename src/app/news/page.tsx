// app/news/page.tsx - Updated News & Events Page with New Branding
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Event, NewsItem } from '@/types';

const NewsPage = () => {
  const [, setEvents] = useState<Event[]>([]);
  const [, setNews] = useState<NewsItem[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const upcomingEvents: Event[] = [
    {
      title: "Rajasthan Cultural Festival 2025",
      date: "March 15-17, 2025",
      location: "Jaipur",
      description: "Three-day celebration of Rajasthani arts, music, and cinema",
      status: "upcoming"
    },
    {
      title: "Film Education Workshop",
      date: "April 5, 2025", 
      location: "Jodhpur University",
      description: "Introduction to filmmaking for college students",
      status: "registration"
    },
    {
      title: "Folk Artist Recognition Ceremony",
      date: "May 20, 2025",
      location: "Udaipur",
      description: "Honoring traditional artists and their contributions",
      status: "upcoming"
    },
    {
      title: "Regional Cinema Symposium",
      date: "June 10, 2025",
      location: "Jaisalmer",
      description: "Panel discussions on the future of Rajasthani cinema",
      status: "registration"
    }
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const newsItems: NewsItem[] = [
    {
      title: "Screen Stage Forum Gains 1000+ Supporters",
      date: "February 20, 2025",
      summary: "Milestone reached as movement gains momentum across Rajasthan with artists, educators, and officials joining",
      category: "Community"
    },
    {
      title: "Government Approves Cultural Infrastructure Fund",
      date: "February 15, 2025",
      summary: "₹50 crore allocated for developing cultural facilities across Rajasthan",
      category: "Government"
    },
    {
      title: "International Film Festival Shows Interest",
      date: "February 10, 2025", 
      summary: "Major international festival considering Rajasthan as venue partner for regional cinema showcase",
      category: "Cinema"
    },
    {
      title: "University Partnerships Established",
      date: "February 5, 2025",
      summary: "Three major universities commit to introducing film and media studies programs",
      category: "Education"
    },
    {
      title: "Folk Artists Digital Archive Project Launched",
      date: "January 30, 2025",
      summary: "Initiative to document and preserve traditional Rajasthani performing arts for future generations",
      category: "Heritage"
    },
    {
      title: "First Regional Cinema Script Competition Announced",
      date: "January 25, 2025",
      summary: "Young writers invited to submit scripts in Rajasthani dialects with cash prizes and production support",
      category: "Cinema"
    }
  ];

  useEffect(() => {
    setEvents(upcomingEvents);
    setNews(newsItems);
  }, [newsItems, upcomingEvents]);

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
                        : 'bg-blue-100 text-blue-800'
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
                      item.category === 'Cinema' ? 'bg-purple-100 text-purple-800' :
                      item.category === 'Community' ? 'bg-green-100 text-green-800' :
                      item.category === 'Education' ? 'bg-amber-100 text-amber-800' :
                      item.category === 'Heritage' ? 'bg-red-100 text-red-800' :
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

        {/* Newsletter Signup */}
        <motion.div 
          className="mt-20 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-royal font-bold text-white mb-4">
            Stay Updated with Our Newsletter
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Get the latest news, event announcements, and opportunities 
            directly in your inbox. Be the first to know about our initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg flex-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-amber-700 hover:bg-gray-100">
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