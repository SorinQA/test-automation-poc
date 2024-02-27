import { expect, type Locator, type Page } from '@playwright/test';

export class CompanyPage {
  readonly page: Page;
  readonly employees: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.employeesTabButton = page.locator('#EmployeeTabButton');
  }

  async goto() {
    await this.page.goto('https://testintect.app/#/employee/general');
  }

  async goToEmployeesPage() {
    await expect(this.employeesTabButton).toBeVisible();
    await this.employeesTabButton.click();
  }
}