var Dispatcher = require('./vendor/flux/dispatcher.js');
var copyProperties = require('react/lib/copyProperties');

var AppDispatcher = copyProperties(new Dispatcher(), {

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