import express from "express";
import Note from "../models/Note.js";
import Exam from "../models/Exam.js";
import Roadmap from "../models/Roadmap.js";
import Internship from "../models/Internship.js";
import Syllabus from "../models/Syllabus.js";
import TopResource from "../models/TopResource.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: "Query (q) is required" });

    const searchRegex = { $regex: q, $options: "i" };

    const [notes, exams, roadmaps, internships, syllabuses, topResources] = await Promise.all([
      Note.find({
        $or: [{ title: searchRegex }, { description: searchRegex }, { subject: searchRegex }, { type: searchRegex }]
      }),
      Exam.find({
        $or: [{ name: searchRegex }, { type: searchRegex }]
      }),
      Roadmap.find({
        $or: [{ title: searchRegex }, { description: searchRegex }, { type: searchRegex }]
      }),
      Internship.find({
        $or: [{ position: searchRegex }, { company: searchRegex }, { type: searchRegex }]
      }),
      Syllabus.find({
        $or: [{ title: searchRegex }, { description: searchRegex }, { type: searchRegex }]
      }),
      TopResource.find({
        $or: [{ title: searchRegex }, { description: searchRegex }, {type: searchRegex}]
      })
    ]);

    res.json({
      notes,
      exams,
      roadmaps,
      internships,
      syllabuses,
      topResources
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
