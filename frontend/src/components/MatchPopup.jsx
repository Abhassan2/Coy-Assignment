
import React from "react";

export default function MatchPopup({ profile, onClose }) {
  if (!profile) return null;

  return (
    <div className="match-overlay">
      <div className="match-popup">

        <h1>It's a Match! ❤️</h1>

        <p>You and {profile.name} liked each other.</p>

        <img
          src={profile.photo}
          alt={profile.name}
          className="match-photo"
        />

        <h2>{profile.name}, {profile.age}</h2>

        <p>{profile.city}</p>

        <button onClick={onClose}>
          Continue Swiping
        </button>

      </div>
    </div>
  );
}
