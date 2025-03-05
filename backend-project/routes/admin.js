const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/proposals", require("./routes/proposalRoutes"));

module.exports = router;
