let React = require('react');
let ReactDOM = require('react-dom');
import { history } from 'react-router/lib/HashHistory';
import { Router } from 'react-router';
let AppRoutes = require('./app-routes.jsx');

//Needed for React Developer Tools
window.React = React;

// Here we define all our material-ui ReactComponents.
ReactDOM.render((
  <Router history={history}>
    {AppRoutes}
  </Router>
), document.body);
