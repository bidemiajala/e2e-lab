import { test as base, expect } from '@playwright/test';

type CustomFixtures = {
  apiBaseURL: string;
};

const test = base.extend<CustomFixtures>({
  apiBaseURL: async ({}, use) => {
    await use('http://localhost:5001/api');
  },
});

test.describe('API Tests', () => {
  test('should fetch feedbacks successfully', async ({ request, apiBaseURL }) => {
    const response = await request.get(`${apiBaseURL}/feedback`);
    expect(response.status()).toBe(200);
  });

  test('should create new feedback via API', async ({ request, apiBaseURL }) => {
    const feedback = {
      name: 'Demi Ajala',
      message: 'API Test Feedback',
      rating: 5
    };

    const response = await request.post(`${apiBaseURL}/feedback`, {
      data: feedback
    });
    
    expect(response.status()).toBe(201);
    const responseData = await response.json();
    expect(responseData.data.name).toBe(feedback.name);
    expect(responseData.data.message).toBe(feedback.message);
    expect(responseData.data.rating).toBe(feedback.rating);
  });
});

test.describe('Feedback Form', () => {
  test.beforeEach(async ({ page, request, apiBaseURL }) => {
    // Reset database before each test
    await request.post(`${apiBaseURL}/test/reset`);
    await page.goto('/');
  });

  test('should submit feedback successfully', async ({ page }) => {
    await expect(page.getByTestId('input-name')).toBeVisible();
    await page.getByTestId('input-name').clear();
    await page.getByTestId('input-name').fill('Demi Ajala');
    
    await expect(page.getByTestId('star-rating-4')).toBeVisible();
    await page.getByTestId('star-rating-4').click();
    
    const feedbackMessage = 'This is a test feedback message!';
    await expect(page.getByTestId('input-message')).toBeVisible();
    await page.getByTestId('input-message').clear();
    await page.getByTestId('input-message').fill(feedbackMessage);
    
    await expect(page.getByTestId('button-submit')).toBeVisible();
    await page.getByTestId('button-submit').click();
    
    await expect(page.getByText('Feedback submitted successfully!')).toBeVisible();
  });

  test('should display validation error for empty feedback', async ({ page }) => {
    await expect(page.getByTestId('button-submit')).toBeVisible();
    await page.getByTestId('button-submit').click();
    await expect(page.getByText('Name is required')).toBeVisible();
  });
}); 