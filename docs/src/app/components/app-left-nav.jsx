import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';

import {Colors, Spacing, Typography} from 'material-ui/lib/styles';
import {StylePropable} from 'material-ui/lib/mixins';
const SelectableList = SelectableContainerEnhance(List);

const AppLeftNav = React.createClass({
  mixins: [
    StylePropable,
  ],

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
            value: this.props.location.pathname,
            requestChange: this.handleRequestChangeList,
          }}
        >
          <ListItem
            primaryText="Get Started"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem
                value="/get-started/prerequisites"
                primaryText="Prerequisites"
              />,
              <ListItem
                value="/get-started/installation"
                primaryText="Installation"
              />,
              <ListItem
                value="/get-started/usage"
                primaryText="Usage"
              />,
              <ListItem
                value="/get-started/examples"
                primaryText="Examples"
              />,
              <ListItem
                value="/get-started/community"
                primaryText="Community"
              />,
            ]}
          />
          <ListItem
            primaryText="Customization"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem
                value="/customization/themes"
                primaryText="Themes"
              />,
              <ListItem
                value="/customization/inline-styles"
                primaryText="Inline Styles"
              />,
              <ListItem
                value="/customization/colors"
                primaryText="Colors"
              />,
            ]}
          />
          <ListItem
            primaryText="Components"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem
                value="/components/app-bar"
                primaryText="App Bar"
              />,
              <ListItem
                value="/components/auto-complete"
                primaryText="Auto Complete"
              />,
              <ListItem
                value="/components/avatar"
                primaryText="Avatar"
              />,
              <ListItem
                value="/components/badge"
                primaryText="Badge"
              />,
              <ListItem
                value="/components/buttons"
                primaryText="Buttons"
              />,
              <ListItem
                value="/components/card"
                primaryText="Card"
              />,
              <ListItem
                value="/components/date-picker"
                primaryText="Date Picker"
              />,
              <ListItem
                value="/components/dialog"
                primaryText="Dialog"
              />,
              <ListItem
                value="/components/divider"
                primaryText="Divider"
              />,
              <ListItem
                value="/components/dropdown-menu"
                primaryText="Dropdown Menu"
              />,
              <ListItem
                value="/components/grid-list"
                primaryText="Grid List"
              />,
              <ListItem
                value="/components/icons"
                primaryText="Icons"
              />,
              <ListItem
                value="/components/icon-buttons"
                primaryText="Icon Buttons"
              />,
              <ListItem
                value="/components/icon-menus"
                primaryText="Icon Menus"
              />,
              <ListItem
                value="/components/left-nav"
                primaryText="Left Nav"
              />,
              <ListItem
                value="/components/lists"
                primaryText="Lists"
              />,
              <ListItem
                value="/components/menus"
                primaryText="Menus"
              />,
              <ListItem
                value="/components/paper"
                primaryText="Paper"
              />,
              <ListItem
                value="/components/popover"
                primaryText="Popover"
              />,
              <ListItem
                value="/components/progress"
                primaryText="Progress"
              />,
              <ListItem
                value="/components/refresh-indicator"
                primaryText="Refresh Indicator"
              />,
              <ListItem
                value="/components/select-fields"
                primaryText="Select Fields"
              />,
              <ListItem
                value="/components/sliders"
                primaryText="Sliders"
              />,
              <ListItem
                value="/components/switches"
                primaryText="Switches"
              />,
              <ListItem
                value="/components/snackbar"
                primaryText="Snackbar"
              />,
              <ListItem
                value="/components/table"
                primaryText="Table"
              />,
              <ListItem
                value="/components/tabs"
                primaryText="Tabs"
              />,
              <ListItem
                value="/components/text-fields"
                primaryText="Text Fields"
              />,
              <ListItem
                value="/components/time-picker"
                primaryText="Time Picker"
              />,
              <ListItem
                value="/components/toolbars"
                primaryText="Toolbars"
              />,
            ]}
          />
        </SelectableList>
        <Divider />
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
    this.setState({
      leftNavOpen: !this.state.leftNavOpen,
    });
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
