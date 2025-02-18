import express from "express";
import Clothing from "../models/clothing.js";

const router = express.Router();

/**
 * @swagger
 * /api/clothing:
 *   get:
 *     summary: Get all clothing items
 *     responses:
 *       200:
 *         description: List of all clothing items
 */
router.get("/", async (req, res) => {
  try {
    const clothingItems = await Clothing.find();
    res.status(200).json(clothingItems);
  } catch (err) {
    res.status(500).json({ error: "Error fetching clothing items" });
  }
});

/**
 * @swagger
 * /api/clothing:
 *   post:
 *     summary: Add a new clothing item
 *     parameters:
 *       - in: body
 *         name: clothing
 *         description: Clothing item details
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - category
 *             - size
 *             - color
 *             - price
 *             - brand
 *           properties:
 *             name:
 *               type: string
 *             category:
 *               type: string
 *             size:
 *               type: string
 *             color:
 *               type: string
 *             price:
 *               type: number
 *             brand:
 *               type: string
 *     responses:
 *       201:
 *         description: Clothing item added successfully
 */
router.post("/", async (req, res) => {
  try {
    const newClothing = new Clothing(req.body);
    await newClothing.save();
    res.status(201).json(newClothing);
  } catch (err) {
    res.status(400).json({ error: "Error adding clothing item" });
  }
});

/**
 * @swagger
 * /api/clothing/{id}:
 *   get:
 *     summary: Get a clothing item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Clothing item details
 */
router.get("/:id", async (req, res) => {
  try {
    const clothingItem = await Clothing.findById(req.params.id);
    if (!clothingItem) {
      return res.status(404).json({ error: "Clothing item not found" });
    }
    res.status(200).json(clothingItem);
  } catch (err) {
    res.status(500).json({ error: "Error fetching clothing item" });
  }
});

/**
 * @swagger
 * /api/clothing/{id}:
 *   put:
 *     summary: Update a clothing item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: clothing
 *         description: Updated clothing item details
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             category:
 *               type: string
 *             size:
 *               type: string
 *             color:
 *               type: string
 *             price:
 *               type: number
 *             brand:
 *               type: string
 *     responses:
 *       200:
 *         description: Clothing item updated successfully
 */
router.put("/:id", async (req, res) => {
  try {
    const updatedClothing = await Clothing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClothing) {
      return res.status(404).json({ error: "Clothing item not found" });
    }
    res.status(200).json(updatedClothing);
  } catch (err) {
    res.status(500).json({ error: "Error updating clothing item" });
  }
});

/**
 * @swagger
 * /api/clothing/{id}:
 *   delete:
 *     summary: Delete a clothing item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Clothing item deleted successfully
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedClothing = await Clothing.findByIdAndDelete(req.params.id);
    if (!deletedClothing) {
      return res.status(404).json({ error: "Clothing item not found" });
    }
    res.status(200).json({ message: "Clothing item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting clothing item" });
  }
});

export default router;