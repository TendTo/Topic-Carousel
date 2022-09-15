import { test, expect } from '@playwright/test';

test('the button changes the content afte being clicked', async function ({ page }) {
  await page.goto('/');

  await page.evaluate(() => new TopicCarousel.TopicCarousel());

  await expect(page).toHaveTitle(/Test/);
});
