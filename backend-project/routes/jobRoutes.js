const express = require("express");
const {
    getJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
} = require("../controllers/jobController");

const router = express.Router();

// Logging middleware for debugging
router.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url} - Body:`, req.body);
    next();
});

// Routes for Jobs
router.get("/", getJobs); // Fetch all jobs
router.get("/:id", getJobById); // Fetch single job by ID
router.post("/", createJob); // Create a new job
router.put("/:id", updateJob); // Update an existing job
router.delete("/:id", deleteJob); // Delete a job

module.exports = router;
