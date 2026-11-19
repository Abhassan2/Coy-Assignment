import express from 'express';
import Profile from "../models/Profile.js";
import Swipe from "../models/Swipe.js";

const ProfileRouter = express.Router();

// GET /api/profiles -> profiles the user has not swiped yet
ProfileRouter.get("/", async (req, res, next) => {
  try {
    const swipedIds = await Swipe.distinct("profileId");

    // likesMe is select:false, so it is never sent to the client.
    const profiles = await Profile.find({ _id: { $nin: swipedIds } }).sort({ _id: 1 });
    res.json(profiles);
  } catch (err) {
    next(err);
  }
});

export default ProfileRouter;