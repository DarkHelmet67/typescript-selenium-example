import { until, WebElement, WebElementPromise } from 'selenium-webdriver';

import { Browser } from '../helpers/browser';

export const selectorCtaViewCart: string = 'a[href="/view_cart"]';
export const selectorCtaViewProduct: string = 'a[href="/product_details/1"]';
export const selectorCtaAddToCart: string = 'button[class="btn btn-default cart"]';
export const timeout: number = 10000;
export const titleProductDetails: string = 'Automation Exercise - Product Details';

export const getCurrentUrl = async(browser: Browser): Promise<string> => {
  return await browser.getCurrentUrl();
};

// Page Functions
export const viewProduct = async(browser: Browser): Promise<void> => {
  const weProduct: WebElement = await browser.findElement(selectorCtaViewProduct);
  await browser.moveToElement(weProduct, 0, 100);
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
};
