import { expect, test } from '@playwright/test';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import { DashboardPage } from '../pages/DashboardPage';
import { EmployeeProfilePage } from '../pages/EmployeeProfilePage';
import { PimPage } from '../pages/PimPage';
import type { EmployeeCase, EmployeeOutcomes } from '../types/employee';

const employeeCases: EmployeeCase[] = require('../test_data/employee-cases.json');
const expectedOutcomes: EmployeeOutcomes = require('../test_data/expected-outcomes.json');

test.describe('OrangeHRM employee management', () => {
  for (const { firstName, lastName, expectedOutcomeId } of employeeCases) {
    const expectedEmployeeName = expectedOutcomes.employeeProfiles[expectedOutcomeId];

    test(`adds ${expectedEmployeeName} and displays the employee profile`, async ({ page }) => {
      const dashboardPage = new DashboardPage(page);

      await dashboardPage.goto();
      await expect(dashboardPage.heading).toBeVisible();
      await dashboardPage.openPim();
      await expect(page).toHaveURL(/\/web\/index\.php\/pim\/viewEmployeeList$/);

      const pimPage = new PimPage(page);
      await pimPage.openAddEmployee();

      const addEmployeePage = new AddEmployeePage(page);
      await addEmployeePage.addEmployee(firstName, lastName);

      await expect(page).toHaveURL(/\/web\/index\.php\/pim\/viewPersonalDetails\/empNumber\/\d+$/);
      const employeeProfilePage = new EmployeeProfilePage(page, expectedEmployeeName);
      await expect(employeeProfilePage.employeeNameHeading).toBeVisible();
    });
  }
});
