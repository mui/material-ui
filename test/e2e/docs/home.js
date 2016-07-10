module.exports = {
  'Docs Test': function(browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('[data-reactroot]', 6000)
      .assert.elementPresent('img[class^=home__logo]')
      .end();
  },
};
