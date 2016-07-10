
module.exports = {
  src_folders: ['test/e2e'],

  selenium: {
    'start_process': false,
    'host': 'hub.browserstack.com',
    'port': 80,
  },

  test_settings: {
    chrome_51: {
      selenium_host: 'hub.browserstack.com',
      selenium_port: 80,
      silent: true,
      desiredCapabilities: {
        build: 'Material-UI next test',
        'browserstack.user': process.env.BROWSERSTACK_USERNAME,
        'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
        'browserstack.debug': true,
        'browserstack.local': true,

        'browserName': 'Chrome',
        'browser_version': '51.0',
        'os': 'OS X',
        'os_version': 'El Capitan',
        'resolution': '1024x768',
      },
    },
    safari_9: {
      selenium_host: 'hub.browserstack.com',
      selenium_port: 80,
      silent: true,
      desiredCapabilities: {
        build: 'Material-UI next test',
        'browserstack.user': process.env.BROWSERSTACK_USERNAME,
        'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
        'browserstack.debug': true,
        'browserstack.local': true,

        'browserName': 'Safari',
        'browser_version': '9.1',
        'os': 'OS X',
        'os_version': 'El Capitan',
        'resolution': '1280x1024',
      },
    },
    firefox_46: {
      selenium_host: 'hub.browserstack.com',
      selenium_port: 80,
      silent: true,
      desiredCapabilities: {
        build: 'Material-UI next test',
        'browserstack.user': process.env.BROWSERSTACK_USERNAME,
        'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
        'browserstack.debug': true,
        'browserstack.local': true,

        'browserName': 'Firefox',
        'browser_version': '46.0',
        'os': 'OS X',
        'os_version': 'El Capitan',
        'resolution': '1280x1024',
      },
    },
  },
};
