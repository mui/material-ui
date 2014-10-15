var _ = require('underscore'),
  Backbone = require('backbone'),
  Dispatcher = require('../app-dispatcher.js'),

  AppStateStore = Backbone.Model.extend({

    defaults: {
      currentUrl: null
    },

    initialize: function() {
      this.dispatchToken = Dispatcher.register(_.bind(this.onDispatched, this));
    },

    onDispatched: function(action) {
      switch (action.type) {
        case Dispatcher.ActionTypes.NAV_URL_CHANGE:
        case Dispatcher.ActionTypes.NAV_USER_CLICK:
          this.set('currentUrl', action.payload.url);
          break;
      }
    }

  });

module.exports = new AppStateStore();
