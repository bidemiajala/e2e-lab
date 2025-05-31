const request = require("supertest");
const app = require("../server");

describe("Feedback API", () => {
  describe("Health Check", () => {
    it("should return 200 and success message", async () => {
      const res = await request(app)
        .get("/api/health")
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Server is running");
      expect(res.body.timestamp).toBeDefined();
    });
  });

  describe("GET /api/feedback", () => {
    it("should return empty array initially", async () => {
      const res = await request(app)
        .get("/api/feedback")
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual([]);
    });

    it("should return feedback sorted by newest first", async () => {
      // Add some feedback first
      const feedback1 = {
        name: "John Doe",
        rating: 5,
        message: "Great service!"
      };
      
      const feedback2 = {
        name: "Jane Smith",
        rating: 4,
        message: "Good experience"
      };

      await request(app)
        .post("/api/feedback")
        .send(feedback1)
        .expect(201);

      // Add a small delay to ensure different timestamps
      await new Promise(resolve => setTimeout(resolve, 10));

      await request(app)
        .post("/api/feedback")
        .send(feedback2)
        .expect(201);

      const res = await request(app)
        .get("/api/feedback")
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(2);
      
      expect(res.body.data[1].name).toBe("Jane Smith");
      expect(res.body.data[0].name).toBe("John Doe");
    });
  });

  describe("POST /api/feedback", () => {
    it("should create new feedback with valid data", async () => {
      const feedbackData = {
        name: "John Doe",
        rating: 5,
        message: "Excellent service, highly recommended!"
      };

      const res = await request(app)
        .post("/api/feedback")
        .send(feedbackData)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Feedback submitted successfully");
      expect(res.body.data).toMatchObject({
        id: expect.any(Number),
        name: "John Doe",
        rating: 5,
        message: "Excellent service, highly recommended!",
        timestamp: expect.any(String)
      });
    });

    it("should validate required name field", async () => {
      const feedbackData = {
        rating: 5,
        message: "Great service!"
      };

      const res = await request(app)
        .post("/api/feedback")
        .send(feedbackData)
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Name, rating, and message are required");
    });

    it("should validate required rating field", async () => {
      const feedbackData = {
        name: "John Doe",
        message: "Great service!"
      };

      const res = await request(app)
        .post("/api/feedback")
        .send(feedbackData)
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Name, rating, and message are required");
    });

    it("should validate required message field", async () => {
      const feedbackData = {
        name: "John Doe",
        rating: 5
      };

      const res = await request(app)
        .post("/api/feedback")
        .send(feedbackData)
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Name, rating, and message are required");
    });

    it("should validate rating is a number between 1-5", async () => {
      const feedbackData = {
        name: "John Doe",
        rating: 6,
        message: "Great service!"
      };

      const res = await request(app)
        .post("/api/feedback")
        .send(feedbackData)
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Rating must be a number between 1 and 5");
    });

    it("should validate message length limit", async () => {
      const feedbackData = {
        name: "John Doe",
        rating: 5,
        message: "a".repeat(301) // 301 characters
      };

      const res = await request(app)
        .post("/api/feedback")
        .send(feedbackData)
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Message cannot exceed 300 characters");
    });

    it("should accept message at maximum length", async () => {
      const feedbackData = {
        name: "John Doe",
        rating: 5,
        message: "a".repeat(300) // Exactly 300 characters
      };

      const res = await request(app)
        .post("/api/feedback")
        .send(feedbackData)
        .expect(201);

      expect(res.body.success).toBe(true);
    });

    it("should trim whitespace from name and message", async () => {
      const feedbackData = {
        name: "  John Doe  ",
        rating: 5,
        message: "  Great service!  "
      };

      const res = await request(app)
        .post("/api/feedback")
        .send(feedbackData)
        .expect(201);

      expect(res.body.data.name).toBe("John Doe");
      expect(res.body.data.message).toBe("Great service!");
    });

    it("should validate rating is a number type", async () => {
      const feedbackData = {
        name: "John Doe",
        rating: "invalid",
        message: "Great service!"
      };

      const res = await request(app)
        .post("/api/feedback")
        .send(feedbackData)
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Rating must be a number between 1 and 5");
    });

    it("should auto-increment feedback IDs", async () => {
      const feedbackData1 = {
        name: "John Doe",
        rating: 5,
        message: "Great service!"
      };

      const feedbackData2 = {
        name: "Jane Smith",
        rating: 4,
        message: "Good experience"
      };

      const res1 = await request(app)
        .post("/api/feedback")
        .send(feedbackData1)
        .expect(201);

      const res2 = await request(app)
        .post("/api/feedback")
        .send(feedbackData2)
        .expect(201);

      expect(res1.body.data.id).toBeLessThan(res2.body.data.id);
    });
  });
});
