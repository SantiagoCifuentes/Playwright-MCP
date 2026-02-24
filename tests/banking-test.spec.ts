// Playwright MCP test for Quick Transactions Flow
// Will be implemented by live exploration

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { QuickTransactionPage } from '../pages/QuickTransactionPage';
import { TransactionHistoryPage } from '../pages/TransactionHistoryPage';
import config from '../config.json';

test('Verify Quick Transactions Flow', async ({ page }) => {
  // Instantiate page objects
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const quickTransactionPage = new QuickTransactionPage(page);
  const transactionHistoryPage = new TransactionHistoryPage(page);

  // Navigate to the login page
  await loginPage.goto(config.url);

  // Login
  await loginPage.login(config.username, config.password, config.appName);
  await loginPage.waitForURL(/Banking-Project-Demo\.html/);
  expect(page.url()).toContain('Banking-Project-Demo.html');

  // Home page assertions
  await homePage.verifyHeader();
  await homePage.verifyWelcomeText();
  await homePage.clickQuickTransactions();

  // Quick Transaction
  await quickTransactionPage.selectTransactionType('Transfer');
  await quickTransactionPage.fillTransferFields('654321', '100', 'Test transfer');
  await quickTransactionPage.submit();
  await quickTransactionPage.confirm();

  // Get Transaction Reference
  const transactionRef = await quickTransactionPage.getTransactionReference();
  expect(transactionRef).toBeTruthy();

  // Transaction History
  await transactionHistoryPage.open();
  await transactionHistoryPage.verifyTransactionReference(transactionRef!);
});
