import express from "express";
import {
  addTopResource,
  getTopResources,
  getTopResourceById,
  updateTopResource,
  deleteTopResource
} from "../controllers/topResourceController.js";

const router = express.Router();

// CRUD Routes for Top Resources
router.post("/", addTopResource);          // CREATE
router.get("/", getTopResources);          // READ (all)
router.get("/:id", getTopResourceById);    // READ (single)
router.put("/:id", updateTopResource);     // UPDATE
router.delete("/:id", deleteTopResource);  // DELETE

export default router;