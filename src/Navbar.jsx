import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">University Feed</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/saved">Saved Articles</Link></li>
        <li><Link to="/settings">Preferences</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;