import express from 'express';
import Profile from "../models/Profile.js";
import Swipe from "../models/Swipe.js";

const MatchesRouter = express.Router();

// GET /api/matches -> profiles I liked that had already liked me (newest first)

MatchesRouter.get("/", async (req, res, next) => {
  try {
    const matches = await Swipe.find({
      action: "like",
    })
      .populate({
        path: "profileId",
        match: { likesMe: true },
        select: "name age photo bio city interests",
      });

    const matchedProfiles = matches
      .filter((swipe) => swipe.profileId !== null)
      .map((swipe) => swipe.profileId);

    return res.status(200).json({
      success: true,
      count: matchedProfiles.length,
      matches: matchedProfiles,
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default MatchesRouter;