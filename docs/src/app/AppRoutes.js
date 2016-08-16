import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

// Here we define all our material-ui ReactComponents.
import Master from './components/Master';
import Home from './components/pages/Home';

import Prerequisites from './components/pages/get-started/Prerequisites';
import Installation from './components/pages/get-started/Installation';
import Usage from './components/pages/get-started/Usage';
import Examples from './components/pages/get-started/Examples';
import ServerRendering from './components/pages/get-started/ServerRendering';

import Colors from './components/pages/customization/Colors';
import Themes from './components/pages/customization/Themes';
import InlineStyles from './components/pages/customization/InlineStyles';

import AppBarPage from './components/pages/components/AppBar/Page';
import AutoCompletePage from './components/pages/components/AutoComplete/Page';
import AvatarPage from './components/pages/components/Avatar/Page';
import BadgePage from './components/pages/components/Badge/Page';
import BottomNavigationPage from './components/pages/components/BottomNavigation/Page';
import CardPage from './components/pages/components/Card/Page';
import ChipPage from './components/pages/components/Chip/Page';
import CircularProgressPage from './components/pages/components/CircularProgress/Page';
import CheckboxPage from './components/pages/components/Checkbox/Page';
import DatePicker from './components/pages/components/DatePicker/Page';
import DialogPage from './components/pages/components/Dialog/Page';
import DividerPage from './components/pages/components/Divider/Page';
import DrawerPage from './components/pages/components/Drawer/Page';
import DropDownMenuPage from './components/pages/components/DropDownMenu/Page';
import FlatButtonPage from './components/pages/components/FlatButton/Page';
import FloatingActionButtonPage from './components/pages/components/FloatingActionButton/Page';
import FontIconPage from './components/pages/components/FontIcon/Page';
import GridListPage from './components/pages/components/GridList/Page';
import IconButtonPage from './components/pages/components/IconButton/Page';
import IconMenuPage from './components/pages/components/IconMenu/Page';
import ListPage from './components/pages/components/List/Page';
import LinearProgressPage from './components/pages/components/LinearProgress/Page';
import PaperPage from './components/pages/components/Paper/Page';
import MenuPage from './components/pages/components/Menu/Page';
import PopoverPage from './components/pages/components/Popover/Page';
import RaisedButtonPage from './components/pages/components/RaisedButton/Page';
import RefreshIndicatorPage from './components/pages/components/RefreshIndicator/Page';
import RadioButtonPage from './components/pages/components/RadioButton/Page';
import SelectField from './components/pages/components/SelectField/Page';
import SliderPage from './components/pages/components/Slider/Page';
import SnackbarPage from './components/pages/components/Snackbar/Page';
import SvgIconPage from './components/pages/components/SvgIcon/Page';
import SubheaderPage from './components/pages/components/Subheader/Page';
import TablePage from './components/pages/components/Table/Page';
import TabsPage from './components/pages/components/Tabs/Page';
import TextFieldPage from './components/pages/components/TextField/Page';
import TimePickerPage from './components/pages/components/TimePicker/Page';
import TogglePage from './components/pages/components/Toggle/Page';
import ToolbarPage from './components/pages/components/Toolbar/Page';

import Community from './components/pages/discover-more/Community';
import Contributing from './components/pages/discover-more/Contributing';
import Showcase from './components/pages/discover-more/Showcase';
import RelatedProjects from './components/pages/discover-more/RelatedProjects';

import StepperPage from './components/pages/components/Stepper/Page';

/**
 * Routes: https://github.com/reactjs/react-router/blob/master/docs/API.md#route
 *
 * Routes are used to declare your view hierarchy.
 *
 * Say you go to http://material-ui.com/#/components/paper
 * The react router will search for a route named 'paper' and will recursively render its
 * handler and its parent handler like so: Paper > Components > Master
 */
const AppRoutes = (
  <Route path="/" component={Master}>
    <IndexRoute component={Home} />
    <Route path="home" component={Home} />
    <Redirect from="get-started" to="/get-started/prerequisites" />
    <Route path="get-started">
      <Route path="prerequisites" component={Prerequisites} />
      <Route path="installation" component={Installation} />
      <Route path="usage" component={Usage} />
      <Route path="examples" component={Examples} />
      <Route path="server-rendering" component={ServerRendering} />
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
      <Route path="auto-complete" component={AutoCompletePage} />
      <Route path="avatar" component={AvatarPage} />
      <Route path="bottom-navigation" component={BottomNavigationPage} />
      <Route path="badge" component={BadgePage} />
      <Route path="card" component={CardPage} />
      <Route path="chip" component={ChipPage} />
      <Route path="circular-progress" component={CircularProgressPage} />
      <Route path="checkbox" component={CheckboxPage} />
      <Route path="date-picker" component={DatePicker} />
      <Route path="dialog" component={DialogPage} />
      <Route path="divider" component={DividerPage} />
      <Route path="drawer" component={DrawerPage} />
      <Route path="dropdown-menu" component={DropDownMenuPage} />
      <Route path="font-icon" component={FontIconPage} />
      <Route path="flat-button" component={FlatButtonPage} />
      <Route path="floating-action-button" component={FloatingActionButtonPage} />
      <Route path="grid-list" component={GridListPage} />
      <Route path="icon-button" component={IconButtonPage} />
      <Route path="icon-menu" component={IconMenuPage} />
      <Route path="list" component={ListPage} />
      <Route path="linear-progress" component={LinearProgressPage} />
      <Route path="paper" component={PaperPage} />
      <Route path="menu" component={MenuPage} />
      <Route path="popover" component={PopoverPage} />
      <Route path="refresh-indicator" component={RefreshIndicatorPage} />
      <Route path="radio-button" component={RadioButtonPage} />
      <Route path="raised-button" component={RaisedButtonPage} />
      <Route path="select-field" component={SelectField} />
      <Route path="svg-icon" component={SvgIconPage} />
      <Route path="slider" component={SliderPage} />
      <Route path="snackbar" component={SnackbarPage} />
      <Route path="stepper" component={StepperPage} />
      <Route path="subheader" component={SubheaderPage} />
      <Route path="table" component={TablePage} />
      <Route path="tabs" component={TabsPage} />
      <Route path="text-field" component={TextFieldPage} />
      <Route path="time-picker" component={TimePickerPage} />
      <Route path="toggle" component={TogglePage} />
      <Route path="toolbar" component={ToolbarPage} />
    </Route>
    <Redirect from="discover-more" to="/discover-more/community" />
    <Route path="discover-more">
      <Route path="community" component={Community} />
      <Route path="contributing" component={Contributing} />
      <Route path="showcase" component={Showcase} />
      <Route path="related-projects" component={RelatedProjects} />
    </Route>
  </Route>
);

export default AppRoutes;
