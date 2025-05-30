import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import toast, { Toaster } from 'react-hot-toast';

const Playground = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    newsletter: false,
    preference: 'email',
    interests: [],
    file: null,
  });

  const [enabled, setEnabled] = useState(false);

  const interests = [
    'Frontend Testing',
    'Backend Testing',
    'Mobile Testing',
    'Performance Testing',
    'Security Testing',
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox' && name === 'interests') {
      const updatedInterests = formData.interests.includes(value)
        ? formData.interests.filter(interest => interest !== value)
        : [...formData.interests, value];
      
      setFormData(prev => ({
        ...prev,
        interests: updatedInterests
      }));
    } else if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Form submitted successfully!');
    console.log('Form data:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="relative z-50">
        <button
          type="button"
          className="md:hidden fixed top-4 right-4 p-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-testid="hamburger-menu"
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } md:hidden fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40`}
        >
          <nav className="p-4">
            <ul className="space-y-4">
              <li><a href="#" className="block p-2 hover:bg-gray-100 rounded-md transition-colors">Home</a></li>
              <li><a href="#" className="block p-2 hover:bg-gray-100 rounded-md transition-colors">About</a></li>
              <li><a href="#" className="block p-2 hover:bg-gray-100 rounded-md transition-colors">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              QA Testing Playground
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Text Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  data-testid="name-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  data-testid="email-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                />
              </div>

              {/* Textarea */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  data-testid="description-textarea"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                />
              </div>

              {/* Toggle Switch */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Enable notifications</span>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  data-testid="toggle-switch"
                  className={`${
                    enabled ? 'bg-gray-900' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      enabled ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>

              {/* Radio Buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Contact Method
                </label>
                <div className="space-y-2">
                  {['email', 'phone', 'slack'].map((method) => (
                    <div key={method} className="flex items-center">
                      <input
                        type="radio"
                        id={method}
                        name="preference"
                        value={method}
                        data-testid={`radio-${method}`}
                        checked={formData.preference === method}
                        onChange={handleInputChange}
                        className="h-4 w-4 border-gray-300 text-gray-900 focus:ring-gray-900"
                      />
                      <label htmlFor={method} className="ml-2 block text-sm text-gray-700 capitalize">
                        {method}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkboxes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Testing Interests
                </label>
                <div className="space-y-2">
                  {interests.map((interest) => (
                    <div key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        id={interest}
                        name="interests"
                        value={interest}
                        data-testid={`checkbox-${interest.toLowerCase().replace(' ', '-')}`}
                        checked={formData.interests.includes(interest)}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                      />
                      <label htmlFor={interest} className="ml-2 block text-sm text-gray-700">
                        {interest}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Test Results
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-900 transition-colors">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-gray-900 hover:text-gray-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-900"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file"
                          type="file"
                          data-testid="file-upload"
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  data-testid="submit-button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-300"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Table */}
            <div className="mt-8 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Test Case
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { id: 1, name: 'Form Validation', status: 'Passed', priority: 'High' },
                    { id: 2, name: 'Mobile Responsiveness', status: 'In Progress', priority: 'Medium' },
                    { id: 3, name: 'Accessibility', status: 'Failed', priority: 'High' },
                  ].map((test) => (
                    <tr
                      key={test.id}
                      className="hover:bg-gray-50 transition-colors"
                      data-testid={`table-row-${test.id}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {test.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            test.status === 'Passed'
                              ? 'bg-gray-100 text-gray-800'
                              : test.status === 'Failed'
                              ? 'bg-gray-200 text-gray-800'
                              : 'bg-gray-50 text-gray-800'
                          }`}
                        >
                          {test.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {test.priority}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Playground; 