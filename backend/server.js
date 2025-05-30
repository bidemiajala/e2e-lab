const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store
let feedback = [];
let idCounter = 1;

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    success: true, 
    message: "Server is running", 
    timestamp: new Date().toISOString() 
  });
});

// Get all feedback (sorted by newest first)
app.get("/api/feedback", (req, res) => {
  const sortedFeedback = feedback.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  res.json({ success: true, data: sortedFeedback });
});

// Submit new feedback
app.post("/api/feedback", (req, res) => {
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

  // Create new feedback
  const newFeedback = {
    id: idCounter++,
    name: name.trim(),
    rating: parseInt(rating),
    message: message.trim(),
    timestamp: new Date().toISOString()
  };

  feedback.push(newFeedback);

  res.status(201).json({
    success: true,
    message: "Feedback submitted successfully",
    data: newFeedback
  });
});

const PORT = process.env.PORT || 3001;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
