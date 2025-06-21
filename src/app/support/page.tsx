// app/support/page.tsx - Enhanced Support Page with Hindi/English Petition Toggle
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  CheckCircle,
  Download,
  Crown,
  AlertCircle,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Camera,
  Megaphone,
  Globe
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
  const [selectedCategory, setSelectedCategory] = useState('');
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>();

  // Main categories for support
  const supportCategories = [
    {
      id: 'government',
      title: 'Government Bodies',
      icon: <Building className="h-8 w-8" />,
      description: 'Policy support & reforms',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'artists',
      title: 'Artists & Technicians',
      icon: <Camera className="h-8 w-8" />,
      description: 'Join our creative collective',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'academic',
      title: 'Academic Educators',
      icon: <GraduationCap className="h-8 w-8" />,
      description: 'Introduce media courses',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'media',
      title: 'Media & Sponsors',
      icon: <Megaphone className="h-8 w-8" />,
      description: 'Fund events & infrastructure',
      color: 'from-amber-500 to-amber-600'
    }
  ];

  // Petition content in both languages
  const petitionContent = {
    english: {
      title: "Petition for the Revival of Rajasthani Arts, Cultural & Cinema Revival Movement",
      declaration: "Declaration of Support",
      declarationText: "We, the undersigned—citizens, artists, educators, students, cultural enthusiasts, and supporters of India's diverse heritage—hereby urge the Government of Rajasthan and the relevant Central Ministries (Ministry of Culture, Ministry of Information & Broadcasting, Ministry of Tourism, and UGC) to formally support and implement a comprehensive policy framework to revive and institutionalise Rajasthani Cinema, Arts, and Culture.",
      context: "Despite Rajasthan's vast contribution to Indian cinema as a shooting destination and to Indian culture through its unparalleled legacy of folk art, music, storytelling, and language diversity—local talent, institutions, and cultural ecosystems have remained underdeveloped, unsupported, and unstructured.",
      belief: "We believe that with the right infrastructure, academic support, policy framework, and promotional initiatives, Rajasthan can become a national hub for regional cinema and cultural excellence.",
      demands: "We Specifically Petition for the Following:",
      demandsList: [
        "Establishment of a Rajasthan Film Development Policy, with clearly defined subsidies, single-window clearances, and 60% Rajasthani inclusion criteria (cast, crew, culture, locations, etc.).",
        "Creation of a Film City or Regional Media Hub in Rajasthan, with shooting floors, post-production units, costume/art departments, and skill centres.",
        "Introduction of Film, Media, and Performing Arts Studies in Rajasthan's colleges and universities, with state-supported curriculum.",
        "Formation of Recognised Creative Associations for Writers, Musicians, Actors, Directors, Artisans, and Technicians with government-regulated support.",
        "State-Endorsed Cultural Calendar with annual Art Festivals, Film Festivals, Competitions, and Fellowship Programs.",
        "Protection and Promotion of Rajasthani Dialects, Folk Arts, and Traditional Performance Practices via documentation, digital archiving, and grants.",
        "Active Involvement of Local Youth and Artists through capacity-building initiatives and employment in creative sectors."
      ],
      commitment: "Our Commitment",
      commitmentText: "As signatories of this petition, we commit to supporting this movement through our skills, platforms, time, or resources. We believe this is not merely about cinema—it is about cultural identity, economic empowerment, youth engagement, and heritage preservation.",
      request: "We request Hon'ble Princess Diya Kumari ji, the Government of Rajasthan, and all relevant Ministries to take urgent and sustained action.",
      slogan: "LET THE SCREEN REFLECT OUR SOIL. LET THE ART RISE FROM OUR ROOTS."
    },
    hindi: {
      title: "राजस्थानी सिनेमा, कला और सांस्कृतिक ढांचे के पुनरुत्थान हेतु याचिका",
      declaration: "समर्थन की घोषणा",
      declarationText: "हम, इस याचिका पर हस्ताक्षर करने वाले नागरिक, कलाकार, शिक्षक, छात्र, सांस्कृतिक प्रेमी, और भारत की विविध विरासत के समर्थक, राजस्थान सरकार और संबंधित केंद्रीय मंत्रालयों (संस्कृति मंत्रालय, सूचना एवं प्रसारण मंत्रालय, पर्यटन मंत्रालय और विश्वविद्यालय अनुदान आयोग - UGC) से आग्रह करते हैं कि वे राजस्थानी सिनेमा, कला और संस्कृति के पुनरुत्थान और संस्थागत निर्माण के लिए एक व्यापक नीति ढांचा लागू करें।",
      context: "हालांकि राजस्थान ने भारतीय सिनेमा को एक प्रमुख शूटिंग स्थल के रूप में और लोककला, संगीत, कहानी कहने की परंपरा और भाषाई विविधता के माध्यम से संस्कृति को अद्वितीय योगदान दिया है, फिर भी स्थानीय प्रतिभा, संस्थान और सांस्कृतिक ढांचे आज भी विकासहीन, असहाय और असंगठित हैं।",
      belief: "हम मानते हैं कि यदि सही बुनियादी ढांचा, शैक्षणिक सहयोग, नीति समर्थन और प्रचार कार्यक्रम मिलें तो राजस्थान क्षेत्रीय सिनेमा और सांस्कृतिक उत्कृष्टता का राष्ट्रीय केंद्र बन सकता है।",
      demands: "हम विशेष रूप से निम्नलिखित की मांग करते हैं:",
      demandsList: [
        "राजस्थान फिल्म विकास नीति की स्थापना की जाए, जिसमें स्पष्ट सब्सिडी, सिंगल विंडो क्लीयरेंस, और 60% राजस्थानी सहभागिता (कलाकार, तकनीशियन, लोकेशन, संस्कृति आदि) की अनिवार्यता हो।",
        "राजस्थान में एक फिल्म सिटी या क्षेत्रीय मीडिया हब की स्थापना, जिसमें शूटिंग फ्लोर, पोस्ट-प्रोडक्शन यूनिट, कॉस्ट्यूम/आर्ट विभाग और कौशल केंद्र हों।",
        "फिल्म, मीडिया और परफॉर्मिंग आर्ट्स की पढ़ाई को राजस्थान के कॉलेजों और विश्वविद्यालयों में राज्य समर्थित पाठ्यक्रमों के रूप में लागू किया जाए।",
        "सरकारी मान्यता प्राप्त रचनात्मक संघों का गठन, जैसे लेखक, संगीतकार, अभिनेता, निर्देशक, शिल्पकार और तकनीशियन संघ।",
        "राज्य प्रायोजित सांस्कृतिक कैलेंडर, जिसमें वार्षिक कला उत्सव, फिल्म फेस्टिवल, प्रतियोगिताएं और फैलोशिप प्रोग्राम शामिल हों।",
        "राजस्थानी बोलियों, लोक कलाओं और पारंपरिक प्रदर्शन कलाओं के संरक्षण और संवर्धन के लिए डॉक्यूमेंटेशन, डिजिटल आर्काइविंग और अनुदान की सुविधा।",
        "स्थानीय युवाओं और कलाकारों की सक्रिय भागीदारी, कौशल निर्माण और रचनात्मक क्षेत्रों में रोजगार के माध्यम से सुनिश्चित की जाए।"
      ],
      commitment: "हमारी प्रतिबद्धता",
      commitmentText: "इस याचिका पर हस्ताक्षर करने वाले सभी लोग इस आंदोलन को अपने कौशल, मंच, समय या संसाधनों के माध्यम से समर्थन देने के लिए प्रतिबद्ध हैं। यह केवल सिनेमा का विषय नहीं है, बल्कि सांस्कृतिक पहचान, आर्थिक सशक्तिकरण, युवाओं की भागीदारी और विरासत संरक्षण का विषय है।",
      request: "हम माननीय राजकुमारी दिया कुमारी जी, राजस्थान सरकार और सभी संबंधित मंत्रालयों से निवेदन करते हैं कि वे इस दिशा में शीघ्र और सतत कार्यवाही करें।",
      slogan: "हर छवि में देखाय धरती री बात, आ जड़ां सूं फिरे कला री सौगात।"
    }
  };

  // Contribution options
  const contributionOptions = [
    "I want to promote Rajasthani language and regional cinema through storytelling and content creation",
    "I wish to support traditional arts, folk music, and culture festivals across Rajasthan",
    "I support introducing film & media education in colleges and am ready to advocate or collaborate",
    "I want to be a part of official cultural associations (Writers, Musicians, Directors, etc.)",
    "I'm willing to volunteer at film festivals, workshops, or cultural events",
    "I can donate funds or sponsor specific initiatives (awards, events, infrastructure)",
    "I wish to help shape policies and legal frameworks for Rajasthan's creative industry",
    "I want to support the training and upliftment of youth, artists, and folk performers",
    "I'm interested in partnering or investing in Rajasthan's film and cultural infrastructure (studio, film city, etc.)"
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
        category: selectedCategory,
        role: data.role,
        interests: data.interests || [],
        message: data.message || '',
        hasInstitution: data.hasInstitution || 'no',
        institutionName: data.institutionName || '',
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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-royal font-bold text-gray-900 mb-4">
              Welcome to Rajasthan Screen Stage Forum!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for joining the Rajasthani Cultural Revival. You&apos;ll receive updates 
              and opportunities via email. Together, we&apos;ll make history.
            </p>
            <div className="space-y-4">
              <Button 
                size="lg" 
                onClick={() => window.open('/proposal.pdf', '_blank')}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-yellow-700"
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

  const currentContent = petitionContent[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 pt-24 pb-12">
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

        {/* Category Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {supportCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className={`relative overflow-hidden rounded-xl shadow-lg border-2 transition-all duration-300 cursor-pointer ${
                selectedCategory === category.id 
                  ? 'border-amber-500 shadow-xl scale-105' 
                  : 'border-gray-200 hover:border-amber-300 hover:shadow-lg'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => {
                setSelectedCategory(category.id);
                setValue('role', category.title); // Set the main category as role
              }}
            >
              <div className={`bg-gradient-to-br ${category.color} p-6 text-white`}>
                <div className="mb-3">{category.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                <p className="text-sm opacity-90">{category.description}</p>
              </div>
              {selectedCategory === category.id && (
                <div className="absolute top-2 right-2">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Petition Statement with Language Toggle */}
        <motion.div 
          className="bg-white rounded-xl shadow-xl border border-amber-100 overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-amber-600 to-yellow-600 px-8 py-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-royal font-bold text-white">
                🖋️ {currentContent.title}
              </h2>
              
              {/* Language Toggle */}
              <div className="flex items-center space-x-2 bg-white/20 rounded-full p-1">
                <button
                  onClick={() => setLanguage('english')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    language === 'english' 
                      ? 'bg-white text-amber-700' 
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <Globe className="h-4 w-4 inline mr-1" />
                  English
                </button>
                <button
                  onClick={() => setLanguage('hindi')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all font-hindi ${
                    language === 'hindi' 
                      ? 'bg-white text-amber-700' 
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className={`prose max-w-none text-gray-700 ${language === 'hindi' ? 'font-hindi' : ''}`}>
              <h3 className="text-xl font-semibold mb-4 text-amber-800">📜 {currentContent.declaration}</h3>
              <p className="mb-6">{currentContent.declarationText}</p>
              
              <p className="mb-6">{currentContent.context}</p>
              
              <p className="mb-6">{currentContent.belief}</p>

              <h3 className="text-xl font-semibold mb-4 text-amber-800">📌 {currentContent.demands}</h3>
              <ul className="space-y-3 mb-6">
                {currentContent.demandsList.map((demand, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-amber-600 mr-2 mt-1">•</span>
                    <span>{demand}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-amber-800">✊ {currentContent.commitment}</h3>
              <p className="mb-6">{currentContent.commitmentText}</p>
              
              <p className="mb-6">{currentContent.request}</p>

              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-amber-800 font-bold text-center text-lg">
                  {currentContent.slogan}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Form */}
        <motion.div 
          className="bg-white rounded-xl shadow-xl border border-amber-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-amber-600 to-yellow-600 px-8 py-6">
            <h2 className="text-2xl font-royal font-bold text-white">
              Join the Movement
            </h2>
            <p className="text-white/90 mt-2">
              Sign the petition and become part of this historic initiative
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            {/* Verification Section */}
            <div className="bg-amber-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-amber-600" />
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
                      onClick={() => sendEmailOTP(watch('email') || '')}
                      disabled={emailVerified || !watch('email')}
                      variant={emailVerified ? 'ghost' : 'default'}
                      className="bg-amber-600 hover:bg-amber-700"
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
                        className="bg-green-600 hover:bg-green-700"
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
                      onClick={() => sendPhoneOTP(watch('phone') || '')}
                      disabled={phoneVerified || !watch('phone')}
                      variant={phoneVerified ? 'ghost' : 'default'}
                      className="bg-amber-600 hover:bg-amber-700"
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
                        className="bg-green-600 hover:bg-green-700"
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

            {/* Department/Specific Role based on selection */}
            {selectedCategory === 'government' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department *
                </label>
                <Input
                  {...register('institutionName', { required: 'Department is required' })}
                  placeholder="Enter your department/ministry"
                />
                {errors.institutionName && (
                  <p className="text-red-500 text-sm mt-1">{errors.institutionName.message}</p>
                )}
              </div>
            )}

            {selectedCategory && selectedCategory !== 'government' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specific Role *
                </label>
                <select
                  {...register('institutionName', { required: 'Please select your specific role' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="">Choose your specific role</option>
                  {selectedCategory === 'artists' && 
                    ['Actor', 'Technician', 'Singer', 'Performer', 'Stylist', 'Designer', 'Writer', 'Director', 'Editor', 'Content Creator', 'Producer', 'Distributor', 'Musician'].map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))
                  }
                  {selectedCategory === 'academic' && 
                    ['Student', 'Teacher', 'School', 'College', 'Institute', 'Academy', 'University', 'Professional'].map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))
                  }
                  {selectedCategory === 'media' && 
                    ['Newspaper Media', 'TV Media', 'Digital Media', 'Journalist', 'PR Consultant', 'Product Sponsor', 'Brand Sponsor', 'Advertising Agency', 'Creative Agency', 'PR Agency'].map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))
                  }
                </select>
                {errors.institutionName && (
                  <p className="text-red-500 text-sm mt-1">{errors.institutionName.message}</p>
                )}
              </div>
            )}

            {/* Contribution Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How Would You Like to Contribute to Rajasthan&apos;s Cultural Revival? *
              </label>
              <p className="text-sm text-gray-600 mb-4">Choose one or more ways you&apos;d like to support or participate:</p>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {contributionOptions.map((option, index) => (
                  <label key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors">
                    <input
                      type="checkbox"
                      {...register('interests')}
                      value={option}
                      className="mt-1 rounded border-gray-300 text-amber-600 focus:ring-amber-400"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
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
                  className="mt-1 rounded border-gray-300 text-amber-600 focus:ring-amber-400"
                />
                <span className="text-sm text-gray-700">
                  I support the revival of Rajasthani Cinema, Arts, and Cultural Infrastructure 
                  and request the concerned government departments to take action as per the 
                  proposal outlined on this platform. <strong>I hereby sign this petition.</strong>
                </span>
              </label>

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register('updatesConsent')}
                  className="mt-1 rounded border-gray-300 text-amber-600 focus:ring-amber-400"
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
              className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
              disabled={loading || !emailVerified || !phoneVerified || !verifyCaptcha() || !selectedCategory}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing Petition & Joining Movement...
                </div>
              ) : (
                <>
                  <Crown className="mr-2 h-5 w-5" />
                  Sign Petition & Join Movement
                </>
              )}
            </Button>

            {!selectedCategory && (
              <p className="text-amber-600 text-sm text-center">
                Please select a category above to continue
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SupportPage;