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
const Buttons = require('./components/pages/components/buttons');
const Cards = require('./components/pages/components/cards');
const DatePicker = require('./components/pages/components/date-picker');
const Dialog = require('./components/pages/components/dialog');
const DropDownMenu = require('./components/pages/components/drop-down-menu');
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
    <Route path="get-started" component={GetStarted}>
      <Route path="prerequisites" component={Prerequisites} />
      <Route path="installation" component={Installation} />
      <Route path="examples" component={Examples} />
      <Redirect from="/get-started" to="/prerequisites" />
    </Route>

    <Route path="customization" component={Customization}>
      <Route path="colors" component={Colors} />
      <Route path="themes" component={Themes} />
      <Route path="inline-styles" component={InlineStyles} />
      <Redirect from="/customization" to="/themes" />
    </Route>

    <Route name="components" component={Components}>
      <Route name="appbar" component={AppBar} />
      <Route name="avatars" component={Avatars} />
      <Route name="buttons" component={Buttons} />
      <Route name="cards" component={Cards} />
      <Route name="date-picker" component={DatePicker} />
      <Route name="dialog" component={Dialog} />
      <Route name="dropdown-menu" component={DropDownMenu} />
      <Route name="icons" component={Icons} />
      <Route name="icon-buttons" component={IconButtons} />
      <Route name="icon-menus" component={IconMenus} />
      <Route name="left-nav" component={LeftNav} />
      <Route name="lists" component={Lists} />
      <Route name="menus" component={Menus} />
      <Route name="paper" component={Paper} />
      <Route name="progress" component={Progress} />
      <Route name="refresh-indicator" component={RefreshIndicator} />
      <Route name="sliders" component={Sliders} />
      <Route name="switches" component={Switches} />
      <Route name="snackbar" component={Snackbar} />
      <Route name="table" component={Table} />
      <Route name="tabs" component={Tabs} />
      <Route name="text-fields" component={TextFields} />
      <Route name="time-picker" component={TimePicker} />
      <Route name="toolbars" component={Toolbars} />
      <Redirect from="/components" to="/appbar" />
    </Route>

    <IndexRoute component={Home}/>
  </Route>
);

module.exports = AppRoutes;
