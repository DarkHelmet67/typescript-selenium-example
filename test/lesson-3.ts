import 'chromedriver';

import { assert } from 'chai';
import { afterEach, beforeEach } from 'mocha';
import { Capabilities, WebElement } from 'selenium-webdriver';

import { Browser } from './helpers/browser';
import { fillContactForm, getElementConfirmMessage, gotoContactUsPage, gotoHomePage } from './pages/homePage';

const capabilities: {} | Capabilities = {
  'browserName' : 'chrome',
  'chromeOptions' : {
    'args' : ['--disable-plugins']
  }
};

const name: string = 'Firstname Lastname';
const emailAddress: string = 'test@email.com';
const subjectText: string = 'The Subject';
const messageText: string = 'This is the content of the message text';
const successText: string = 'Success! Your details have been submitted successfully.';

describe('Lesson 3: Best Practices and Page Object Model', () => {
  let browser: Browser;

  beforeEach(() => {
    browser = new Browser('', capabilities);
  });

  it('Contact Us Page', async () => {
    browser.maximize();

    await gotoHomePage(browser);

    await gotoContactUsPage(browser);

    await fillContactForm(browser, name, emailAddress, subjectText, messageText);
    
    const confirmMessage: WebElement = await getElementConfirmMessage(browser);
    assert.ok(confirmMessage.isDisplayed(), 'Confirm message not found');
    
    const confirmText: string = await confirmMessage.getText();
    assert.equal(confirmText, successText, 'Unexpected confirm message');
    
    await browser.getDriver().sleep(2000); // Uncomment if you want to see actual browser screen before test finish
  });

  afterEach(() => {
    browser.close();
  });
});
