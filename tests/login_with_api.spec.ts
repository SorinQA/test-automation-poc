import { test, expect } from '@playwright/test';

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

test('Login via API, get employmenttemplates PASSING assertion', async () => {
  const loginResponse = await apiContext.post(`/api/auth/login`);
  const loginRes = await loginResponse.json();
  const token = loginRes.Token

  const employmentTemplatesResponse = await apiContext.get('/api/employmenttemplates/simple', {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Token ${token}`,
    }
  });

  const empTemplatesRes = await employmentTemplatesResponse.json();
  
  expect(employmentTemplatesResponse.ok()).toBeTruthy();
  
  expect(empTemplatesRes).toContainEqual(expect.objectContaining({
    "Id": 39451, "Name": "Fastansat"
  })); 
});

test('Login via API, get employmenttemplates FAILING assertion', async () => {
  const loginResponse = await apiContext.post(`/api/auth/login`);
  const loginRes = await loginResponse.json();
  const token = loginRes.Token

  const employmentTemplatesResponse = await apiContext.get('/api/employmenttemplates/simple', {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Token ${token}`,
    }
  });

  const empTemplatesRes = await employmentTemplatesResponse.json();
  
  expect(employmentTemplatesResponse.ok()).toBeTruthy();
  
  expect(empTemplatesRes).toContainEqual(expect.objectContaining({
    "Id": 39451, "Name": "Fastansat_xxx"
  })); 
});