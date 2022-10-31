import 'chromedriver';

import { assert } from 'chai';
import { afterEach, beforeEach } from 'mocha';
import { Capabilities, WebElement } from 'selenium-webdriver';

import { getCapabilities } from '../bs-config';
import { Browser } from './helpers/browser';
import { fillContactForm, getElementConfirmMessage } from './pages/contactPage';
import { gotoContactUsPage, gotoHomePage } from './pages/homePage';

const name: string = 'Firstname Lastname';
const emailAddress: string = 'test@email.com';
const subjectText: string = 'The Subject';
const messageText: string = 'This is the content of the message text';
const successText: string = 'Success! Your details have been submitted successfully.';
const timeout: number = 30000;

getCapabilities('browserstack-build-2', 'Lesson 2: Environment Variables and Parallel Testing').forEach((capabilities: {} | Capabilities) => {
  describe('Lesson 2: Environment Variables and Parallel Testing', () => {
    let browser: Browser;

    beforeEach(() => {
      browser = new Browser(capabilities);
      browser.maximize();
    });

    afterEach(() => {
      browser.close();
    });

    it('Contact Us Page', async () => {
      await gotoHomePage(browser);

      await gotoContactUsPage(browser);

      await fillContactForm(browser, name, emailAddress, subjectText, messageText);

      const confirmMessage: WebElement = await getElementConfirmMessage(browser);
      assert.ok(confirmMessage.isDisplayed(), 'Confirm message not found');

      const confirmText: string = await confirmMessage.getText();
      assert.equal(confirmText, successText, 'Unexpected confirm message');

      // await browser.getDriver().sleep(2000); // Uncomment if you want to see actual browser screen before test finish
    }).timeout(timeout);
  });
});
