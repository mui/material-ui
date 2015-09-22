let DateTime = require('../utils/date-time');

let LocaleManager = {

    locale: 'en',

    getLocale() {
      return this.locale;
    },

    setLocale(l) {
      DateTime.setLocale(l);
    },

}

module.exports = LocaleManager
