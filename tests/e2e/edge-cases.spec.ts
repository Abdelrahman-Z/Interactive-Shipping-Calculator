import { test, expect } from '@playwright/test';

test.describe('Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show empty state for unserviceable route (zip 00000)', async ({ page }) => {
    // Step 1: Origin with zip 00000
    await page.getByLabel('City').fill('Nowhere');
    await page.getByLabel('Postal Code').fill('00000');
    await page.getByRole('button', { name: 'Next' }).click();

    // Step 2: Destination
    await page.getByLabel('City').fill('Somewhere');
    await page.getByLabel('Postal Code').fill('12345');
    await page.getByRole('button', { name: 'Next' }).click();

    // Step 3: Package
    await page.getByLabel('Weight').fill('1');
    await page.getByRole('button', { name: 'Get Quotes' }).click();

    // Verify Empty State
    await expect(page.getByTestId('empty-state-container')).toBeVisible();
    await expect(page.getByText('No Options Found')).toBeVisible();
  });

  test('should show error state for system failure (zip 99999)', async ({ page }) => {
    // Step 1: Origin with zip 99999
    await page.getByLabel('City').fill('Error City');
    await page.getByLabel('Postal Code').fill('99999');
    await page.getByRole('button', { name: 'Next' }).click();

    // Step 2: Destination
    await page.getByLabel('City').fill('Valid City');
    await page.getByLabel('Postal Code').fill('54321');
    await page.getByRole('button', { name: 'Next' }).click();

    // Step 3: Package
    await page.getByLabel('Weight').fill('1');
    await page.getByRole('button', { name: 'Get Quotes' }).click();

    // Verify Error State
    await expect(page.getByTestId('error-state-container')).toBeVisible();
    await expect(page.getByText('Oops! Something went wrong')).toBeVisible();

    // Verify "Edit Details" recovery
    await page.getByRole('button', { name: 'Edit Details' }).click();
    await expect(page.getByText('Origin Details')).toBeVisible();
    await expect(page.getByLabel('Postal Code')).toHaveValue('99999');
  });
});
