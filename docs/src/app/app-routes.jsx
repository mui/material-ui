const React = require('react');
const {
  Route,
  Redirect,
  IndexRoute,
} = require('react-router');

// Here we define all our material-ui ReactComponents.
const Master = require('./components/master');
const Home = require('./components/pages/home');

const GetStarted = require('./components/pages/get-started');
const Prerequisites = require('./components/pages/get-started/prerequisites');
const Installation = require('./components/pages/get-started/installation');
const Examples = require('./components/pages/get-started/examples');

const Customization = require('./components/pages/customization');
const Colors = require('./components/pages/customization/colors');
const Themes = require('./components/pages/customization/themes');
const InlineStyles = require('./components/pages/customization/inline-styles');

const Components = require('./components/pages/components');
const AppBar = require('./components/pages/components/app-bar');
const Avatars = require('./components/pages/components/avatars');
const Badge = require('./components/pages/components/badge');
const Buttons = require('./components/pages/components/buttons');
const Cards = require('./components/pages/components/cards');
const DatePicker = require('./components/pages/components/date-picker');
const Dialog = require('./components/pages/components/dialog');
const DropDownMenu = require('./components/pages/components/drop-down-menu');
const GridList = require('./components/pages/components/grid-list');
const Icons = require('./components/pages/components/icons');
const IconButtons = require('./components/pages/components/icon-buttons');
const IconMenus = require('./components/pages/components/icon-menus');
const LeftNav = require('./components/pages/components/left-nav');
const Lists = require('./components/pages/components/lists');
const Menus = require('./components/pages/components/menus');
const Paper = require('./components/pages/components/paper');
const Progress = require('./components/pages/components/progress');
const RefreshIndicator = require('./components/pages/components/refresh-indicator');
const Sliders = require('./components/pages/components/sliders');
const Snackbar = require('./components/pages/components/snackbar');
const Switches = require('./components/pages/components/switches');
const Table = require('./components/pages/components/table');
const Tabs = require('./components/pages/components/tabs');
const TextFields = require('./components/pages/components/text-fields');
const TimePicker = require('./components/pages/components/time-picker');
const Toolbars = require('./components/pages/components/toolbars');


/**
 * Routes: https://github.com/rackt/react-router/blob/master/docs/api/components/Route.md
 *
 * Routes are used to declare your view hierarchy.
 *
 * Say you go to http://material-ui.com/#/components/paper
 * The react router will search for a route named 'paper' and will recursively render its
 * handler and its parent handler like so: Paper > Components > Master
 */
const AppRoutes = (
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
      <Route path="badge" component={Badge} />
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
