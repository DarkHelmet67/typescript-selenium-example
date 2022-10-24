import 'chromedriver';

import { assert } from 'chai';
import { afterEach, beforeEach } from 'mocha';
import { Capabilities, WebElement } from 'selenium-webdriver';

import { Browser } from './helpers/browser';
import { doLogin, gotoLoginPage, loginOkTitle, selectorH1, waitForLoginConfirmation } from './pages/login';

const capabilities: {} | Capabilities = {
  'browserName' : 'chrome',
  'chromeOptions' : {
    'args' : ["--disable-plugins"]
  }
};

describe('Lesson 1: Automation Introduction and Basic Scripting', () => {
  let browser: Browser;

  before(() => {
    browser = new Browser('', capabilities);
  });

  it('Successfully logged in', async () => {
    browser.maximize();

    await gotoLoginPage(browser);

    await doLogin(browser, 'student', 'Password123');

    const okMessage: WebElement = await waitForLoginConfirmation(browser);
    assert.ok(okMessage.isDisplayed(), 'OK message not found');

    const okText: string = await okMessage.getText();
    assert.equal(okText, loginOkTitle, 'Unexpected OK message');

    await browser.getDriver().sleep(2000); // Just to have time to see if browser page is the right one
  });

  after(() => {
    browser.close();
  });
});
