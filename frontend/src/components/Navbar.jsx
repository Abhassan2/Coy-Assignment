import React from "react";
import { NavLink } from "react-router-dom";
import { House, Compass } from 'lucide-react';

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">
        <House size={18} />
        Home
      </NavLink>

      <NavLink to="/discover" className="nav-link">
        <Compass size={18} />
        Discover
      </NavLink>
    </nav>
  );
}

export default React.memo(Navbar);
