// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import Link from 'docs/src/modules/components/Link';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { ListItem } from 'material-ui/List';
import Button from 'material-ui/Button';
import Collapse from 'material-ui/transitions/Collapse';

const styles = theme => ({
  button: theme.mixins.gutters({
    borderRadius: 0,
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
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
    fontWeight: theme.typography.fontWeightRegular,
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  navLinkButton: {
    color: theme.palette.text.secondary,
    textIndent: 24,
    fontSize: 13,
  },
  activeButton: {
    color: theme.palette.text.primary,
  },
});

class AppDrawerNavItem extends React.Component<any, any> {
  static defaultProps = {
    openImmediately: false,
  };

  state = {
    open: false,
  };

  componentWillMount() {
    if (this.props.openImmediately) {
      this.setState({ open: true });
    }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { children, classes, href, openImmediately, title } = this.props;

    if (href) {
      return (
        <ListItem className={classes.navLink} disableGutters>
          <Button
            component={Link}
            variant="button"
            href={href}
            activeClassName={classes.activeButton}
            className={classNames(classes.button, classes.navLinkButton)}
            disableRipple
            onClick={this.props.onClick}
          >
            {title}
          </Button>
        </ListItem>
      );
    }

    return (
      <ListItem className={classes.navItem} disableGutters>
        <Button
          classes={{
            root: classes.button,
            label: openImmediately ? 'algolia-lvl0' : '',
          }}
          onClick={this.handleClick}
        >
          {title}
        </Button>
        <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
          {children}
        </Collapse>
      </ListItem>
    );
  }
}

AppDrawerNavItem.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  openImmediately: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(AppDrawerNavItem);
