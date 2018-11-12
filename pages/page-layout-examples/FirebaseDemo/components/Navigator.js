import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// COMPONENTS
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// ICONS
import Home from '@material-ui/icons/Home';
import People from '@material-ui/icons/People';
import DnsRounded from '@material-ui/icons/DnsRounded';
import PermMediaOutlined from '@material-ui/icons/PermMediaOutlined';
import Public from '@material-ui/icons/Public';
import SettingsEthernet from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponent from '@material-ui/icons/SettingsInputComponent';
import Dashboard from '@material-ui/icons/Dashboard';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import PhonelinkSetup from '@material-ui/icons/PhonelinkSetup';

const categories = [
  {
    id: 'Develop',
    children: [
      { id: 'Authentication', icon: <People />, active: true },
      { id: 'Database', icon: <DnsRounded /> },
      { id: 'Storage', icon: <PermMediaOutlined /> },
      { id: 'Hosting', icon: <Public /> },
      { id: 'Functions', icon: <SettingsEthernet /> },
      { id: 'ML Kits', icon: <SettingsInputComponent /> },
    ],
  },
  {
    id: 'Quality',
    children: [
      { id: 'Crashlytics', icon: <SettingsApplications /> },
      { id: 'Performance', icon: <Dashboard /> },
      { id: 'Test Lab', icon: <PhonelinkSetup /> },
    ],
  },
];

const styles = theme => ({
  list: {
    padding: 0,
  },
  firebaseLogo: {
    width: 28,
    height: 28,
    marginLeft: -4,
  },
  firebaseLabel: {
    width: 82,
    height: 18,
    marginLeft: 12,
  },
  category: {
    background: '#232f3e',
    // borderBottom: '1px solid',
    boxShadow: '0 -1px 0 #404854 inset',
  },
  item: {
    padding: '4px 24px',
    '& svg': {
      fontSize: 20,
    },
    color: 'rgba(255, 255, 255, 0.7)',
    '&$category': {
      paddingTop: 16,
      paddingBottom: 16,
    },
  },
  actionable: {
    '&:hover': {
      background: 'rgba(255,255,255,.08)',
    },
  },
  itemIcon: {
    margin: 0,
    color: 'inherit',
  },
  categoryHeader: {
    padding: '16px 24px',
  },
  categoryHeaderText: {
    fontSize: 15,
    fontWeight: 500,
    color: theme.palette.common.white,
  },
  itemText: {
    fontSize: 14,
    fontWeight: 500,
    '&$textDense': {
      fontSize: 14,
      fontWeight: 500,
    },
  },
  textDense: {},
  activeItem: {
    color: '#4fc3f7',
  },
  divider: {
    background: '#404854',
    marginTop: 16,
  },
});

const Navigator = ({ width, classes }) => (
  <Drawer variant="permanent" classes={{ paper: 'navigator' }} PaperProps={{ style: { width } }}>
    <List className={classes.list}>
      <ListItem className={classNames(classes.category, classes.item)}>
        <img
          alt={'logo'}
          className={classes.firebaseLogo}
          src={'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png'}
        />
        <img
          alt={'label'}
          className={classes.firebaseLabel}
          src={
            'https://www.gstatic.com/mobilesdk/160323_mobilesdk/images/firebase_logotype_white_18dp.svg'
          }
        />
      </ListItem>
      <ListItem className={classNames(classes.item, classes.category)}>
        <ListItemIcon className={classes.itemIcon}>
          <Home />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            color: 'inherit',
          }}
          classes={{
            primary: classes.itemText,
            textDense: classes.textDense,
          }}
        >
          Project Overview
        </ListItemText>
      </ListItem>
      {categories.map(({ id, children }) => (
        <React.Fragment key={id}>
          <ListItem className={classes.categoryHeader}>
            <ListItemText
              classes={{
                primary: classes.categoryHeaderText,
              }}
            >
              {id}
            </ListItemText>
          </ListItem>
          {children.map(({ id: childId, icon, active }) => (
            <ListItem
              button
              dense
              key={childId}
              className={classNames(classes.item, classes.actionable, active && classes.activeItem)}
            >
              <ListItemIcon className={classes.itemIcon}>
                {React.cloneElement(icon, { color: 'inherit' })}
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemText,
                  textDense: classes.textDense,
                }}
                primaryTypographyProps={{
                  color: 'inherit',
                }}
              >
                {childId}
              </ListItemText>
            </ListItem>
          ))}
          <Divider className={classes.divider} />
        </React.Fragment>
      ))}
    </List>
  </Drawer>
);

Navigator.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  width: PropTypes.number,
};

export default withStyles(styles)(Navigator);
