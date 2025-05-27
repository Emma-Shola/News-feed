import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FeedProvider } from './FeedContext';
import Navbar from './Navbar';
import FeedPage from './FeedPage';
import SavedPage from './SavedPage';
import SettingsPage from './SettingsPage';
import './App.css';

function App() {
  return (
    <FeedProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<FeedPage />} />
              <Route path="/saved" element={<SavedPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </FeedProvider>
  );
}

export default App;