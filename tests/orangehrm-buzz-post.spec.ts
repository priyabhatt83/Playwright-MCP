import { randomUUID } from 'node:crypto';
import { expect, test } from '@playwright/test';
import { BuzzPage } from '../pages/BuzzPage';
import { DashboardPage } from '../pages/DashboardPage';
import type { BuzzCase } from '../types/buzz';

const buzzCases: BuzzCase[] = require('../test_data/buzz-cases.json');

test.describe('OrangeHRM Buzz posts', () => {
  for (const { message } of buzzCases) {
    test(`publishes "${message}"`, async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      const buzzPage = new BuzzPage(page);
      const submittedMessage = `${message} [${randomUUID()}]`;

      await dashboardPage.goto();
      await expect(dashboardPage.heading).toBeVisible();
      await dashboardPage.openBuzz();
      await expect(page).toHaveURL(/\/web\/index\.php\/buzz\/viewBuzz$/);
      await expect(buzzPage.latestPostsSection).toBeVisible();

      await buzzPage.publishPost(submittedMessage);
      await expect(page.getByText(submittedMessage, { exact: true })).toBeVisible();
    });
  }
});
