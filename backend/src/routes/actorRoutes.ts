import express from "express";
import {
  getAllActors,
  getActor,
  createActor,
  updateActor,
  deleteActor,
} from "../controllers/actorController";

const router = express.Router();

/**
 * @swagger
 * /actors:
 *   get:
 *     summary: Retrieve a list of actors
 *     tags: [Actors]
 *     responses:
 *       200:
 *         description: A list of actors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Actor'
 */
router.get("/", getAllActors);

/**
 * @swagger
 * /actors/{id}:
 *   get:
 *     summary: Get an actor by ID
 *     tags: [Actors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An actor object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Actor'
 *       404:
 *         description: Actor not found
 */
router.get("/:id", getActor);

/**
 * @swagger
 * /actors:
 *   post:
 *     summary: Create a new actor
 *     tags: [Actors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActorInput'
 *     responses:
 *       201:
 *         description: The created actor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Actor'
 *       400:
 *         description: Invalid input
 */
router.post("/", createActor);

/**
 * @swagger
 * /actors/{id}:
 *   put:
 *     summary: Update an actor
 *     tags: [Actors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActorInput'
 *     responses:
 *       200:
 *         description: The updated actor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Actor'
 *       404:
 *         description: Actor not found
 */
router.put("/:id", updateActor);

/**
 * @swagger
 * /actors/{id}:
 *   delete:
 *     summary: Delete an actor
 *     tags: [Actors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Actor successfully deleted
 *       404:
 *         description: Actor not found
 */
router.delete("/:id", deleteActor);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Actor:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         role:
 *           type: string
 *         contactInfo:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *         walletAddress:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ActorInput:
 *       type: object
 *       required:
 *         - name
 *         - role
 *         - contactInfo
 *         - walletAddress
 *       properties:
 *         name:
 *           type: string
 *         role:
 *           type: string
 *         contactInfo:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *         walletAddress:
 *           type: string
 */
