const q = '_token=4MLmjFP6M7hlUWArQ6fxbClr2fZKVwxpgS1O97Vm&WT_z_search_type=PowerSearch+Advanced&saveRecentSearch=true&searchFormType=advanced&searchOperation=Search&recordOffset=0&newSort=false&wtTracker=%28wtSearchType%2CPowerSearch+Basic%29%28wtRefLinkPrefix%2Cps_srchfm_%29%28wtSavedSearchRefLink%2C%29%28wtSavedSearchTypeLink%2C%29&searchParams=%3Ftype%255B0%255D%3D104000001%26type%255B1%255D%3D104000002%26type%255B2%255D%3D104000004%26type%255B3%255D%3D104000003%26make%255B0%255D%3D101000010&vehicleTypeAll=-1&vehicleTypes=104000001&vehicleTypes=104000002&vehicleTypes=104000004&vehicleTypes=104000003&model=101000010&fromYear=ALL&toYear=ALL&fromOdometer=0&toOdometer=ALL&region=ALL&state=330&auctionLocations=146&inventories=39331&mmrRanges=ALL&srpResultsPerPage=25'

const puppeteer = require('puppeteer');
const fs = require('fs');
const md5 = require('md5');
const USERNAME_SELECTOR = '#user_username';
const PASSWORD_SELECTOR = '#user_password';
const CTA_SELECTOR = '#submit';
const U_LOGIN = 'garyrechi';
const U_PASSWORD = 'Solon!2015';

const profileUrl = 'https://profiles-ui.manheim.com/profile';
const authUrl = "https://api.manheim.com/auth/authorization.oauth2?adaptor=manheim_customer&client_id=qdp6ewmug522t9umyxyqydnx&response_type=code&scope=openid&redirect_uri=https://members.manheim.com/gateway/callback&back_uri=https://www.manheim.com/members/mymanheim/?classic=true";

async function startBrowser() {
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    //const browser = await puppeteer.launch({userDataDir: './puppeteer_data', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    return {browser, page};
}

async function closeBrowser(browser) {
    return browser.close();
}

async function getMakers(page) {
    const argv = require('minimist')(process.argv.slice(2));
    const query = argv.query.substr(1);

    const response = await page.goto('https://www.manheim.com/members/powersearch/getMakes.do?' + query);
    // const response = await page.goto('https://www.manheim.com/members/powersearch/getMakes.do?vehicleType=-1');
    const responseBody = await response.text();

    const filename = `${md5(query)}.json`;
    fs.writeFileSync(filename, responseBody);
    await page.screenshot({path: 'example.png'});
    console.info(filename);

}

async function checkAuth(page) {

    await page.goto(profileUrl);
    await page.screenshot({path: 'checkAuth.png'});

    if (page.url() !== profileUrl) {
        return false;
    }
    return true;

}

async function getModels(page) {

    const argv = require('minimist')(process.argv.slice(2));
    const query = argv.query;
    const filename = `${md5(query)}.json`;
    const response = await page.goto('https://www.manheim.com/members/powersearch/getModels.do?' + query);
    const responseBody = await response.text();

    fs.writeFileSync(filename, responseBody);
    await page.screenshot({path: 'model.png'});
    console.info(filename);
}

async function getResult(page) {
    const argv = require('minimist')(process.argv.slice(2));

    const query = argv.query;
    const filename = `${md5(query)}.html`;


    const response = await page.goto('https://www.manheim.com/members/powersearch/searchSubmit.do?'+query);
    const responseBody = await response.text();

    fs.writeFileSync(filename, responseBody);
    await page.screenshot({path: 'result.png'});
    console.info(  filename );

}

async function makeAuth(page) {
    await page.goto(authUrl);


    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(U_LOGIN);
    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(U_PASSWORD);
    await page.click(CTA_SELECTOR);
    await page.waitForNavigation();
    const cookies = await page.cookies()
    fs.writeFileSync('canvas-session.json', JSON.stringify(cookies));
}


async function init() {
    const {browser, page} = await startBrowser();

    const cookiesString = fs.readFileSync('./canvas-session.json');
    const cookies = JSON.parse(cookiesString);


    console.log(cookies)
    //await page.setCookie(...cookies);



    // page.setViewport({width: 1366, height: 768});
    //
    //
    // const isAuth = await checkAuth(page);
    //
    // if (!isAuth) {
    //     await makeAuth(page);
    // }
    // const argv = require('minimist')(process.argv.slice(2));
    //
    //
    // if (argv.mode && argv.mode === 'model') {
    //     await getModels(page)
    // }
    //
    // if (argv.mode && argv.mode === 'maker') {
    //     await getMakers(page)
    // }
    //
    // if (argv.mode && argv.mode === 'result') {
    //     await getResult(page)
    // }

}

(async () => {
    await init();
    process.exit(1);
})();
