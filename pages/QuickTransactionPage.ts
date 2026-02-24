import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class QuickTransactionPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async selectTransactionType(type: string) {
    await this.page.getByRole('combobox', { name: /transaction type/i }).selectOption({ label: type });
  }

  async fillTransferFields(account: string, amount: string, description: string) {
    await this.page.getByRole('textbox', { name: /transfer to account/i }).fill(account);
    await this.page.getByRole('spinbutton', { name: /amount/i }).fill(amount);
    await this.page.getByRole('textbox', { name: /description/i }).fill(description);
  }

  async submit() {
    await this.page.getByRole('button', { name: /submit/i }).click();
  }

  async confirm() {
    await this.page.getByRole('button', { name: /confirm/i }).click();
  }

  async getTransactionReference() {
    const refLocator = this.page.getByText(/Transaction Reference:/i).locator('..').locator('..').getByText(/^TXN-/);
    const transactionRef = await refLocator.textContent();
    return transactionRef;
  }
}
