/* eslint-disable flowtype/require-valid-file-annotation */

module.exports = {
  src_folders: ['test/e2e'],
  output_folder: 'test/e2e-output',
  selenium: {
    start_process: false,
    host: 'hub.browserstack.com',
    port: 80,
  },
  test_settings: {
    default: {
      selenium_host: 'hub.browserstack.com',
      selenium_port: 80,
      silent: true,
      desiredCapabilities: {
        build: `Material-UI ${process.env.MUI_HASH}`,
        'browserstack.user': process.env.BROWSERSTACK_USERNAME,
        'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
        'browserstack.debug': true,
        'browserstack.local': true,
        resolution: '1280x1024',
      },
    },
    chrome_51: {
      desiredCapabilities: {
        browserName: 'Chrome',
        browser_version: '51.0',
        os: 'OS X',
        os_version: 'El Capitan',
      },
    },
    safari_9: {
      desiredCapabilities: {
        browserName: 'Safari',
        browser_version: '9.1',
        os: 'OS X',
        os_version: 'El Capitan',
      },
    },
    firefox_46: {
      desiredCapabilities: {
        browserName: 'Firefox',
        browser_version: '46.0',
        os: 'OS X',
        os_version: 'El Capitan',
      },
    },
    ie_edge: {
      desiredCapabilities: {
        browserName: 'Edge',
        browser_version: '14.0',
        os: 'Windows',
        os_version: '10',
      },
    },
    ie_11: {
      desiredCapabilities: {
        browserName: 'IE',
        browser_version: '11.0',
        os: 'Windows',
        os_version: '10',
      },
    },
    ie_10: {
      desiredCapabilities: {
        browserName: 'IE',
        browser_version: '10.0',
        os: 'Windows',
        os_version: '8',
      },
    },
  },
};
