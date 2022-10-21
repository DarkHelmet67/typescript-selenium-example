import 'chromedriver';

import { assert } from 'chai';
import { Capabilities, WebElement, WebElementPromise } from 'selenium-webdriver';

import { Browser } from './helpers/browser';

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

    browser.navigate('https://practicetestautomation.com/practice-test-login/');

    const username: WebElement = await browser.findElementById('username');
    console.log({username});
    username.sendKeys('student');

    const password: WebElement = await browser.findElementById('password');
    console.log({password});
    password.sendKeys('Password123');

    const submit: WebElement = await browser.findElementById('submit');
    console.log({submit});
    submit.click();

    browser.getDriver().wait(() => browser.findElement('#loop-container article .post-header h1'), 5000, 'Timeout waiting for OK message');

    const okMessage: WebElement = await browser.findElement('#loop-container article .post-header h1');
    assert.ok(okMessage.isDisplayed(), 'OK message not found');

    const okText: string = await okMessage.getText();
    console.log({okMessage, okText});
    assert.equal(okText, '', 'Unexpected OK message');

    // await browser.getDriver().sleep(2000);
  });

  after(() => {
    browser.close();
  });
});
