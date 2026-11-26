import { type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  readonly heading: Locator;
  readonly pimLink: Locator;
  readonly buzzLink: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
    this.pimLink = page.getByRole('link', { name: 'PIM' });
    this.buzzLink = page.getByRole('link', { name: 'Buzz' });
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  }

  async openPim() {
    await this.pimLink.click();
  }

  async openBuzz() {
    await this.buzzLink.click();
  }
}
