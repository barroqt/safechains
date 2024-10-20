import { Request, Response, NextFunction } from "express";
import * as actorService from "../services/actorService";
import { AppError } from "../middlewares/errorHandler";

export const getAllActors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const actors = await actorService.getAllActors();
    res.json(actors);
  } catch (error) {
    next(error);
  }
};

export const getActor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const actor = await actorService.getActorById(req.params.id);
    if (actor) {
      res.json(actor);
    } else {
      const error: AppError = new Error("Actor not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const createActor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newActor = await actorService.createActor(req.body);
    res.status(201).json(newActor);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint failed")
    ) {
      const appError: AppError = new Error(
        "Actor with this wallet address already exists"
      );
      appError.statusCode = 400;
      next(appError);
    } else {
      next(error);
    }
  }
};

export const updateActor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedActor = await actorService.updateActor(
      req.params.id,
      req.body
    );
    if (updatedActor) {
      res.json(updatedActor);
    } else {
      const error: AppError = new Error("Actor not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const deleteActor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await actorService.deleteActor(req.params.id);
    if (deleted) {
      res.status(204).send();
    } else {
      const error: AppError = new Error("Actor not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
