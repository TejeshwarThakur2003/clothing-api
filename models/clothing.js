import mongoose from "mongoose";

// Define the structure for an individual review
const ReviewSchema = new mongoose.Schema({
  username: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  postedAt: { type: Date, default: Date.now },
});

//Define the structure for a clothing item
const ClothingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  // Nested array of reviews
  reviews: [ReviewSchema],
});

// Export the Mongoose model
export default mongoose.model("Clothing", ClothingSchema);