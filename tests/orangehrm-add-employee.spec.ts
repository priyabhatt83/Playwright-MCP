import { parse } from 'csv-parse/sync';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, test } from '@playwright/test';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import { DashboardPage } from '../pages/DashboardPage';
import { EmployeeProfilePage } from '../pages/EmployeeProfilePage';
import { LoginPage } from '../pages/LoginPage';
import { PimPage } from '../pages/PimPage';

type EmployeeData = {
  Username: string;
  Password: string;
  FirstName: string;
  LastName: string;
  Expected: string;
};

const csvPath = resolve(__dirname, '../test_data/employeeData.csv');
const employeeData = parse<EmployeeData>(readFileSync(csvPath), {
  columns: true,
  skip_empty_lines: true,
  trim: true,
});

test.describe('OrangeHRM employee management', () => {
  for (const { Username, Password, FirstName, LastName, Expected } of employeeData) {
    test(`adds ${Expected} and displays the employee profile`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const dashboardPage = new DashboardPage(page);

      await loginPage.goto();
      await loginPage.login(Username, Password);

      await dashboardPage.openPim();
      await expect(page).toHaveURL(/\/web\/index\.php\/pim\/viewEmployeeList$/);

      const pimPage = new PimPage(page);
      await pimPage.openAddEmployee();

      const addEmployeePage = new AddEmployeePage(page);
      await addEmployeePage.addEmployee(FirstName, LastName);

      await expect(page).toHaveURL(/\/web\/index\.php\/pim\/viewPersonalDetails\/empNumber\/\d+$/);
      const employeeProfilePage = new EmployeeProfilePage(page, Expected);
      await expect(employeeProfilePage.employeeNameHeading).toBeVisible();
    });
  }
});
