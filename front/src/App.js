import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import InvitationPage from './components/InvitationPage';
import React from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/invitation/:inviteId" element={<InvitationPage />} />
        <Route path="/" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;