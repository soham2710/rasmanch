// app/auth/page.tsx - Updated Authentication Page
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Crown, Mail, Lock, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { login, signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success('Welcome back!');
        router.push('/');
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        await signup(formData.email, formData.password);
        toast.success('Account created successfully!');
        router.push('/');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-50 to-desert-50 pt-24 pb-12 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-royal-100 overflow-hidden">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-royal-600 via-purple-600 to-royal-700 px-8 py-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-royal-400/50 to-purple-400/50 animate-pulse"></div>
            <div className="relative">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                    <Crown className="h-10 w-10 text-white" />
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-gold-300 animate-pulse" />
                </div>
              </div>
              <h1 className="text-2xl font-royal font-bold text-white">
                {isLogin ? 'Welcome Back' : 'Join Rasmanch'}
              </h1>
              <p className="text-white/90 mt-2">
                {isLogin 
                  ? 'Sign in to your account' 
                  : 'Create an account to support the revival'
                }
              </p>
            </div>
          </div>

          {/* Enhanced Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-royal-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-royal-500 transition-colors"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-royal-500 transition-colors"
                    required
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-royal-600 to-purple-600 hover:from-royal-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                <>
                  <User className="mr-2 h-5 w-5" />
                  {isLogin ? 'Sign In' : 'Create Account'}
                </>
              )}
            </Button>
          </form>

          {/* Enhanced Toggle */}
          <div className="px-8 pb-8 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-royal-600 hover:text-royal-700 font-medium transition-colors"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-royal-100">
          <p className="text-sm text-gray-600">
            Join the movement to revive Rajasthani cinema and culture
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;