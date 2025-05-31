const express = require("express");
const cors = require("cors");
// const cron = require("node-cron");  // Commented out until needed
const { getAllFeedback, addFeedback, clearFeedback } = require("./db.js");

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

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

// Test reset endpoint
app.post("/api/test/reset", async (req, res) => {
  if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'development') {
    return res.status(403).json({
      success: false,
      message: "This endpoint is only available in test environment"
    });
  }

  try {
    await clearFeedback();
    res.json({
      success: true,
      message: "Test database reset successful"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to reset test database"
    });
  }
});

function createServer() {
  const PORT = process.env.PORT || 5001;
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  function shutdownGracefully(signal) {
    return new Promise((resolve) => {
      console.log(`Received ${signal}, shutting down gracefully`);
      server.close(() => {
        console.log('Closed out remaining connections');
        resolve();
      });

      // Force close after 10s
      setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        resolve();
      }, 10000);
    });
  }

  // Handle shutdown signals
  ['SIGTERM', 'SIGINT'].forEach((signal) => {
    process.on(signal, async () => {
      await shutdownGracefully(signal);
      // Let the process end naturally
      process.removeAllListeners();
    });
  });

  return server;
}

if (require.main === module) {
  createServer();
}

module.exports = app;
