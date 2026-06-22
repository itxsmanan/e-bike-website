const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:5175/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'C:\\Users\\HP\\.gemini\\antigravity-cli\\brain\\337a157f-6b10-4e71-be95-f7fc6a18bcd4\\screenshot.png', fullPage: true });
  await browser.close();
})();
