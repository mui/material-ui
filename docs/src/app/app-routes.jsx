let React = require('react');
let {
  Route,
  Redirect,
  IndexRoute,
} = require('react-router');

// Here we define all our material-ui ReactComponents.
let Master = require('./components/master');
let Home = require('./components/pages/home');

let GetStarted = require('./components/pages/get-started');
let Prerequisites = require('./components/pages/get-started/prerequisites');
let Installation = require('./components/pages/get-started/installation');
let Examples = require('./components/pages/get-started/examples');

let Customization = require('./components/pages/customization');
let Colors = require('./components/pages/customization/colors');
let Themes = require('./components/pages/customization/themes');
let InlineStyles = require('./components/pages/customization/inline-styles');

let Components = require('./components/pages/components');
let AppBar = require('./components/pages/components/app-bar');
let Avatars = require('./components/pages/components/avatars');
let Buttons = require('./components/pages/components/buttons');
let Cards = require('./components/pages/components/cards');
let DatePicker = require('./components/pages/components/date-picker');
let Dialog = require('./components/pages/components/dialog');
let DropDownMenu = require('./components/pages/components/drop-down-menu');
let GridList = require('./components/pages/components/grid-list');
let Icons = require('./components/pages/components/icons');
let IconButtons = require('./components/pages/components/icon-buttons');
let IconMenus = require('./components/pages/components/icon-menus');
let LeftNav = require('./components/pages/components/left-nav');
let Lists = require('./components/pages/components/lists');
let Menus = require('./components/pages/components/menus');
let Paper = require('./components/pages/components/paper');
let Progress = require('./components/pages/components/progress');
let RefreshIndicator = require('./components/pages/components/refresh-indicator');
let Sliders = require('./components/pages/components/sliders');
let Snackbar = require('./components/pages/components/snackbar');
let Switches = require('./components/pages/components/switches');
let Table = require('./components/pages/components/table');
let Tabs = require('./components/pages/components/tabs');
let TextFields = require('./components/pages/components/text-fields');
let TimePicker = require('./components/pages/components/time-picker');
let Toolbars = require('./components/pages/components/toolbars');



/**
 * Routes: https://github.com/rackt/react-router/blob/master/docs/api/components/Route.md
 *
 * Routes are used to declare your view hierarchy.
 *
 * Say you go to http://material-ui.com/#/components/paper
 * The react router will search for a route named 'paper' and will recursively render its
 * handler and its parent handler like so: Paper > Components > Master
 */
let AppRoutes = (
  <Route path="/" component={Master}>
    <Route path="home" component={Home} />
    <Redirect from="get-started" to="/get-started/prerequisites" />
    <Route path="get-started" component={GetStarted}>
      <Route path="prerequisites" component={Prerequisites} />
      <Route path="installation" component={Installation} />
      <Route path="examples" component={Examples} />
    </Route>

    <Redirect from="customization" to="/customization/themes" />
    <Route path="customization" component={Customization}>
      <Route path="colors" component={Colors} />
      <Route path="themes" component={Themes} />
      <Route path="inline-styles" component={InlineStyles} />
    </Route>

    <Redirect from="components" to="/components/appbar" />
    <Route path="components" component={Components}>
      <Route path="appbar" component={AppBar} />
      <Route path="avatars" component={Avatars} />
      <Route path="buttons" component={Buttons} />
      <Route path="cards" component={Cards} />
      <Route path="date-picker" component={DatePicker} />
      <Route path="dialog" component={Dialog} />
      <Route path="dropdown-menu" component={DropDownMenu} />
      <Route path="grid-list" component={GridList} />
      <Route path="icons" component={Icons} />
      <Route path="icon-buttons" component={IconButtons} />
      <Route path="icon-menus" component={IconMenus} />
      <Route path="left-nav" component={LeftNav} />
      <Route path="lists" component={Lists} />
      <Route path="menus" component={Menus} />
      <Route path="paper" component={Paper} />
      <Route path="progress" component={Progress} />
      <Route path="refresh-indicator" component={RefreshIndicator} />
      <Route path="sliders" component={Sliders} />
      <Route path="switches" component={Switches} />
      <Route path="snackbar" component={Snackbar} />
      <Route path="table" component={Table} />
      <Route path="tabs" component={Tabs} />
      <Route path="text-fields" component={TextFields} />
      <Route path="time-picker" component={TimePicker} />
      <Route path="toolbars" component={Toolbars} />
    </Route>

    <IndexRoute component={Home}/>
  </Route>
);

module.exports = AppRoutes;
