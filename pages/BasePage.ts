import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async click(locator: Locator | string) {
    if (typeof locator === 'string') {
      await this.page.locator(locator).click();
    } else {
      await locator.click();
    }
  }

  async fill(locator: Locator | string, value: string) {
    if (typeof locator === 'string') {
      await this.page.locator(locator).fill(value);
    } else {
      await locator.fill(value);
    }
  }

  async selectOption(locator: Locator | string, option: string) {
    if (typeof locator === 'string') {
      await this.page.locator(locator).selectOption({ label: option });
    } else {
      await locator.selectOption({ label: option });
    }
  }

  async waitForURL(urlPart: string | RegExp, timeout = 10000) {
    await this.page.waitForURL(urlPart, { timeout });
  }

  async expectVisible(locator: Locator | string, timeout = 5000) {
    if (typeof locator === 'string') {
      await this.page.locator(locator).waitFor({ state: 'visible', timeout });
    } else {
      await locator.waitFor({ state: 'visible', timeout });
    }
  }
}
