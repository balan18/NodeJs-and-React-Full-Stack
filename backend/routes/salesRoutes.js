const express = require("express");
const {
    createSale,
    getSales,
    getSaleById,
    updateSale,
    deleteSale,
} = require("../controllers/salesController");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Sale:
 *       type: object
 *       required:
 *         - product
 *         - quantity
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the sale
 *         product:
 *           type: string
 *           description: The name of the product
 *         quantity:
 *           type: number
 *           description: The quantity sold
 *         price:
 *           type: number
 *           description: The price of the sale
 *       example:
 *         id: "60d5ec49f72e7c0015a8c8e0"
 *         product: "Laptop"
 *         quantity: 2
 *         price: 1500
 */

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Create a new sale record
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sale'
 *     responses:
 *       201:
 *         description: Sale record created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", createSale);

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Get all sales records
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: A list of all sales records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 *       500:
 *         description: Server error
 */
router.get("/", getSales);

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Get a specific sale by ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The sale ID
 *     responses:
 *       200:
 *         description: Sale record found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       404:
 *         description: Sale not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getSaleById);

/**
 * @swagger
 * /api/sales/{id}:
 *   put:
 *     summary: Update a sales record
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The sale ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sale'
 *     responses:
 *       200:
 *         description: The updated sale record
 *       404:
 *         description: Sale not found
 *       400:
 *         description: Bad request
 */
router.put("/:id", updateSale);

/**
 * @swagger
 * /api/sales/{id}:
 *   delete:
 *     summary: Delete a sales record
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The sale ID
 *     responses:
 *       200:
 *         description: Sale deleted successfully
 *       404:
 *         description: Sale not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteSale);

module.exports = router;
