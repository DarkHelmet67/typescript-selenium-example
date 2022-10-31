import 'chromedriver';

import { assert } from 'chai';
import { afterEach, beforeEach } from 'mocha';
import { Capabilities, until, WebElement } from 'selenium-webdriver';

import { getCapabilities } from '../bs-config';
import { Browser } from './helpers/browser';
import {
    doLogin, getCurrentUrl, getElementErrorMessage, getElementLoginConfirmation,
    getElementSiteTitle, gotoLoginPage, textLoginOk
} from './pages/loginPage';

const textInvalidPassword: string = 'Your password is invalid!';
const textInvalidUsername: string = 'Your username is invalid!';
const textPassword: string = 'Password123';
const textUsername: string = 'student';
const urlLoginOk: string = 'https://practicetestautomation.com/logged-in-successfully/';
const timeout: number = 20000;

getCapabilities('browserstack-build-1', 'Lesson 1: Automation Introduction and Basic Scripting').forEach((capabilities: {} | Capabilities) => {
  describe('Lesson 1: Automation Introduction and Basic Scripting', () => {
    let browser: Browser;

    beforeEach(() => {
      browser = new Browser(capabilities);
      browser.maximize();
    });

    afterEach(() => {
      browser.close();
    });

    it('Successfully logged in (without using PAGE OBJECT MODEL)', async () => {
      const selectorH1: string = '.loop-container article .post-header h1';
      const selectorPassword: string = 'password';
      const selectorSiteTitle: string = 'site-title';
      const selectorSubmit: string = 'submit';
      const selectorUsername: string = 'username';
      const textLogin: string = 'Test Login';
      const textLoginOk: string = 'Logged In Successfully';
      const urlLogin: string = 'https://practicetestautomation.com/practice-test-login/';

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

      // await browser.getDriver().sleep(1000); // Uncomment if you want to see actual browser screen before test finish
    }).timeout(timeout);

    it('Successfully logged in (using PAGE OBJECT MODEL)', async () => {
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

      // await browser.getDriver().sleep(1000); // Uncomment if you want to see actual browser screen before test finish
    }).timeout(timeout);

    it('Bonus Exercise - Wrong username', async () => {
      await gotoLoginPage(browser);

      await doLogin(browser, 'foo', textPassword);
      // await browser.getDriver().sleep(1000); // Uncomment if you want to see actual browser screen before test finish

      const errorMessage: WebElement = await getElementErrorMessage(browser);
      assert.ok(errorMessage.isDisplayed(), 'Error message not found');

      const errorText: string = await errorMessage.getText();
      assert.equal(errorText, textInvalidUsername, 'Unexpected error message');
    }).timeout(timeout);

    it('Bonus Exercise - Wrong Password', async () => {
      await gotoLoginPage(browser);

      await doLogin(browser, textUsername, 'foo');
      // await browser.getDriver().sleep(1000); // Uncomment if you want to see actual browser screen before test finish

      const errorMessage: WebElement = await getElementErrorMessage(browser);
      assert.ok(errorMessage.isDisplayed(), 'Error message not found');

      const errorText: string = await errorMessage.getText();
      assert.equal(errorText, textInvalidPassword, 'Unexpected error message');
    }).timeout(timeout);
  });
});
