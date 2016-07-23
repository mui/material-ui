module.exports = {
  'Docs Home'(browser) {
    browser
      .maximizeWindow()
      .url('http://localhost:8080')
      .waitForElementVisible('[data-reactroot]', 6000)
      .assert.elementPresent('img[class^=home__logo]')
      .end();
  },
};
