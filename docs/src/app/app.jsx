/**
 * @jsx React.DOM
 */
 
(function () {

  var React = require('react'),
    Router = require('react-router'),
    AppRoutes = require('./app-routes.jsx'),
    injectTapEventPlugin = require("react-tap-event-plugin");

  //Needed for React Developer Tools
  window.React = React;

  //Needed for onTouchTap
  //Can go away when react 1.0 release
  //Check this repo:
  //https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  //Render the main app component
  Router
    .create({
      routes: AppRoutes,
      scrollBehavior: Router.ScrollToTopBehavior
    })
    .run(function (Handler) {
      // whenever the url changes, this callback is called again
      React.render(<Handler/>, document.body);
    });

})();