import React, { useState, useEffect } from 'react';
import FeedbackCard from './FeedbackCard';
import apiService from '../services/api';

const FeedbackList = ({ refreshTrigger }) => {
  const [feedback, setFeedback] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await apiService.getFeedback();
      setFeedback(result.data);
      setFilteredFeedback(result.data);
    } catch (err) {
      setError(err.message || 'Failed to load feedback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [refreshTrigger]);

  useEffect(() => {
    if (selectedRating === 'all') {
      setFilteredFeedback(feedback);
    } else {
      const rating = parseInt(selectedRating);
      setFilteredFeedback(feedback.filter(item => item.rating === rating));
    }
  }, [feedback, selectedRating]);

  const handleRatingFilter = (rating) => {
    setSelectedRating(rating);
  };

  const getRatingCounts = () => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    feedback.forEach(item => {
      counts[item.rating] = (counts[item.rating] || 0) + 1;
    });
    return counts;
  };

  const ratingCounts = getRatingCounts();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading feedback...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={fetchFeedback}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
            Customer Feedback ({filteredFeedback.length})
          </h2>
          
          {/* Rating Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleRatingFilter('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedRating === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({feedback.length})
            </button>
            {[5, 4, 3, 2, 1].map(rating => (
              <button
                key={rating}
                onClick={() => handleRatingFilter(rating.toString())}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedRating === rating.toString()
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {rating}★ ({ratingCounts[rating]})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="p-6">
        {filteredFeedback.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0v10a2 2 0 002 2h6a2 2 0 002-2V8M9 12h6m-6 4h6" />
            </svg>
            <p className="mt-4 text-gray-500">
              {selectedRating === 'all' 
                ? 'No feedback yet. Be the first to share your thoughts!'
                : `No feedback with ${selectedRating} star${selectedRating === '1' ? '' : 's'} yet.`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFeedback.map(item => (
              <FeedbackCard key={item.id} feedback={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackList; 