const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    try {
      console.log('Making request to:', url); // Debug log
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        console.error('API Error:', data); // Debug log
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('Request failed:', error); // Debug log
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running.');
      }
      throw new Error(error.message || 'Network error');
    }
  }

  async getFeedback() {
    return this.request('/api/feedback');
  }

  async submitFeedback(feedbackData) {
    return this.request('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(feedbackData),
    });
  }

  async healthCheck() {
    return this.request('/api/health');
  }
}

export default new ApiService(); 