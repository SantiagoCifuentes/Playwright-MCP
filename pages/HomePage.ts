import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async verifyHeader() {
    await this.expectVisible(this.page.getByRole('heading', { name: /sample banking application/i }));
  }

  async verifyWelcomeText() {
    await this.expectVisible(this.page.getByText('Welcome to the Testers Talk Banking Application'));
  }

  async clickQuickTransactions() {
    await this.page.getByRole('link', { name: /quick transactions/i }).click();
  }

  async getBalanceText() {
    // Use a more specific selector to avoid strict mode conflicts
    const locator = this.page.locator('.balance-display');
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent()) || '';
  }

  async getAccountNumberValue() {
    return await this.page.getByRole('textbox', { name: /account number/i }).inputValue();
  }

  async getAccountHolderValue() {
    return await this.page.getByRole('textbox', { name: /account holder/i }).inputValue();
  }

  async changeAccountType(option: string) {
    await this.page.getByRole('combobox', { name: /account type/i }).selectOption({ label: option });
  }

  async verifyTransfersTabVisible() {
    await this.expectVisible(this.page.getByRole('button', { name: /transfers/i }));
  }

  async verifyBillPaymentsTabVisible() {
    await this.expectVisible(this.page.getByRole('button', { name: /bill payments?/i }));
  }
}
