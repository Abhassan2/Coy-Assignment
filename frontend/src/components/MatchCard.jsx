import React from "react";

// const swipe = {
//   name: "abid",
//   age: 24,
//   citi: "New Delhi",
//   bio: "Hii i am a software developer",
//   interests: ["cricket", "Drawing", "chess"],
// };

export default function MatchCard({ swipe }) {
  return (
    <>
      <div
        className="match-card"
      >
        <img
          src={
            swipe?.photo ||
            "https://tse3.mm.bing.net/th/id/OIP.sdQd5FCGtWByiQqvHdJc2wHaHa?r=0&w=480&h=480&rs=1&pid=ImgDetMain&o=7&rm=3"
          }
          alt="profile-image"
        />

        <div className="info">
          <h1>
            {swipe?.name}, {swipe?.age}
          </h1>
          <h4>{swipe?.city || "delhi"}</h4>
          <p>{swipe?.bio || "jdhbjh"}</p>
          <div>
            {swipe?.interests?.map((interest, index) => (
              <span key={index}>{interest || "jdhbjh"}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
