import 'chromedriver';

import { assert } from 'chai';
import { Capabilities, until, WebElement, WebElementPromise } from 'selenium-webdriver';

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
    await browser.getDriver().wait(until.titleContains('Test Login'), 10000, 'Timeout waiting for LOGIN message');

    const username: WebElement = await browser.findElementById('username');
    username.sendKeys('student');

    const password: WebElement = await browser.findElementById('password');
    password.sendKeys('Password123');

    const submit: WebElement = await browser.findElementById('submit');
    submit.click();

    // await browser.getDriver().wait(until.elementIsVisible(await browser.findElement('#loop-container article .post-header h1')), 5000, 'Timeout waiting for OK message');
    await browser.getDriver().wait(until.titleContains('Logged In Successfully'), 10000, 'Timeout waiting for OK message');

    const okMessage: WebElement = await browser.findElement('#loop-container article .post-header h1');
    assert.ok(okMessage.isDisplayed(), 'OK message not found');

    const okText: string = await okMessage.getText();
    assert.equal(okText, 'Logged In Successfully', 'Unexpected OK message');

    await browser.getDriver().sleep(2000);
  });

  after(() => {
    browser.close();
  });
});
