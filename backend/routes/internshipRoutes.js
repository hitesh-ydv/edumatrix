import express from "express";
import Internship from "../models/Internship.js"
const router = express.Router();

// Create
router.post("/", async (req, res) => {
  try {
    const item = new Internship(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all (optional filters: company, status, location, search, skill)
router.get("/", async (req, res) => {
  try {
    const { company, status, location, search, skill } = req.query;
    const q = {};
    if (company) q.company = company;
    if (status) q.status = status;
    if (location) q.location = location;
    if (skill) q.skills = { $elemMatch: { $regex: skill, $options: "i" } };
    if (search) {
      q.$or = [
        { position: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }
    const items = await Internship.find(q).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read one
router.get("/:id", async (req, res) => {
  try {
    const item = await Internship.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const updated = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Internship.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
