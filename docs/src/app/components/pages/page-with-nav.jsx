import React from 'react';
import {History} from 'react-router';
import {Mixins, Styles} from 'material-ui';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

let {Spacing, Colors} = Styles;
let {StyleResizable, StylePropable} = Mixins;


let PageWithNav = React.createClass({

  contextTypes: {
    muiTheme: React.PropTypes.object,
    router: React.PropTypes.func,
  },

  mixins: [StyleResizable, StylePropable, History],

  propTypes: {
    children: React.PropTypes.node,
    location: React.PropTypes.object,
    menuItems: React.PropTypes.array,
  },

  componentWillMount() {
    this.setState({
      activeRoute: this.props.location.pathname,
    });
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeRoute: nextProps.location.pathname,
    });
  },

  getStyles() {
    let subNavWidth = Spacing.desktopKeylineIncrement * 3 + 'px';
    let styles = {
      root: {
        paddingTop: Spacing.desktopKeylineIncrement + 'px',
      },
      rootWhenMedium: {
        position: 'relative',
      },
      secondaryNav: {
        borderTop: 'solid 1px ' + Colors.grey300,
        overflow: 'hidden',
        position: 'inherit',
        height: '100%',
        width: window.innerWidth,
      },
      content: {
        boxSizing: 'border-box',
        padding: Spacing.desktopGutter + 'px',
        maxWidth: (Spacing.desktopKeylineIncrement * 14) + 'px',
      },
      secondaryNavWhenMedium: {
        borderTop: 'none',
        position: 'absolute',
        top: '64px',
        width: subNavWidth,
      },
      contentWhenMedium: {
        marginLeft: subNavWidth,
        borderLeft: 'solid 1px ' + Colors.grey300,
        minHeight: '800px',
      },
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM) ||
        this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.root = this.mergeStyles(styles.root, styles.rootWhenMedium);
      styles.secondaryNav = this.mergeStyles(styles.secondaryNav, styles.secondaryNavWhenMedium);
      styles.content = this.mergeStyles(styles.content, styles.contentWhenMedium);
    }

    return styles;
  },

  render() {
    let styles = this.getStyles();
    return (
      <div style={this.prepareStyles(styles.root)}>
        <div style={this.prepareStyles(styles.content)}>
          {this.props.children}
        </div>
        <Menu
          autoWidth={false}
          onItemTouchTap={(e, child) => this.history.push(child.props.value)}
          openDirection="bottom-right"
          style={styles.secondaryNav}
          value={this.state.activeRoute}
          width={styles.secondaryNav.width}
          zDepth={0}>
          {this.props.menuItems.map((item, index) => {
            return (
              <MenuItem
                key={index}
                primaryText={item.text}
                value={item.route}
              />
            );
          })}
        </Menu>
      </div>
    );
  },

});

export default PageWithNav;
