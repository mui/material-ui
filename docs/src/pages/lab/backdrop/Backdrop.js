import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/lab/Backdrop/Backdrop';
import Back from '@material-ui/lab/Backdrop/BackLayer';
import BackSection from '@material-ui/lab/Backdrop/BackLayerSection';
import Front from '@material-ui/lab/Backdrop/FrontLayer';

import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  root: {
    width: 360,
    height: 616,
    position: 'relative'
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  subheading: {
    height: 32,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  }
});

class SimpleBackdrop extends React.Component {
  state = {
    expanded: null,
  }
  render() {
    const { classes } = this.props;
    const { expanded } = this.state
    const menu = (
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
            onClick={() => this.setState({ expanded: !expanded })}>
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" className={classes.flex}>
          Title
      </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    )
    return (
      <div className={classes.root}>
        <Backdrop>
          <Back>
            <BackSection expanded>
              {menu}
            </BackSection>
            <BackSection expanded={this.state.expanded}>
              <ul>
                Lorem ipsum
                Lorem ipsum
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
              </ul>
            </BackSection>
          </Back>
          <Front>
            <Typography variant="subheading" className={classes.subheading}>
              Subtitle
          </Typography>
          </Front>
        </Backdrop>
      </div>
    );
  }
}

SimpleBackdrop.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBackdrop);
