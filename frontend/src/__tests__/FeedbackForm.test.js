import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FeedbackForm from '../components/FeedbackForm';
import apiService from '../services/api';

// Mock the API service
jest.mock('../services/api');

describe('FeedbackForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with all required fields', () => {
    render(<FeedbackForm />);
    
    expect(screen.getByTestId('input-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-message')).toBeInTheDocument();
    expect(screen.getByTestId('button-submit')).toBeInTheDocument();
    
    // Check for star rating buttons
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByTestId(`star-rating-${i}`)).toBeInTheDocument();
    }
  });

  test('validates required fields', async () => {
    const user = userEvent.setup();
    render(<FeedbackForm />);
    
    const submitButton = screen.getByTestId('button-submit');
    await user.click(submitButton);
    
    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  test('validates rating selection', async () => {
    const user = userEvent.setup();
    render(<FeedbackForm />);
    
    const nameInput = screen.getByTestId('input-name');
    await user.type(nameInput, 'John Doe');
    
    const submitButton = screen.getByTestId('button-submit');
    await user.click(submitButton);
    
    expect(screen.getByText('Please select a rating')).toBeInTheDocument();
  });

  test('validates message field', async () => {
    const user = userEvent.setup();
    render(<FeedbackForm />);
    
    const nameInput = screen.getByTestId('input-name');
    const starRating = screen.getByTestId('star-rating-5');
    
    await user.type(nameInput, 'John Doe');
    await user.click(starRating);
    
    const submitButton = screen.getByTestId('button-submit');
    await user.click(submitButton);
    
    expect(screen.getByText('Message is required')).toBeInTheDocument();
  });

  test('validates message character limit', async () => {
    const user = userEvent.setup();
    render(<FeedbackForm />);
    
    const messageInput = screen.getByTestId('input-message');
    const longMessage = 'a'.repeat(301);
    
    await user.type(messageInput, longMessage);
    
    expect(screen.getByText('301/300 characters')).toBeInTheDocument();
    expect(screen.getByTestId('button-submit')).toBeDisabled();
  });

  test('shows character count', async () => {
    const user = userEvent.setup();
    render(<FeedbackForm />);
    
    const messageInput = screen.getByTestId('input-message');
    await user.type(messageInput, 'Hello world');
    
    expect(screen.getByText('11/300 characters')).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    const mockOnFeedbackSubmitted = jest.fn();
    const mockResponse = {
      data: {
        id: 1,
        name: 'John Doe',
        rating: 5,
        message: 'Great service!',
        timestamp: new Date().toISOString()
      }
    };
    
    apiService.submitFeedback.mockResolvedValue(mockResponse);
    
    render(<FeedbackForm onFeedbackSubmitted={mockOnFeedbackSubmitted} />);
    
    const nameInput = screen.getByTestId('input-name');
    const messageInput = screen.getByTestId('input-message');
    const starRating = screen.getByTestId('star-rating-5');
    const submitButton = screen.getByTestId('button-submit');
    
    await user.type(nameInput, 'John Doe');
    await user.click(starRating);
    await user.type(messageInput, 'Great service!');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(apiService.submitFeedback).toHaveBeenCalledWith({
        name: 'John Doe',
        rating: 5,
        message: 'Great service!'
      });
    });
    
    await waitFor(() => {
      expect(screen.getByText('Feedback submitted successfully!')).toBeInTheDocument();
    });
    
    expect(mockOnFeedbackSubmitted).toHaveBeenCalledWith(mockResponse.data);
  });

  test('handles API errors', async () => {
    const user = userEvent.setup();
    apiService.submitFeedback.mockRejectedValue(new Error('Network error'));
    
    render(<FeedbackForm />);
    
    const nameInput = screen.getByTestId('input-name');
    const messageInput = screen.getByTestId('input-message');
    const starRating = screen.getByTestId('star-rating-4');
    const submitButton = screen.getByTestId('button-submit');
    
    await user.type(nameInput, 'Jane Doe');
    await user.click(starRating);
    await user.type(messageInput, 'Good service');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  test('clears form after successful submission', async () => {
    const user = userEvent.setup();
    const mockResponse = {
      data: {
        id: 1,
        name: 'John Doe',
        rating: 3,
        message: 'Average service',
        timestamp: new Date().toISOString()
      }
    };
    
    apiService.submitFeedback.mockResolvedValue(mockResponse);
    
    render(<FeedbackForm />);
    
    const nameInput = screen.getByTestId('input-name');
    const messageInput = screen.getByTestId('input-message');
    const starRating = screen.getByTestId('star-rating-3');
    const submitButton = screen.getByTestId('button-submit');
    
    await user.type(nameInput, 'John Doe');
    await user.click(starRating);
    await user.type(messageInput, 'Average service');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Feedback submitted successfully!')).toBeInTheDocument();
    });
    
    // Check that form is cleared
    expect(nameInput.value).toBe('');
    expect(messageInput.value).toBe('');
  });
}); 