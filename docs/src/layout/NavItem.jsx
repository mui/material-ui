import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, withStyles, Collapse } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

const styles = theme => ({
  listItem: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
  },
  bold: {
    fontWeight: 500,
  },
  button: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    ...theme.typography.body1,
  },
  selected: {
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
  collapse: {
    padding: 0,
    margin: 0,
  },
});

class NavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
    };
  }

  handleClick = e => {
    if (this.props.depth === 0) {
      e.stopPropagation();
    }

    this.setState({ open: !this.state.open });
  };

  render() {
    const { href, title, children, classes, depth, ...props } = this.props;

    const style = { paddingLeft: `${(depth + 1) * 16}px` };

    if (depth === 0) {
      style.fontWeight = 500;
    }

    if (href) {
      return (
        <ListItem disableGutters className={classes.listItem} {...props}>
          <Button
            disableRipple
            component={NavLink}
            activeClassName={classes.selected}
            to={href}
            onClick={this.handleClick}
            style={style}
            classes={{
              root: classes.button,
            }}
          >
            {title}
          </Button>
        </ListItem>
      );
    }

    return (
      <ListItem disableGutters className={classes.listItem} {...props}>
        <Button
          onClick={this.handleClick}
          style={style}
          classes={{
            root: classes.button,
          }}
        >
          {title}
        </Button>
        <Collapse in={this.state.open} unmountOnExit component="ul" className={classes.collapse}>
          {children}
        </Collapse>
      </ListItem>
    );
  }
}

NavItem.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  href: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.object),
  depth: PropTypes.number,
};

NavItem.defaultProps = {
  depth: 0,
};

export default withStyles(styles)(NavItem);
