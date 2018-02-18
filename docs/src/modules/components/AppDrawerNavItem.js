import React from 'react';
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
  item: {
    ...theme.typography.body2,
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
  },
  leaf: {
    fontWeight: theme.typography.fontWeightRegular,
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  leafButton: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(13),
  },
  active: {
    color: theme.palette.text.primary,
  },
});

class AppDrawerNavItem extends React.Component {
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
    const {
      children,
      classes,
      depth,
      href,
      onClick,
      openImmediately,
      title,
      ...other
    } = this.props;

    const style = {
      paddingLeft: 8 * (3 + 2 * depth),
    };

    if (href) {
      return (
        <ListItem className={classes.leaf} disableGutters {...other}>
          <Button
            component={props => (
              <Link variant="button" activeClassName={classes.active} href={href} {...props} />
            )}
            className={classNames(classes.button, classes.leafButton)}
            disableRipple
            onClick={onClick}
            style={style}
          >
            {title}
          </Button>
        </ListItem>
      );
    }

    return (
      <ListItem className={classes.item} disableGutters {...other}>
        <Button
          classes={{
            root: classes.button,
            label: openImmediately ? 'algolia-lvl0' : '',
          }}
          onClick={this.handleClick}
          style={style}
        >
          {title}
        </Button>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      </ListItem>
    );
  }
}

AppDrawerNavItem.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  openImmediately: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

AppDrawerNavItem.defaultProps = {
  openImmediately: false,
};

export default withStyles(styles)(AppDrawerNavItem);
