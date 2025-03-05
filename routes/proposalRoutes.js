const express = require("express");
const {
    getProposals,
    getProposalById,
    createProposal,
    updateProposal,
    deleteProposal,
    submitProposal
} = require("../controllers/proposalController");

const router = express.Router();

// Proposal routes
router.get("/", getProposals); // Get all proposals
router.get("/:id", getProposalById); // Get proposal by ID
router.post("/", submitProposal); // Submit a new proposal
router.put("/:id", updateProposal); // Update an existing proposal
router.delete("/:id", deleteProposal); // Delete a proposal

module.exports = router;
