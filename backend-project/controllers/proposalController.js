const mongoose = require("mongoose");
const Proposal = require("../models/Proposal");
const User = require("../models/User");
const Job = require("../models/Job");

// GET all proposals
exports.getProposals = async (req, res) => {
    try {
        const proposals = await Proposal.find().populate("freelancerId jobId");
        res.status(200).json(proposals);
    } catch (error) {
        console.error("Error fetching proposals:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// GET single proposal by ID
exports.getProposalById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid proposal ID format" });
        }
        const proposal = await Proposal.findById(req.params.id).populate("freelancerId jobId");
        if (!proposal) {
            return res.status(404).json({ message: "Proposal not found" });
        }
        res.status(200).json(proposal);
    } catch (error) {
        console.error("Error fetching proposal:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// POST create proposal
exports.createProposal = async (req, res) => {
    try {
        const { jobId, freelancerId, coverLetter, bidAmount, estimatedTimeline } = req.body;
        if (!jobId || !freelancerId || !coverLetter || !bidAmount || !estimatedTimeline) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (!mongoose.Types.ObjectId.isValid(jobId) || !mongoose.Types.ObjectId.isValid(freelancerId)) {
            return res.status(400).json({ message: "Invalid jobId or freelancerId format" });
        }
        const job = await Job.findById(jobId);
        const freelancer = await User.findById(freelancerId);
        if (!job) return res.status(404).json({ message: "Job not found" });
        if (!freelancer) return res.status(404).json({ message: "Freelancer not found" });
        const proposal = new Proposal({ jobId, freelancerId, coverLetter, bidAmount, estimatedTimeline });
        await proposal.save();
        res.status(201).json({ message: "Proposal submitted successfully", proposal });
    } catch (error) {
        console.error("Error creating proposal:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// PUT update proposal
exports.updateProposal = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid proposal ID format" });
        }
        const proposal = await Proposal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!proposal) {
            return res.status(404).json({ message: "Proposal not found" });
        }
        res.status(200).json({ message: "Proposal updated successfully", proposal });
    } catch (error) {
        console.error("Error updating proposal:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// DELETE proposal
exports.deleteProposal = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid proposal ID format" });
        }
        const proposal = await Proposal.findByIdAndDelete(req.params.id);
        if (!proposal) {
            return res.status(404).json({ message: "Proposal not found" });
        }
        res.status(200).json({ message: "Proposal deleted successfully" });
    } catch (error) {
        console.error("Error deleting proposal:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// POST submit proposal (Alias for createProposal)
exports.submitProposal = async (req, res) => {
    return exports.createProposal(req, res);
};