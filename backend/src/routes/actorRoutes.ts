// src/routes/actorRoutes.ts

import express from "express";
import {
  getActors,
  getActor,
  createActor,
  updateActor,
  deleteActor,
} from "../controllers/actorController";

const router = express.Router();

// GET /api/actors
router.get("/", getActors);

// GET /api/actors/:id
router.get("/:id", getActor);

// POST /api/actors
router.post("/", createActor);

// PUT /api/actors/:id
router.put("/:id", updateActor);

// DELETE /api/actors/:id
router.delete("/:id", deleteActor);

export default router;