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
import Prerequisites from './components/pages/get-started/Prerequisites';
import Installation from './components/pages/get-started/Installation';
import Usage from './components/pages/get-started/Usage';
import Examples from './components/pages/get-started/Examples';
import Community from './components/pages/get-started/Community';

import Customization from './components/pages/customization';
import Colors from './components/pages/customization/colors';
import Themes from './components/pages/customization/themes';
import InlineStyles from './components/pages/customization/inline-styles';

import Components from './components/pages/components';
import AppBarPage from './components/pages/components/AppBar/Page';
import AutoComplete from './components/pages/components/auto-complete';
import AvatarPage from './components/pages/components/Avatar/Page';
import BadgePage from './components/pages/components/Badge/Page';
import Buttons from './components/pages/components/buttons';
import CardPage from './components/pages/components/Card/Page';
import DatePicker from './components/pages/components/DatePicker/Page';
import DialogPage from './components/pages/components/Dialog/Page';
import DividerPage from './components/pages/components/Divider/Page';
import DropDownMenuPage from './components/pages/components/DropDownMenu/Page';
import GridListPage from './components/pages/components/GridList/Page';
import Icons from './components/pages/components/icons';
import IconButtons from './components/pages/components/icon-buttons';
import IconMenus from './components/pages/components/icon-menus';
import LeftNavPage from './components/pages/components/LeftNav/Page';
import Lists from './components/pages/components/lists';
import Menus from './components/pages/components/menus';
import Paper from './components/pages/components/paper';
import Popover from './components/pages/components/popover';
import Progress from './components/pages/components/progress';
import RefreshIndicator from './components/pages/components/refresh-indicator';
import SelectField from './components/pages/components/SelectField/Page';
import Sliders from './components/pages/components/sliders';
import SnackbarPage from './components/pages/components/Snackbar/Page';
import Switches from './components/pages/components/switches';
import Table from './components/pages/components/table';
import TabsPage from './components/pages/components/Tabs/Page';
import TextFields from './components/pages/components/text-fields';
import TimePicker from './components/pages/components/time-picker';
import ToolbarsPage from './components/pages/components/Toolbars/Page';

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
      <Route path="usage" component={Usage} />
      <Route path="examples" component={Examples} />
      <Route path="community" component={Community} />
    </Route>

    <Redirect from="customization" to="/customization/themes" />
    <Route path="customization" component={Customization}>
      <Route path="colors" component={Colors} />
      <Route path="themes" component={Themes} />
      <Route path="inline-styles" component={InlineStyles} />
    </Route>

    <Redirect from="components" to="/components/app-bar" />
    <Route path="components" component={Components}>
      <Route path="app-bar" component={AppBarPage} />
      <Route path="auto-complete" component={AutoComplete} />
      <Route path="avatar" component={AvatarPage} />
      <Route path="badge" component={BadgePage} />
      <Route path="buttons" component={Buttons} />
      <Route path="card" component={CardPage} />
      <Route path="date-picker" component={DatePicker} />
      <Route path="dialog" component={DialogPage} />
      <Route path="divider" component={DividerPage} />
      <Route path="dropdown-menu" component={DropDownMenuPage} />
      <Route path="grid-list" component={GridListPage} />
      <Route path="icons" component={Icons} />
      <Route path="icon-buttons" component={IconButtons} />
      <Route path="icon-menus" component={IconMenus} />
      <Route path="left-nav" component={LeftNavPage} />
      <Route path="lists" component={Lists} />
      <Route path="menus" component={Menus} />
      <Route path="paper" component={Paper} />
      <Route path="popover" component={Popover} />
      <Route path="progress" component={Progress} />
      <Route path="refresh-indicator" component={RefreshIndicator} />
      <Route path="select-field" component={SelectField} />
      <Route path="sliders" component={Sliders} />
      <Route path="switches" component={Switches} />
      <Route path="snackbar" component={SnackbarPage} />
      <Route path="table" component={Table} />
      <Route path="tabs" component={TabsPage} />
      <Route path="text-fields" component={TextFields} />
      <Route path="time-picker" component={TimePicker} />
      <Route path="toolbars" component={ToolbarsPage} />
    </Route>

    <IndexRoute component={Home}/>
  </Route>
);

export default AppRoutes;
