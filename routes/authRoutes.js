const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db"); // correct path to db.js
require("dotenv").config(); // for using .env variables

// Register a new user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // ✅ Step 1: Validate input fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill in all required fields" });
  }

  try {
    const [userExists] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (userExists.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // ✅ Step 1: Validate input fields
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all required fields" });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "secretkey", {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

module.exports = router;
