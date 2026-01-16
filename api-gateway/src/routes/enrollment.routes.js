const express = require("express");
const axios = require("axios");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();
const COURSE_SERVICE_URL = "http://localhost:4003";

/**
 * POST /api/enrollments
 */
router.post("/", verifyToken, async (req, res) => {
  try {
    const response = await axios.post(
      `${COURSE_SERVICE_URL}/enrollments`,
      req.body,
      { headers: { Authorization: req.headers.authorization } }
    );

    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Enrollment service error" });
  }
});

/**
 * GET /api/enrollments/my
 */
router.get("/my", verifyToken, async (req, res) => {
  try {
    const response = await axios.get(
      `${COURSE_SERVICE_URL}/enrollments/my`,
      { headers: { Authorization: req.headers.authorization } }
    );

    res.json(response.data);
  } catch {
    res.status(500).json({ message: "Enrollment service error" });
  }
});

module.exports = router;
