import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/lab/Backdrop/Backdrop';
import Back from '@material-ui/lab/Backdrop/BackLayer';
import BackSection from '@material-ui/lab/Backdrop/BackLayerSection';
import Front from '@material-ui/lab/Backdrop/FrontLayer';
import Subheader from '@material-ui/lab/Backdrop/FrontLayerSubheader';
import FadeSwitch from '@material-ui/lab/Backdrop/FadeSwitch';

import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import SimpleMediaCard from '../../demos/cards/SimpleMediaCard'

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
  },
  menuItem: {
    padding: 7.5,
    borderRadius: 3,
  },
  menuSelected: {
    background: theme.palette.primary[300]
  },
});

class SimpleBackdrop extends React.Component {
  state = {
    expanded: false,
  }
  render() {
    const { classes } = this.props;
    const { expanded } = this.state
    const Title = ({ className, ...props }) => (
      <Typography variant="title" color="inherit"
        className={classNames(classes.flex, className)} {...props}/>
    )
    const MenuItem = ({ className, ...props }) => (
      <Typography variant="body2" color="inherit"
        className={classNames(classes.menuItem, className)} {...props}/>
    )

    const menu = (
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
            onClick={() => this.setState({ expanded: !expanded })}>
          <MenuIcon />
        </IconButton>
        <FadeSwitch selected={this.state.expanded}
          options={{
            true: <Title>App Title</Title>,
            false: <Title>Page Title</Title>
          }}
        />
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
              <MenuItem className={classes.menuSelected}>
                Subtitle 1
              </MenuItem>
              <MenuItem>
                Subtitle 2
              </MenuItem>
              <MenuItem>
                Subtitle 3
              </MenuItem>
            </BackSection>
          </Back>
          <Front>
            <Subheader divider>
              <Typography variant="subheading">
                Subtitle 1
              </Typography>
            </Subheader>
            <List>
              { new Array(5).fill(
                <ListItem><SimpleMediaCard /></ListItem>
              )}
            </List>
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
