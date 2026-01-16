const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const router = express.Router();

/**
 * JWT verification
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, role }
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/**
 * POST /enrollments
 * STUDENT only → purchase course
 */
router.post("/", verifyToken, async (req, res) => {
  const { userId, role } = req.user;
  const { courseId } = req.body;

  if (role !== "STUDENT") {
    return res.status(403).json({ message: "Only students can enroll" });
  }

  if (!courseId) {
    return res.status(400).json({ message: "courseId required" });
  }

  try {
    await pool.query(
      `INSERT INTO enrollments (user_id, course_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, course_id) DO NOTHING`,
      [userId, courseId]
    );

    res.status(201).json({ message: "Course purchased" });
  } catch (err) {
    console.error("Enroll error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * GET /enrollments/my
 * STUDENT only → fetch purchased courses
 */
router.get("/my", verifyToken, async (req, res) => {
  const { userId, role } = req.user;

  if (role !== "STUDENT") {
    return res.status(403).json({ message: "Only students can view enrollments" });
  }

  try {
    const result = await pool.query(
      `SELECT course_id FROM enrollments WHERE user_id = $1`,
      [userId]
    );

    res.json(result.rows.map(r => r.course_id));
  } catch (err) {
    console.error("Fetch enrollments error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
