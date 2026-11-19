import React, { useState, useRef } from "react";
import SwipeCard from "../components/SwipeCard";
import { useOutletContext } from "react-router-dom";
import ActionButtons from "../components/ActionButtons";
import { saveSwipe } from "../service/swipeService.js";
import MatchPopup from "../components/MatchPopup.jsx";

export default function Swipe() {
  const { swipeCards } = useOutletContext();

  const [matchedProfile, setMatchedProfile] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [loading, setLoading] = useState(false);

  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startX = useRef(0);
  const dragXRef = useRef(0);
  const draggingRef = useRef(false);
  const visibleCards = swipeCards.slice(currentIndex, currentIndex + 3);

  const handleDragStart = (e) => {
    if (direction || loading) return;

    draggingRef.current = true;
    startX.current = e.clientX;

    dragXRef.current = 0;

    setDragX(0);
    setIsDragging(true);

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleDragMove = (e) => {
    if (!draggingRef.current) return;

    const distance = e.clientX - startX.current;

    dragXRef.current = distance;
    setDragX(distance);
  };

  const handleDragEnd = () => {
    if (!draggingRef.current) return;

    draggingRef.current = false;
    setIsDragging(false);

    const distance = dragXRef.current;

    if (distance > 100) {
      setDirection("right");
    } else if (distance < -100) {
      setDirection("left");
    } else {
      dragXRef.current = 0;
      setDragX(0);
    }
  };

  const handleSwipe = (dir) => {
    if (direction || currentIndex >= swipeCards.length) return;
    setDirection(dir);
  };

  const handleAnimationEnd = async () => {
    if (!direction || loading) return;

    const currentProfile = swipeCards[currentIndex];

    if (!currentProfile) return;

    setLoading(true);

    try {
      const result = await saveSwipe(
        currentProfile._id,
        direction === "right" ? "like" : "pass",
      );

      // Show match screen only for mutual likes
      if (result.matched) {
        setMatchedProfile(result.profile);
      }

      setCurrentIndex((prev) => prev + 1);
      setDirection(null);
      setDragX(0);
      dragXRef.current = 0;
    } catch (error) {
      console.error("Swipe failed:", error.response?.data || error.message);

      setDirection(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-container">
      {visibleCards.length === 0 && <p>No more profiles</p>}

      {visibleCards.map((swipe, index) => (
        <SwipeCard
          key={swipe?._id}
          swipe={swipe}
          index={index}
          length={visibleCards.length}
          direction={index === 0 ? direction : null}
          onAnimationEnd={index === 0 ? handleAnimationEnd : undefined}
          dragX={index === 0 ? dragX : 0}
          isDragging={index === 0 ? isDragging : false}
          onDragStart={index === 0 ? handleDragStart : undefined}
          onDragMove={index === 0 ? handleDragMove : undefined}
          onDragEnd={index === 0 ? handleDragEnd : undefined}
        />
      ))}
      <ActionButtons
        onLike={() => handleSwipe("right")}
        onPass={() => handleSwipe("left")}
      />

      {/* Match popup */}
      <MatchPopup
        profile={matchedProfile}
        onClose={() => setMatchedProfile(null)}
      />
    </div>
  );
}
