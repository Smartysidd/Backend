// app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

// Load env variables
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/ratings", require("./routes/ratingRoutes"));

app.get("/", (req, res) => {
  res.send("Welcome to the Store Rating App Backend!");
});

module.exports = app; // export for server.js
