import React from 'react';
import { List, ListSubheader } from 'material-ui';
import { withRouter } from 'react-router-dom';
import NavLink from './NavLink';

const NavigationMenu = () => (
  <List component="nav">
    <ListSubheader component="div"> Getting Started  </ListSubheader>
    <NavLink to="/installation"> Installation </NavLink>
    <NavLink to="/usage"> Usage </NavLink>

    <ListSubheader component="div"> Localization </ListSubheader>

    <NavLink to="/localization/date-fns"> Using date-fns </NavLink>
    <NavLink to="/localization/moment"> Using moment </NavLink>
    <NavLink to="/localization/persian"> Persian Calendar System </NavLink>

    <ListSubheader component="div"> Components </ListSubheader>

    <NavLink to="/demo/datepicker"> Date Picker </NavLink>
    <NavLink to="/demo/timepicker"> Time Picker </NavLink>
    <NavLink to="/demo/datetimepicker"> Date & Time Picker </NavLink>

    <ListSubheader component="div"> Guides </ListSubheader>

    <NavLink to="/guides/css-overrides"> CSS overrides </NavLink>
    <NavLink to="/guides/formats"> Global format customization </NavLink>
  </List>
);

NavigationMenu.propTypes = {
  // classes: PropTypes.object.isRequired,
};

export default withRouter(NavigationMenu);

