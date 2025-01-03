import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, Outlet } from 'react-router-dom';
import { UserCircle, Settings, CreditCard, LogOut, User, Moon, Sun } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import BookingForm from './BookingForm';
import BookingSummary from './BookingSummary';

const ProfileSection = () => {
  const { username } = useUser();
  const { isDark } = useTheme();
  
  return (
    <div className={`rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm p-6`}>
      <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        Profile
      </h2>
      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Username
          </label>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{username}</p>
        </div>
        <div>
          <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Email
          </label>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>user@example.com</p>
        </div>
      </div>
    </div>
  );
};

const SettingsSection = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={`rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm p-6`}>
      <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        Settings
      </h2>
      <div className="space-y-4">
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Settings content goes here...</p>
      </div>
    </div>
  );
};

const PaymentsSection = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={`rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm p-6`}>
      <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        Payments
      </h2>
      <div className="space-y-4">
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Payment history and details go here...</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('booking-form');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { username, setUsername } = useUser();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    setActivePage(path);
    navigate(`/dashboard/${path}`);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    setUsername('');
    navigate('/');
  };

  return (
    <div className={`min-h-screen relative ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${isDark ? 'rgb(45, 45, 45)' : 'rgb(229, 229, 229)'} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDark ? 'rgb(45, 45, 45)' : 'rgb(229, 229, 229)'} 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          backgroundPosition: 'center center',
          opacity: isDark ? '0.3' : '0.5'
        }}
      />

      <div className="relative min-h-screen">
        <header className={`${isDark ? 'bg-gray-800/90' : 'bg-white/90'} shadow-md backdrop-blur-sm sticky top-0 z-50 transition-colors duration-200`}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isDark 
                      ? 'text-gray-200 hover:bg-gray-700/70' 
                      : 'text-gray-700 hover:bg-gray-100/70'
                  }`}
                >
                  <UserCircle className="h-5 w-5" />
                  <span>{username || 'Profile'}</span>
                </button>

                {isProfileOpen && (
                  <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg 
                    ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} 
                    backdrop-blur-sm z-50`}
                  >
                    <div className="py-1">
                      <div className={`px-4 py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                          {username}
                        </p>
                        <p className="text-xs text-gray-500">user@example.com</p>
                      </div>
                      
                      <button
                        onClick={() => handleNavigation('profile')}
                        className={`flex items-center w-full px-4 py-2 text-sm 
                          ${isDark ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <User className="h-4 w-4 mr-3" />
                        User Profile
                      </button>
                      
                      <button
                        onClick={() => handleNavigation('payments')}
                        className={`flex items-center w-full px-4 py-2 text-sm 
                          ${isDark ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <CreditCard className="h-4 w-4 mr-3" />
                        Payments
                      </button>
                      
                      <button
                        onClick={() => handleNavigation('settings')}
                        className={`flex items-center w-full px-4 py-2 text-sm 
                          ${isDark ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Settings
                      </button>
                      
                      <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <button
                          onClick={handleLogout}
                          className={`flex items-center w-full px-4 py-2 text-sm text-red-600 
                            ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Log out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleNavigation('booking-form')}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activePage === 'booking-form'
                      ? 'bg-blue-500 text-white'
                      : isDark 
                        ? 'text-gray-200 hover:bg-gray-700/70'
                        : 'text-gray-700 hover:bg-gray-100/70'
                  }`}
                >
                  Booking Form
                </button>
                <button
                  onClick={() => handleNavigation('booking-summary')}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activePage === 'booking-summary'
                      ? 'bg-blue-500 text-white'
                      : isDark 
                        ? 'text-gray-200 hover:bg-gray-700/70'
                        : 'text-gray-700 hover:bg-gray-100/70'
                  }`}
                >
                  Booking Summary
                </button>
              </div>

              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDark 
                    ? 'text-gray-200 hover:bg-gray-700/70' 
                    : 'text-gray-700 hover:bg-gray-100/70'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto py-6 px-4 relative z-10">
          <Routes>
            <Route path="/profile" element={<ProfileSection />} />
            <Route path="/payments" element={<PaymentsSection />} />
            <Route path="/settings" element={<SettingsSection />} />
            <Route path="/booking-form" element={<BookingForm />} />
            <Route path="/booking-summary" element={<BookingSummary />} />
            <Route path="/" element={<Navigate to="/dashboard/booking-form" replace />} />
          </Routes>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;