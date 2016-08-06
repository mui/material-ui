/* eslint-disable flowtype/require-valid-file-annotation */

module.exports = {
  src_folders: ['test/e2e'],
  output_folder: 'test/e2e-output',
  selenium: {
    start_process: false,
    host: process.env.SELENIUM_LOCAL_HOST,
    port: process.env.SELENIUM_LOCAL_PORT,
  },
  test_settings: {
    default: {
      launch_url: process.env.SELENIUM_LAUNCH_URL,
      selenium_host: process.env.SELENIUM_LOCAL_HOST,
      selenium_port: process.env.SELENIUM_LOCAL_PORT,
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
