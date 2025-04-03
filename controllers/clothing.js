// controllers/clothing.js
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
 *         description: List of clothing items
 */
router.get("/", async (req, res) => {
  try {
    // Fetch all clothing items from the database
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - size
 *               - color
 *               - price
 *               - brand
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               size:
 *                 type: string
 *               color:
 *                 type: string
 *               price:
 *                 type: number
 *               brand:
 *                 type: string
 *     responses:
 *       201:
 *         description: Clothing item added successfully
 */
router.post("/", async (req, res) => {
  try {
    // Create a new Clothing document with the request body
    const newClothing = new Clothing(req.body);
    await newClothing.save();  // Save to MongoDB
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
    // Find a single clothing item by its Mongodb id
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               size:
 *                 type: string
 *               color:
 *                 type: string
 *               price:
 *                 type: number
 *               brand:
 *                 type: string
 *     responses:
 *       200:
 *         description: Clothing item updated successfully
 */
router.put("/:id", async (req, res) => {
  try {
    // Update a clothing item by its ID and return the new version
    const updatedClothing = await Clothing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
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
    // Remove a clothing item by its ID
    const deletedClothing = await Clothing.findByIdAndDelete(req.params.id);
    if (!deletedClothing) {
      return res.status(404).json({ error: "Clothing item not found" });
    }
    res.status(200).json({ message: "Clothing item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting clothing item" });
  }
});

/**
 * @swagger
 * /api/clothing/{id}/reviews:
 *   post:
 *     summary: Add a review to a clothing item
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
 *             type: object
 *             required:
 *               - username
 *               - rating
 *               - comment
 *             properties:
 *               username:
 *                 type: string
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review added successfully
 */
router.post("/:id/reviews", async (req, res) => {
  try {
    // Find the clothing item by ID
    const clothingItem = await Clothing.findById(req.params.id);
    if (!clothingItem) {
      return res.status(404).json({ error: "Clothing item not found" });
    }
    // Push the new review into the reviews array
    clothingItem.reviews.push(req.body);
    await clothingItem.save();
    res.status(201).json(clothingItem);
  } catch (err) {
    res.status(500).json({ error: "Error adding review" });
  }
});

export default router;