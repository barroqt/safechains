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

/**
 * @swagger
 * /transfers:
 *   get:
 *     summary: Retrieve a list of transfers
 *     tags: [Transfers]
 *     responses:
 *       200:
 *         description: A list of transfers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transfer'
 */
router.get("/", getAllTransfers);

/**
 * @swagger
 * /transfers/{id}:
 *   get:
 *     summary: Get a transfer by ID
 *     tags: [Transfers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A transfer object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transfer'
 *       404:
 *         description: Transfer not found
 */
router.get("/:id", getTransfer);

/**
 * @swagger
 * /transfers:
 *   post:
 *     summary: Create a new transfer
 *     tags: [Transfers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransferInput'
 *     responses:
 *       201:
 *         description: The created transfer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transfer'
 *       400:
 *         description: Invalid input
 */
router.post("/", createTransfer);

/**
 * @swagger
 * /transfers/{id}:
 *   put:
 *     summary: Update a transfer
 *     tags: [Transfers]
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
 *             $ref: '#/components/schemas/TransferUpdateInput'
 *     responses:
 *       200:
 *         description: The updated transfer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transfer'
 *       404:
 *         description: Transfer not found
 */
router.put("/:id", updateTransfer);

/**
 * @swagger
 * /transfers/{id}:
 *   delete:
 *     summary: Delete a transfer
 *     tags: [Transfers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Transfer successfully deleted
 *       404:
 *         description: Transfer not found
 */
router.delete("/:id", deleteTransfer);

/**
 * @swagger
 * /transfers/product/{productId}:
 *   get:
 *     summary: Get transfers by product ID
 *     tags: [Transfers]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of transfers for the specified product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transfer'
 */
router.get("/product/:productId", getTransfersByProduct);

/**
 * @swagger
 * /transfers/actor/{actorId}:
 *   get:
 *     summary: Get transfers by actor ID
 *     tags: [Transfers]
 *     parameters:
 *       - in: path
 *         name: actorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of transfers for the specified actor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transfer'
 */
router.get("/actor/:actorId", getTransfersByActor);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Transfer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         productId:
 *           type: string
 *         fromActorId:
 *           type: string
 *         toActorId:
 *           type: string
 *         transferMethod:
 *           type: string
 *           enum: [QR_CODE, CRYPTO_TRANSACTION]
 *         status:
 *           type: string
 *           enum: [PENDING, COMPLETED, FAILED]
 *         timestamp:
 *           type: string
 *           format: date-time
 *     TransferInput:
 *       type: object
 *       required:
 *         - productId
 *         - fromActorId
 *         - toActorId
 *         - transferMethod
 *       properties:
 *         productId:
 *           type: string
 *         fromActorId:
 *           type: string
 *         toActorId:
 *           type: string
 *         transferMethod:
 *           type: string
 *           enum: [QR_CODE, CRYPTO_TRANSACTION]
 *     TransferUpdateInput:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [PENDING, COMPLETED, FAILED]
 */
