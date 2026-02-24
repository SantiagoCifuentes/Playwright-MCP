import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransactionHistoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.page.getByRole('link', { name: /transaction history/i }).click();
  }

  async verifyTransactionReference(transactionRef: string) {
    await this.page.locator(`small:has-text('Ref: ${transactionRef}')`).waitFor({ state: 'visible', timeout: 5000 });
  }
}
