// app/support/page.tsx - Fixed Support Page with Firebase Type Errors Resolved
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  CheckCircle,
  Download,
  Users,
  Crown,
  Award,
  Film,
  AlertCircle,
  Mail,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { collection, addDoc, Firestore } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';
import { FormData } from '@/types';

const SupportPage = () => {
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailOTP, setEmailOTP] = useState('');
  const [phoneOTP, setPhoneOTP] = useState('');
  const [generatedEmailOTP, setGeneratedEmailOTP] = useState('');
  const [generatedPhoneOTP, setGeneratedPhoneOTP] = useState('');
  const [emailOTPSent, setEmailOTPSent] = useState(false);
  const [phoneOTPSent, setPhoneOTPSent] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaQuestion] = useState('7 + 4');
  const [step, setStep] = useState(1);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();

  const roles = [
    'Artist / Folk Musician',
    'Writer / Screenwriter', 
    'Director / Filmmaker',
    'Student / College Member',
    'Professor / Institution Representative',
    'Government Official',
    'Philanthropist / Sponsor',
    'Volunteer / Activist',
    'Media / Journalist',
    'Other'
  ];

  const interests = [
    'Promote Rajasthani Language Cinema',
    'Support Art & Culture Events',
    'Introduce Film Education in Colleges',
    'Be a Part of a Cultural Association',
    'Volunteer at Events / Festivals',
    'Donate / Sponsor Activities',
    'Policy Advocacy / Legal Framework',
    'Support Youth & Artist Upliftment',
    'Partner on Infrastructure Projects'
  ];

  // Generate a 6-digit OTP
  const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Send Email OTP (simulated)
  const sendEmailOTP = async (email: string) => {
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    const otp = generateOTP();
    setGeneratedEmailOTP(otp);
    setEmailOTPSent(true);
    
    // In a real implementation, you would send this OTP via email service
    // For now, we'll show it in a toast for testing
    toast.success(`Email OTP sent! For testing: ${otp}`, { duration: 8000 });
    
    console.log(`Email OTP for ${email}: ${otp}`);
  };

  // Send Phone OTP (simulated)
  const sendPhoneOTP = async (phone: string) => {
    if (!phone || phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    const otp = generateOTP();
    setGeneratedPhoneOTP(otp);
    setPhoneOTPSent(true);
    
    // In a real implementation, you would send this OTP via SMS service
    // For now, we'll show it in a toast for testing
    toast.success(`WhatsApp OTP sent! For testing: ${otp}`, { duration: 8000 });
    
    console.log(`Phone OTP for ${phone}: ${otp}`);
  };

  // Verify Email OTP
  const verifyEmailOTP = () => {
    if (emailOTP === generatedEmailOTP) {
      setEmailVerified(true);
      toast.success('Email verified successfully!');
    } else {
      toast.error('Invalid email OTP. Please try again.');
    }
  };

  // Verify Phone OTP
  const verifyPhoneOTP = () => {
    if (phoneOTP === generatedPhoneOTP) {
      setPhoneVerified(true);
      toast.success('Phone verified successfully!');
    } else {
      toast.error('Invalid phone OTP. Please try again.');
    }
  };

  // Verify Captcha
  const verifyCaptcha = (): boolean => {
    return captchaAnswer === '11';
  };

  const onSubmit = async (data: FormData) => {
    if (!emailVerified) {
      toast.error('Please verify your email first');
      return;
    }

    if (!phoneVerified) {
      toast.error('Please verify your phone number first');
      return;
    }

    if (!verifyCaptcha()) {
      toast.error('Please solve the captcha correctly (7 + 4 = 11)');
      return;
    }

    setLoading(true);

    try {
      if (!db) {
        throw new Error('Firestore database not initialized');
      }

      // Prepare data for Firebase
      const supporterData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        socialProfile: data.socialProfile || '',
        role: data.role,
        interests: data.interests || [],
        message: data.message || '',
        supportConsent: data.supportConsent,
        updatesConsent: data.updatesConsent || false,
        timestamp: new Date(),
        verified: true,
        status: 'active'
      };

      await addDoc(collection(db as Firestore, 'supporters'), supporterData);
      toast.success('Thank you for joining the movement!');
      setStep(3); // Show success page
    } catch (error) {
      console.error('Error submitting form:', error);
      
      let errorMessage = 'Something went wrong. Please try again.';
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

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-royal-50 to-desert-50 pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-royal font-bold text-gray-900 mb-4">
              Welcome to Rasmanch!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for joining the Rajasthani Cultural Revival. You&apos;ll receive updates 
              and opportunities via email. Together, we&apos;ll make history.
            </p>
            <div className="space-y-4">
              <Button 
                size="lg" 
                onClick={() => window.open('/proposal.pdf', '_blank')}
                className="w-full sm:w-auto"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Full Proposal
              </Button>
              <div className="text-sm text-gray-500">
                Check your inbox for welcome email and next steps
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-50 to-desert-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-royal font-bold text-gray-900 mb-6">
            Join the Cultural Renaissance
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Be part of the movement to revive Rajasthani cinema, arts, and culture. 
            Your voice, your talent, your support - everything matters.
          </p>
        </motion.div>

        {/* Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: <Users className="h-6 w-6" />, title: "Government Bodies", desc: "Policy support & reforms" },
            { icon: <Crown className="h-6 w-6" />, title: "Artists", desc: "Join our creative collective" },
            { icon: <Award className="h-6 w-6" />, title: "Educators", desc: "Introduce media courses" },
            { icon: <Film className="h-6 w-6" />, title: "Sponsors", desc: "Fund events & infrastructure" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border border-royal-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-royal-600 mb-3">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <motion.div 
          className="bg-white rounded-xl shadow-xl border border-royal-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-royal-600 to-desert-600 px-8 py-6">
            <h2 className="text-2xl font-royal font-bold text-white">
              Join the Movement
            </h2>
            <p className="text-white/90 mt-2">
              Fill out the form below to become part of this historic initiative
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            {/* Verification Section */}
            <div className="bg-royal-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-royal-600" />
                Verification Required
              </h3>
              
              {/* Email Verification */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Verification
                </label>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...register('email', { required: 'Email is required' })}
                      className="flex-1"
                    />
                    <Button 
                      type="button"
                      onClick={() => sendEmailOTP(watch('email'))}
                      disabled={emailVerified || !watch('email')}
                      variant={emailVerified ? 'ghost' : 'default'}
                    >
                      {emailVerified ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : emailOTPSent ? (
                        'Resend OTP'
                      ) : (
                        <>
                          <Mail className="h-4 w-4 mr-2" />
                          Send OTP
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {emailOTPSent && !emailVerified && (
                    <div className="flex gap-3">
                      <Input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={emailOTP}
                        onChange={(e) => setEmailOTP(e.target.value)}
                        maxLength={6}
                        className="flex-1"
                      />
                      <Button 
                        type="button"
                        onClick={verifyEmailOTP}
                        disabled={emailOTP.length !== 6}
                      >
                        Verify
                      </Button>
                    </div>
                  )}
                  
                  {emailVerified && (
                    <div className="flex items-center text-green-600 text-sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Email verified successfully!
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Verification */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Verification
                </label>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Input
                      type="tel"
                      placeholder="Enter WhatsApp number"
                      {...register('phone', { required: 'Phone number is required' })}
                      className="flex-1"
                    />
                    <Button 
                      type="button"
                      onClick={() => sendPhoneOTP(watch('phone'))}
                      disabled={phoneVerified || !watch('phone')}
                      variant={phoneVerified ? 'ghost' : 'default'}
                    >
                      {phoneVerified ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : phoneOTPSent ? (
                        'Resend OTP'
                      ) : (
                        <>
                          <Phone className="h-4 w-4 mr-2" />
                          Send OTP
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {phoneOTPSent && !phoneVerified && (
                    <div className="flex gap-3">
                      <Input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={phoneOTP}
                        onChange={(e) => setPhoneOTP(e.target.value)}
                        maxLength={6}
                        className="flex-1"
                      />
                      <Button 
                        type="button"
                        onClick={verifyPhoneOTP}
                        disabled={phoneOTP.length !== 6}
                      >
                        Verify
                      </Button>
                    </div>
                  )}
                  
                  {phoneVerified && (
                    <div className="flex items-center text-green-600 text-sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Phone verified successfully!
                    </div>
                  )}
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Captcha */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Human Verification: What is {captchaQuestion}?
                </label>
                <Input
                  type="text"
                  placeholder="Enter answer"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  className="w-32"
                />
                {captchaAnswer && !verifyCaptcha() && (
                  <p className="text-red-500 text-sm mt-1">Incorrect answer. Try again.</p>
                )}
                {captchaAnswer && verifyCaptcha() && (
                  <p className="text-green-500 text-sm mt-1 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Correct!
                  </p>
                )}
              </div>
            </div>

            {/* Personal Details */}
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

            {/* Social Profile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook / Instagram Profile Link
              </label>
              <Input
                {...register('socialProfile')}
                placeholder="Paste your profile link"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Role / Category *
              </label>
              <select
                {...register('role', { required: 'Please select your role' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-400"
              >
                <option value="">Choose your role</option>
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
              )}
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Areas of Interest
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {interests.map((interest) => (
                  <label key={interest} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register('interests')}
                      value={interest}
                      className="rounded border-gray-300 text-royal-600 focus:ring-royal-400"
                    />
                    <span className="text-sm text-gray-700">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message / Suggestion / Introduction
              </label>
              <Textarea
                {...register('message')}
                placeholder="Describe how you wish to contribute or your background (up to 500 words)"
                rows={6}
                maxLength={500}
              />
            </div>

            {/* Consent */}
            <div className="space-y-3">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register('supportConsent', { required: 'Please confirm your support' })}
                  className="mt-1 rounded border-gray-300 text-royal-600 focus:ring-royal-400"
                />
                <span className="text-sm text-gray-700">
                  I support the revival of Rajasthani Cinema, Arts, and Cultural Infrastructure 
                  and request the concerned government departments to take action as per the 
                  proposal outlined on this platform.
                </span>
              </label>

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register('updatesConsent')}
                  className="mt-1 rounded border-gray-300 text-royal-600 focus:ring-royal-400"
                />
                <span className="text-sm text-gray-700">
                  I consent to receive updates, opportunities, and petitions related to this initiative.
                </span>
              </label>
            </div>

            {errors.supportConsent && (
              <p className="text-red-500 text-sm">{errors.supportConsent.message}</p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading || !emailVerified || !phoneVerified || !verifyCaptcha()}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Joining Movement...
                </div>
              ) : (
                <>
                  <Crown className="mr-2 h-5 w-5" />
                  Join the Movement
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SupportPage;