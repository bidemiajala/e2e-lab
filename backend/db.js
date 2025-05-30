const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'feedback.db');
const db = new sqlite3.Database(dbPath);

// Initialize database
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      message TEXT NOT NULL CHECK (length(message) <= 300),
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Get all feedback
const getAllFeedback = () => {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM feedback ORDER BY timestamp DESC',
      [],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

// Add new feedback
const addFeedback = (name, rating, message) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO feedback (name, rating, message) VALUES (?, ?, ?)',
      [name.trim(), rating, message.trim()],
      function(err) {
        if (err) reject(err);
        else {
          db.get(
            'SELECT * FROM feedback WHERE id = ?',
            [this.lastID],
            (err, row) => {
              if (err) reject(err);
              else resolve(row);
            }
          );
        }
      }
    );
  });
};

// Clear all feedback
const clearFeedback = () => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM feedback', [], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

module.exports = {
  getAllFeedback,
  addFeedback,
  clearFeedback
}; 