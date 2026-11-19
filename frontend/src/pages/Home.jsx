import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { resetSwipes } from "../service/swipeService.js";

function Home() {
  const navigate = useNavigate();

  const handleReset = useCallback(async () => {
    try {
      const confirmReset = window.confirm(
        "Are you sure you want to reset the demo?"
      );

      if (!confirmReset) return;

      await resetSwipes();

      alert("Demo reset successfully!");

      navigate("/discover/swipes", { replace: true });

    } catch (error) {
      console.error("Reset failed:", error);
      alert(error.message || "Failed to reset demo");
    }
  }, [navigate]);

  return (
    <div className="home-container">
      <div className="welcome-section">
        <span className="welcome-tag">WELCOME</span>

        <h1>
          Welcome to <span>COY Assignment</span>
        </h1>

        <p>
          Your journey starts here. Explore, learn, and make every assignment
          count!
        </p>

        <button className="explore-btn" onClick={() => navigate("/discover/swipes")}>
          Get Started →
        </button>

        <button className="reset-btn" onClick={handleReset}>
          ↻ Reset Demo
        </button>
      </div>
    </div>
  );
}

export default Home;
