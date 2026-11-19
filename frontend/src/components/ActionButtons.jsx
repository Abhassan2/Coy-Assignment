// Pass / Like buttons. They do the same thing as dragging the card,
// which is how desktop users swipe.
import React from "react";
import { Heart, X } from 'lucide-react';

function ActionButtons({ onPass, onLike, disabled = false }) {
  return (
    <div className="actions">
      <button
        type="button"
        className="action-btn action-btn--pass"
        onClick={onPass}
        disabled={disabled}
        aria-label="Pass"
      >
        <X size={35} />
      </button>
      <button
        type="button"
        className="action-btn action-btn--like"
        onClick={onLike}
        disabled={disabled}
        aria-label="Like"
      >
        <Heart size={35} />
      </button>
    </div>
  );
}

export default React.memo(ActionButtons);