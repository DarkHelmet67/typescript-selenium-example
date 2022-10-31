import { By, until, WebElement, WebElementPromise } from 'selenium-webdriver';

import { Browser } from '../helpers/browser';

export const selectorCartRows: string = '#cart_info_table tbody';
export const selectorCtaViewCart: string = '#cartModal a[href="/view_cart"]';
export const selectorCtaAddToCart: string = 'button[class="btn btn-default cart"]';
export const titleProductDetails: string = 'Automation Exercise - Product Details';
export const titleCheckout: string = 'Automation Exercise - Checkout';
export const timeout: number = 10000;

export const getCurrentUrl = async(browser: Browser): Promise<string> => {
  return await browser.getCurrentUrl();
};

// Page Functions
export const viewProduct = async(browser: Browser, selector: string): Promise<void> => {
  const weProduct: WebElement = await browser.findElement(selector);

  // Move to "out of viewport" element
  // await browser.moveToElement(weProduct, 0, 100);
  await browser.getDriver().executeScript('arguments[0].scrollIntoView(true);', weProduct);
  weProduct.click();

  await browser.getDriver().wait(until.titleContains(titleProductDetails), timeout, 'Timeout waiting for VIEW PRODUCT message');
};

export const addToCart = async(browser: Browser): Promise<void> => {
  const ctaAddToCart: WebElementPromise = browser.findElement(selectorCtaAddToCart);
  await browser.getDriver().wait(until.elementIsVisible(ctaAddToCart));
  (await ctaAddToCart).click();
};

export const viewCart = async(browser: Browser): Promise<void> => {
  const ctaViewCart: WebElementPromise = browser.findElement(selectorCtaViewCart);
  await browser.getDriver().wait(until.elementIsVisible(ctaViewCart));
  (await ctaViewCart).click();

  await browser.getDriver().wait(until.titleContains(titleCheckout), timeout, 'Timeout waiting for CHECKOUT message');
};

export const getCartRows = async(browser: Browser): Promise<number> => {
  return (await browser.findElement(selectorCartRows).findElements(By.css('tr'))).length;
};
