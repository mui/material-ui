var _ = require('underscore'),
  Dispatcher = require('flux').Dispatcher;

var AppDispatcher = _.extend(new Dispatcher(), {

	ActionTypes: {
		NAV_URL_CHANGE: 'nav-url-change',
		NAV_USER_CLICK: 'nav-user-click'
	},

	dispatchAction: function(type, payload) {
		this.dispatch({
			type: type,
			payload: payload
		})
	}

});

module.exports = AppDispatcher;
