import express from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByManufacturer,
  getProductsByOwner,
} from "../controllers/productController";

const router = express.Router();

// GET /api/products
router.get("/", getAllProducts);

// GET /api/products/:id
router.get("/:id", getProduct);

// POST /api/products
router.post("/", createProduct);

// PUT /api/products/:id
router.put("/:id", updateProduct);

// DELETE /api/products/:id
router.delete("/:id", deleteProduct);

// GET /api/products/manufacturer/:manufacturerId
router.get("/manufacturer/:manufacturerId", getProductsByManufacturer);

// GET /api/products/owner/:ownerId
router.get("/owner/:ownerId", getProductsByOwner);

export default router;
