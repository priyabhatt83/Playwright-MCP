import { expect, test } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import type { Credentials } from '../types/credentials';
import type { LoginCase, LoginOutcomes } from '../types/login';

test.use({ storageState: { cookies: [], origins: [] } });

const credentials: Credentials = require('../test_data/credentials.json');
const loginCases: LoginCase[] = require('../test_data/login-cases.json');
const expectedOutcomes: { login: LoginOutcomes } = require('../test_data/expected-outcomes.json');

test.describe('OrangeHRM login validation', () => {
  for (const { credentialId, expectedOutcomeId } of loginCases) {
    const { username, password } = credentials[credentialId];

    test(`${username} expects ${expectedOutcomeId}`, async ({ page }) => {
      try {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await loginPage.goto();
        await loginPage.login(username, password);

        if (expectedOutcomeId === 'dashboard') {
          const outcome = expectedOutcomes.login.dashboard;
          await expect(page).toHaveURL(url => url.pathname === outcome.path);
          await expect(dashboardPage.heading).toHaveText(outcome.heading);
        } else {
          await expect(page.getByText(expectedOutcomes.login.invalidCredentials.message)).toBeVisible();
        }

        console.log(`PASS: ${username} -> ${expectedOutcomeId}`);
      } catch (error) {
        console.error(`FAIL: ${username} -> ${expectedOutcomeId}`);
        throw error;
      }
    });
  }
});
