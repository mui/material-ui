import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

// Here we define all our material-ui ReactComponents.
import Master from './components/master';
import Home from './components/pages/home';

import GetStarted from './components/pages/get-started';
import Prerequisites from './components/pages/get-started/prerequisites';
import Installation from './components/pages/get-started/installation';
import Examples from './components/pages/get-started/examples';

import Customization from './components/pages/customization';
import Colors from './components/pages/customization/colors';
import Themes from './components/pages/customization/themes';
import InlineStyles from './components/pages/customization/inline-styles';

import Components from './components/pages/components';
import AppBar from './components/pages/components/app-bar';
import AutoComplete from './components/pages/components/auto-complete';
import Avatar from './components/pages/components/avatar';
import Badge from './components/pages/components/badge';
import Buttons from './components/pages/components/buttons';
import Cards from './components/pages/components/cards';
import DatePicker from './components/pages/components/date-picker';
import Dialog from './components/pages/components/dialog';
import DropDownMenu from './components/pages/components/drop-down-menu';
import GridList from './components/pages/components/grid-list';
import Icons from './components/pages/components/icons';
import IconButtons from './components/pages/components/icon-buttons';
import IconMenus from './components/pages/components/icon-menus';
import LeftNav from './components/pages/components/left-nav';
import Lists from './components/pages/components/lists';
import Menus from './components/pages/components/menus';
import Paper from './components/pages/components/paper';
import Popover from './components/pages/components/popover';
import Progress from './components/pages/components/progress';
import RefreshIndicator from './components/pages/components/refresh-indicator';
import SelectFields from './components/pages/components/select-fields';
import Sliders from './components/pages/components/sliders';
import Snackbar from './components/pages/components/snackbar';
import Switches from './components/pages/components/switches';
import Table from './components/pages/components/table';
import Tabs from './components/pages/components/tabs';
import TextFields from './components/pages/components/text-fields';
import TimePicker from './components/pages/components/time-picker';
import Toolbars from './components/pages/components/toolbars';


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

    <Redirect from="components" to="/components/app-bar" />
    <Route path="components" component={Components}>
      <Route path="app-bar" component={AppBar} />
      <Route path="auto-complete" component={AutoComplete} />
      <Route path="avatar" component={Avatar} />
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
      <Route path="popover" component={Popover} />
      <Route path="progress" component={Progress} />
      <Route path="refresh-indicator" component={RefreshIndicator} />
      <Route path="select-fields" component={SelectFields} />
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

export default AppRoutes;
