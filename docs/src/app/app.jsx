/**
 * @jsx React.DOM
 */
 
(function () {

	var $ = require('jquery'),
	  Backbone = require('backbone'),
	  React = require('react'),
	  AppRouter = require('./app-router.js'),
	  MasterComponent = require('./components/master.jsx');

	Backbone.$ = $;

	//Needed for React Developer Tools
	window.React = React;

	//Render the main app component
	React.renderComponent(<MasterComponent />, document.body);

	Backbone.history.start();

})();


