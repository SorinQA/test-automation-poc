import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page'
import { CompanyPage } from '../pages/company-page'

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});

test('Login to the Intect app 1', async ({ page }) => {
  const intectLogin = new LoginPage(page);
  const intectCompany = new CompanyPage(page);

  await page.routeFromHAR('./hars/intectLogin.har', {
    update: true,
  });

  await intectLogin.goto();
  await intectLogin.login('svd@intect.io', 'Sorintest9!');

  await intectCompany.goToEmployeesPage();
  await expect(page).toHaveURL('https://testintect.app/#/employee/payrolldata')
});