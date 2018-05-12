import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  '@global': {
    '#carbonads': {
      padding: theme.spacing.unit,
      backgroundColor: theme.palette.background.paper,
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
        right: 0,
        bottom: 0,
        padding: theme.spacing.unit,
        [theme.breakpoints.up('sm')]: {
          marginTop: 0,
          position: 'static',
          padding: 0,
        },
      },
    },
  },
  root: {
    minHeight: 116,
    margin: `${theme.spacing.unit}px 0 0`,
    [theme.breakpoints.up('sm')]: {
      margin: 0,
      minHeight: 0,
    },
  },
  ad: {
    zIndex: 1,
    borderRadius: 4,
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px ${theme.spacing.unit}px`,
      maxWidth: 130 + theme.spacing.unit * 2,
      float: 'right',
    },
    [theme.breakpoints.up('xl')]: {
      position: 'fixed',
      margin: 0,
      right: theme.spacing.unit * 2,
      bottom: theme.spacing.unit * 2,
    },
  },
  carbonads: {
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.background.paper,
  },
  info: {
    ...theme.typography.caption,
    position: 'absolute',
    padding: theme.spacing.unit,
    cursor: 'default',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      bottom: 0,
      right: 0,
    },
  },
});

class Carbon extends React.Component {
  state = {
    adblock: null,
  };

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

    this.checkAdblock();
  }

  componentWillUnmount() {
    clearTimeout(this.timerAdblock);
  }

  timerAdblock = null;

  checkAdblock = (attempt = 1) => {
    if (document.querySelector('#carbonads')) {
      this.setState({
        adblock: false,
      });
      return;
    }

    if (attempt < 20) {
      this.timerAdblock = setTimeout(() => {
        this.checkAdblock(attempt + 1);
      }, 500);
    }

    if (attempt > 6) {
      this.setState({
        adblock: true,
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { adblock } = this.state;

    if (adblock) {
      return (
        <div className={classes.root}>
          <div className={classes.ad}>
            <div className={classes.carbonads}>
              <Typography gutterBottom>Like Material-UI?</Typography>
              <Typography gutterBottom>
                {`If you don't mind tech-related ads, and want to support Open Source,
                please whitelist Material-UI in your ad blocker.`}
              </Typography>
              <Typography>
                Thank you!{' '}
                <span role="img" aria-label="Love">
                  ❤️
                </span>
              </Typography>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <div className={classes.ad}>
          <div id="ad" />
          {adblock === false && (
            <Tooltip
              id="ad-info"
              title="This ad is designed to support Open Source."
              placement="left"
            >
              <span className={classes.info}>i</span>
            </Tooltip>
          )}
        </div>
      </div>
    );
  }
}

Carbon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default pure(withStyles(styles)(Carbon));
