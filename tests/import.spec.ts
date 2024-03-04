import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/login-page'
import { CompanyPage } from '../pages/company-page'

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});

test('Test import - with page objects', async ({ page }) => {
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