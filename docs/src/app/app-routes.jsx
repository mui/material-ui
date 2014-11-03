/**
 * @jsx React.DOM
 */
 
var React = require('react'), 
  Router = require('react-router'),
  Route = Router.Route,
  Routes = Router.Routes,
  Redirect = Router.Redirect,
  DefaultRoute = Router.DefaultRoute;

var Master = require('./components/master.jsx'),
	Home = require('./components/pages/home.jsx'),
	GetStarted = require('./components/pages/get-started.jsx'),

  CssFramework = require('./components/pages/css-framework.jsx'),
  Colors = require('./components/pages/css-framework/colors.jsx'),
  Typography = require('./components/pages/css-framework/typography.jsx'),

  Components = require('./components/pages/components.jsx'),
  Buttons = require('./components/pages/components/buttons.jsx'),
  Dialog = require('./components/pages/components/dialog.jsx'),
  Icons = require('./components/pages/components/buttons.jsx'),
  Inputs = require('./components/pages/components/buttons.jsx'),
  Menus = require('./components/pages/components/buttons.jsx'),
  Switches = require('./components/pages/components/switches.jsx'),
  Toolbars = require('./components/pages/components/toolbars.jsx');

var AppRoutes = (
  <Routes scrollBehavior="scrollToTop">
    <Route name="root" path="/" handler={Master}>
    	<Route name="home" handler={Home} />
    	<Route name="get-started" handler={GetStarted} />

      <Route name="css-framework" handler={CssFramework}>
        <Route name="colors" handler={Colors} />
        <Route name="typography" handler={Typography} />
        <DefaultRoute handler={Colors}/>
      </Route>

      <Route name="components" handler={Components}>
        <Route name="buttons" handler={Buttons} />
        <Route name="dialog" handler={Dialog} />
        <Route name="icons" handler={Icons} />
        <Route name="inputs" handler={Inputs} />
        <Route name="menus" handler={Menus} />
        <Route name="switches" handler={Switches} />
        <Route name="toolbars" handler={Toolbars} />
        <DefaultRoute handler={Buttons}/>
      </Route>

      <DefaultRoute handler={Home}/>
    </Route>
  </Routes>
);

module.exports = AppRoutes;
