const asyncHandler = require("express-async-handler");

// @desc Get Admin Dashboard Data
// @route GET /api/admin/dashboard
// @access Private (Admin Only)
const getAdminDashboard = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Admin Dashboard Data" });
});

// @desc Get All Users
// @route GET /api/admin/users
// @access Private (Admin Only)
const getAllUsers = asyncHandler(async (req, res) => {
    // Example: Fetch users from MongoDB (Assuming User model exists)
    const users = await User.find({});
    res.status(200).json(users);
});

// @desc Delete a User
// @route DELETE /api/admin/user/:id
// @access Private (Admin Only)
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    
    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
});

module.exports = {
    getAdminDashboard,
    getAllUsers,
    deleteUser,
};
