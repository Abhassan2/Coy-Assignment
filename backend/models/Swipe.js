import mongoose from "mongoose";

const swipeSchema = new mongoose.Schema({    
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },

    action: {
      type: String,
      enum: ["like", "pass"],
      required: true,
    },
  },
  { timestamps: true }
);

const Swipe = mongoose.model("Swipe", swipeSchema);

export default Swipe;