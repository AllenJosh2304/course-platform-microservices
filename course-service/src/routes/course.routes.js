const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const router = express.Router();

/**
 * JWT verification middleware
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


/**
 * GET /courses
 * All authenticated users
 */
router.get("/", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, description, price, created_at FROM courses ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch courses error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * POST /courses
 * ADMIN & INSTRUCTOR only
 */
router.post("/", verifyToken, async (req, res) => {
  const { role } = req.user;

  if (role !== "ADMIN" && role !== "INSTRUCTOR") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { title, description, price } = req.body;

  if (!title || !description || price === undefined) {
    return res
      .status(400)
      .json({ message: "Title, description, and price are required" });
  }

  try {
    await pool.query(
      `INSERT INTO courses (title, description, price)
       VALUES ($1, $2, $3)`,
      [title, description, price]
    );

    res.status(201).json({ message: "Course created successfully" });
  } catch (err) {
    console.error("Create course error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

