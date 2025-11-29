const puppeteer = require('puppeteer');
const crypto = require('crypto');

(async () => {
  const BASE = 'http://localhost:4000';
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultTimeout(20000);

  try {
    // Signup flow
    const phone = '+234' + Math.floor(7000000000 + Math.random() * 999999999).toString().slice(0,10);
    await page.goto(`${BASE}/index.html`);
    await page.waitForSelector('#getStarted');
    await page.click('#getStarted');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // We're on signup page
    await page.waitForSelector('#name');
    await page.type('#name', 'E2E Test');
    await page.type('#phone', phone);
    await page.type('#password', 'Testpass123');

    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle2' })
    ]);

    // After signup should redirect to profile-selector.html
    const url = page.url();
    console.log('AFTER_SIGNUP_URL:' + url);

    // Check localStorage token
    const token = await page.evaluate(() => localStorage.getItem('jwt_token'));
    console.log('TOKEN_PRESENT:' + (!!token));

    // If token present, test logout by clearing and then login
    if (token) {
      // navigate to login page
      await page.goto(`${BASE}/pages/login.html`);
      await page.waitForSelector('#phone');
      await page.type('#phone', phone);
      await page.type('#password', 'Testpass123');
      await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation({ waitUntil: 'networkidle2' })
      ]);
      const url2 = page.url();
      console.log('AFTER_LOGIN_URL:' + url2);
      const token2 = await page.evaluate(() => localStorage.getItem('jwt_token'));
      console.log('TOKEN_AFTER_LOGIN_PRESENT:' + (!!token2));
    }

    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('E2E_ERROR', err);
    await browser.close();
    process.exit(2);
  }
})();