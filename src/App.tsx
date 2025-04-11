import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Users,
  Heart,
  Share2,
  MessageCircle,
  Eye,
  TrendingUp,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Plus,
  Sun,
  Moon,
} from 'lucide-react';
import { create } from 'zustand';

interface SocialAccount {
  platform: string;
  username: string;
  url: string;
}

interface SocialStore {
  accounts: SocialAccount[];
  addAccount: (account: SocialAccount) => void;
}

const useSocialStore = create<SocialStore>((set) => ({
  accounts: [],
  addAccount: (account) => set((state) => ({ accounts: [...state.accounts, account] })),
}));

interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  value: number;
  change: string;
}

interface PlatformCardProps {
  platform: {
    name: string;
    icon: React.ElementType;
    growth: string;
    followers: string;
    username: string;
    url: string;
  };
}

function MetricCard({ icon: Icon, title, value, change }: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
          <h3 className="text-gray-600 dark:text-gray-300 font-medium">{title}</h3>
        </div>
        <span className={`text-sm font-semibold px-2 py-1 rounded ${change.startsWith('+') ? 'text-green-500 bg-green-50 dark:bg-green-900/20' : 'text-red-500 bg-red-50 dark:bg-red-900/20'}`}>
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-800 dark:text-white">{value.toLocaleString()}</p>
    </div>
  );
}

function PlatformCard({ platform }: PlatformCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <platform.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <div className="ml-3">
            <h3 className="font-medium text-gray-800 dark:text-white">{platform.name}</h3>
            <a 
              href={platform.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              @{platform.username}
            </a>
          </div>
        </div>
        <span className="text-green-500 dark:text-green-400 text-sm font-medium px-2 py-1 bg-green-50 dark:bg-green-900/20 rounded">
          {platform.growth}
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-800 dark:text-white">{platform.followers}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Followers</p>
    </div>
  );
}

function AddAccountModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const addAccount = useSocialStore((state) => state.addAccount);
  const [formData, setFormData] = useState({
    platform: 'Instagram',
    username: '',
    url: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAccount(formData);
    onClose();
    setFormData({ platform: 'Instagram', username: '', url: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Add Social Media Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Platform</label>
            <select
              className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200"
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            >
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Facebook">Facebook</option>
              <option value="Twitter">Twitter</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Username</label>
            <input
              type="text"
              className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="@username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Profile URL</label>
            <input
              type="url"
              className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://..."
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
            >
              Add Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [timeframe, setTimeframe] = useState('7d');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    return savedTheme === 'dark' || (!savedTheme && prefersDark);
  });
  
  const accounts = useSocialStore((state) => state.accounts);
  const [metrics, setMetrics] = useState({
    followers: 0,
    engagement: 0,
    reach: 0,
    impressions: 0,
    interactions: {
      likes: 0,
      comments: 0,
      shares: 0
    }
  });

  useEffect(() => {
    // Update class on document element
    document.documentElement.classList.toggle('dark', darkMode);
    // Save preference to localStorage
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        followers: prev.followers + Math.floor(Math.random() * 5),
        engagement: prev.engagement + Math.floor(Math.random() * 10),
        reach: prev.reach + Math.floor(Math.random() * 100),
        impressions: prev.impressions + Math.floor(Math.random() * 200),
        interactions: {
          likes: prev.interactions.likes + Math.floor(Math.random() * 15),
          comments: prev.interactions.comments + Math.floor(Math.random() * 5),
          shares: prev.interactions.shares + Math.floor(Math.random() * 3)
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const platformIcons = {
    Instagram,
    LinkedIn: Linkedin,
    Facebook,
    Twitter
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Social Media Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Real-time social media performance</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Account
            </button>
          </div>
        </div>

        {/* Platform Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {accounts.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 mb-4">No social media accounts connected.</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
              >
                Add your first account
              </button>
            </div>
          ) : (
            accounts.map((account) => (
              <PlatformCard
                key={account.username}
                platform={{
                  name: account.platform,
                  icon: platformIcons[account.platform as keyof typeof platformIcons],
                  growth: '+' + (Math.random() * 5).toFixed(1) + '%',
                  followers: (Math.floor(Math.random() * 50) + 10) + 'K',
                  username: account.username,
                  url: account.url
                }}
              />
            ))
          )}
        </div>

        {accounts.length > 0 && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                icon={Users}
                title="Total Followers"
                value={metrics.followers}
                change="+12.3%"
              />
              <MetricCard
                icon={BarChart3}
                title="Engagement Rate"
                value={metrics.engagement}
                change="+8.1%"
              />
              <MetricCard
                icon={Eye}
                title="Total Reach"
                value={metrics.reach}
                change="+15.7%"
              />
              <MetricCard
                icon={TrendingUp}
                title="Impressions"
                value={metrics.impressions}
                change="+10.4%"
              />
            </div>

            {/* Engagement Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <Heart className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h3 className="text-gray-600 dark:text-gray-300 font-medium">Likes</h3>
                </div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {metrics.interactions.likes.toLocaleString()}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <MessageCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h3 className="text-gray-600 dark:text-gray-300 font-medium">Comments</h3>
                </div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {metrics.interactions.comments.toLocaleString()}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <Share2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h3 className="text-gray-600 dark:text-gray-300 font-medium">Shares</h3>
                </div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {metrics.interactions.shares.toLocaleString()}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <AddAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;