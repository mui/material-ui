import React from 'react';
import {
  LeftNav,
  Mixins,
  Styles,
} from 'material-ui';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ListDivider from 'material-ui/lib/lists/list-divider';
import {SelectableContainerEnhance} from 'material-ui/hoc/selectable-enhance';

const {Colors, Spacing, Typography} = Styles;
const {StylePropable} = Mixins;
const SelectableList = SelectableContainerEnhance(List);

const AppLeftNav = React.createClass({
  mixins: [StylePropable],

  propTypes: {
    history: React.PropTypes.object,
    location: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
    router: React.PropTypes.func,
  },

  getInitialState() {
    return {
      leftNavOpen: false,
    };
  },

  getStyles() {
    return {
      cursor: 'pointer',
      fontSize: 24,
      color: Typography.textFullWhite,
      lineHeight: Spacing.desktopKeylineIncrement + 'px',
      fontWeight: Typography.fontWeightLight,
      backgroundColor: Colors.cyan500,
      paddingLeft: Spacing.desktopGutter,
      marginBottom: 8,
    };
  },

  render() {
    return (
      <LeftNav
        docked={false}
        open={this.state.leftNavOpen}
        onRequestChange={this.handleChangeRequestLeftNav}
      >
        <div
          style={this.prepareStyles(this.getStyles())}
          onTouchTap={this.handleTouchTapHeader}
        >
          material ui
        </div>
        <SelectableList
          valueLink={{
            value: this._getSelectedIndex(),
            requestChange: this.handleRequestChangeList,
          }}
        >
          <ListItem
            value="get-started"
            primaryText="Get Started"
          />
          <ListItem
            value="customization"
            primaryText="Customization"
          />
          <ListItem
            value="components"
            primaryText="Components"
          />
        </SelectableList>
        <ListDivider />
        <SelectableList
          subheader="Resources"
          valueLink={{
            value: '',
            requestChange: this.handleRequestChangeLink,
          }}
        >
          <ListItem
            value="https://github.com/callemall/material-ui"
            primaryText="GitHub"
          />
          <ListItem
            value="http://facebook.github.io/react"
            primaryText="React"
          />
          <ListItem
            value="https://www.google.com/design/spec/material-design/introduction.html"
            primaryText="Material Design"
          />
        </SelectableList>
      </LeftNav>
    );
  },

  toggle() {
    this.setState({leftNavOpen: !this.state.leftNavOpen});
  },

  _getSelectedIndex() {
    return this.props.location.pathname.split('/')[1];
  },

  handleChangeRequestLeftNav(open) {
    this.setState({
      leftNavOpen: open,
    });
  },

  handleRequestChangeList(event, value) {
    this.props.history.push(value);
    this.setState({
      leftNavOpen: false,
    });
  },

  handleRequestChangeLink(event, value) {
    window.location = value;
    this.setState({
      leftNavOpen: false,
    });
  },

  handleTouchTapHeader() {
    this.props.history.push('/');
    this.setState({
      leftNavOpen: false,
    });
  },

});

export default AppLeftNav;
