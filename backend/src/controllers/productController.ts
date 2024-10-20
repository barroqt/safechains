import { Request, Response, NextFunction } from "express";
import * as productService from "../services/productService";
import { AppError } from "../middlewares/errorHandler";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      const error: AppError = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint failed")
    ) {
      const appError: AppError = new Error(
        "Product with this ID already exists"
      );
      appError.statusCode = 400;
      next(appError);
    } else {
      next(error);
    }
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body
    );
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      const error: AppError = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await productService.deleteProduct(req.params.id);
    if (deleted) {
      res.status(204).send();
    } else {
      const error: AppError = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const getProductsByManufacturer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productService.getProductsByManufacturer(
      req.params.manufacturerId
    );
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductsByOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productService.getProductsByOwner(
      req.params.ownerId
    );
    res.json(products);
  } catch (error) {
    next(error);
  }
};
