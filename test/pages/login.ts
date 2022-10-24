import { until, WebElement } from 'selenium-webdriver';

import { Browser } from '../helpers/browser';

export const loginOkTitle: string = 'Logged In Successfully';
export const loginPassword: string = 'password';
export const loginTitle: string = 'Test Login';
export const loginUrl: string = 'https://practicetestautomation.com/practice-test-login/';
export const loginUsername: string = 'username';
export const selectorH1: string = '.loop-container article .post-header h1';
export const selectorSubmit: string = 'submit';
export const waitTimeout: number = 10000;

export const gotoLoginPage = async(browser: Browser): Promise<void> => {
  browser.navigate(loginUrl);
  await browser.getDriver().wait(until.titleContains(loginTitle), waitTimeout, 'Timeout waiting for LOGIN message');
};

export const doLogin = async(browser: Browser, username: string, password: string): Promise<void> => {
  const weUsername: WebElement = await browser.findElementById(loginUsername);
  weUsername.sendKeys(username);

  const wePassword: WebElement = await browser.findElementById(loginPassword);
  wePassword.sendKeys(password);

  const weSubmit: WebElement = await browser.findElementById(selectorSubmit);
  weSubmit.click();
};

export const waitForLoginConfirmation = async(browser: Browser): Promise<WebElement> => {
    // await browser.getDriver().wait(until.elementIsVisible(await browser.findElement('#loop-container article .post-header h1')), 5000, 'Timeout waiting for OK message');
    await browser.getDriver().wait(until.titleContains(loginOkTitle), waitTimeout, 'Timeout waiting for OK message');

    return await browser.findElement(selectorH1);
};
