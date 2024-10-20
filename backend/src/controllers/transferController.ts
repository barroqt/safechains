import { Request, Response } from "express";
import * as transferService from "../services/transferService";

export const getAllTransfers = async (req: Request, res: Response) => {
  try {
    const transfers = await transferService.getAllTransfers();
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transfers" });
  }
};

export const getTransfer = async (req: Request, res: Response) => {
  try {
    const transfer = await transferService.getTransferById(req.params.id);
    if (transfer) {
      res.json(transfer);
    } else {
      res.status(404).json({ message: "Transfer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching transfer" });
  }
};

export const createTransfer = async (req: Request, res: Response) => {
  try {
    const newTransfer = await transferService.createTransfer(req.body);
    res.status(201).json(newTransfer);
  } catch (error) {
    res.status(400).json({ message: "Error creating transfer" });
  }
};

export const updateTransfer = async (req: Request, res: Response) => {
  try {
    const updatedTransfer = await transferService.updateTransfer(
      req.params.id,
      req.body
    );
    res.json(updatedTransfer);
  } catch (error) {
    res.status(400).json({ message: "Error updating transfer" });
  }
};

export const deleteTransfer = async (req: Request, res: Response) => {
  try {
    await transferService.deleteTransfer(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting transfer" });
  }
};

export const getTransfersByProduct = async (req: Request, res: Response) => {
  try {
    const transfers = await transferService.getTransfersByProduct(
      req.params.productId
    );
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transfers by product" });
  }
};

export const getTransfersByActor = async (req: Request, res: Response) => {
  try {
    const transfers = await transferService.getTransfersByActor(
      req.params.actorId
    );
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transfers by actor" });
  }
};
