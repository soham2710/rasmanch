// app/contact/page.tsx - Fixed Contact Page with Firebase Type Errors Resolved
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { collection, addDoc, Firestore } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  newsletter: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      if (!db) {
        throw new Error('Firestore database not initialized');
      }

      // Save to Firebase
      await addDoc(collection(db as Firestore, 'contacts'), {
        ...data,
        timestamp: new Date(),
        status: 'new' // Status can be: 'new', 'read', 'replied'
      });
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      reset();
    } catch (error) {
      console.error('Error saving contact form:', error);
      
      let errorMessage = 'Failed to send message. Please try again.';
      if (error instanceof Error) {
        if (error.message.includes('permission')) {
          errorMessage = 'Permission denied. Please contact support.';
        } else if (error.message.includes('network')) {
          errorMessage = 'Network error. Please check your connection.';
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const faqs: FAQ[] = [
    {
      question: "How can I join the movement?",
      answer: "Visit our 'Support the Movement' page to register as a supporter. You can choose your role and areas of interest."
    },
    {
      question: "Is this initiative government-backed?",
      answer: "We are working towards government support and policy implementation. This is a citizen-led initiative seeking official backing."
    },
    {
      question: "Can I volunteer for events?",
      answer: "Absolutely! When you register as a supporter, you can select 'Volunteer at Events/Festivals' as your area of interest."
    },
    {
      question: "How can my institution partner with you?",
      answer: "Educational institutions can introduce film/media courses and host cultural events. Contact us for partnership details."
    },
    {
      question: "Where can I download the full proposal?",
      answer: "The complete proposal PDF is available for download on our Overview page and after registration."
    },
    {
      question: "How can businesses support this initiative?",
      answer: "Businesses can sponsor events, fund infrastructure projects, or provide equipment. Multiple sponsorship tiers are available."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-50 to-desert-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-royal font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Have questions, suggestions, or want to collaborate? 
            We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-royal font-bold text-gray-900 mb-8">
              Let&apos;s Build Together
            </h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-royal-600 mr-4" />
                <div>
                  <div className="font-semibold text-gray-900">Email</div>
                  <div className="text-gray-600">info@rasmanch.org</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-royal-600 mr-4" />
                <div>
                  <div className="font-semibold text-gray-900">Phone</div>
                  <div className="text-gray-600">+91 XXXXX XXXXX</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-royal-600 mr-4" />
                <div>
                  <div className="font-semibold text-gray-900">Address</div>
                  <div className="text-gray-600">Jaipur, Rajasthan, India</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-royal-600 mr-4" />
                <div>
                  <div className="font-semibold text-gray-900">Response Time</div>
                  <div className="text-gray-600">Within 24 hours</div>
                </div>
              </div>
            </div>

            <div className="bg-royal-100 p-6 rounded-lg">
              <h3 className="font-semibold text-royal-800 mb-3 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                For Government Officials
              </h3>
              <p className="text-royal-700 text-sm">
                Special consultation available for policy makers and government 
                representatives. Contact us directly for priority scheduling.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white p-8 rounded-xl shadow-lg border border-royal-100">
              <h3 className="text-2xl font-royal font-bold text-gray-900 mb-6">
                Send us a Message
              </h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <Input
                      {...register('firstName', { required: 'First name is required' })}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <Input
                      {...register('lastName', { required: 'Last name is required' })}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    {...register('subject', { required: 'Please select a subject' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-400"
                  >
                    <option value="">Choose a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="collaboration">Partnership/Collaboration</option>
                    <option value="government">Government Relations</option>
                    <option value="artist">Artist Registration</option>
                    <option value="sponsor">Sponsorship Opportunities</option>
                    <option value="media">Media/Press Inquiry</option>
                    <option value="technical">Technical Support</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    {...register('message', { required: 'Message is required' })}
                    placeholder="Tell us about your inquiry, suggestions, or how you'd like to collaborate..."
                    rows={6}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    {...register('newsletter')}
                    className="mt-1 rounded border-gray-300 text-royal-600 focus:ring-royal-400"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Subscribe to our newsletter for updates on events and initiatives
                  </label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending Message...
                    </div>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-royal font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow border">
                <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;