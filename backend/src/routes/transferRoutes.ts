import express from "express";
import {
  getAllTransfers,
  getTransfer,
  createTransfer,
  updateTransfer,
  deleteTransfer,
  getTransfersByProduct,
  getTransfersByActor,
} from "../controllers/transferController";

const router = express.Router();

// GET /api/transfers
router.get("/", getAllTransfers);

// GET /api/transfers/:id
router.get("/:id", getTransfer);

// POST /api/transfers
router.post("/", createTransfer);

// PUT /api/transfers/:id
router.put("/:id", updateTransfer);

// DELETE /api/transfers/:id
router.delete("/:id", deleteTransfer);

// GET /api/transfers/product/:productId
router.get("/product/:productId", getTransfersByProduct);

// GET /api/transfers/actor/:actorId
router.get("/actor/:actorId", getTransfersByActor);

export default router;
