import React, { useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import Playground from './components/Playground';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('feedback');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleFeedbackSubmitted = () => {
    // Trigger refresh of feedback list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
              🌟 Feedback App
            </h1>
            <p className="text-gray-600 animate-fade-in">
              Share your thoughts and explore my QA testing playground
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab('feedback')}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                activeTab === 'feedback'
                ? 'bg-gray-900 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Feedback
            </button>
            <button
              onClick={() => setActiveTab('playground')}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                activeTab === 'playground'
                ? 'bg-gray-900 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Playground
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {activeTab === 'feedback' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:order-1">
              <FeedbackForm onFeedbackSubmitted={handleFeedbackSubmitted} />
            </div>
            <div className="lg:order-2">
              <FeedbackList refreshTrigger={refreshTrigger} />
            </div>
          </div>
        ) : (
          <Playground />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>Built with ❤️ by &apos;Demi</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
