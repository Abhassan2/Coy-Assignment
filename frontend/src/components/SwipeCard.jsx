import React from "react";

function SwipeCard({
  swipe,
  index,
  length,
  direction,
  onAnimationEnd,
  dragX,
  isDragging,
  onDragEnd,
  onDragMove,
  onDragStart,
}) {
  const cardStyle = {
    zIndex: length - index,
    transform: direction
      ? `translateX(${direction === "right" ? "150%" : "-150%"}) rotate(${direction === "right" ? 20 : -20}deg)`
      : `translateX(${dragX}px) rotate(${dragX * 0.06}deg)`,

    transition: isDragging ? "none" : "transform 350ms ease",
  };

  return (
    <>
      <div
        className={`swipe-card`}
        style={cardStyle}
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
        onTransitionEnd={(e) => {
          if (e.propertyName === "transform" && direction) {
            onAnimationEnd?.();
          }
        }}
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

export default React.memo(SwipeCard);
