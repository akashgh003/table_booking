import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const BookingSummary = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/bookings');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch bookings');
      }

      setBookings(result.data || []);
      setError('');
    } catch (err) {
      setError('Failed to load bookings');
      console.error('Error:', err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);
const handleDeleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete booking');
        }
  
        await fetchBookings();
        
      } catch (err) {
        setError(err.message || 'Failed to delete booking');
        console.error('Delete Error:', err);
      }
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (!booking) return false;
    
    const matchesSearch = 
      booking.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.contact?.includes(searchQuery);
      
    const today = new Date().toISOString().split('T')[0];
    
    if (filter === 'today') {
      return booking.date === today && matchesSearch;
    } else if (filter === 'upcoming') {
      return booking.date > today && matchesSearch;
    }
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>
        <div className="text-xl">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm rounded-lg shadow-lg p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Current Bookings
        </h1>
        <button
          onClick={() => navigate('/dashboard/booking-form')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          New Booking
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded transition-colors duration-200 ${
              filter === 'all' 
                ? 'bg-blue-500 text-white' 
                : isDark 
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('today')}
            className={`px-4 py-2 rounded transition-colors duration-200 ${
              filter === 'today' 
                ? 'bg-blue-500 text-white' 
                : isDark 
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded transition-colors duration-200 ${
              filter === 'upcoming' 
                ? 'bg-blue-500 text-white' 
                : isDark 
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Upcoming
          </button>
        </div>
        <input
          type="text"
          placeholder="Search by name or contact..."
          className={`px-4 py-2 rounded w-full sm:w-auto ${
            isDark 
              ? 'bg-gray-700 text-gray-200 placeholder-gray-400 border-gray-600' 
              : 'bg-white text-gray-900 border-gray-300'
          } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={`overflow-x-auto rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium ${
                isDark ? 'text-gray-200' : 'text-gray-500'
              } uppercase tracking-wider`}>
                Name
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${
                isDark ? 'text-gray-200' : 'text-gray-500'
              } uppercase tracking-wider`}>
                Date & Time
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${
                isDark ? 'text-gray-200' : 'text-gray-500'
              } uppercase tracking-wider`}>
                Guests
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${
                isDark ? 'text-gray-200' : 'text-gray-500'
              } uppercase tracking-wider`}>
                Contact
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${
                isDark ? 'text-gray-200' : 'text-gray-500'
              } uppercase tracking-wider`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td className={`px-6 py-4 whitespace-nowrap ${
                  isDark ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  <div className="text-sm font-medium">{booking.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                    {new Date(booking.date).toLocaleDateString()}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {booking.time}
                  </div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  isDark ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  {booking.guests} people
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  isDark ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  {booking.contact}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDeleteBooking(booking.id)}
                    className="text-red-600 hover:text-red-900 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredBookings.length === 0 && (
        <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          No bookings found
        </div>
      )}
    </div>
  );
};

export default BookingSummary;