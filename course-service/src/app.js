const express = require("express");
const cors = require("cors");

const courseRoutes = require("./routes/course.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "Course Service up" });
});

app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);

module.exports = app;
