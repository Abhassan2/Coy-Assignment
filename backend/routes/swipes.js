import express from 'express';
import mongoose from "mongoose";
import Profile from "../models/Profile.js";
import Swipe from "../models/Swipe.js";

const SwipesRouter = express.Router();

// POST /api/swipe  { profileId, action: "like" | "pass" }
// Returns { matched: boolean, profile? } so the UI can show "It's a match!"
SwipesRouter.post("/", async (req, res, next) => {
  try {
    const { profileId, action } = req.body;

    if (!mongoose.isValidObjectId(profileId) || !["like", "pass"].includes(action)) {
      return res
        .status(400)
        .json({ error: "Body must be { profileId: string, action: 'like' | 'pass' }" });
    }

    const profile = await Profile.findById(profileId).select("+likesMe");
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    try {
      await Swipe.create({ profileId, action });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({ error: "Already swiped on this profile" });
      }
      throw err;
    }

    // Match = I liked them AND they had already liked me.
    const matched = action === "like" && profile.likesMe === true;

    res.json({ matched, profile: matched ? profile : undefined });
  } catch (err) {
    next(err);
  }
});

SwipesRouter.delete("/reset", async (req, res, next) => {
  try {
    await Swipe.deleteMany({});

    res.status(200).json({
      success: true,
      message: "Demo reset successfully",
    });
  } catch (error) {
    next(error);
  }
});

export default SwipesRouter;