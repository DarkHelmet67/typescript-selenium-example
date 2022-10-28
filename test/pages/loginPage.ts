import { until, WebElement, WebElementPromise } from 'selenium-webdriver';

import { Browser } from '../helpers/browser';

export const selectorError: string = 'error';
export const selectorH1: string = '.loop-container article .post-header h1';
export const selectorPassword: string = 'password';
export const selectorSiteTitle: string = 'site-title';
export const selectorSubmit: string = 'submit';
export const selectorUsername: string = 'username';
export const textInvalidPassword: string = 'Your password is invalid!';
export const textInvalidUsername: string = 'Your username is invalid!';
export const textLogin: string = 'Test Login';
export const textLoginOk: string = 'Logged In Successfully';
export const textPassword: string = 'Password123';
export const textUsername: string = 'student';
export const timeout: number = 10000;
export const urlLogin: string = 'https://practicetestautomation.com/practice-test-login/';
export const urlLoginOk: string = 'https://practicetestautomation.com/logged-in-successfully/';

export const gotoLoginPage = async(browser: Browser): Promise<void> => {
  browser.navigate(urlLogin);
  await browser.getDriver().wait(until.titleContains(textLogin), timeout, 'Timeout waiting for LOGIN message');
};

export const doLogin = async(browser: Browser, username: string, password: string): Promise<void> => {
  const weUsername: WebElement = await browser.findElementById(selectorUsername);
  weUsername.sendKeys(username);

  const wePassword: WebElement = await browser.findElementById(selectorPassword);
  wePassword.sendKeys(password);

  const weSubmit: WebElement = await browser.findElementById(selectorSubmit);
  weSubmit.click();
};

export const getElementLoginConfirmation = async(browser: Browser): Promise<WebElement> => {
  await browser.getDriver().wait(until.titleContains(textLoginOk), timeout, 'Timeout waiting for OK message');

  return await browser.findElement(selectorH1);
};

export const getElementErrorMessage = async(browser: Browser): Promise<WebElement> => {
  // AWAIT for MESSAGE to APPEAR
  const errorMessage: WebElementPromise = browser.findElementById(selectorError);
  await browser.getDriver().wait(until.elementIsVisible(errorMessage));
  return await errorMessage;
};

export const getElementSiteTitle = async(browser: Browser): Promise<WebElement> => {
  return await browser.findElementById(selectorSiteTitle);
};

export const getCurrentUrl = async(browser: Browser): Promise<string> => {
  return await browser.getCurrentUrl();
};
