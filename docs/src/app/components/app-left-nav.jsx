import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
import {
  Colors,
  Spacing,
  Typography,
} from 'material-ui/lib/styles';
import {StylePropable} from 'material-ui/lib/mixins';

const SelectableList = SelectableContainerEnhance(List);

const AppLeftNav = React.createClass({

  propTypes: {
    docked: React.PropTypes.bool.isRequired,
    history: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    onRequestChangeLeftNav: React.PropTypes.func.isRequired,
    onRequestChangeList: React.PropTypes.func.isRequired,
    open: React.PropTypes.bool.isRequired,
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
    router: React.PropTypes.func,
  },

  mixins: [
    StylePropable,
  ],

  handleRequestChangeLink(event, value) {
    window.location = value;
  },

  handleTouchTapHeader() {
    this.props.history.push('/');
    this.setState({
      leftNavOpen: false,
    });
  },

  getStyles() {
    return {
      logo: {
        cursor: 'pointer',
        fontSize: 24,
        color: Typography.textFullWhite,
        lineHeight: Spacing.desktopKeylineIncrement + 'px',
        fontWeight: Typography.fontWeightLight,
        backgroundColor: Colors.cyan500,
        paddingLeft: Spacing.desktopGutter,
        marginBottom: 8,
      },
    };
  },

  render() {
    const {
      location,
      docked,
      onRequestChangeLeftNav,
      onRequestChangeList,
      open,
      style,
    } = this.props;

    const styles = this.getStyles();

    return (
      <LeftNav
        style={style}
        docked={docked}
        open={open}
        onRequestChange={onRequestChangeLeftNav}
      >
        <div
          style={this.prepareStyles(styles.logo)}
          onTouchTap={this.handleTouchTapHeader}
        >
          material ui
        </div>
        <SelectableList
          valueLink={{
            value: location.pathname,
            requestChange: onRequestChangeList,
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
                primaryText="Drop Down Menu"
              />,
              <ListItem
                value="/components/grid-list"
                primaryText="Grid List"
              />,
              <ListItem
                value="/components/icon-button"
                primaryText="Icon Button"
              />,
              <ListItem
                value="/components/icon-menus"
                primaryText="Icon Menus"
              />,
              <ListItem
                primaryText="Icons"
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    value="/components/font-icon"
                    primaryText="Font Icon"
                  />,
                  <ListItem
                    value="/components/svg-icon"
                    primaryText="SVG Icon"
                  />,
                ]}
              />,
              <ListItem
                value="/components/left-nav"
                primaryText="Left Nav"
              />,
              <ListItem
                value="/components/list"
                primaryText="List"
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
                value="/components/select-field"
                primaryText="Select Field"
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
});

export default AppLeftNav;
