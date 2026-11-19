import React from "react";
import { NavLink } from "react-router-dom";

function DiscoverNav({ setTab }) {
  return (
    <div className="discover-navbar navbar">
      <NavLink 
        onClick={()=> setTab("swipe")}
        to="/discover/swipes" className="nav-link">
        Swipe
      </NavLink>
      <NavLink
        onClick={()=> setTab("matches")} 
        to="/discover/matches" className="nav-link">
        Matches
      </NavLink>
    </div>
  );
}

export default React.memo(DiscoverNav);
