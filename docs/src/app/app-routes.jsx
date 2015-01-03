var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;

var Master = require('./components/master.jsx');
var Home = require('./components/pages/home.jsx');
var GetStarted = require('./components/pages/get-started.jsx');

var CssFramework = require('./components/pages/css-framework.jsx');
var Colors = require('./components/pages/css-framework/colors.jsx');
var Typography = require('./components/pages/css-framework/typography.jsx');

var Components = require('./components/pages/components.jsx');
var Buttons = require('./components/pages/components/buttons.jsx');
var DatePicker = require('./components/pages/components/date-picker.jsx');
var Dialog = require('./components/pages/components/dialog.jsx');
var DropDownMenu = require('./components/pages/components/drop-down-menu.jsx');
var IconButtons = require('./components/pages/components/icon-buttons.jsx');
var Icons = require('./components/pages/components/icons.jsx');
var Inputs = require('./components/pages/components/inputs.jsx');
var LeftNav = require('./components/pages/components/left-nav.jsx');
var Menus = require('./components/pages/components/menus.jsx');
var Paper = require('./components/pages/components/paper.jsx');
var Sliders = require('./components/pages/components/sliders.jsx');
var Snackbar = require('./components/pages/components/snackbar.jsx');
var Switches = require('./components/pages/components/switches.jsx');
var Toolbars = require('./components/pages/components/toolbars.jsx');

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
      <Route name="date-picker" handler={DatePicker} />
      <Route name="dialog" handler={Dialog} />
      <Route name="dropdown-menu" handler={DropDownMenu} />
      <Route name="icon-buttons" handler={IconButtons} />
      <Route name="icons" handler={Icons} />
      <Route name="inputs" handler={Inputs} />
      <Route name="left-nav" handler={LeftNav} />
      <Route name="menus" handler={Menus} />
      <Route name="paper" handler={Paper} />
      <Route name="sliders" handler={Sliders} />
      <Route name="switches" handler={Switches} />
      <Route name="snackbar" handler={Snackbar} />
      <Route name="toolbars" handler={Toolbars} />
      <Redirect from="/components" to="buttons" />
    </Route>

    <DefaultRoute handler={Home}/>
  </Route>
);

module.exports = AppRoutes;
