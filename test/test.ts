import 'chromedriver';

import { Capabilities } from 'selenium-webdriver';

import { Browser } from './helpers/browser';

const capabilities: {} | Capabilities = {
  'browserName' : 'chrome',
  'chromeOptions' : {
    'args' : ["--disable-plugins"]
  }
};

describe('Google Chrome', () => {
  let browser: Browser;

  before(async () => {
    browser = await new Browser('', capabilities);
  });

  it('Test Case #1', async () => {
    await browser.maximize();
    await browser.navigate('https://google.it');
    await browser.getDriver().sleep(5000); // FIXME: to move into browser.ts
  });

  after(async () => {
    await browser.close();
  });
});
