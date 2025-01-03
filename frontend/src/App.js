import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThreeDCardDemo } from './components/ThreeDCardDemo';
import Dashboard from './components/Dashboard';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ThreeDCardDemo />} />
            <Route path="/dashboard/*" element={<Dashboard />}>
              <Route path="booking-form" element={<Navigate to="/dashboard/booking-form" />} />
              <Route path="booking-summary" element={<Navigate to="/dashboard/booking-summary" />} />
              <Route path="profile" element={<Navigate to="/dashboard/profile" />} />
              <Route path="" element={<Navigate to="/dashboard/booking-form" replace />} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;