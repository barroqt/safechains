import { Request, Response } from "express";
import { Actor } from "../types/actor";
import * as actorService from "../services/actorService";

export const getActors = async (req: Request, res: Response) => {
  try {
    const actors = await actorService.getAllActors();
    res.json(actors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching actors" });
  }
};

export const createActor = async (req: Request, res: Response) => {
  try {
    const newActor = await actorService.createActor(req.body);
    res.status(201).json(newActor);
  } catch (error) {
    res.status(400).json({ message: "Error creating actor" });
  }
};

export const getActor = async (req: Request, res: Response) => {
  try {
    const actor = await actorService.getActorById(req.params.id);
    if (actor) {
      res.json(actor);
    } else {
      res.status(404).json({ message: "Actor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching actor" });
  }
};

export const updateActor = async (req: Request, res: Response) => {
  try {
    const updatedActor = await actorService.updateActor(
      req.params.id,
      req.body
    );
    if (updatedActor) {
      res.json(updatedActor);
    } else {
      res.status(404).json({ message: "Actor not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating actor" });
  }
};

export const deleteActor = async (req: Request, res: Response) => {
  try {
    const deleted = await actorService.deleteActor(req.params.id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Actor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting actor" });
  }
};
