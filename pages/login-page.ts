import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly submit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('#loginUsername');
    this.password = page.locator('#loginPassword');
    this.submit = page.locator('#login-btn');
  }

  async goto() {
    await this.page.goto('https://testintect.app/#/login/', {waitUntil: 'domcontentloaded'});
  }

  async login(username: string, password: string) {
    await this.username.waitFor();
    await this.username.fill(username);
    await this.password.waitFor();
    await this.password.fill(password);
    await this.submit.click();
  }
}