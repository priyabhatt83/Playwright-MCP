import { expect, test as setup } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import type { Credentials } from '../types/credentials';

const credentials: Credentials = require('../test_data/credentials.json');
const authFile = resolve(__dirname, '../playwright/.auth/admin.json');

setup('authenticate as admin', async ({ page }) => {
  const { username, password } = credentials.admin;
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login(username, password);
  await expect(dashboardPage.heading).toBeVisible();

  await mkdir(dirname(authFile), { recursive: true });
  await page.context().storageState({ path: authFile });
});
