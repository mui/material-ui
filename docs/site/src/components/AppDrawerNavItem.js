import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {createStyleSheet} from 'stylishly';
import {ListItem} from 'material-ui/List';
import Button from 'material-ui/Button';
import Collapse from 'material-ui/transitions/Collapse';

export const styleSheet = createStyleSheet('AppDrawerNavItem', (theme) => {
  return {
    button: theme.mixins.gutters({
      borderRadius: 0,
      justifyContent: 'flex-start',
      textTransform: 'none',
      width: '100%',
      '&:hover': {
        textDecoration: 'none',
      },
    }),
    navItem: {
      ...theme.typography.body2,
      display: 'block',
      paddingTop: 0,
      paddingBottom: 0,
    },
    navLink: {
      fontWeight: 400,
      display: 'flex',
      paddingTop: 0,
      paddingBottom: 0,
      button: {
        color: theme.palette.text.secondary,
        textIndent: 24,
        fontSize: 13,
      },
      activeButton: {
        color: theme.palette.text.primary,
      },
    },
  };
});

export default class AppDrawerNavItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    openImmediately: PropTypes.bool,
    title: PropTypes.string,
    to: PropTypes.string,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    open: false,
  };

  componentWillMount() {
    if (this.props.openImmediately) {
      this.setState({open: true});
    }
  }

  render() {
    const {children, title, to} = this.props;
    const classes = this.context.styleManager.render(styleSheet);

    if (to) {
      return (
        <ListItem
          className={classes.navLink}
          gutters={false}
        >
          <Button
            component={Link}
            to={to}
            className={classes.button}
            activeClassName={classes.activeButton}
            ripple={false}
          >
            {title}
          </Button>
        </ListItem>
      );
    }

    return (
      <ListItem className={classes.navItem} gutters={false}>
        <Button
          className={classes.button}
          onClick={() => this.setState({open: !this.state.open})}
        >
          {title}
        </Button>
        <Collapse in={this.state.open} transitionDuration="auto">
          {children}
        </Collapse>
      </ListItem>
    );
  }
}
