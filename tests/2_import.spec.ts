import { test, expect } from "@playwright/test";

import { LoginPage } from "../pages/loginPage";
import { CompanyPage } from "../pages/companyPage";

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});

test("Test import - with page objects - PASSING", async ({ page }) => {
  const intectLogin = new LoginPage(page);
  const intectCompany = new CompanyPage(page);

  await intectLogin.goto();
  // await intectLogin.login("svd@intect.io", "Sorintest9!");
  await intectLogin.login("svd+33758675@intect.io", "Sorintest9!");

  await intectCompany.goToCompanyTab();
  await intectCompany.goToGeneralTab();
  await intectCompany.more();
  await intectCompany.importMyData();
  await intectCompany.uploadFile('./test-files/StandardMapping (100).xlsx');
  await intectCompany.importOK();

  await intectCompany.goToEmployeesPage();
  await expect(page).toHaveURL("https://testintect.app/#/employee/general");
});

test("Test import - with page objects - FAILING", async ({ page }) => {
  const intectLogin = new LoginPage(page);
  const intectCompany = new CompanyPage(page);

  await intectLogin.goto();
  // await intectLogin.login("svd@intect.io", "Sorintest9!");
  await intectLogin.login("svd+33758675@intect.io", "Sorintest9!");

  await intectCompany.goToCompanyTab();
  await intectCompany.goToGeneralTab();
  await intectCompany.more();
  await intectCompany.importMyData();
  await intectCompany.uploadFile('./test-files/Create_Employee_Import_With_Errors.xlsx');
  await intectCompany.importOK();

  await intectCompany.goToEmployeesPage();
  await expect(page).toHaveURL("https://testintect.app/#/employee/general");
});