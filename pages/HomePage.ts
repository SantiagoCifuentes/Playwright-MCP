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
}
