const User = require("../models/User");

// 🟢 GET All Users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ success: false, message: "Error retrieving users", error: error.message });
    }
};

// 🔵 GET User by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ success: false, message: "Error retrieving user", error: error.message });
    }
};

// 🟠 POST Create User
exports.createUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        if (!name || !email || !role) {
            return res.status(400).json({ success: false, message: "Name, Email, and Role are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json({ success: true, message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, message: "Error creating user", error: error.message });
    }
};

// 🟡 PUT Update User
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, message: "Error updating user", error: error.message });
    }
};

// 🔴 DELETE User
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, message: "Error deleting user", error: error.message });
    }
};
