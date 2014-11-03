/**
 * @jsx React.DOM
 */
 
(function () {

	var $ = require('jquery'),
	  Backbone = require('backbone'),
	  React = require('react'),
	  AppRoutes = require('./app-routes.jsx');

	Backbone.$ = $;

	//Needed for React Developer Tools
	window.React = React;

	//Render the main app component
	React.render(AppRoutes, document.body);

})();
