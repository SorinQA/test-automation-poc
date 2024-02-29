import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/login-page'
import { CompanyPage } from '../pages/company-page'

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});

test('Test import - with page objects', async ({page, request}, testResult) => {
  const intectLogin = new LoginPage(page);
  const intectCompany = new CompanyPage(page);

  await intectLogin.goto();
  await intectLogin.login('svd@intect.io', 'Sorintest9!');

  await intectCompany.goToGeneralTab();
  await intectCompany.more();
  await intectCompany.importMyData();
  await intectCompany.uploadFile('../Create Employee Import.xlsx');
  await intectCompany.importOK();

  await intectCompany.goToEmployeesPage();
  await expect(page).toHaveURL('https://testintect.app/#/employee/payrolldata')
});

// test('Test import - without page objects', async ({ page }) => {
//   await page.goto('https://testintect.app/#/login/');
//   await page.getByPlaceholder('CPR / Email / Telefon').click();
//   await page.getByPlaceholder('CPR / Email / Telefon').fill('svd@intect.io');
//   await page.getByPlaceholder('CPR / Email / Telefon').press('Tab');
//   await page.getByPlaceholder('Password').press('CapsLock');
//   await page.getByPlaceholder('Password').fill('S');
//   await page.getByPlaceholder('Password').press('CapsLock');
//   await page.getByPlaceholder('Password').fill('Sorintest9!');
//   await page.getByPlaceholder('Password').press('Enter');

//   await page.locator('#CompanyGeneralTabButton').click();
//   await page.getByRole('button', { name: 'More' }).getByRole('button').click();

//   await page.getByRole('button', { name: 'Import data' }).click();

//   await page.locator('label').filter({ hasText: 'Upload file' }).click();
//   await page.getByRole('button', { name: 'Upload' }).click();
//   await page.locator('input[accept=".xlsx"]').setInputFiles('Create Employee Import.xlsx');

//   await page.getByRole('button', { name: 'Import', exact: true }).click();
//   await page.getByRole('button', { name: 'OK', exact: true }).click();

//   await page.waitForTimeout(5000);
//   await page.getByRole('button', { name: 'Employees', exact: true }).click();
// });