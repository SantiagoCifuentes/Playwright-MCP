import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BillPaymentsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.page.getByRole('button', { name: /bill payments/i }).click();
  }

  async selectBillType(type: string) {
    await this.page.getByRole('combobox', { name: /bill type/i }).selectOption({ label: type });
  }

  async fillServiceProvider(name: string) {
    await this.page.getByRole('textbox', { name: /service provider/i }).fill(name);
  }

  async fillAccountReference(ref: string) {
    await this.page.getByRole('textbox', { name: /account\/reference number/i }).fill(ref);
  }

  async fillAmount(amount: string) {
    await this.page.getByRole('spinbutton', { name: /amount/i }).fill(amount);
  }

  async selectPaymentMethod(method: string) {
    await this.page.getByRole('combobox', { name: /payment method/i }).selectOption({ label: method });
  }

  async submit() {
    await this.page.getByRole('button', { name: /submit/i }).click();
  }

  async confirm() {
    await this.page.getByRole('button', { name: /confirm/i }).click();
  }

  async verifySuccess(timeout = 5000) {
    await this.expectVisible(this.page.getByText(/bill payment successful|payment successful|bill paid successfully/i), timeout);
  }
}
