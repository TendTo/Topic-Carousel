import { test, expect } from '@playwright/test';

test('the pages loads correctly', async function ({ page }) {
  await page.goto('/');

  await page.evaluate(() => new TopicCarousel.TopicCarousel());

  await expect(page).toHaveTitle(/Test/);
});
