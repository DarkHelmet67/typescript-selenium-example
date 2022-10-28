import { until, WebElement, WebElementPromise } from 'selenium-webdriver';

import { Browser } from '../helpers/browser';

export const selectorCtaContactUs: string = 'a[href="/contact_us"]';
export const selectorCtaProducts: string = 'a[href="/products"]';
export const titleHomePage: string = 'Automation Exercise';
export const titleContactUs: string = 'Automation Exercise - Contact Us';
export const titleProducts: string = 'Automation Exercise - All Products';
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

export const getProductsMenuElement = async(browser: Browser): Promise<WebElement> => {
  return await browser.findElement(selectorCtaProducts);
};

// Page Functions
export const gotoHomePage = async(browser: Browser): Promise<void> => {
  browser.navigate(urlHomePage);
  await browser.getDriver().wait(until.titleContains(titleHomePage), timeout, 'Timeout waiting for HOME PAGE');
};  

export const gotoContactUsPage = async(browser: Browser): Promise<void> => {
  (await getContactUsMenuElement(browser)).click();
  await browser.getDriver().wait(until.titleContains(titleContactUs), timeout, 'Timeout waiting for CONTACT US PAGE');
}

export const gotoProductsPage = async(browser: Browser): Promise<void> => {
  (await getProductsMenuElement(browser)).click();
  await browser.getDriver().wait(until.titleContains(titleProducts), timeout, 'Timeout waiting for PRODUCTS PAGE');
}
