import 'chromedriver';

import { assert } from 'chai';
import { afterEach, beforeEach } from 'mocha';
import { Capabilities, WebElement } from 'selenium-webdriver';

import { Browser } from './helpers/browser';
import {
  doLogin,
  getCurrentUrl,
  getElementLoginConfirmation,
  getElementSiteTitle,
  gotoLoginPage,
  textLoginOk,
  textPassword,
  textUsername,
  urlLoginOk,
} from './pages/loginPage';

const capabilities: {} | Capabilities = {
  'browserName' : 'chrome',
  'chromeOptions' : {
    'args' : ['--disable-plugins']
  }
};

describe('Lesson 1: Automation Introduction and Basic Scripting', () => {
  let browser: Browser;

  beforeEach(() => {
    browser = new Browser('', capabilities);
  });

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
  });

  afterEach(() => {
    browser.close();
  });
});
