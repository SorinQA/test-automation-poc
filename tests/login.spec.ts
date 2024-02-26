import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page'
import { CompanyPage } from '../pages/company-page'

let apiContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: 'https://api.testintect.app/',
    extraHTTPHeaders: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      'Authorization': `Basic ${btoa("svd@intect.io:Sorintest9!")}`,
    },
  });
});

test.afterAll(async ({ }) => {
  await apiContext.dispose();
});

test('Login to the Intect app 1', async ({page, request}) => {
  const intectLogin = new LoginPage(page);
  const intectCompany = new CompanyPage(page);

  await intectLogin.goto();
  await intectLogin.login('svd@intect.io', 'Sorintest9!');

  await intectCompany.goToEmployeesPage();

  const response = await apiContext.post(`/api/auth/login`);
  const r = await response.json();
  // console.log('r: ', r)
  const token = r.Token
  console.log('Token: ', token)

  const myTest = await apiContext.get('/api/employmenttemplates/simple', {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Token ${token}`,
    }
  });
  const r1 = await myTest.json();
  console.log('Response1: ', r1);
});