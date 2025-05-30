import React from 'react';
import StarRating from './StarRating';

const FeedbackCard = ({ feedback }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      data-testid="feedback-card"
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 
            data-testid="feedback-name"
            className="text-lg font-semibold text-gray-900 mb-2"
          >
            {feedback.name}
          </h3>
          <div data-testid="feedback-rating">
            <StarRating rating={feedback.rating} size="sm" />
          </div>
        </div>
        <span 
          data-testid="feedback-timestamp"
          className="text-sm text-gray-500"
        >
          {formatTimestamp(feedback.timestamp)}
        </span>
      </div>
      
      <p 
        data-testid="feedback-message"
        className="text-gray-700 leading-relaxed"
      >
        {feedback.message}
      </p>
    </div>
  );
};

export default FeedbackCard; 