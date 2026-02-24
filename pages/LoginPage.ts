import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async enterUsername(username: string) {
    await this.page.getByRole('textbox', { name: /username/i }).fill(username);
  }

  async enterPassword(password: string) {
    await this.page.getByRole('textbox', { name: /password/i }).fill(password);
  }

  async selectAppName(appName: string) {
    await this.page.getByRole('combobox', { name: /app name/i }).selectOption({ label: appName });
  }

  async clickLogin() {
    await this.page.getByRole('button', { name: /login/i }).click();
  }

  async login(username: string, password: string, appName: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.selectAppName(appName);
    await this.clickLogin();
  }
}
