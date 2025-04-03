// app.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";         // added for handling CORS
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

import clothingRoutes from "./controllers/clothing.js";  //Import our clothing routes

// Load environment variables from .env
dotenv.config();

//Create an Express app
const app = express();

//Use the PORT from .env or default to 5000
const PORT = process.env.PORT || 5000;

// 1. Configure CORS using the ALLOWED_ORIGIN environment variable.
//    This allows your Angular app to make requests to this API.
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || "*",
}));

// 2. Enhance security with Helmet
app.use(helmet());

// 3. Log incoming requests to the console for debugging
app.use(morgan("dev"));

// 4.Parse incoming JSON payloads in request bodies
app.use(bodyParser.json());

// 5. Connect to MongoDB using the MONGO_URI from .env
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

// 6. Set up Swagger documentation for the API
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Clothing Items API",
      description: "API for managing clothing items with reviews",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./controllers/clothing.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 7. Register the clothing routes under /api/clothing
app.use("/api/clothing", clothingRoutes);

// 8. Default route to verify server is running
app.get("/", (req, res) => {
  res.send("Welcome to the Clothing API! Documentation available at /api-docs");
});

// 9. Serve Angular client files from the public folder 
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

// 10. For any routes not caught by the API, serve the Angular index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 11. Start listening for requests
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});