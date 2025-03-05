const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Freelancer & Business Registration
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role, skills, experience, portfolio, hourlyRate, certifications, location, availability, companyName, industry, description, website, hiringNeeds } = req.body;

        // Validate required fields
        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: "All required fields must be filled" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prepare user object
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            isVerified: false, // Requires admin approval
            status: "pending"
        });

        if (role === "freelancer") {
            newUser.skills = skills;
            newUser.experience = experience;
            newUser.portfolio = portfolio;
            newUser.hourlyRate = hourlyRate;
            newUser.certifications = certifications;
            newUser.location = location;
            newUser.availability = availability;
        } else if (role === "business") {
            newUser.companyName = companyName;
            newUser.industry = industry;
            newUser.description = description;
            newUser.website = website;
            newUser.hiringNeeds = hiringNeeds;
        }

        await newUser.save();
        res.status(201).json({ message: "User registered successfully, pending admin approval" });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        if (!user.isVerified) {
            return res.status(403).json({ error: "Your account is not verified yet. Please wait for admin approval." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        req.session.user = { id: user._id, name: user.name, email: user.email, role: user.role };
        res.json({ message: "User logged in successfully", user: req.session.user });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Logout User
exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Logout failed" });
        }
        res.json({ message: "User logged out successfully" });
    });
};
exports.approveUser = async (req, res) => {
  try {
      const { userId } = req.body;
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      user.isVerified = true;
      user.status = "approved";
      await user.save();

      res.json({ message: "User approved successfully" });
  } catch (error) {
      console.error("Approval Error:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};

exports.suspendUser = async (req, res) => {
  try {
      const { userId } = req.body;
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      user.status = "suspended";
      await user.save();

      res.json({ message: "User suspended successfully" });
  } catch (error) {
      console.error("Suspend Error:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (error) {
      console.error("Get Users Error:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};
