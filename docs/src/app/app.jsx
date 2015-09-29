const React = require('react');
const ReactDOM = require('react-dom');
const {Router} = require('react-router');
const AppRoutes = require('./app-routes.jsx');
const injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

/**
 * Render the main app component. You can read more about the react-router here:
 * https://github.com/rackt/react-router/blob/master/docs/guides/overview.md
 */
ReactDOM.render(<Router>
  {AppRoutes}
</Router>, document.getElementById('app'));
