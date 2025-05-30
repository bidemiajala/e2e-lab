const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const { getAllFeedback, addFeedback, clearFeedback } = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Schedule daily cleanup at midnight UTC
cron.schedule('0 0 * * *', async () => {
  try {
    await clearFeedback();
    console.log('Daily feedback cleanup completed at:', new Date().toISOString());
  } catch (err) {
    console.error('Error during daily cleanup:', err);
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    success: true, 
    message: "Server is running", 
    timestamp: new Date().toISOString() 
  });
});

// Get all feedback
app.get("/api/feedback", async (req, res) => {
  try {
    const feedback = await getAllFeedback();
    res.json({ success: true, data: feedback });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch feedback" 
    });
  }
});

// Submit new feedback
app.post("/api/feedback", async (req, res) => {
  const { name, rating, message } = req.body;

  // Validation
  if (!name || !rating || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, rating, and message are required"
    });
  }

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      message: "Rating must be a number between 1 and 5"
    });
  }

  if (message.length > 300) {
    return res.status(400).json({
      success: false,
      message: "Message cannot exceed 300 characters"
    });
  }

  try {
    const newFeedback = await addFeedback(name, rating, message);
    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      data: newFeedback
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to submit feedback"
    });
  }
});

// Manual cleanup endpoint (protected by API key)
app.post("/api/admin/cleanup", async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

  try {
    await clearFeedback();
    res.json({
      success: true,
      message: "Feedback data cleared successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to clear feedback data"
    });
  }
});

const PORT = process.env.PORT || 3001;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
