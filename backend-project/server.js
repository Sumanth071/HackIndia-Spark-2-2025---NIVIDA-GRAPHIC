require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const morgan = require("morgan"); // Logs requests
const helmet = require("helmet"); // Security headers
const compression = require("compression"); // Optimize response size
const connectDB = require("./config/db");

// Initialize Express App
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({
    credentials: true, 
    origin: process.env.CLIENT_URL || "http://localhost:3000" // Dynamic origin
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Support form data
app.use(morgan("dev")); // Logs requests
app.use(helmet()); // Security headers
app.use(compression()); // Optimize responses

// Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET || "default_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production", // Secure in production
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 // 1-hour session
    }
}));

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/proposals", require("./routes/proposalRoutes"));

// Default Route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API!" });
});

// 404 Middleware for Unknown Routes
app.use((req, res, next) => {
    res.status(404).json({ error: "Route Not Found" });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(" Error:", err.message);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

// Server Start
const PORT = process.env.PORT || 6060;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
