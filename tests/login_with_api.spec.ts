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

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});

test('Login via API, get employmenttemplates (PASSING)', async ({page, request}, testResult) => {
  const response = await apiContext.post(`/api/auth/login`);
  const r = await response.json();
  const token = r.Token
  // console.log('Token: ', token)

  const myTest = await apiContext.get('/api/employmenttemplates/simple', {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Token ${token}`,
    }
  });

  const r1 = await myTest.json();
  // console.log('r1: ', r1);

  // console.log('r1[0]: ', r1[0])

  expect(myTest.ok()).toBeTruthy();
  
  expect(r1[1]).toContainEqual(expect.objectContaining({
    "Id": 39451, "Name": "Fastansat"
  })); 
});

test('Login via API, get employmenttemplates (FAILING)', async ({page, request}, testResult) => {
  const response = await apiContext.post(`/api/auth/login`);
  const r = await response.json();
  const token = r.Token
  // console.log('Token: ', token)

  const myTest = await apiContext.get('/api/employmenttemplates/simple', {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Token ${token}`,
    }
  });

  const r1 = await myTest.json();
  // console.log('r1: ', r1);

  // console.log('r1[0]: ', r1[0])

  expect(myTest.ok()).toBeTruthy();
  
  expect(r1[1]).toContainEqual(expect.objectContaining({
    "Id": 39451, "Name": "Fastansatxxx"
  })); 
});