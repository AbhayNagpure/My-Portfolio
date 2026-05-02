import express from "express";
import Creative from "../models/Creative.js";

const router = express.Router();

// Read password inside handlers so dotenv is already loaded
function isAdmin(password) {
  return password && password === process.env.ADMIN_PASSWORD;
}

// GET all creatives (public)
router.get("/", async (req, res) => {
  try {
    const creatives = await Creative.find().sort({ createdAt: -1 });
    res.json(creatives);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch creatives" });
  }
});

// POST verify admin password only (no side effects)
router.post("/verify", (req, res) => {
  const { adminPassword } = req.body;
  if (!isAdmin(adminPassword)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.json({ ok: true });
});

// POST a new creative (admin only)
router.post("/", async (req, res) => {
  const { imageUrl, caption, category, adminPassword } = req.body;

  if (!isAdmin(adminPassword)) {
    return res.status(401).json({ error: "Unauthorized: incorrect password" });
  }

  if (!imageUrl) {
    return res.status(400).json({ error: "Image URL is required" });
  }

  try {
    const creative = await Creative.create({
      title: caption || "Untitled",
      imageUrl,
      category: category || "Photography",
      description: "",
    });
    res.status(201).json(creative);
  } catch (err) {
    res.status(500).json({ error: "Failed to create creative" });
  }
});

// DELETE a creative (admin only)
router.delete("/:id", async (req, res) => {
  const { adminPassword } = req.body;

  if (!isAdmin(adminPassword)) {
    return res.status(401).json({ error: "Unauthorized: incorrect password" });
  }

  try {
    await Creative.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete creative" });
  }
});

export default router;
