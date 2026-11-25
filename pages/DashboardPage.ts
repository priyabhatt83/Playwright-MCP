import { type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  readonly heading: Locator;
  readonly pimLink: Locator;

  constructor(page: Page) {
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
    this.pimLink = page.getByRole('link', { name: 'PIM' });
  }

  async openPim() {
    await this.pimLink.click();
  }
}
