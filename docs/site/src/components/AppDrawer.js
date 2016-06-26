import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import ClassNames from 'classnames';
import {createStyleSheet} from 'stylishly';
import {List, ListItem} from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Text from 'material-ui/Text';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';

export const styleSheet = createStyleSheet('AppDrawer', (theme) => {
  return {
    paper: {
      width: '275px',
      backgroundColor: theme.palette.background.paper,
    },
    button: theme.mixins.gutters({
      borderRadius: 0,
      justifyContent: 'flex-start',
      textTransform: 'none',
      width: '100%',
      '&:hover': {
        textDecoration: 'none',
      },
    }),
    nav: {
      flex: '1 0 auto',
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
    },
    title: {
      color: theme.palette.text.secondary,
      textDecoration: 'none',
    },
  };
});

export default class AppDrawer extends Component {
  static propTypes = {
    activeRoute: PropTypes.object,
    navRoot: PropTypes.object,
    onRequestClose: PropTypes.func,
    open: PropTypes.bool,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    nav: null,
  };

  componentWillMount() {
    this.classes = this.context.styleManager.render(styleSheet);
    this.classes.listLink = ClassNames(this.classes.navItem, this.classes.navLink);
    this.classes.activeListLink = ClassNames(this.classes.listLink, this.classes.activeLink);

    if (!this.state.nav) {
      this.setState({
        nav: this.renderNav(this.props.navRoot),
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      nav: this.renderNav(nextProps.navRoot),
    });
  }

  renderNav(navRoot, props = {}) {
    return (
      <List {...props}>
        {this.renderNavItems(navRoot)}
      </List>
    );
  }

  renderNavItems(navRoot) {
    if (navRoot.childRoutes && navRoot.childRoutes.length) {
      return navRoot.childRoutes.reduce(this.reduceChildRoutes, []);
    }
  }

  reduceChildRoutes = (items, childRoute, index) => {
    if (childRoute.nav) {
      if (childRoute.childRoutes && childRoute.childRoutes.length) {
        items.push(
          <ListItem className={this.classes.navItem} key={index} gutters={false}>
            <Button className={this.classes.button}>{childRoute.title}</Button>
            {this.renderNav(childRoute)}
          </ListItem>
        );
      } else {
        items.push(
          <ListItem
            className={this.classes.navLink}
            key={index}
            gutters={false}
          >
            <Button
              component={Link}
              to={childRoute.path}
              className={this.classes.button}
              activeClassName={this.classes.activeButton}
            >
              {childRoute.title}
            </Button>
          </ListItem>
        );
      }
    }
    return items;
  };

  render() {
    this.classes = this.context.styleManager.render(styleSheet);
    this.classes.activeNavLink = ClassNames(this.classes.navLink, this.classes.activeLink);

    return (
      <Drawer
        paperClassName={this.classes.paper}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
      >
        <div className={this.classes.nav}>
          <Toolbar>
            <Link className={this.classes.title} to="/">
              <Text type="title">Material UI</Text>
            </Link>
            <Divider absolute={true} />
          </Toolbar>
          {this.state.nav}
        </div>
      </Drawer>
    );
  }
}
