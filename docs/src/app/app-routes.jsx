let React = require('react');
let Router = require('react-router');
let Route = Router.Route;
let Redirect = Router.Redirect;
let DefaultRoute = Router.DefaultRoute;

// Here we define all our material-ui ReactComponents.
let Master = require('./components/master.jsx');
let Home = require('./components/pages/home.jsx');
let GetStarted = require('./components/pages/get-started.jsx');

let Customization = require('./components/pages/customization.jsx');
let Colors = require('./components/pages/customization/colors.jsx');
let Themes = require('./components/pages/customization/themes.jsx');
let InlineStyles = require('./components/pages/customization/inline-styles.jsx');

let Components = require('./components/pages/components.jsx');
let AppBar = require('./components/pages/components/app-bar.jsx');
let Avatars = require('./components/pages/components/avatars.jsx');
let Buttons = require('./components/pages/components/buttons.jsx');
let Cards = require('./components/pages/components/cards.jsx');
let DatePicker = require('./components/pages/components/date-picker.jsx');
let Dialog = require('./components/pages/components/dialog.jsx');
let DropDownMenu = require('./components/pages/components/drop-down-menu.jsx');
let Icons = require('./components/pages/components/icons.jsx');
let IconButtons = require('./components/pages/components/icon-buttons.jsx');
let LeftNav = require('./components/pages/components/left-nav.jsx');
let Lists = require('./components/pages/components/lists.jsx');
let Menus = require('./components/pages/components/menus.jsx');
let Paper = require('./components/pages/components/paper.jsx');
let Progress = require('./components/pages/components/progress.jsx');
let Sliders = require('./components/pages/components/sliders.jsx');
let Snackbar = require('./components/pages/components/snackbar.jsx');
let Switches = require('./components/pages/components/switches.jsx');
let Table = require('./components/pages/components/table.jsx');
let Tabs = require('./components/pages/components/tabs.jsx');
let TextFields = require('./components/pages/components/text-fields.jsx');
let TimePicker = require('./components/pages/components/time-picker.jsx');
let Toolbars = require('./components/pages/components/toolbars.jsx');


/** Routes: https://github.com/rackt/react-router/blob/master/docs/api/components/Route.md
  *
  * Routes are used to declare your view hierarchy.
  *
  * Say you go to http://material-ui.com/#/components/paper
  * The react router will search for a route named 'paper' and will recursively render its
  * handler and its parent handler like so: Paper > Components > Master
  */

let AppRoutes = (
  <Route name="root" path="/" handler={Master}>
    <Route name="home" handler={Home} />
    <Route name="get-started" handler={GetStarted} />
    <Route name="customization" handler={Customization}>
      <Route name="colors" handler={Colors} />
      <Route name="themes" handler={Themes} />
      <Route name="inline-styles" handler={InlineStyles} />
      <Redirect from="/customization" to="themes" />
    </Route>

    <Route name="components" handler={Components}>
      <Route name="appbar" handler={AppBar} />
      <Route name="avatars" handler={Avatars} />
      <Route name="buttons" handler={Buttons} />
      <Route name="cards" handler={Cards} />
      <Route name="date-picker" handler={DatePicker} />
      <Route name="dialog" handler={Dialog} />
      <Route name="dropdown-menu" handler={DropDownMenu} />
      <Route name="icons" handler={Icons} />
      <Route name="icon-buttons" handler={IconButtons} />
      <Route name="left-nav" handler={LeftNav} />
      <Route name="lists" handler={Lists} />
      <Route name="menus" handler={Menus} />
      <Route name="paper" handler={Paper} />
      <Route name="progress" handler={Progress} />
      <Route name="sliders" handler={Sliders} />
      <Route name="switches" handler={Switches} />
      <Route name="snackbar" handler={Snackbar} />
      <Route name="table" handler={Table} />
      <Route name="tabs" handler={Tabs} />
      <Route name="text-fields" handler={TextFields} />
      <Route name="time-picker" handler={TimePicker} />
      <Route name="toolbars" handler={Toolbars} />
      <Redirect from="/components" to="appbar" />
    </Route>

    <DefaultRoute handler={Home}/>
  </Route>
);

module.exports = AppRoutes;
