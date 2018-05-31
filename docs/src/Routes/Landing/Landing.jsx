import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Toolbar, Typography, withStyles, Button } from '@material-ui/core';
import PatreonSponsors from './components/PatreonSponsors';
import MuiLogo from '../../assets/mui-logo.svg';

class Demo extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  scrollToContent = () => {
    const contentEl = document.getElementById('content');
    contentEl.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Toolbar color="primary" className={classes.appToolbar}>
          <img
            alt="Material-UI logo"
            className={classes.materialUILogo}
            src={MuiLogo}
          />

          <Typography variant="display1" color="inherit" className="title text-light" gutterBottom>
            Material-UI Pickers
          </Typography>
          <Typography variant="headline" align="center" color="inherit" gutterBottom className="text-light">
            Date and Time pickers for material-ui v1
          </Typography>

          <Link to="/installation">
            <Button variant="raised" className={classes.getStarted} onClick={this.scrollToContent}>
              Get Started
            </Button>
          </Link>
        </Toolbar>

        <div id="content" className={classes.content}>
          <Typography variant="display1" align="center" gutterBottom>
            Support material-ui-pickers
          </Typography>

          <Typography align="center" gutterBottom>
            Material-UI-pickers is a MIT licensed open source project.
            We are intent on code quality and project maintain.
            Entirely thanks to our awesome bakers.
          </Typography>

          <Typography
            align="center"
            className={classes.sponsorHeader}
            variant="headline"
            gutterBottom
          >
            Our awesome sponsors via <a className="link" href="https://www.patreon.com/user?u=9897423"> patreon </a> ❤️
          </Typography>
          <PatreonSponsors />
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  flex: {
    flex: 1,
  },
  materialUILogo: {
    width: '100%',
    height: '35vw',
    maxHeight: 200,
    margin: '20px 0',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  noShadow: {
    boxShadow: 'unset',
  },
  appToolbar: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.palette.common.white,
    padding: '100px 20px',
    minHeight: 'calc(75vh - 55px)',
  },
  getStarted: {
    marginTop: '10px',
  },
  main: {
    backgroundColor: theme.palette.background.default,
    marginBottom: -50,
  },
  content: {
    paddingTop: '80px',
    backgroundColor: theme.palette.background.default,
    minHeight: 'calc(100vh - 63px)',
    maxWidth: 900,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    '@media(max-width: 600px)': {
      minHeight: 'calc(100vh - 55px)',
    },
  },
  changeOutside: {
    maxWidth: 200,
    margin: '0 auto',
  },
  sponsorHeader: {
    marginTop: '2em',
  },
});

export default withStyles(styles)(Demo);
