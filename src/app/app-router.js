var _ = require('underscore'),
  Backbone = require('backbone'),
  Dispatcher = require('./app-dispatcher.js'),

  AppRouter = Backbone.Router.extend({

    routes: {
      '*path': 'handleDefaultRoute'
    },

    initialize: function() {
      this.dispatchToken = Dispatcher.register(_.bind(this.onDispatched, this));
    },

    handleDefaultRoute: function(url) {
      Dispatcher.dispatchAction(Dispatcher.ActionTypes.NAV_URL_CHANGE, { url: url });
    },

    onDispatched: function(action) {
      switch (action.type) {
        case Dispatcher.ActionTypes.NAV_USER_CLICK:
          this.navigate(action.payload.url);
          break;
      }
    }

  });

module.exports = new AppRouter();
