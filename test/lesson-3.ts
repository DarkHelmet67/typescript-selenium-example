import 'chromedriver';

import { assert } from 'chai';
import { afterEach, beforeEach } from 'mocha';
import { Capabilities } from 'selenium-webdriver';

import { getCapabilities } from '../bs-config';
import { Browser } from './helpers/browser';
import { gotoHomePage, gotoProductsPage } from './pages/homePage';
import { addToCart, getCartRows, viewCart, viewProduct } from './pages/productsPage';

const selectorProduct1: string = 'a[href="/product_details/1"]';
const selectorProduct2: string = 'a[href="/product_details/2"]';
const timeout: number = 60000;

getCapabilities('browserstack-build-3', 'Lesson 3: Best Practices and Page Object Model').forEach((capabilities: {} | Capabilities) => {
  describe('Lesson 3: Best Practices and Page Object Model', () => {
    let browser: Browser;

    beforeEach(() => {
      browser = new Browser(capabilities);
      browser.maximize();
    });

    afterEach(() => {
      browser.close();
    });

    it('Products Page', async () => {
      await gotoHomePage(browser);

      // Add 1st product
      await gotoProductsPage(browser);
      await viewProduct(browser, selectorProduct1);
      await addToCart(browser);
      await viewCart(browser);
      assert.equal(await getCartRows(browser), 1);

      // Add 2nd product
      await gotoProductsPage(browser);
      await viewProduct(browser, selectorProduct2);
      await addToCart(browser);
      await viewCart(browser);
      assert.equal(await getCartRows(browser), 2);

      // await browser.getDriver().sleep(2000); // Uncomment if you want to see actual browser screen before test finish
    }).timeout(timeout);
  });
});
