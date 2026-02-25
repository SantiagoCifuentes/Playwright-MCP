import { test, expect } from './fixtures';
import { LoginPage, HomePage, QuickTransactionPage, TransactionHistoryPage, BillPaymentsPage } from '../pages';
import config from '../config.json';
// test data injected via fixture as `testData`

test('Verify tab names in the homepage', async ({ page }) => {
  // Instantiate page objects
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  // Navigate to the login page
  await loginPage.goto(config.url);

  // Login
  await loginPage.login(config.username, config.password, config.appName);
  await loginPage.waitForURL(/Banking-Project-Demo\.html/);
  expect(page.url()).toContain('Banking-Project-Demo.html');

  // Home page assertions
  await homePage.verifyHeader();
  await homePage.verifyWelcomeText();

  // Verify Transfers & Bill Payments tabs are visible
  await homePage.verifyTransfersTabVisible();
  await homePage.verifyBillPaymentsTabVisible();
});
// Playwright MCP test for Quick Transactions Flow
// Will be implemented by live exploration



test('Verify Quick Transactions Flow', async ({ page, testData }) => {
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
  await quickTransactionPage.selectTransactionType(testData.transferData.transactionType);
  await quickTransactionPage.fillTransferFields(
    testData.transferData.toAccount,
    testData.transferData.amount,
    testData.transferData.description
  );
  await quickTransactionPage.submit();
  await quickTransactionPage.confirm();

  // Get Transaction Reference
  const transactionRef = await quickTransactionPage.getTransactionReference();
  expect(transactionRef).toBeTruthy();

  // Transaction History
  await transactionHistoryPage.open();
  await transactionHistoryPage.verifyTransactionReference(transactionRef!);
});

// Playwright MCP discovered Bill Payments flow — test added below
import { billPaymentsData as billEntries } from '../test-data';

// Create a test for each bill payment entry in test-data
for (const entry of billEntries) {
  test(`Bill Payments - ${entry.billType} using ${entry.paymentMethod}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const billPaymentsPage = new BillPaymentsPage(page);

    await loginPage.goto(config.url);
    await loginPage.login(config.username, config.password, config.appName);
    await loginPage.waitForURL(/Banking-Project-Demo\.html/);

    await homePage.verifyHeader();
    await billPaymentsPage.open();
    await billPaymentsPage.selectBillType(entry.billType);
    await billPaymentsPage.fillServiceProvider(entry.serviceProvider);
    await billPaymentsPage.fillAccountReference(entry.accountReference);
    await billPaymentsPage.fillAmount(entry.amount);
    await billPaymentsPage.selectPaymentMethod(entry.paymentMethod);

    await expect(page.getByRole('button', { name: /submit/i })).toBeVisible();
    await billPaymentsPage.submit();
    await expect(page.getByRole('button', { name: /confirm/i })).toBeVisible();
    await billPaymentsPage.confirm();

    await billPaymentsPage.verifySuccess(5000);
  });
}

test('Account Management - verify account details and change account type', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.goto(config.url);
  await loginPage.login(config.username, config.password, config.appName);
  await loginPage.waitForURL(/Banking-Project-Demo\.html/);

  // Verify balance and account fields
  const balance = await homePage.getBalanceText();
  expect(balance).toMatch(/Balance:\s*\$\d+[\d,]*\.\d{2}/);

  const acctNum = await homePage.getAccountNumberValue();
  expect(acctNum).toBeTruthy();

  const acctHolder = await homePage.getAccountHolderValue();
  expect(acctHolder).toContain('Testers');

  // Change account type and verify selection by reading the selected option's label
  await homePage.changeAccountType('Checking Account');
  const selectedLabel = await page
    .getByRole('combobox', { name: /account type/i })
    .locator('option:checked')
    .textContent();
  expect(selectedLabel?.trim()).toBe('Checking Account');
});

test('Bill Payments - pay electricity bill using checking account', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const billPaymentsPage = new BillPaymentsPage(page);

  await loginPage.goto(config.url);
  await loginPage.login(config.username, config.password, config.appName);
  await loginPage.waitForURL(/Banking-Project-Demo\.html/);

  await homePage.verifyHeader();
  await billPaymentsPage.open();
  await billPaymentsPage.selectBillType('Electricity');
  await billPaymentsPage.fillServiceProvider('ElectroCorp');
  await billPaymentsPage.fillAccountReference('EL-987-654');
  await billPaymentsPage.fillAmount('75');
  await billPaymentsPage.selectPaymentMethod('Checking Account');
  await billPaymentsPage.submit();
  await billPaymentsPage.confirm();
  await billPaymentsPage.verifySuccess();
});

test('Bill Payments - pay internet bill using savings account', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const billPaymentsPage = new BillPaymentsPage(page);

  await loginPage.goto(config.url);
  await loginPage.login(config.username, config.password, config.appName);
  await loginPage.waitForURL(/Banking-Project-Demo\.html/);

  await homePage.verifyHeader();
  await billPaymentsPage.open();
  await billPaymentsPage.selectBillType('Internet');
  await billPaymentsPage.fillServiceProvider('WebFast');
  await billPaymentsPage.fillAccountReference('NET-555-999');
  await billPaymentsPage.fillAmount('30');
  await billPaymentsPage.selectPaymentMethod('Savings Account');
  await billPaymentsPage.submit();
  await billPaymentsPage.confirm();
  await billPaymentsPage.verifySuccess();
});



test('Login - Remember me persists username', async ({ page }) => {
  // On the login page, check Remember me persists the username
  await page.goto(config.url);
  await page.getByRole('textbox', { name: /username/i }).fill(config.username);
   await page.getByRole('textbox', { name: /password/i }).fill(config.password);
  await page.getByRole('checkbox', { name: /remember me/i }).check();
  await page.getByRole('button', { name: /login/i }).click();
  await page.getByRole('link', { name: /logout/i }).click();
  // Return to login page and verify username preserved
  await expect(page.getByRole('textbox', { name: /username/i })).toHaveValue(config.username);
});

test('External links sanity - important links present', async ({ page }) => {
  await page.goto(config.url);
  const yt = page.getByRole('link', { name: /playwright typescript course/i });
  await expect(yt).toBeVisible();
  const playlistHref = await yt.getAttribute('href');
  expect(playlistHref).toContain('youtu');
});
