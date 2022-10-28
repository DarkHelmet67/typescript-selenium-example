import 'chromedriver';

import {
    Builder, By, Capabilities, ThenableWebDriver, WebElementPromise
} from 'selenium-webdriver';

export class Browser {
  private webDriver: ThenableWebDriver;

  public constructor(browserName: string, capabilities: {} | Capabilities) {
    this.webDriver = browserName.length > 0 ? new Builder().forBrowser(browserName).build() : new Builder().withCapabilities(capabilities).build();
  }

  public async maximize(): Promise<void> {
    await this.webDriver.manage().window().maximize();
  }

  public async navigate(url: string): Promise<void> {
    await this.webDriver.navigate().to(url);
  }

  public findElement(selector: string): WebElementPromise {
    return this.webDriver.findElement(By.css(selector));
  }

  public findElementById(id: string): WebElementPromise {
    return this.webDriver.findElement(By.id(id));
  }

  public async getCurrentUrl(): Promise<string> {
    return await this.webDriver.getCurrentUrl();
  }

  public async clearCookies(url?: string): Promise<void> {
    if (url) {
      const currentUrl = await this.getCurrentUrl();
      await this.navigate(url);
      await this.webDriver.manage().deleteAllCookies();
      await this.navigate(currentUrl);
    } else {
      await this.webDriver.manage().deleteAllCookies();
    }
  }

  public async close(): Promise<void> {
    await this.webDriver.quit();
  }

  // To access WebDriver (for calling functions not yet implemented in this class)
  public getDriver(): ThenableWebDriver {
    return this.webDriver;
  }
}
