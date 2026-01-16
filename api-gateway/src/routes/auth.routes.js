const express = require("express");
const axios = require("axios");

const router = express.Router();

/**
 * REGISTER → Auth Service
 */
router.post("/register", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/auth/register`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { message: "Auth service error" });
  }
});

/**
 * LOGIN → Auth Service
 */
router.post("/login", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/auth/login`,
      req.body
    );
    console.log()
    res.status(response.status).json(response.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { message: "Auth service error" });
  }
});

module.exports = router;
