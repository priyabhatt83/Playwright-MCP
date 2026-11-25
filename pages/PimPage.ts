import { type Locator, type Page } from '@playwright/test';

export class PimPage {
  readonly addEmployeeLink: Locator;

  constructor(page: Page) {
    this.addEmployeeLink = page.getByRole('link', { name: 'Add Employee' });
  }

  async openAddEmployee() {
    await this.addEmployeeLink.click();
  }
}
