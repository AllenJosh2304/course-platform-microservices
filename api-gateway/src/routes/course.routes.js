const express = require("express");
const axios = require("axios");
const { verifyToken, allowRoles } = require("../middleware/auth.middleware");

const router = express.Router();

const COURSE_SERVICE_URL = "http://localhost:4003";

/**
 * GET /api/courses
 * All authenticated users
 */
router.get("/", verifyToken, async (req, res) => {
  try {
    const response = await axios.get(
      `${COURSE_SERVICE_URL}/courses`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Gateway fetch courses error:", err.message);
    res.status(500).json({ message: "Course service error" });
  }
});

/**
 * POST /api/courses
 * ADMIN & INSTRUCTOR only
 */
router.post(
  "/",
  verifyToken,
  allowRoles("ADMIN", "INSTRUCTOR"),
  async (req, res) => {
    try {
      const response = await axios.post(
        `${COURSE_SERVICE_URL}/courses`,
        req.body,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        }
      );

      res.status(response.status).json(response.data);
    } catch (err) {
      console.error("Gateway create course error:", err.message);
      res.status(500).json({ message: "Course service error" });
    }
  }
);

module.exports = router;
