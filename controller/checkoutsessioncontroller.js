import Session from "../models/checkoutsession.js";

// POST: Store session data
export const storeSession = async (req, res) => {
  try {
    const { sessionId, shop, discountApplied, status } = req.body;
    const session = new Session({ sessionId, shop, discountApplied, status });
    await session.save();
    res.status(201).json({ message: "Session saved", session });
  } catch (error) {
    console.error("Error saving session:", error);
    res.status(500).json({ error: "Failed to save session" });
  }
};

// GET: Retrieve by sessionId
export const getSessionById = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await Session.findOne({ sessionId });
    if (!session) return res.status(404).json({ error: "Session not found" });
    res.json(session);
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ error: "Failed to retrieve session" });
  }
};
