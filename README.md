## Backend README
# Clothing API (Backend)

This Express-based backend API is part of a MEAN stack application for Assignment 2. It provides all CRUD operations for managing clothing items (including nested reviews) and serves a bundled Angular client from the `public` folder. 

## .env
MONGO_URI=mongodb+srv://tejeshwarthakur2003:Youmewe2515@cluster0.jyi57y9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=5002

## Overview

- **Framework:** Node.js with Express
- **Database:** MongoDB (via Mongoose)
- **Additional Features:**  
  - CORS enabled to allow Angular client access  
  - Bundled Angular app served as static files

## Technologies

- Node.js
- Express
- Mongoose
- MongoDB
- Swagger for API documentation
- Helmet, Morgan, and Body-Parser for security and logging

## Installation

1. **Clone the repository:**
   git clone https://github.com/TejeshwarThakur2003
   cd clothing-api