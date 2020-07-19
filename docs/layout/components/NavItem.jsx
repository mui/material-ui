import clsx from 'clsx';
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { ListItem, withStyles, Collapse, Button } from '@material-ui/core';

const styles = (theme) => ({
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
    textAlign: 'left',
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

  handleClick = (e) => {
    if (this.props.depth === 0) {
      e.stopPropagation();
    }

    this.setState({ open: !this.state.open });
  };

  render() {
    const { href, title, children, as, classes, depth, router, ...props } = this.props;
    const style = { paddingLeft: `${(depth + 1) * 16}px` };

    if (depth === 0) {
      style.fontWeight = 500;
    }

    if (href) {
      return (
        <ListItem disableGutters className={classes.listItem} {...props}>
          <Link prefetch as={as} href={href}>
            <Button
              onClick={this.handleClick}
              style={style}
              className={clsx(classes.button, {
                [classes.selected]: router.asPath === href || router.asPath === as,
              })}
            >
              {title}
            </Button>
          </Link>
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

export default withStyles(styles)(withRouter(NavItem));
