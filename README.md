# Feedback App

A modern feedback application built with React and Express.js that allows users to submit and view feedback with star ratings.

## Features

- ✨ Submit feedback with name, 1-5 star rating, and message
- 📝 Input validation (required fields, 300 character limit)
- 🔍 Filter feedback by rating
- 📱 Responsive design with TailwindCSS
- 🧪 Comprehensive testing (Jest, Supertest, React Testing Library)
- 🚀 Ready for deployment on Vercel and Render

## Tech Stack

### Frontend
- React 18
- TailwindCSS for styling
- React Testing Library for component tests
- Fetch API for backend communication

### Backend
- Node.js with Express
- In-memory data store (easily replaceable with MongoDB)
- Jest and Supertest for API testing
- CORS enabled for cross-origin requests

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd feedback-app
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### Running Locally

1. Start the backend server (in one terminal)
```bash
cd backend
npm run dev
```
The backend will run on http://localhost:3001

2. In a new terminal, start the frontend
```bash
cd frontend
npm start
```
The frontend will run on http://localhost:3000

### Testing

#### Backend Tests
```bash
cd backend
npm test
```

#### Frontend Tests
```bash
cd frontend
npm test
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/feedback` - Get all feedback (sorted by newest first)
- `POST /api/feedback` - Submit new feedback

### Example API Usage

```javascript
// Submit feedback
POST /api/feedback
{
  "name": "John Doe",
  "rating": 5,
  "message": "Excellent service!"
}

// Get feedback
GET /api/feedback
```

## Project Structure

```
feedback-app/
├── backend/
│   ├── __tests__/
│   │   └── api.test.js         # API tests
│   ├── server.js               # Express server
│   ├── package.json            # Backend dependencies
│   └── package-lock.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FeedbackForm.js     # Feedback submission form
│   │   │   ├── FeedbackCard.js     # Individual feedback display
│   │   │   ├── FeedbackList.js     # List of all feedback
│   │   │   └── StarRating.js       # Star rating component
│   │   ├── services/
│   │   │   └── api.js              # API service layer
│   │   ├── __tests__/
│   │   │   └── FeedbackForm.test.js # Component tests
│   │   ├── App.js                  # Main app component
│   │   └── index.js
│   ├── package.json                # Frontend dependencies
│   └── package-lock.json
└── README.md
```

## Testing for E2E

The application is built with testing in mind:

- All interactive elements have `data-testid` attributes
- API responses are easily interceptable
- Form validation is comprehensive
- Components are well-isolated for testing

### Test IDs Reference

- `input-name` - Name input field
- `star-rating-X` - Star rating buttons (X = 1-5)
- `input-message` - Message textarea
- `button-submit` - Submit button
- `feedback-card` - Individual feedback cards
- `feedback-name` - Name in feedback card
- `feedback-rating` - Rating in feedback card
- `feedback-message` - Message in feedback card
- `feedback-timestamp` - Timestamp in feedback card

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `build`
4. Add environment variable: `REACT_APP_API_URL=<your-backend-url>`

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variable: `PORT=10000` (or your preferred port)

### Optional: MongoDB Atlas
1. Create a MongoDB Atlas cluster
2. Add environment variable: `MONGO_URI=<your-mongodb-connection-string>`
3. Update backend code to use MongoDB instead of in-memory store

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

MIT License 