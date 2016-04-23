import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {cyan500} from 'material-ui/styles/colors';

const SelectableList = MakeSelectable(List);

const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan500,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8,
  },
  version: {
    paddingLeft: spacing.desktopGutterLess,
    fontSize: 16,
  },
};

class AppNavDrawer extends Component {
  static propTypes = {
    docked: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    onChangeList: PropTypes.func.isRequired,
    onRequestChangeNavDrawer: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  };

  state = {
    muiVersions: [],
  };

  componentDidMount() {
    const self = this;
    const url = '/versions.json';
    const request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        self.setState({
          muiVersions: JSON.parse(request.responseText),
          version: JSON.parse(request.responseText)[0],
        });
      }
    };

    request.open('GET', url, true);
    request.send();
  }

  firstNonPreReleaseVersion() {
    let version;
    for (let i = 0; i < this.state.muiVersions.length; i++) {
      version = this.state.muiVersions[i];
      // If the version doesn't contain '-' and isn't 'HEAD'
      if (!/-/.test(version) && version !== 'HEAD') {
        break;
      }
    }
    return version;
  }

  handleVersionChange = (event, index, value) => {
    if (value === this.firstNonPreReleaseVersion()) {
      window.location = 'http://www.material-ui.com/';
    } else {
      window.location = `http://www.material-ui.com/${value}`;
    }
  };

  currentVersion() {
    if (window.location.hostname === 'localhost') return this.state.muiVersions[0];
    if (window.location.pathname === '/') {
      return this.firstNonPreReleaseVersion();
    } else {
      return window.location.pathname.replace(/\//g, '');
    }
  }

  handleRequestChangeLink = (event, value) => {
    window.location = value;
  };

  handleTouchTapHeader = () => {
    this.context.router.push('/');
    this.props.onRequestChangeNavDrawer(false);
  };

  render() {
    const {
      location,
      docked,
      onRequestChangeNavDrawer,
      onChangeList,
      open,
      style,
    } = this.props;

    return (
      <Drawer
        style={style}
        docked={docked}
        open={open}
        onRequestChange={onRequestChangeNavDrawer}
        containerStyle={{zIndex: zIndex.drawer - 100}}
      >
        <div style={styles.logo} onTouchTap={this.handleTouchTapHeader}>
          Material-UI
        </div>
        <span style={styles.version}>Version:</span>
        <DropDownMenu
          value={this.currentVersion()}
          onChange={this.handleVersionChange}
          maxHeight={300}
          style={{width: 181}}
        >
          {this.state.muiVersions.map((version) => (
            <MenuItem
              key={version}
              value={version}
              primaryText={version}
            />
          ))}
        </DropDownMenu>
        <SelectableList
          value={location.pathname}
          onChange={onChangeList}
        >
          <ListItem
            primaryText="Get Started"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem primaryText="Prerequisites" value="/get-started/prerequisites" />,
              <ListItem primaryText="Installation" value="/get-started/installation" />,
              <ListItem primaryText="Usage" value="/get-started/usage" />,
              <ListItem primaryText="Server Rendering" value="/get-started/server-rendering" />,
              <ListItem primaryText="Examples" value="/get-started/examples" />,
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
              <ListItem
                primaryText="App Bar"
                value="/components/app-bar"
                href="#/components/app-bar"
              />,
              <ListItem
                primaryText="Auto Complete"
                value="/components/auto-complete"
                href="#/components/auto-complete"
              />,
              <ListItem
                primaryText="Avatar"
                value="/components/avatar"
                href="#/components/avatar"
              />,
              <ListItem
                primaryText="Badge"
                value="/components/badge"
                href="#/components/badge"
              />,
              <ListItem
                primaryText="Bottom Navigation"
                value="/components/bottom-navigation"
                href="#/components/bottom-navigation"
              />,
              <ListItem
                primaryText="Buttons"
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    primaryText="Flat Button"
                    value="/components/flat-button"
                    href="#/components/flat-button"
                  />,
                  <ListItem
                    primaryText="Raised Button"
                    value="/components/raised-button"
                    href="#/components/raised-button"
                  />,
                  <ListItem
                    primaryText="Floating Action Button"
                    value="/components/floating-action-button"
                    href="#/components/floating-action-button"
                  />,
                  <ListItem
                    primaryText="Icon Button"
                    value="/components/icon-button"
                    href="#/components/icon-button"
                  />,
                ]}
              />,
              <ListItem
                primaryText="Card"
                value="/components/card"
                href="#/components/card"
              />,
              <ListItem
                primaryText="Chip"
                value="/components/chip"
                href="#/components/chip"
              />,
              <ListItem
                primaryText="Date Picker"
                value="/components/date-picker"
                href="#/components/date-picker"
              />,
              <ListItem
                primaryText="Dialog"
                value="/components/dialog"
                href="#/components/dialog"
              />,
              <ListItem
                primaryText="Divider"
                value="/components/divider"
                href="#/components/divider"
              />,
              <ListItem
                primaryText="Drawer"
                value="/components/drawer"
                href="#/components/drawer"
              />,
              <ListItem
                primaryText="Grid List"
                value="/components/grid-list"
                href="#/components/grid-list"
              />,
              <ListItem
                primaryText="Icons"
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    primaryText="Font Icon"
                    value="/components/font-icon"
                    href="#/components/font-icon"
                  />,
                  <ListItem
                    primaryText="SVG Icon"
                    value="/components/svg-icon"
                    href="#/components/svg-icon"
                  />,
                ]}
              />,
              <ListItem
                primaryText="List"
                value="/components/list"
                href="#/components/list"
              />,
              <ListItem
                primaryText="Menus"
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    primaryText="Menu"
                    value="/components/menu"
                    href="#/components/menu"
                  />,
                  <ListItem
                    primaryText="Icon Menu"
                    value="/components/icon-menu"
                    href="#/components/icon-menu"
                  />,
                  <ListItem
                    primaryText="DropDown Menu"
                    value="/components/dropdown-menu"
                    href="#/components/dropdown-menu"
                  />,
                ]}
              />,
              <ListItem
                primaryText="Paper"
                value="/components/paper"
                href="#/components/paper"
              />,
              <ListItem
                primaryText="Popover"
                value="/components/popover"
                href="#/components/popover"
              />,
              <ListItem
                primaryText="Progress"
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    primaryText="Circular Progress"
                    value="/components/circular-progress"
                    href="#/components/circular-progress"
                  />,
                  <ListItem
                    primaryText="Linear Progress"
                    value="/components/linear-progress"
                    href="#/components/linear-progress"
                  />,
                  <ListItem
                    primaryText="Refresh Indicator"
                    value="/components/refresh-indicator"
                    href="#/components/refresh-indicator"
                  />,
                ]}
              />,
              <ListItem
                primaryText="Select Field"
                value="/components/select-field"
                href="#/components/select-field"
              />,
              <ListItem
                primaryText="Slider"
                value="/components/slider"
                href="#/components/slider"
              />,
              <ListItem
                primaryText="Switches"
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    primaryText="Checkbox"
                    value="/components/checkbox"
                    href="#/components/checkbox"
                  />,
                  <ListItem
                    primaryText="Radio Button"
                    value="/components/radio-button"
                    href="#/components/radio-button"
                  />,
                  <ListItem
                    primaryText="Toggle"
                    value="/components/toggle"
                    href="#/components/toggle"
                  />,
                ]}
              />,
              <ListItem
                primaryText="Snackbar"
                value="/components/snackbar"
                href="#/components/snackbar"
              />,
              <ListItem
                primaryText="Stepper"
                value="/components/stepper"
                href="#/components/stepper"
              />,
              <ListItem
                primaryText="Subheader"
                value="/components/subheader"
                href="#/components/subheader"
              />,
              <ListItem
                primaryText="Table"
                value="/components/table"
                href="#/components/table"
              />,
              <ListItem
                primaryText="Tabs"
                value="/components/tabs"
                href="#/components/tabs"
              />,
              <ListItem
                primaryText="Text Field"
                value="/components/text-field"
                href="#/components/text-field"
              />,
              <ListItem
                primaryText="Time Picker"
                value="/components/time-picker"
                href="#/components/time-picker"
              />,
              <ListItem
                primaryText="Toolbar"
                value="/components/toolbar"
                href="#/components/toolbar"
              />,
            ]}
          />
          <ListItem
            primaryText="Discover More"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem primaryText="Community" value="/discover-more/community" />,
              <ListItem primaryText="Contributing" value="/discover-more/contributing" />,
              <ListItem primaryText="Showcase" value="/discover-more/showcase" />,
              <ListItem primaryText="Related projects" value="/discover-more/related-projects" />,
            ]}
          />
        </SelectableList>
        <Divider />
        <SelectableList
          value=""
          onChange={this.handleRequestChangeLink}
        >
          <Subheader>Resources</Subheader>
          <ListItem primaryText="GitHub" value="https://github.com/callemall/material-ui" />
          <ListItem primaryText="React" value="http://facebook.github.io/react" />
          <ListItem
            primaryText="Material Design"
            value="https://www.google.com/design/spec/material-design/introduction.html"
          />
        </SelectableList>
      </Drawer>
    );
  }
}

export default AppNavDrawer;
