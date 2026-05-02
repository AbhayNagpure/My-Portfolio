import express from "express";
import Contact from "../models/contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const contact = await Contact.create({ name, email, message });
    res.status(201).json({ success: true, contactId: contact._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
