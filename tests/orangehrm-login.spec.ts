import { parse } from 'csv-parse/sync';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, test } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';

type LoginData = {
  Username: string;
  Password: string;
  Expected: 'Dashboard' | 'Invalid credentials';
};

const csvPath = resolve(__dirname, '../test_data/loginData.csv');
const loginData = parse<LoginData>(readFileSync(csvPath), {
  columns: true,
  skip_empty_lines: true,
  trim: true,
});

test.describe('OrangeHRM CSV-driven login validation', () => {
  for (const { Username, Password, Expected } of loginData) {
    test(`${Username} expects ${Expected}`, async ({ page }) => {
      try {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await loginPage.goto();
        await loginPage.login(Username, Password);

        if (Expected === 'Dashboard') {
          await expect(page).toHaveURL(/\/web\/index\.php\/dashboard\/index$/);
          await expect(dashboardPage.heading).toBeVisible();
        } else {
          await expect(page.getByText('Invalid credentials')).toBeVisible();
        }

        console.log(`PASS: ${Username} -> ${Expected}`);
      } catch (error) {
        console.error(`FAIL: ${Username} -> ${Expected}`);
        throw error;
      }
    });
  }
});
