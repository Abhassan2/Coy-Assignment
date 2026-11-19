import React, { useEffect, useState } from "react";
import "../App.css";
import DiscoverNav from "../components/DiscoverNav.jsx";
import { Outlet } from "react-router-dom";
import { getFeed } from "../service/feedService.js";

function Discover() {
  const [activeNav, setActiveNav] = useState("swipe");
  const [swipeCards, setSwipeCards] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await getFeed();
        setSwipeCards(response);
      } catch (error) {
        console.error("Error fetching feed:", error);
      }
    };

    fetchFeed();
  }, []);

  return (
    <div className="discover-container">
      <DiscoverNav setTab={setActiveNav} />
      <Outlet context={{ swipeCards }} />
    </div>
  );
}

export default React.memo(Discover);
