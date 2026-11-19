import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import ProfileRouter from './routes/profiles.js';
import MatchesRouter from './routes/matches.js';
import SwipesRouter from './routes/swipes.js';

const app = express();
app.use(cors({origin: process.env.CLIENT_URI || "http://localhost:5173"}));
app.use(express.json());

app.get("/", (req, res) => res.json({ ok: true, message: "Server running!" }));
app.use("/feed", ProfileRouter);
app.use("/swipes", SwipesRouter);
app.use("/matches", MatchesRouter);


// Central error handler
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});


const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error("Could not connect to MongoDB:", err.message);
    process.exit(1);
  });