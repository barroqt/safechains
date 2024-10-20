import { Request, Response, NextFunction } from "express";
import * as transferService from "../services/transferService";
import { AppError } from "../middlewares/errorHandler";

export const getAllTransfers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transfers = await transferService.getAllTransfers();
    res.json(transfers);
  } catch (error) {
    next(error);
  }
};

export const getTransfer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transfer = await transferService.getTransferById(req.params.id);
    if (transfer) {
      res.json(transfer);
    } else {
      const error: AppError = new Error("Transfer not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const createTransfer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTransfer = await transferService.createTransfer(req.body);
    res.status(201).json(newTransfer);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Foreign key constraint failed")
    ) {
      const appError: AppError = new Error("Invalid product or actor ID");
      appError.statusCode = 400;
      next(appError);
    } else {
      next(error);
    }
  }
};

export const updateTransfer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedTransfer = await transferService.updateTransfer(
      req.params.id,
      req.body
    );
    if (updatedTransfer) {
      res.json(updatedTransfer);
    } else {
      const error: AppError = new Error("Transfer not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const deleteTransfer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await transferService.deleteTransfer(req.params.id);
    if (deleted) {
      res.status(204).send();
    } else {
      const error: AppError = new Error("Transfer not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const getTransfersByProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transfers = await transferService.getTransfersByProduct(
      req.params.productId
    );
    res.json(transfers);
  } catch (error) {
    next(error);
  }
};

export const getTransfersByActor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transfers = await transferService.getTransfersByActor(
      req.params.actorId
    );
    res.json(transfers);
  } catch (error) {
    next(error);
  }
};
