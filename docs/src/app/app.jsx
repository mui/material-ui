const React = require('react');
const ReactDOM = require('react-dom');
const {Router} = require('react-router');
const AppRoutes = require('./app-routes.jsx');
const injectTapEventPlugin = require('react-tap-event-plugin');
const createHistory = require('history/lib/createHashHistory');

//Helpers for debugging
window.React = React;
window.Perf = require('react-addons-perf');

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

/**
 * Render the main app component. You can read more about the react-router here:
 * https://github.com/rackt/react-router/blob/master/docs/guides/overview.md
 */
ReactDOM.render(
  <Router
    history={createHistory({queryKey: false})}
    onUpdate={() => window.scrollTo(0, 0)}
  >
    {AppRoutes}
  </Router>
, document.getElementById('app'));
