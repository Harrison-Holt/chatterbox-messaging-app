import express from "express";
import Organization from "../models/organization.js";
import OrganizationMember from "../models/organizationMemebers.js";
import authMiddleware from "../middleware/middleware.js";

const router = express.Router();

// POST /api/organization/create
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;

    if (!name?.trim() || !description?.trim() || typeof isPublic !== "boolean") {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const userId = req.user?.userId; 
    if (!userId) {
      return res.status(401).json({ message: "Missing/invalid token!" });
    }

    const organization = await Organization.create({
      name: name.trim(),
      description: description.trim(),
      owner: userId,
      isPublic,
    });

    await OrganizationMember.create({
      organizationId: organization._id,
      userId,
      role: "owner",
    });

    return res.status(201).json({
      message: "Organization created!",
      organizationId: organization._id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

router.get("/list", authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Missing/invalid token!" });
    }

    const memberships = await OrganizationMember.find({ userId }).select("organizationId role");

    if (memberships.length === 0) {
      return res.status(404).json({ message: "User is in no organizations." });
    }

    const orgIds = memberships.map((m) => m.organizationId);

    const organizations = await Organization.find({ _id: { $in: orgIds } });

    return res.status(200).json({
      organizations,
      memberships, 
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;