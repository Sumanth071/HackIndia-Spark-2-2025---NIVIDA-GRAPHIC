const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
    role: { type: String, enum: ["freelancer", "business", "admin"], required: true },
    
    // Freelancer Fields
    skills: [{ type: String }],
    experience: { type: Number }, // Years of experience
    portfolio: { type: String }, // URL
    hourlyRate: { type: Number },
    certifications: [{ type: String }],
    location: { type: String },
    availability: { type: Boolean, default: true },

    // Business Fields
    companyName: { type: String },
    industry: { type: String },
    description: { type: String },
    website: { type: String },
    hiringNeeds: { type: String },

    // Verification & Account Status
    isVerified: { type: Boolean, default: false },
    status: { type: String, enum: ["pending", "approved", "suspended"], default: "pending" },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
