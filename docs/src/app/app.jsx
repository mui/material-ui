/**
 * @jsx React.DOM
 */
 
(function () {

	var React = require('react'),
	  AppRoutes = require('./app-routes.jsx');

	//Needed for React Developer Tools
	window.React = React;

	//Render the main app component
	React.render(AppRoutes, document.body);

})();
