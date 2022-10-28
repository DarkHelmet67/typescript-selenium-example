import 'chromedriver';

import { assert } from 'chai';
import { afterEach, beforeEach } from 'mocha';
import { Capabilities, WebElement } from 'selenium-webdriver';

import { Browser } from './helpers/browser';
import {
  doLogin,
  getCurrentUrl,
  getElementErrorMessage,
  getElementLoginConfirmation,
  getElementSiteTitle,
  gotoLoginPage,
  textLoginOk,
} from './pages/loginPage';

const capabilities: {} | Capabilities = {
  'browserName' : 'chrome',
  'chromeOptions' : {
    'args' : ['--disable-plugins']
  }
};

const textInvalidPassword: string = 'Your password is invalid!';
const textInvalidUsername: string = 'Your username is invalid!';
const textPassword: string = 'Password123';
const textUsername: string = 'student';
const urlLoginOk: string = 'https://practicetestautomation.com/logged-in-successfully/';

describe('Lesson 2: Environment Variables and Parallel Testing', () => {
  // Written using PAGE OBJECT MODEL
  let browser: Browser;

  beforeEach(() => {
    browser = new Browser('', capabilities);
  });

  it('Wrong username', async () => {
    browser.maximize();

    await gotoLoginPage(browser);

    await doLogin(browser, 'foo', textPassword);
    await browser.getDriver().sleep(1000); // Uncomment if you want to see actual browser screen before test finish

    const errorMessage: WebElement = await getElementErrorMessage(browser);
    assert.ok(errorMessage.isDisplayed(), 'Error message not found');

    const errorText: string = await errorMessage.getText();
    assert.equal(errorText, textInvalidUsername, 'Unexpected error message');
  }).timeout(10000);

  it('Wrong Password', async () => {
    browser.maximize();

    await gotoLoginPage(browser);

    await doLogin(browser, textUsername, 'foo');
    await browser.getDriver().sleep(1000); // Uncomment if you want to see actual browser screen before test finish

    const errorMessage: WebElement = await getElementErrorMessage(browser);
    assert.ok(errorMessage.isDisplayed(), 'Error message not found');

    const errorText: string = await errorMessage.getText();
    assert.equal(errorText, textInvalidPassword, 'Unexpected error message');
  }).timeout(10000);

  it('Successfully logged in', async () => {
    browser.maximize();

    await gotoLoginPage(browser);

    await doLogin(browser, textUsername, textPassword);

    const okMessage: WebElement = await getElementLoginConfirmation(browser);
    assert.ok(okMessage.isDisplayed(), 'OK message not found');

    const okText: string = await okMessage.getText();
    assert.equal(okText, textLoginOk, 'Unexpected OK message');

    const siteTitle: WebElement = await getElementSiteTitle(browser);
    assert.ok(siteTitle.isDisplayed(), 'Site title not found');

    const urlCurrent: string = await getCurrentUrl(browser);
    assert.equal(urlCurrent, urlLoginOk, 'Unexpected url');

    await browser.getDriver().sleep(1000); // Uncomment if you want to see actual browser screen before test finish
  }).timeout(15000);

  afterEach(() => {
    browser.close();
  });
});
