/**
 * @jsx React.DOM
 */
 
var React = require('react'), 
  Router = require('react-router'),
  Route = Router.Route,
  Redirect = Router.Redirect,
  DefaultRoute = Router.DefaultRoute,

  Master = require('./components/master.jsx'),
  Home = require('./components/pages/home.jsx'),
  GetStarted = require('./components/pages/get-started.jsx'),

  CssFramework = require('./components/pages/css-framework.jsx'),
  Colors = require('./components/pages/css-framework/colors.jsx'),
  Typography = require('./components/pages/css-framework/typography.jsx'),

  Components = require('./components/pages/components.jsx'),
  Buttons = require('./components/pages/components/buttons.jsx'),
  Dialog = require('./components/pages/components/dialog.jsx'),
  DropDownMenu = require('./components/pages/components/drop-down-menu.jsx'),
  IconButtons = require('./components/pages/components/icon-buttons.jsx'),
  Icons = require('./components/pages/components/icons.jsx'),
  Inputs = require('./components/pages/components/inputs.jsx'),
  LeftNav = require('./components/pages/components/left-nav.jsx'),
  Menus = require('./components/pages/components/menus.jsx'),
  Paper = require('./components/pages/components/paper.jsx'),
  Switches = require('./components/pages/components/switches.jsx'),
  Toolbars = require('./components/pages/components/toolbars.jsx');

var AppRoutes = (
      <Route name="root" path="/" handler={Master}>
        <Route name="home" handler={Home} />
        <Route name="get-started" handler={GetStarted} />
        <Route name="css-framework" handler={CssFramework}>
          <Route name="colors" handler={Colors} />
          <Route name="typography" handler={Typography} />
          <Redirect from="/css-framework" to="colors" />
        </Route>

        <Route name="components" handler={Components}>
          <Route name="buttons" handler={Buttons} />
          <Route name="dialog" handler={Dialog} />
          <Route name="dropdown-menu" handler={DropDownMenu} />
          <Route name="icon-buttons" handler={IconButtons} />
          <Route name="icons" handler={Icons} />
          <Route name="inputs" handler={Inputs} />
          <Route name="left-nav" handler={LeftNav} />
          <Route name="menus" handler={Menus} />
          <Route name="paper" handler={Paper} />
          <Route name="switches" handler={Switches} />
          <Route name="toolbars" handler={Toolbars} />
          <Redirect from="/components" to="buttons" />
        </Route>

        <DefaultRoute handler={Home}/>
      </Route>
    );

module.exports = AppRoutes;