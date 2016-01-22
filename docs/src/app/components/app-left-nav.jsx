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
        <div style={this.prepareStyles(styles.logo)} onTouchTap={this.handleTouchTapHeader}>
          material ui
        </div>
        <SelectableList
          valueLink={{value: location.pathname, requestChange: onRequestChangeList}}
        >
          <ListItem
            primaryText="Get Started"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem primaryText="Prerequisites" value="/get-started/prerequisites" />,
              <ListItem primaryText="Installation" value="/get-started/installation" />,
              <ListItem primaryText="Usage" value="/get-started/usage" />,
              <ListItem primaryText="Examples" value="/get-started/examples" />,
              <ListItem primaryText="Server Rendering" value="/get-started/server-rendering" />,
            ]}
          />
          <ListItem
            primaryText="Customization"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem primaryText="Themes" value="/customization/themes" />,
              <ListItem primaryText="Inline Styles" value="/customization/inline-styles" />,
              <ListItem primaryText="Colors" value="/customization/colors" />,
            ]}
          />
          <ListItem
            primaryText="Components"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem primaryText="App Bar" value="/components/app-bar" />,
              <ListItem primaryText="Auto Complete" value="/components/auto-complete" />,
              <ListItem primaryText="Avatar" value="/components/avatar" />,
              <ListItem primaryText="Badge" value="/components/badge" />,
              <ListItem
                primaryText="Buttons"
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem primaryText="Flat Button" value="/components/flat-button" />,
                  <ListItem primaryText="Raised Button" value="/components/raised-button" />,
                  <ListItem primaryText="Floating Action Button" value="/components/floating-action-button" />,
                  <ListItem primaryText="Icon Button" value="/components/icon-button" />,
                ]}
              />,
              <ListItem primaryText="Card" value="/components/card" />,
              <ListItem primaryText="Date Picker" value="/components/date-picker" />,
              <ListItem primaryText="Dialog" value="/components/dialog" />,
              <ListItem primaryText="Divider" value="/components/divider" />,
              <ListItem primaryText="Grid List" value="/components/grid-list" />,
              <ListItem
                primaryText="Icons"
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem primaryText="Font Icon" value="/components/font-icon" />,
                  <ListItem primaryText="SVG Icon" value="/components/svg-icon" />,
                ]}
              />,
              <ListItem primaryText="Left Nav" value="/components/left-nav" />,
              <ListItem primaryText="List" value="/components/list" />,
              <ListItem
                primaryText="Menus"
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem primaryText="Menu" value="/components/menu" />,
                  <ListItem primaryText="Icon Menu" value="/components/icon-menu" />,
                  <ListItem primaryText="Drop Down Menu" value="/components/dropdown-menu" />,
                ]}
              />,
              <ListItem primaryText="Paper" value="/components/paper" />,
              <ListItem primaryText="Popover" value="/components/popover" />,
              <ListItem
                primaryText="Progress"
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem primaryText="Circular Progress" value="/components/circular-progress" />,
                  <ListItem primaryText="Linear Progress" value="/components/linear-progress" />,
                  <ListItem primaryText="Refresh Indicator" value="/components/refresh-indicator" />,
                ]}
              />,
              <ListItem primaryText="Select Field" value="/components/select-field" />,
              <ListItem primaryText="Slider" value="/components/slider" />,
              <ListItem
                primaryText="Switches"
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem primaryText="Checkbox" value="/components/checkbox" />,
                  <ListItem primaryText="Radio Button" value="/components/radio-button" />,
                  <ListItem primaryText="Toggle" value="/components/toggle" />,
                ]}
              />,
              <ListItem primaryText="Snackbar" value="/components/snackbar" />,
              <ListItem primaryText="Table" value="/components/table" />,
              <ListItem primaryText="Tabs" value="/components/tabs" />,
              <ListItem primaryText="Text Field" value="/components/text-field" />,
              <ListItem primaryText="Time Picker" value="/components/time-picker" />,
              <ListItem primaryText="Toolbars" value="/components/toolbars" />,
            ]}
          />
          <ListItem
            primaryText="Discover More"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem primaryText="Community" value="/discover-more/community" />,
              <ListItem primaryText="Showcase" value="/discover-more/showcase" />,
            ]}
          />
        </SelectableList>
        <Divider />
        <SelectableList
          subheader="Resources"
          valueLink={{value: '', requestChange: this.handleRequestChangeLink}}
        >
          <ListItem primaryText="GitHub" value="https://github.com/callemall/material-ui" />
          <ListItem primaryText="React" value="http://facebook.github.io/react" />
          <ListItem
            primaryText="Material Design"
            value="https://www.google.com/design/spec/material-design/introduction.html"
          />
        </SelectableList>
      </LeftNav>
    );
  },
});

export default AppLeftNav;
