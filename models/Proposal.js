const mongoose = require("mongoose");

const ProposalSchema = new mongoose.Schema({
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    bidAmount: { type: Number, required: true },
    estimatedTimeline: { type: String, required: true },
    coverLetter: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Proposal", ProposalSchema);
