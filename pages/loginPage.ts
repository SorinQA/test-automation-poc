import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly submit: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.username = page.locator('#loginUsername');
    this.password = page.locator('#loginPassword');
    this.submit = page.locator('#login-btn');
  }

  async goto() {
    await this.page.goto('https://testintect.app/#/login/', {waitUntil: 'domcontentloaded'});

    const [response] = await Promise.all([
      this.page.waitForResponse(res => {
          return res.status() == 200
              &&
              res.url() == `https://api.testintect.app//api/clientminversion`
      })
  ]);
  await response.finished();

  }

  async login(username: string, password: string) {
    await this.username.waitFor();
    await this.username.fill(username);
    await this.password.waitFor();
    await this.password.fill(password);
    await this.submit.click();
  }
}