import { test, expect } from '@playwright/test';
const fs = require('fs')

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

test('Import via API', async ({page, request}, testResult) => {
  const loginResponse = await apiContext.post(`/api/auth/login`);
  const loginRes = await loginResponse.json();
  const token = loginRes.Token
  // console.log('Token: ', token)

  const fileDataBase64 = fs.readFileSync('Create Employee Import.xlsx', 'base64')
  // console.log(fileDataBase64)

  const employmentTemplatesResponse = await apiContext.post('/api/import', {
    headers: {
      'Accept': 'application/json; charset=utf-8',
      'Authorization': `Token ${token}`,
    },
    data: {"AccountId":null,"FileBase64":`${fileDataBase64}`,"MappingId":9278,"Options":[{"Key":"save","Value":"noerror"},{"Key":"Change","Value":"Upsert"}]}
});

  const empTemplatesRes = await employmentTemplatesResponse.json();

  console.log(empTemplatesRes);
  
  expect(employmentTemplatesResponse.ok()).toBeTruthy();
  
  console.log('Happy importing!')
  // expect(empTemplatesRes).toContainEqual(expect.objectContaining({
  //   "Id": 39451, "Name": "Fastansat"
  // })); 
});



