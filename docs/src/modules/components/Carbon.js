// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  '@global': {
    '#carbonads': {
      padding: theme.spacing.unit,
      zIndex: 1,
      boxSizing: 'content-box',
      backgroundColor: theme.palette.background.paper,
      borderRadius: 4,
      position: 'relative',
      [theme.breakpoints.up('sm')]: {
        margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px ${theme.spacing.unit}px`,
        maxWidth: 130,
        float: 'right',
      },
      [theme.breakpoints.up('xl')]: {
        position: 'fixed',
        margin: 0,
        right: theme.spacing.unit * 2,
        bottom: theme.spacing.unit * 2,
      },
      '& img': {
        verticalAlign: 'middle',
      },
      '& a': {
        textDecoration: 'none',
      },
      '& .carbon-wrap': {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
      '& .carbon-text': {
        ...theme.typography.body1,
        display: 'block',
        margin: `0 0 0 ${theme.spacing.unit}px`,
        [theme.breakpoints.up('sm')]: {
          margin: `${theme.spacing.unit}px 0`,
        },
      },
      '& .carbon-poweredby': {
        ...theme.typography.caption,
        display: 'block',
        marginTop: theme.spacing.unit / 2,
        position: 'absolute',
        right: 4,
        bottom: 4,
        [theme.breakpoints.up('sm')]: {
          marginTop: 0,
          position: 'static',
        },
      },
    },
  },
  ad: {
    minHeight: 116,
    margin: `${theme.spacing.unit}px 0 0`,
    [theme.breakpoints.up('sm')]: {
      margin: 0,
      minHeight: 0,
    },
  },
});

class Carbon extends React.Component<any> {
  componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.src = '//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=materialuicom';
    script.id = '_carbonads_js';
    const ad = document.querySelector('#ad');
    if (ad) {
      ad.appendChild(script);
    }
  }

  render() {
    const { classes } = this.props;
    return <div className={classes.ad} id="ad" />;
  }
}

Carbon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Carbon);
