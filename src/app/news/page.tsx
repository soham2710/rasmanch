// app/news/page.tsx
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
    }
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const newsItems: NewsItem[] = [
    {
      title: "Government Approves Cultural Infrastructure Fund",
      date: "January 15, 2025",
      summary: "₹50 crore allocated for developing cultural facilities across Rajasthan",
      category: "Government"
    },
    {
      title: "International Film Festival Shows Interest",
      date: "January 10, 2025", 
      summary: "Major international festival considering Rajasthan as venue partner",
      category: "Cinema"
    },
    {
      title: "1000+ Artists Join Revival Movement",
      date: "January 5, 2025",
      summary: "Milestone reached as movement gains momentum across the state",
      category: "Community"
    }
  ];

  useEffect(() => {
    setEvents(upcomingEvents);
    setNews(newsItems);
  }, [newsItems, upcomingEvents]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
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
            <h2 className="text-3xl font-royal font-bold text-gray-900 mb-8">Upcoming Events</h2>
            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow border hover:shadow-lg transition-shadow"
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
                    <Calendar className="h-4 w-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  <Button size="sm">
                    {event.status === 'registration' ? 'Register Now' : 'Learn More'}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Latest News */}
          <div>
            <h2 className="text-3xl font-royal font-bold text-gray-900 mb-8">Latest News</h2>
            <div className="space-y-6">
              {newsItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow border hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-3 py-1 bg-royal-100 text-royal-800 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                    <span className="text-gray-500 text-sm">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-700 mb-4">{item.summary}</p>
                  <button className="flex items-center text-royal-600 hover:text-royal-700">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Read Full Article
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;