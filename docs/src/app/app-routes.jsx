import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

// Here we define all our material-ui ReactComponents.
import Master from './components/master';
import Home from './components/pages/home';

import Prerequisites from './components/pages/get-started/Prerequisites';
import Installation from './components/pages/get-started/Installation';
import Usage from './components/pages/get-started/Usage';
import Examples from './components/pages/get-started/Examples';
import Community from './components/pages/get-started/Community';

import Colors from './components/pages/customization/colors';
import Themes from './components/pages/customization/themes';
import InlineStyles from './components/pages/customization/inline-styles';

import AppBarPage from './components/pages/components/AppBar/Page';
import AutoComplete from './components/pages/components/auto-complete';
import AvatarPage from './components/pages/components/Avatar/Page';
import BadgePage from './components/pages/components/Badge/Page';
import Buttons from './components/pages/components/buttons';
import CardPage from './components/pages/components/Card/Page';
import CircularProgressPage from './components/pages/components/CircularProgress/Page';
import DatePicker from './components/pages/components/DatePicker/Page';
import DialogPage from './components/pages/components/Dialog/Page';
import DividerPage from './components/pages/components/Divider/Page';
import DropDownMenuPage from './components/pages/components/DropDownMenu/Page';
import FontIconPage from './components/pages/components/FontIcon/Page';
import GridListPage from './components/pages/components/GridList/Page';
import IconButtonPage from './components/pages/components/IconButton/Page';
import IconMenus from './components/pages/components/icon-menus';
import LeftNavPage from './components/pages/components/LeftNav/Page';
import ListPage from './components/pages/components/List/Page';
import LinearProgressPage from './components/pages/components/LinearProgress/Page';
import PaperPage from './components/pages/components/Paper/Page';
import MenuPage from './components/pages/components/Menu/Page';
import Popover from './components/pages/components/popover';
import RefreshIndicatorPage from './components/pages/components/RefreshIndicator/Page';
import SelectField from './components/pages/components/SelectField/Page';
import SliderPage from './components/pages/components/Slider/Page';
import SnackbarPage from './components/pages/components/Snackbar/Page';
import SvgIconPage from './components/pages/components/SvgIcon/Page';
import Switches from './components/pages/components/switches';
import TablePage from './components/pages/components/Table/Page';
import TabsPage from './components/pages/components/Tabs/Page';
import TextFieldPage from './components/pages/components/TextField/Page';
import TimePickerPage from './components/pages/components/TimePicker/Page';
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
    <Route path="get-started">
      <Route path="prerequisites" component={Prerequisites} />
      <Route path="installation" component={Installation} />
      <Route path="usage" component={Usage} />
      <Route path="examples" component={Examples} />
      <Route path="community" component={Community} />
    </Route>

    <Redirect from="customization" to="/customization/themes" />
    <Route path="customization">
      <Route path="colors" component={Colors} />
      <Route path="themes" component={Themes} />
      <Route path="inline-styles" component={InlineStyles} />
    </Route>

    <Redirect from="components" to="/components/app-bar" />
    <Route path="components">
      <Route path="app-bar" component={AppBarPage} />
      <Route path="auto-complete" component={AutoComplete} />
      <Route path="avatar" component={AvatarPage} />
      <Route path="badge" component={BadgePage} />
      <Route path="buttons" component={Buttons} />
      <Route path="card" component={CardPage} />
      <Route path="circular-progress" component={CircularProgressPage} />
      <Route path="date-picker" component={DatePicker} />
      <Route path="dialog" component={DialogPage} />
      <Route path="divider" component={DividerPage} />
      <Route path="dropdown-menu" component={DropDownMenuPage} />
      <Route path="font-icon" component={FontIconPage} />
      <Route path="grid-list" component={GridListPage} />
      <Route path="icon-button" component={IconButtonPage} />
      <Route path="icon-menus" component={IconMenus} />
      <Route path="left-nav" component={LeftNavPage} />
      <Route path="list" component={ListPage} />
      <Route path="linear-progress" component={LinearProgressPage} />
      <Route path="paper" component={PaperPage} />
      <Route path="menu" component={MenuPage} />
      <Route path="popover" component={Popover} />
      <Route path="refresh-indicator" component={RefreshIndicatorPage} />
      <Route path="select-field" component={SelectField} />
      <Route path="svg-icon" component={SvgIconPage} />
      <Route path="slider" component={SliderPage} />
      <Route path="switches" component={Switches} />
      <Route path="snackbar" component={SnackbarPage} />
      <Route path="table" component={TablePage} />
      <Route path="tabs" component={TabsPage} />
      <Route path="text-field" component={TextFieldPage} />
      <Route path="time-picker" component={TimePickerPage} />
      <Route path="toolbars" component={ToolbarsPage} />
    </Route>

    <IndexRoute component={Home}/>
  </Route>
);

export default AppRoutes;
