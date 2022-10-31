import { Capabilities } from 'selenium-webdriver';

const setCapabilities = (browserName: string, browserVersion: string, os?: string, osVersion?: string, device?: string, buildName?: string, sessionName?: string): Capabilities | {} => ({
  browserName,
  browserVersion,
  'bstack:options': {
    os,
    osVersion,
    device,
    buildName,
    sessionName,
  },
});

// CONFIG for LOCAL TESTING
export const getLocalCapabilities = (): Array<Capabilities | {}> => [
  setCapabilities('chrome', '106.0'),
];

// CONFIG for REMOTE (=BrowserStack) TESTING
export const bsUserName: string = '';
export const bsPassword: string = '';

export const getBrowserStackCapabilities = (buildName: string, sessionName: string): Array<Capabilities | {}> => [
  setCapabilities('Chrome', '106', 'Windows', '11', undefined, buildName, sessionName),
  setCapabilities('Firefox', '106', 'Windows', '10', undefined, buildName, sessionName),
  setCapabilities('Safari', '14.1', 'OS X', 'Big Sur', undefined, buildName, sessionName),
  setCapabilities('Safari', '14.1', undefined, '14', 'iPad Pro 12.9 2021', buildName, sessionName),
];
