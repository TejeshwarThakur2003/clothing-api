import mongoose from "mongoose";

const ClothingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
});

export default mongoose.model("Clothing", ClothingSchema);