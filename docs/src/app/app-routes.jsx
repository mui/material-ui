/**
 * @jsx React.DOM
 */
 
var React = require('react'), 
  Router = require('react-router'),
  Route = Router.Route,
  Routes = Router.Routes,
  Redirect = Router.Redirect,
  DefaultRoute = Router.DefaultRoute,

  Master = require('./components/master.jsx'),
	Home = require('./components/pages/home.jsx'),
	GetStarted = require('./components/pages/get-started.jsx'),
  PageWithNav = require('./components/pages/page-with-nav.jsx'),

  Colors = require('./components/pages/css-framework/colors.jsx'),
  Typography = require('./components/pages/css-framework/typography.jsx'),

  Buttons = require('./components/pages/components/buttons.jsx'),
  Dialog = require('./components/pages/components/dialog.jsx'),
  Icons = require('./components/pages/components/icons.jsx'),
  Inputs = require('./components/pages/components/inputs.jsx'),
  Menus = require('./components/pages/components/menus.jsx'),
  Switches = require('./components/pages/components/switches.jsx'),
  Toolbars = require('./components/pages/components/toolbars.jsx'),

  cssFrameworkMenuItems = [
    { route: 'colors', text: 'Colors'},
    { route: 'typography', text: 'Typography'}
  ],

  componentsMenuItems = [
    { route: 'buttons', text: 'Buttons'},
    { route: 'dialog', text: 'Dialog'},
    { route: 'icons', text: 'Icons'},
    { route: 'inputs', text: 'Inputs'},
    { route: 'menus', text: 'Menus'},
    { route: 'switches', text: 'Switches'},
    //{ route: 'toasts', text: 'Toasts'},
    { route: 'toolbars', text: 'Toolbars'},
  ];

var AppRoutes = (
  <Routes scrollBehavior="scrollToTop">
    <Route name="root" path="/" handler={Master}>
    	<Route name="home" handler={Home} />
    	<Route name="get-started" handler={GetStarted} pageTitle="Get Started" />
      <Route name="css-framework" handler={PageWithNav} menuItems={cssFrameworkMenuItems} pageTitle="Css Framework">
        <Route name="colors" handler={Colors} />
        <Route name="typography" handler={Typography} />
        <Redirect from="/css-framework" to="colors" />
      </Route>

      <Route name="components" handler={PageWithNav} menuItems={componentsMenuItems} pageTitle="Components">
        <Route name="buttons" handler={Buttons} />
        <Route name="dialog" handler={Dialog} />
        <Route name="icons" handler={Icons} />
        <Route name="inputs" handler={Inputs} />
        <Route name="menus" handler={Menus} />
        <Route name="switches" handler={Switches} />
        <Route name="toolbars" handler={Toolbars} />
        <Redirect from="/components" to="buttons" />
      </Route>

      <DefaultRoute handler={Home}/>
    </Route>
  </Routes>
);

module.exports = AppRoutes;
