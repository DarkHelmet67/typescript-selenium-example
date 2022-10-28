import { until, WebElement, WebElementPromise } from 'selenium-webdriver';

import { Browser } from '../helpers/browser';

export const selectorCtaContactUs: string = 'a[href="/contact_us"]';
export const selectorInputName: string = 'input[name="name"]';
export const selectorInputEMail: string = 'input[name="email"]';
export const selectorInputSubject: string = 'input[name="subject"]';
export const selectorInputMessage: string = 'message';
export const selectorInputSubmit: string = 'input[name="submit"]';
export const selectorTextConfirm: string = 'div[class="status alert alert-success"]';
export const textHomePage: string = 'Automation Exercise';
export const textContactUs: string = 'Automation Exercise - Contact Us';
export const timeout: number = 10000;
export const urlHomePage: string = 'https://automationexercise.com/';
export const urlContactUs: string = 'https://automationexercise.com/contact_us';

export const getCurrentUrl = async(browser: Browser): Promise<string> => {
  return await browser.getCurrentUrl();
};

// Page WebElements
export const getContactUsMenuElement = async(browser: Browser): Promise<WebElement> => {
  return await browser.findElement(selectorCtaContactUs);
};

// Page Functions
export const gotoHomePage = async(browser: Browser): Promise<void> => {
  browser.navigate(urlHomePage);
  await browser.getDriver().wait(until.titleContains(textHomePage), timeout, 'Timeout waiting for HOME PAGE');
};  

export const gotoContactUsPage = async(browser: Browser): Promise<void> => {
  (await getContactUsMenuElement(browser)).click();
  await browser.getDriver().wait(until.titleContains(textContactUs), timeout, 'Timeout waiting for CONTACT US PAGE');
}

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
  const okMessage: WebElementPromise = browser.findElement(selectorTextConfirm);
  await browser.getDriver().wait(until.elementIsVisible(okMessage));
  return await okMessage;
};
