import 'chromedriver';

import { assert } from 'chai';
import { afterEach, beforeEach } from 'mocha';
import { Capabilities, WebElement } from 'selenium-webdriver';

import { Browser } from './helpers/browser';
import { gotoContactUsPage, gotoHomePage, gotoProductsPage } from './pages/homePage';
import { fillContactForm, getElementConfirmMessage } from './pages/contactPage';
import { addToCart, viewCart, viewProduct } from './pages/productsPage';
import { getLocalCapabilities } from '../bs-config';

getLocalCapabilities().forEach((capabilities: {} | Capabilities) => {
  describe('Lesson 3: Best Practices and Page Object Model', () => {
  let browser: Browser;

  beforeEach(() => {
    // Do NOT pass USERNAME and PASSWORD to run it LOCALLY!
    browser = new Browser(capabilities);
  });

  afterEach(() => {
    browser.close();
  });

  it('Products Page', async () => {
    browser.maximize();

    await gotoHomePage(browser);

    await gotoProductsPage(browser);

    await viewProduct(browser);

    await addToCart(browser);

    await viewCart(browser);
    
    await browser.getDriver().sleep(2000); // Uncomment if you want to see actual browser screen before test finish
  }).timeout(30000);
});
});
