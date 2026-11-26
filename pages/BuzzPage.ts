import { type Locator, type Page } from '@playwright/test';

export class BuzzPage {
  readonly latestPostsSection: Locator;
  readonly messageInput: Locator;
  readonly postButton: Locator;

  constructor(page: Page) {
    this.latestPostsSection = page.getByRole('button', { name: /Most Recent Posts/ });
    this.messageInput = page.getByRole('textbox', { name: "What's on your mind?" });
    this.postButton = page.getByRole('button', { name: 'Post', exact: true });
  }

  async publishPost(message: string) {
    await this.messageInput.fill(message);
    await this.postButton.click();
  }
}
