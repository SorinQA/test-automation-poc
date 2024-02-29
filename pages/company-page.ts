import { expect, type Locator, type Page } from '@playwright/test';

export class CompanyPage {
  readonly page: Page;
  readonly employees: Locator;
  readonly employeesTabButton: Locator;
  readonly moreButton: Locator;
  readonly importData: Locator;
  readonly generalTab: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.employeesTabButton = page.locator('#EmployeeTabButton');
    this.moreButton = page.locator('button[title=\'More\'] > span');
    this.importData = page.locator('//button[text()=\' Import data \']');
    this.generalTab = page.locator('#CompanyGeneralTabButton')
  }

  async goto() {
    await this.page.goto('https://testintect.app/#/company/general', {waitUntil: 'domcontentloaded'});
  }

  async goToEmployeesPage() {
    await expect(this.employeesTabButton).toBeVisible();
    await this.employeesTabButton.click();
  }

  async goToGeneralTab() {
    await this.generalTab.click();
  }

  async more() {
    // await this.page.waitForTimeout(5000);
    await this.moreButton.waitFor();
    await this.moreButton.click();
  }

  async importMyData() {
    await this.importData.waitFor();
    await this.importData.click();
  }

  async uploadFile(filePath) {
      await this.page.locator('label').filter({ hasText: 'Upload file' }).click();
      await this.page.getByRole('button', { name: 'Upload' }).click();
      await this.page.locator('input[accept=".xlsx"]').setInputFiles(filePath);
  }

  async importOK() {
      await this.page.getByRole('button', { name: 'Import', exact: true }).click();
      await this.page.getByRole('button', { name: 'OK', exact: true }).click();
      // await this.page.waitForTimeout(5000);
  }
}