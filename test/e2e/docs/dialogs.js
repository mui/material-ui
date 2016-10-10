module.exports = {
  '@tags': ['Dialog', 'Modal', 'Backdrop'],
  'Alert Dialog': function AlertDialog(browser) {
    browser
      .maximizeWindow()
      .url(`${browser.launch_url}/#/component-demos/dialogs`)
      .waitForElementVisible('[data-reactroot]', 6000)
      .assert.visible('[data-mui-demo="dialogs/Alerts.js"]')
      .assert.elementNotPresent('[data-mui-test="Modal"]')
      .click('[data-mui-demo="dialogs/Alerts.js"] button')
      .waitForElementVisible('[data-mui-test="Modal"]', 1000)
      .pause(500)
      .assert.elementPresent('[data-mui-test="Dialog"]')
      .assert.visible('[data-mui-test="Dialog"]')
      .getElementSize('[data-mui-test="Dialog"]', function (result) {
        this.assert.equal(result.value.width, 400);
      })
      .assert.visible('[data-mui-test="Backdrop"]')
      .moveToElement('[data-mui-test="DialogActions"] button:first-child', 40, 15)
      .pause(300)
      .click('[data-mui-test="DialogActions"] button:first-child')
      .waitForElementNotPresent('[data-mui-test="Modal"]', 1000)
      .assert.elementNotPresent('[data-mui-test="Dialog"]')
      .assert.elementNotPresent('[data-mui-test="Backdrop"]')
      .end();
  },
};
