import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/lab/Backdrop/Backdrop';
import Back from '@material-ui/lab/Backdrop/BackLayer';
import BackSection from '@material-ui/lab/Backdrop/BackLayerSection';
import Front from '@material-ui/lab/Backdrop/FrontLayer';
import Subheader from '@material-ui/lab/Backdrop/FrontLayerSubheader';
import FrontContent from '@material-ui/lab/Backdrop/FrontLayerContent';
import FadeSwitch from '@material-ui/lab/Backdrop/FadeSwitch';
import MenuItem from '@material-ui/lab/Backdrop/BackdropMenuItem';

import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import SimpleMediaCard from '../../demos/cards/SimpleMediaCard';

const styles = theme => {
  let transition = theme.transitions.create('backgroundColor', {
    duration: theme.transitions.duration.shortest,
  });
  return {
    root: {
      width: 360,
      height: 616,
      position: 'relative',
    },
    flex: {
      flex: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };
};

class SimpleBackdrop extends React.Component {
  state = {
    expanded: false,
  };
  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    const Title = ({ className, ...props }) => (
      <Typography
        variant="title"
        color="inherit"
        className={classNames(classes.flex, className)}
        {...props}
      />
    );

    return (
      <div className={classes.root}>
        <Backdrop>
          <Back>
            <BackSection expanded>
              <Toolbar>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={() => this.setState({ expanded: !expanded })}
                >
                  <MenuIcon />
                </IconButton>
                <FadeSwitch
                  selected={this.state.expanded}
                  options={{
                    true: <Title>Nature's Nobility</Title>,
                    false: <Title>Luxurious Lizards</Title>,
                  }}
                />
              </Toolbar>
            </BackSection>
            <BackSection expanded={this.state.expanded}>
              <List>
                <MenuItem selected={true}>Luxurious Lizards</MenuItem>
                <MenuItem>Glorious Geese</MenuItem>
                <MenuItem>Ecstatic Eggs</MenuItem>
              </List>
            </BackSection>
          </Back>
          <Front disabled={this.state.expanded}>
            <Subheader divider>
              <Typography variant="subheading">Incredible Iguanas</Typography>
            </Subheader>
            <FrontContent>
              <List>
                <ListItem>
                  <SimpleMediaCard />
                </ListItem>
                <ListItem>
                  <SimpleMediaCard />
                </ListItem>
                <ListItem>
                  <SimpleMediaCard />
                </ListItem>
                <ListItem>
                  <SimpleMediaCard />
                </ListItem>
                <ListItem>
                  <SimpleMediaCard />
                </ListItem>
              </List>
            </FrontContent>
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
