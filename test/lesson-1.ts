import 'chromedriver';

import { assert } from 'chai';
import { afterEach, beforeEach } from 'mocha';
import { Capabilities, until, WebElement } from 'selenium-webdriver';

import { Browser } from './helpers/browser';

const capabilities: {} | Capabilities = {
  'browserName' : 'chrome',
  'chromeOptions' : {
    'args' : ['--disable-plugins']
  }
};

const selectorH1: string = '.loop-container article .post-header h1';
const selectorPassword: string = 'password';
const selectorSiteTitle: string = 'site-title';
const selectorSubmit: string = 'submit';
const selectorUsername: string = 'username';
const textLogin: string = 'Test Login';
const textLoginOk: string = 'Logged In Successfully';
const textPassword: string = 'Password123';
const textUsername: string = 'student';
const timeout: number = 10000;
const urlLogin: string = 'https://practicetestautomation.com/practice-test-login/';
const urlLoginOk: string = 'https://practicetestautomation.com/logged-in-successfully/';

describe('Lesson 1: Automation Introduction and Basic Scripting', () => {
  let browser: Browser;
  
  beforeEach(() => {
    browser = new Browser('', capabilities);
  });
  
  it('Successfully logged in', async () => {
    // Written WITHOUT using PAGE OBJECT MODEL
    browser.maximize();

    browser.navigate(urlLogin);
    await browser.getDriver().wait(until.titleContains(textLogin), timeout, 'Timeout waiting for LOGIN message');

    const weUsername: WebElement = await browser.findElementById(selectorUsername);
    weUsername.sendKeys(textUsername);
  
    const wePassword: WebElement = await browser.findElementById(selectorPassword);
    wePassword.sendKeys(textPassword);
  
    const weSubmit: WebElement = await browser.findElementById(selectorSubmit);
    weSubmit.click();
  
    await browser.getDriver().wait(until.titleContains(textLoginOk), timeout, 'Timeout waiting for OK message');
    const okMessage: WebElement = await browser.findElement(selectorH1);
    assert.ok(okMessage.isDisplayed(), 'OK message not found');

    const okText: string = await okMessage.getText();
    assert.equal(okText, textLoginOk, 'Unexpected OK message');

    const siteTitle: WebElement = await browser.findElementById(selectorSiteTitle);
    assert.ok(siteTitle.isDisplayed(), 'Site title not found');

    const urlCurrent: string = await browser.getCurrentUrl();
    assert.equal(urlCurrent, urlLoginOk, 'Unexpected url');

    await browser.getDriver().sleep(1000); // Uncomment if you want to see actual browser screen before test finish
  }).timeout(15000);

  afterEach(() => {
    browser.close();
  });
});
