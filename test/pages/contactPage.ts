import { until, WebElement, WebElementPromise } from 'selenium-webdriver';

import { Browser } from '../helpers/browser';

export const selectorInputName: string = 'input[name="name"]';
export const selectorInputEMail: string = 'input[name="email"]';
export const selectorInputSubject: string = 'input[name="subject"]';
export const selectorInputMessage: string = 'message';
export const selectorInputSubmit: string = 'input[name="submit"]';
export const selectorTextConfirm: string = 'div[class="status alert alert-success"]';
export const timeout: number = 10000;

export const getCurrentUrl = async(browser: Browser): Promise<string> => {
  return await browser.getCurrentUrl();
};

// Page Functions
export const fillContactForm = async(browser: Browser, name: string, emailAddress: string, subjectText: string, messageText: string): Promise<void> => {
  const weName: WebElement = await browser.findElement(selectorInputName);
  weName.sendKeys(name);

  const weEMail: WebElement = await browser.findElement(selectorInputEMail);
  weEMail.sendKeys(emailAddress);

  const weSubject: WebElement = await browser.findElement(selectorInputSubject);
  weSubject.sendKeys(subjectText);

  const weMessage: WebElement = await browser.findElementById(selectorInputMessage);
  weMessage.sendKeys(name);

  const weSubmit: WebElement = await browser.findElement(selectorInputSubmit);
  weSubmit.click();

  await browser.alertAccept();
};

export const getElementConfirmMessage = async(browser: Browser): Promise<WebElement> => {
  // AWAIT for MESSAGE to APPEAR
  const okMessage: WebElement = await browser.findElement(selectorTextConfirm);
  await browser.getDriver().wait(until.elementIsVisible(browser.findElement(selectorTextConfirm)));
  return okMessage;
};
