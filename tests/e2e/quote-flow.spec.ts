import { test, expect } from '@playwright/test';

test.describe('Quote Flow', () => {
  test('should complete the 3-step quote flow successfully', async ({ page }) => {
    await page.goto('/');

    // Step 1: Origin
    await expect(page.getByText('Origin Details')).toBeVisible();
    await page.getByLabel('City').fill('New York');
    await page.getByLabel('Postal Code').fill('10001');
    await page.getByRole('button', { name: 'Next' }).click();

    // Step 2: Destination
    await expect(page.getByText('Destination Details')).toBeVisible();
    await page.getByLabel('City').fill('Toronto');
    await page.getByLabel('Postal Code').fill('M5V 2H1');
    await page.getByRole('button', { name: 'Next' }).click();

    // Step 3: Package
    await expect(page.getByText('Package Dimensions')).toBeVisible();
    await page.getByLabel('Weight').fill('5');
    await page.getByLabel('Length').fill('30');
    await page.getByLabel('Width').fill('20');
    await page.getByLabel('Height').fill('15');
    
    // Check sidebar summary
    await expect(page.getByText('New York, US 10001')).toBeVisible();
    await expect(page.getByText('Toronto, CA M5V 2H1')).toBeVisible();
    await expect(page.getByText('5kg | 30x20x15cm')).toBeVisible();

    // Submit
    await page.getByRole('button', { name: 'Get Quotes' }).click();

    // Verify loading and results
    await expect(page.getByTestId('loading-skeleton')).toBeVisible();
    await expect(page.getByText('Available Shipping Options')).toBeVisible();
    
    // Verify at least one courier card is present
    const courierCards = page.locator('[data-testid^="courier-card-"]');
    await expect(courierCards.first()).toBeVisible();
    expect(await courierCards.count()).toBeGreaterThan(0);
  });
});
