import express from "express";
import {
  getSyllabus,
  getSyllabusById,
  addSyllabus,
  updateSyllabus,
  deleteSyllabus
} from "../controllers/syllabusController.js";

const router = express.Router();

// GET all syllabus
router.get("/", getSyllabus);

// GET single syllabus by ID
router.get("/:id", getSyllabusById);

// POST create new syllabus
router.post("/", addSyllabus);

// PUT update existing syllabus
router.put("/:id", updateSyllabus);

// DELETE remove syllabus
router.delete("/:id", deleteSyllabus);

export default router;