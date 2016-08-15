/* eslint-disable flowtype/require-valid-file-annotation */

const SELENIUM_HOST = process.env.SELENIUM_LOCAL_HOST || '127.0.0.1';
const SELENIUM_PORT = process.env.SELENIUM_LOCAL_PORT || 4444;

module.exports = {
  output_folder: 'test/selenium-output',
  selenium: {
    start_process: false,
    host: SELENIUM_HOST,
    port: SELENIUM_PORT,
  },
  test_settings: {
    default: {
      launch_url: process.env.SELENIUM_LAUNCH_URL,
      selenium_host: SELENIUM_HOST,
      selenium_port: SELENIUM_PORT,
      silent: true,
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['--start-maximized'],
        },
      },
    },
  },
};
