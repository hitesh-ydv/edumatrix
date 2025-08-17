import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import syllabusRoutes from "./routes/syllabusRoutes.js";
import topResourceRoutes from "./routes/topResourceRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Syllabus API is running...");
});

app.use("/api/syllabus", syllabusRoutes);
app.use("/api/top-resources", topResourceRoutes);
app.use("/api/roadmaps", roadmapRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/search", searchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
