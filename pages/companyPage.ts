import { expect, type Locator, type Page } from "@playwright/test";

export class CompanyPage {
  private readonly employeesTabButton: Locator;
  private readonly companyTabButton: Locator;
  private readonly moreButton: Locator;
  private readonly importData: Locator;
  private readonly generalTab: Locator;
  private readonly OkButton: Locator;
  private readonly importButton: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.employeesTabButton = page.locator("#EmployeeTabButton");
    this.companyTabButton = page.locator("#CompanyTabButton");
    this.moreButton = page.locator("button[title='More'] > span");
    this.importData = page.locator("//button[text()=' Import data ']");
    this.generalTab = page.locator("#CompanyGeneralTabButton");
    this.importButton = page.locator('#DialogButton_Import');
    this.OkButton = page.locator('#DialogButton_Ok');
    }

  async goto() {
    await this.page.goto("https://testintect.app/#/company/general", {
      waitUntil: "domcontentloaded",
    });
  }

  async goToEmployeesPage() {
    await expect(this.employeesTabButton).toBeVisible();
    await this.employeesTabButton.click();
  }

  async goToGeneralTab() {
    await this.generalTab.click();
  }

  async goToCompanyTab() {
    await this.page.waitForTimeout(2000);
    await expect(this.companyTabButton).toBeVisible();
    await this.page.waitForTimeout(2000);
    await this.companyTabButton.click();
  }

  async more() {
    await this.page.waitForTimeout(2000);
    await this.moreButton.waitFor();
    await this.moreButton.click();
  }

  async importMyData() {
    await this.page.waitForTimeout(2000);
    await this.importData.waitFor();
    await this.importData.click();
  }

  async uploadFile(filePath) {
    await this.page.waitForTimeout(2000);
    await this.page.locator("label").filter({ hasText: "Upload file" }).click();
    await this.page.waitForTimeout(2000);
    await this.page
      .locator("label")
      .filter({ hasText: "Employees Read more" })
      .locator("span")
      .first()
      .click();
    await this.page.waitForTimeout(2000);
    await this.page
      .locator("label")
      .filter({ hasText: "Upload file" })
      .locator("span")
      .first()
      .click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole("button", { name: "Upload" }).click();
    await this.page.waitForTimeout(2000);
    await this.page
      .locator('input[accept=".xlsx, .csv"]')
      .setInputFiles(filePath);
  }

  async importOK() {
    await this.page.waitForTimeout(5000);
    await expect(this.importButton).toBeVisible();
    await this.importButton.click();
    // await this.page
    //   .getByRole("button", { name: "Import", exact: true })
    //   .click();
    // await this.page.waitForTimeout(5000);
    await expect(this.OkButton).toBeEnabled();
    await expect(this.OkButton).toBeFocused();
    await expect(this.OkButton).toBeAttached();
    //.toBeVisible();
    await this.OkButton.click();
    // await this.page.getByRole('button', { name: 'OK', exact: true }).click();
  }
}