import { Capabilities } from 'selenium-webdriver';

const setCapabilities = (browserName: string, browserVersion?: string, os?: string, osVersion?: string, device?: string, buildName?: string, sessionName?: string): Capabilities | {} => ({
  browserName,
  browserVersion,
  device,
  'bstack:options': {
    os,
    osVersion,
    buildName,
    sessionName,
  },
});

// CONFIG for LOCAL TESTING
export const isLocalTesting: boolean = true;

// CONFIG for REMOTE (=BrowserStack) TESTING
export const bsUserName: string = '';
export const bsPassword: string = '';

export const getCapabilities = (buildName: string, sessionName: string): Array<Capabilities | {}> => isLocalTesting ? [
  setCapabilities('chrome', '106.0'),
] : [
  setCapabilities('Chrome', '106', 'Windows', '11', undefined, buildName, sessionName),
  setCapabilities('Firefox', '106', 'Windows', '10', undefined, buildName, sessionName),
  setCapabilities('Safari', '14.1', 'OS X', 'Big Sur', undefined, buildName, sessionName),
  // setCapabilities('safari', undefined, undefined, '14', 'iPad Pro 12.9 2021', buildName, sessionName),
];
