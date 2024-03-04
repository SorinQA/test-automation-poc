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

test('Import via API', async () => {
  const loginResponse = await apiContext.post(`/api/auth/login`);
  const loginData = await loginResponse.json();
  const token = loginData.Token

  const fileEncodedBase64 = fs.readFileSync('./test-files/Create_Employee_Import_With_Errors.xlsx', 'base64')
  
  const importResponse = await apiContext.post('/api/import', {
    headers: {
      'Accept': 'application/json; charset=utf-8',
      'Authorization': `Token ${token}`,
    },
    data: {"AccountId":null,"FileBase64":`${fileEncodedBase64}`,"MappingId":9278,"Options":[{"Key":"save","Value":"noerror"},{"Key":"Change","Value":"Upsert"}]}
  });
  
  expect(importResponse.ok()).toBeTruthy();

  const importData = await importResponse.json();
  
  expect(importData['Errors'][0]['TranslationEntity']['Key']).toBeTruthy();
  expect(importData['Errors'][0]['TranslationEntity']).toEqual(expect.objectContaining({"Key": "ImportInvalidEmploymentTemplate"})); 
});