// Playwright MCP test for Quick Transactions Flow
// Will be implemented by live exploration

import { test, expect } from '@playwright/test';

test('Verify Quick Transactions Flow', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://bakkappan.github.io/Testers-Talk-Practice-Site/');

  // Enter username & password as TestersTalk
  await page.getByRole('textbox', { name: /username/i }).fill('TestersTalk');
  await page.getByRole('textbox', { name: /password/i }).fill('TestersTalk');

  // Select App Name as Banking
  await page.getByRole('combobox', { name: /app name/i }).selectOption({ label: 'Banking' });

  // Click Login
  await page.getByRole('button', { name: /login/i }).click();

  // Wait for navigation to Banking Project Demo
  await page.waitForURL(/Banking-Project-Demo\.html/, { timeout: 10000 });

  // Verify URL contains "Banking-Project-Demo.html"
  expect(page.url()).toContain('Banking-Project-Demo.html');

  // Verify page header
  await expect(page.getByRole('heading', { name: /sample banking application/i })).toBeVisible({ timeout: 5000 });

  // Verify welcome text
  await expect(page.getByText('Welcome to the Testers Talk Banking Application')).toBeVisible({ timeout: 5000 });

  // Click on Quick Transactions link
  await page.getByRole('link', { name: /quick transactions/i }).click();

  // Select Transaction Type as Transfer
  await page.getByRole('combobox', { name: /transaction type/i }).selectOption({ label: 'Transfer' });


  // Fill all other mandatory fields for Transfer
  // 'Transfer to Account' field
  await page.getByRole('textbox', { name: /transfer to account/i }).fill('654321');
  // 'Amount ($): *' field
  await page.getByRole('spinbutton', { name: /amount/i }).fill('100');
  // 'Description: *' field
  await page.getByRole('textbox', { name: /description/i }).fill('Test transfer');

  // Click Submit
  await page.getByRole('button', { name: /submit/i }).click();

  // Click Confirm
  await page.getByRole('button', { name: /confirm/i }).click();


  // Note down Transaction Reference number (format: TXN-...)
  const refLocator = page.getByText(/Transaction Reference:/i).locator('..').locator('..').getByText(/^TXN-/);
  const transactionRef = await refLocator.textContent();
  expect(transactionRef).toBeTruthy();

  // Go to Transaction History
  await page.getByRole('link', { name: /transaction history/i }).click();

  // Verify Transaction Reference number in the Transaction History (use small tag with Ref: prefix)
  await expect(page.locator(`small:has-text('Ref: ${transactionRef}')`)).toBeVisible({ timeout: 5000 });
});
