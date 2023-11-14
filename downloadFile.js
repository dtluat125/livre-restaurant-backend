const { remote } = require('webdriverio');
const config = require('dotenv').config();

const DOWNLOAD_LINK = config.parsed.FINGER_SCANNER_DOWNLOAD_LINK;
const LOGIN_LINK = config.parsed.FINGER_SCANNER_LOGIN_LINK;
const USERNAME_FINGER_SCANNER = config.parsed.FINGER_SCANNER_USERNAME;
const PASSWORD_FINGER_SCANNER = config.parsed.FINGER_SCANNER_PASSWORD;

const USERNAME_XPATH = '/html/body/center/table[2]/tbody/tr[2]/td[3]/input';
const PASSWORD_XPATH = '/html/body/center/table[2]/tbody/tr[3]/td[3]/input';
const LOGIN_XPATH = '/html/body/center/table[2]/tbody/tr[5]/td/input[1]';
const DOWNLOAD_XPATH =
    '/html/body/table[1]/tbody/tr[1]/td/table/tbody/tr[3]/td[2]/input';
const MENU_XPATH = '/html/frameset/frameset/frame[2]';

async function downloadFile() {
    const browser = await remote({
        capabilities: {
            browserName: 'chrome',
        },
    });

    await browser.url(LOGIN_LINK);
    const login = async () => {
        const username = await browser.$(USERNAME_XPATH);
        const password = await browser.$(PASSWORD_XPATH);
        const loginBtn = await browser.$(LOGIN_XPATH);
        await username.setValue(USERNAME_FINGER_SCANNER);
        await password.setValue(PASSWORD_FINGER_SCANNER);
        await loginBtn.click();
    };
    await login();
    if (await browser.$(LOGIN_XPATH)) {
        await login();
    }
    await browser.waitUntil(async () => await browser.$(MENU_XPATH), {
        timeout: 3000,
        timeoutMsg: 'cannot login',
    });
    await browser.url(DOWNLOAD_LINK);
    const downloadBtn = await browser.$(DOWNLOAD_XPATH);
    await downloadBtn.click();
    await browser.pause(10000);
    await browser.deleteSession();
}

async function downloadAndRename() {
    await downloadFile();
}

downloadAndRename();
