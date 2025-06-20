// app/admin/page.tsx - Fixed Admin Dashboard with TypeScript errors resolved
'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Users, 
  Mail, 
  Search, 
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  BarChart3,
  UserCheck,
  MessageSquare,
  Crown,
  AlertCircle,
  RefreshCw,
  FileDown,
  TrendingUp,
  Star,
  Activity,
  Globe,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  collection, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc, 
  query, 
  orderBy,
  Firestore 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';

interface Supporter {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  socialProfile?: string;
  role: string;
  interests: string[];
  message?: string;
  verified: boolean;
  timestamp: { toDate: () => Date } | Date;
  status: 'active' | 'pending' | 'inactive';
  supportConsent: boolean;
  updatesConsent: boolean;
}

interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  newsletter: boolean;
  timestamp: { toDate: () => Date } | Date;
  status: 'new' | 'read' | 'replied';
}

interface ExportData {
  [key: string]: string | number | boolean | Date | string[] | { toDate: () => Date };
}

interface RoleCount {
  role: string;
  count: number;
  percentage: number;
}

const AdminPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'supporters' | 'contacts' | 'analytics'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedSupporterId, setSelectedSupporterId] = useState<string | null>(null);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  // Check admin access
  useEffect(() => {
    if (!user) {
      router.push('/auth');
      return;
    }
    if (user.email !== 'soham@gmail.com') {
      router.push('/');
      toast.error('Access denied. Admin privileges required.');
      return;
    }
    setLoading(false);
  }, [user, router]);

  // Fetch data
  useEffect(() => {
    if (!loading) {
      fetchAllData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const fetchAllData = async () => {
    setDataLoading(true);
    await Promise.all([fetchSupporters(), fetchContacts()]);
    setDataLoading(false);
  };

  const fetchSupporters = async () => {
    try {
      if (!db) {
        throw new Error('Firestore database not initialized');
      }
      
      const q = query(collection(db as Firestore, 'supporters'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const supportersData: Supporter[] = [];
      querySnapshot.forEach((docSnapshot) => {
        supportersData.push({ id: docSnapshot.id, ...docSnapshot.data() } as Supporter);
      });
      setSupporters(supportersData);
    } catch (error) {
      console.error('Error fetching supporters:', error);
      toast.error('Failed to fetch supporters data');
    }
  };

  const fetchContacts = async () => {
    try {
      if (!db) {
        throw new Error('Firestore database not initialized');
      }
      
      const q = query(collection(db as Firestore, 'contacts'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const contactsData: ContactMessage[] = [];
      querySnapshot.forEach((docSnapshot) => {
        contactsData.push({ id: docSnapshot.id, ...docSnapshot.data() } as ContactMessage);
      });
      setContacts(contactsData);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to fetch contacts data');
    }
  };

  const handleDelete = async (collectionName: string, id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;
    
    try {
      if (!db) {
        throw new Error('Firestore database not initialized');
      }
      
      await deleteDoc(doc(db as Firestore, collectionName, id));
      if (collectionName === 'supporters') {
        setSupporters(supporters.filter(s => s.id !== id));
      } else {
        setContacts(contacts.filter(c => c.id !== id));
      }
      toast.success('Entry deleted successfully');
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast.error('Failed to delete entry');
    }
  };

  const handleStatusUpdate = async (collectionName: string, id: string, newStatus: string) => {
    try {
      if (!db) {
        throw new Error('Firestore database not initialized');
      }
      
      await updateDoc(doc(db as Firestore, collectionName, id), { status: newStatus });
      if (collectionName === 'supporters') {
        setSupporters(supporters.map(s => s.id === id ? { ...s, status: newStatus as Supporter['status'] } : s));
      } else {
        setContacts(contacts.map(c => c.id === id ? { ...c, status: newStatus as ContactMessage['status'] } : c));
      }
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const exportToCSV = (data: Supporter[] | ContactMessage[], filename: string) => {
    if (!data.length) {
      toast.error('No data to export');
      return;
    }

    const processedData = data.map(row => {
      const processedRow: ExportData = {};
      Object.entries(row).forEach(([key, value]) => {
        if (value && typeof value === 'object' && 'toDate' in value) {
          processedRow[key] = (value as { toDate: () => Date }).toDate().toISOString();
        } else if (Array.isArray(value)) {
          processedRow[key] = value.join('; ');
        } else {
          processedRow[key] = value;
        }
      });
      return processedRow;
    });

    const headers = Object.keys(processedData[0] || {}).join(',');
    const csvContent = [
      headers,
      ...processedData.map(row => 
        Object.values(row).map(value => 
          typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
        ).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Filter data based on search and status
  const filteredSupporters = supporters.filter(supporter => {
    const matchesSearch = `${supporter.firstName} ${supporter.lastName} ${supporter.email}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || supporter.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = `${contact.firstName} ${contact.lastName} ${contact.email} ${contact.subject}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Analytics data
  const analytics = {
    totalSupporters: supporters.length,
    activeSupporters: supporters.filter(s => s.status === 'active').length,
    totalContacts: contacts.length,
    unreadContacts: contacts.filter(c => c.status === 'new').length,
    verifiedSupporters: supporters.filter(s => s.verified).length,
    newsletterSubscribers: contacts.filter(c => c.newsletter).length,
  };

  // Role distribution
  const roleDistribution: RoleCount[] = Array.from(new Set(supporters.map(s => s.role))).map(role => {
    const count = supporters.filter(s => s.role === role).length;
    const percentage = supporters.length > 0 ? Math.round((count / supporters.length) * 100) : 0;
    return { role, count, percentage };
  });

  // Format date helper
  const formatDate = (timestamp: { toDate: () => Date } | Date): string => {
    try {
      const date = typeof timestamp === 'object' && 'toDate' in timestamp ? timestamp.toDate() : timestamp;
      return date.toLocaleDateString();
    } catch {
      return 'N/A';
    }
  };

  const getSelectedSupporter = () => supporters.find(s => s.id === selectedSupporterId);
  const getSelectedContact = () => contacts.find(c => c.id === selectedContactId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-royal-600 via-purple-600 to-royal-700 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-royal-400/30 to-purple-400/30 animate-pulse"></div>
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div>
                <h1 className="text-4xl font-royal font-bold flex items-center">
                  <Crown className="h-10 w-10 mr-4" />
                  Rasmanch Admin
                </h1>
                <p className="text-white/90 mt-2 text-lg">
                  Complete dashboard for managing supporters and contacts
                </p>
              </div>
              <div className="flex space-x-3">
                <Button 
                  onClick={fetchAllData}
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white/10"
                  disabled={dataLoading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${dataLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button 
                  onClick={() => exportToCSV(
                    activeTab === 'supporters' ? supporters : contacts, 
                    activeTab
                  )}
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  <FileDown className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { 
              icon: Users, 
              label: 'Total Supporters', 
              value: analytics.totalSupporters, 
              color: 'bg-blue-500',
              change: '+12%',
              changeColor: 'text-green-600'
            },
            { 
              icon: UserCheck, 
              label: 'Active Supporters', 
              value: analytics.activeSupporters, 
              color: 'bg-green-500',
              change: '+8%',
              changeColor: 'text-green-600'
            },
            { 
              icon: MessageSquare, 
              label: 'Messages', 
              value: analytics.totalContacts, 
              color: 'bg-purple-500',
              change: '+24%',
              changeColor: 'text-green-600'
            },
            { 
              icon: AlertCircle, 
              label: 'Unread', 
              value: analytics.unreadContacts, 
              color: 'bg-red-500',
              change: '-5%',
              changeColor: 'text-red-600'
            }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${stat.changeColor}`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Enhanced Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50">
            <nav className="flex space-x-0">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3, count: null },
                { id: 'supporters', label: 'Supporters', icon: Users, count: supporters.length },
                { id: 'contacts', label: 'Messages', icon: MessageSquare, count: contacts.length },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp, count: null }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center py-4 px-6 border-b-2 font-medium text-sm transition-all relative ${
                    activeTab === tab.id
                      ? 'border-royal-500 text-royal-600 bg-white'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.label}
                  {tab.count !== null && (
                    <span className={`ml-2 py-1 px-2 rounded-full text-xs font-medium ${
                      activeTab === tab.id ? 'bg-royal-100 text-royal-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Dashboard View */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Activity */}
                  <div className="bg-gradient-to-br from-royal-50 to-purple-50 rounded-xl p-6 border border-royal-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-royal-600" />
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      {supporters.slice(0, 5).map((supporter, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                          <div className="w-8 h-8 bg-royal-100 rounded-full flex items-center justify-center">
                            <span className="text-royal-600 text-xs font-medium">
                              {supporter.firstName.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {supporter.firstName} {supporter.lastName} joined
                            </p>
                            <p className="text-xs text-gray-500">{formatDate(supporter.timestamp)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-green-600" />
                      Platform Overview
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{analytics.verifiedSupporters}</p>
                        <p className="text-sm text-gray-600">Verified</p>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{analytics.newsletterSubscribers}</p>
                        <p className="text-sm text-gray-600">Newsletter</p>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">{roleDistribution.length}</p>
                        <p className="text-sm text-gray-600">Roles</p>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">
                          {Math.round((analytics.totalContacts - analytics.unreadContacts) / Math.max(analytics.totalContacts, 1) * 100)}%
                        </p>
                        <p className="text-sm text-gray-600">Response Rate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Search and Filter for data tabs */}
            {(activeTab === 'supporters' || activeTab === 'contacts') && (
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder={`Search ${activeTab}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-royal-500"
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-royal-500 focus:border-royal-500"
                    aria-label="Filter by status"
                  >
                    <option value="all">All Status</option>
                    {activeTab === 'supporters' ? (
                      <>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="inactive">Inactive</option>
                      </>
                    ) : (
                      <>
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            )}

            {/* Supporters Table */}
            {activeTab === 'supporters' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Supporter
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact & Role
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSupporters.map((supporter) => (
                      <tr key={supporter.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-royal-400 to-purple-500 flex items-center justify-center">
                                <span className="text-white font-semibold text-lg">
                                  {supporter.firstName.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {supporter.firstName} {supporter.lastName}
                              </div>
                              {supporter.verified && (
                                <div className="text-sm text-green-600 flex items-center">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Verified
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{supporter.email}</div>
                          <div className="text-sm text-gray-500">{supporter.phone}</div>
                          <div className="text-sm font-medium text-royal-600">{supporter.role}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                            supporter.status === 'active' 
                              ? 'bg-green-100 text-green-800'
                              : supporter.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {supporter.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(supporter.timestamp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setSelectedSupporterId(supporter.id)}
                              className="text-royal-600 hover:text-royal-900 p-2 rounded-lg hover:bg-royal-50"
                              aria-label="View supporter details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate('supporters', supporter.id, 
                                supporter.status === 'active' ? 'inactive' : 'active'
                              )}
                              className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50"
                              aria-label="Toggle supporter status"
                            >
                              {supporter.status === 'active' ? (
                                <XCircle className="h-4 w-4" />
                              ) : (
                                <CheckCircle className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleDelete('supporters', supporter.id)}
                              className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50"
                              aria-label="Delete supporter"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Contacts Table */}
            {activeTab === 'contacts' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredContacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                                <span className="text-white font-semibold text-lg">
                                  {contact.firstName.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {contact.firstName} {contact.lastName}
                              </div>
                              <div className="text-sm text-gray-500">{contact.email}</div>
                              {contact.newsletter && (
                                <div className="text-sm text-blue-600 flex items-center">
                                  <Mail className="h-4 w-4 mr-1" />
                                  Newsletter
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate font-medium">
                            {contact.subject}
                          </div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {contact.message}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                            contact.status === 'new' 
                              ? 'bg-red-100 text-red-800'
                              : contact.status === 'read'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {contact.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(contact.timestamp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setSelectedContactId(contact.id)}
                              className="text-royal-600 hover:text-royal-900 p-2 rounded-lg hover:bg-royal-50"
                              aria-label="View contact details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate('contacts', contact.id, 'read')}
                              className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50"
                              aria-label="Mark as read"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete('contacts', contact.id)}
                              className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50"
                              aria-label="Delete contact"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Analytics View */}
            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { 
                      label: 'Total Supporters', 
                      value: analytics.totalSupporters, 
                      icon: Users,
                      color: 'text-blue-600',
                      bgColor: 'bg-blue-50'
                    },
                    { 
                      label: 'Verified Supporters', 
                      value: analytics.verifiedSupporters, 
                      icon: UserCheck,
                      color: 'text-green-600',
                      bgColor: 'bg-green-50'
                    },
                    { 
                      label: 'Newsletter Subscribers', 
                      value: analytics.newsletterSubscribers, 
                      icon: Mail,
                      color: 'text-purple-600',
                      bgColor: 'bg-purple-50'
                    },
                    { 
                      label: 'Contact Messages', 
                      value: analytics.totalContacts, 
                      icon: MessageSquare,
                      color: 'text-indigo-600',
                      bgColor: 'bg-indigo-50'
                    },
                    { 
                      label: 'Unread Messages', 
                      value: analytics.unreadContacts, 
                      icon: AlertCircle,
                      color: 'text-red-600',
                      bgColor: 'bg-red-50'
                    },
                    { 
                      label: 'Response Rate', 
                      value: `${Math.round((analytics.totalContacts - analytics.unreadContacts) / Math.max(analytics.totalContacts, 1) * 100)}%`, 
                      icon: BarChart3,
                      color: 'text-orange-600',
                      bgColor: 'bg-orange-50'
                    }
                  ].map((stat, index) => (
                    <div key={index} className={`${stat.bgColor} rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                          <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                        </div>
                        <stat.icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Role Distribution Chart */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <BarChart3 className="h-6 w-6 mr-2 text-royal-600" />
                    Supporter Roles Distribution
                  </h3>
                  <div className="space-y-4">
                    {roleDistribution.map((roleData, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full bg-royal-600"></div>
                          <span className="text-gray-700 font-medium">{roleData.role}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-32 bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-royal-500 to-purple-600 h-3 rounded-full transition-all duration-500" 
                              style={{ width: `${roleData.percentage}%` }}
                            ></div>
                          </div>
                          <div className="text-right min-w-[60px]">
                            <div className="text-sm font-bold text-gray-900">{roleData.count}</div>
                            <div className="text-xs text-gray-500">{roleData.percentage}%</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Geographic Distribution */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <MapPin className="h-6 w-6 mr-2 text-green-600" />
                    Geographic Insights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                      <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">Rajasthan</p>
                      <p className="text-sm text-gray-600">Primary Region</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                      <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">National</p>
                      <p className="text-sm text-gray-600">Reach</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">Growing</p>
                      <p className="text-sm text-gray-600">Engagement</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Supporter Detail Modal */}
        {selectedSupporterId && getSelectedSupporter() && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">Supporter Details</h3>
                  <button
                    onClick={() => setSelectedSupporterId(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <XCircle className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {(() => {
                  const supporter = getSelectedSupporter()!;
                  return (
                    <>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-royal-400 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xl">
                            {supporter.firstName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {supporter.firstName} {supporter.lastName}
                          </h4>
                          <p className="text-gray-600">{supporter.email}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Phone</label>
                          <p className="text-gray-900">{supporter.phone}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Role</label>
                          <p className="text-gray-900">{supporter.role}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Status</label>
                          <p className="text-gray-900 capitalize">{supporter.status}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Verified</label>
                          <p className="text-gray-900">{supporter.verified ? 'Yes' : 'No'}</p>
                        </div>
                      </div>
                      {supporter.interests?.length > 0 && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Interests</label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {supporter.interests.map((interest, index) => (
                              <span key={index} className="px-3 py-1 bg-royal-100 text-royal-700 rounded-full text-sm">
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {supporter.message && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Message</label>
                          <p className="text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">{supporter.message}</p>
                        </div>
                      )}
                      {supporter.socialProfile && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Social Profile</label>
                          <a href={supporter.socialProfile} target="_blank" rel="noopener noreferrer" className="text-royal-600 hover:text-royal-700">
                            {supporter.socialProfile}
                          </a>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Contact Detail Modal */}
        {selectedContactId && getSelectedContact() && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">Contact Message</h3>
                  <button
                    onClick={() => setSelectedContactId(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <XCircle className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {(() => {
                  const contact = getSelectedContact()!;
                  return (
                    <>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xl">
                            {contact.firstName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {contact.firstName} {contact.lastName}
                          </h4>
                          <p className="text-gray-600">{contact.email}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Subject</label>
                          <p className="text-gray-900 font-medium">{contact.subject}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Status</label>
                          <p className="text-gray-900 capitalize">{contact.status}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Newsletter</label>
                          <p className="text-gray-900">{contact.newsletter ? 'Subscribed' : 'Not subscribed'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Date</label>
                          <p className="text-gray-900">{formatDate(contact.timestamp)}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Message</label>
                        <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-900 whitespace-pre-wrap">{contact.message}</p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <Button 
                          onClick={() => handleStatusUpdate('contacts', contact.id, 'replied')}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Mark as Replied
                        </Button>
                        <Button 
                          onClick={() => window.location.href = `mailto:${contact.email}?subject=Re: ${contact.subject}`}
                          size="sm"
                          variant="outline"
                        >
                          Reply via Email
                        </Button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;