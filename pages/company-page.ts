import { expect, type Locator, type Page } from '@playwright/test';

export class CompanyPage {
  private readonly employeesTabButton: Locator;
  private readonly moreButton: Locator;
  private readonly importData: Locator;
  private readonly generalTab: Locator;
  
  constructor(public readonly page: Page) {
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
  }
}