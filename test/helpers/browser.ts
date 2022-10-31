import 'chromedriver';

import {
  Actions,
    Builder, By, Capabilities, ThenableWebDriver, until, WebElement, WebElementPromise
} from 'selenium-webdriver';

export class Browser {
  private webDriver: ThenableWebDriver;
  private bsUrl: string = 'hub-cloud.browserstack.com/wd/hub';

  public constructor(capabilities: Capabilities | {}, username?: string, password?: string) {
    const builder: Builder = new Builder().withCapabilities(capabilities);
    
    this.webDriver = username && password ? builder.usingServer(`http://${username}:${password}@${this.bsUrl}`).build() : builder.build();
    // this.webDriver = new Builder().forBrowser(browserName).setChromeOptions(new Options().addArguments('--headless', '--disable-plugins')).build();
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

  public moveToElement(element: WebElement, x: number = 0, y: number = 0): Promise<void> {
    const actions: Actions = this.webDriver.actions();
    return actions.move({ origin: element, x, y }).perform();
  }

  public async getCurrentUrl(): Promise<string> {
    return await this.webDriver.getCurrentUrl();
  }

  public async alertAccept(): Promise<void> {
    await this.webDriver.wait(until.alertIsPresent());
    await this.webDriver.switchTo().alert().accept();
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
