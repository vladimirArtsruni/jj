const puppeteer = require('puppeteer');
const fs = require('fs');
const USERNAME_SELECTOR = '#user_username';
const PASSWORD_SELECTOR = '#user_password';
const CTA_SELECTOR = '#submit';
const U_LOGIN = 'garyrechi';
const U_PASSWORD = 'Solon!2015';

async function startBrowser() {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  //const browser = await puppeteer.launch({userDataDir: './puppeteer_data', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  return {browser, page};
}

async function closeBrowser(browser) {
  return browser.close();
}

async function playTest(url) {
  const {browser, page} = await startBrowser();
  page.setViewport({width: 1366, height: 768});
  await page.goto(url);
  /*const responseBody = await response.text();*/



 /* fs.writeFile('canvas-session.json', JSON.stringify(cookies, null, 2), function(err) {
	if (err) throw err;
	console.log('completed write of cookies');
  }); */
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(U_LOGIN);
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(U_PASSWORD);
  await page.click(CTA_SELECTOR);
  await page.waitForNavigation();
    const cookies = await page.cookies()
  console.info("cookies are ", cookies);
  fs.writeFileSync('canvas-session.json', JSON.stringify(cookies));
  


  const response = await page.goto('https://www.manheim.com/members/powersearch/searchResults.do');
  const responseBody = await response.text();
  fs.writeFileSync('content.html', responseBody);
  await page.screenshot({path: 'example.png'});
}

(async () => {
  await playTest("https://api.manheim.com/auth/authorization.oauth2?adaptor=manheim_customer&client_id=qdp6ewmug522t9umyxyqydnx&response_type=code&scope=openid&redirect_uri=https://members.manheim.com/gateway/callback&back_uri=https://www.manheim.com/members/mymanheim/?classic=true");
  process.exit(1);
})();