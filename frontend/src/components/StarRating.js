import React from 'react';

const StarRating = ({ rating, onRatingChange = null, size = 'md' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const starSize = sizes[size] || sizes.md;

  const renderStar = (index) => {
    const starIndex = index + 1;
    const filled = starIndex <= rating;
    const isInteractive = typeof onRatingChange === 'function';

    return (
      <button
        key={index}
        data-testid={`star-rating-${starIndex}`}
        type="button"
        onClick={isInteractive ? () => onRatingChange(starIndex) : undefined}
        disabled={!isInteractive}
        className={`
          ${starSize}
          ${filled ? 'text-gray-900' : 'text-gray-300'}
          ${isInteractive ? 'hover:text-gray-900 cursor-pointer transition-colors' : 'cursor-default'}
          ${!isInteractive ? 'pointer-events-none' : ''}
        `}
      >
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    );
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => renderStar(index))}
      {rating > 0 && (
        <span className="ml-2 text-sm text-gray-600">
          ({rating}/5)
        </span>
      )}
    </div>
  );
};

export default StarRating; 