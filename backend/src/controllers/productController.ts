import { Request, Response } from "express";
import * as productService from "../services/productService";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: "Error creating product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

export const getProductsByManufacturer = async (
  req: Request,
  res: Response
) => {
  try {
    const products = await productService.getProductsByManufacturer(
      req.params.manufacturerId
    );
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products by manufacturer" });
  }
};

export const getProductsByOwner = async (req: Request, res: Response) => {
  try {
    const products = await productService.getProductsByOwner(
      req.params.ownerId
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products by owner" });
  }
};
