import React, { useEffect, useState } from "react";
import MatchCard from "../components/MatchCard.jsx";
import { getMatches } from "../service/matchesService.js";


export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const { count, matches } = await getMatches();
        setMatches(matches);
      } catch (error) {
        console.error("Failed to fetch matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <p>Loading matches...</p>;

  return (
    <div className="matches-container">
      <div>
        <h4>your matches: {matches?.length}</h4>
      </div>

      <div>
        {matches?.length === 0 ? (
          <p>No matches yet ❤️</p>
        ) : (
          matches.map((profile, index) => (
            <MatchCard key={profile?._id} swipe={profile} />
          ))
        )}
      </div>
    </div>
  );
}
