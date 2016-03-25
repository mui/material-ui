import React from 'react';
import Title from 'react-title-component';
import MarkdownElement from '../../MarkdownElement';
import muiThemeable from 'material-ui/styles/muiThemeable';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import styleResizable from 'material-ui/utils/styleResizable';
import typography from 'material-ui/styles/typography';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import themesText from './themes.md';
import ClearFix from 'material-ui/internal/ClearFix';

import {
  Checkbox,
  DatePicker,
  Dialog,
  DropDownMenu,
  FlatButton,
  FloatingActionButton,
  Drawer,
  MenuItem,
  Paper,
  RadioButton,
  RadioButtonGroup,
  RaisedButton,
  Snackbar,
  Slider,
  Tabs,
  Tab,
  TextField,
  Toggle,
} from 'material-ui';

const markdownText = `
## Themes

### Examples

You can use the tabs to change the theme. The changes will be applied to the whole
documentation.
`;

const ThemesPage = React.createClass({

  propTypes: {
    muiTheme: React.PropTypes.object,
    onChangeMuiTheme: React.PropTypes.func,
  },

  mixins: [styleResizable],

  getInitialState() {
    return {
      valueTabs: this.props.muiTheme.name || 'light',
      dialogOpen: false,
      snackbarOpen: false,
      drawerOpen: false,
    };
  },

  getStyles() {
    const canvasColor = this.props.muiTheme.baseTheme.palette.canvasColor;
    const borderColor = this.props.muiTheme.baseTheme.palette.borderColor;
    const styles = {
      group: {
        float: 'left',
        width: '100%',
        marginTop: '16px',
        padding: '0 50px',
        boxSizing: 'border-box',
      },
      groupSlider: {
        marginTop: '0px',
        width: '100%',
      },
      container: {
        marginBottom: '16px',
        minHeight: '24px',
        textAlign: 'left',
      },
      containerCentered: {
        textAlign: 'center',
      },
      paper: {
        height: '100px',
        width: '100px',
        margin: '0 auto',
        marginBottom: '64px',
      },
      textfield: {
        width: '100%',
      },
      slider: {
        marginTop: '0px',
        marginBottom: '0px',
      },
      title: {
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        fontWeight: typography.fontWeightMedium,
        color: typography.textDarkBlack,
      },
      liveExamplePaper: {
        backgroundColor: canvasColor,
        marginBottom: 32,
        overflow: 'hidden',
      },
      bottomBorderWrapper: {
        borderBottom: `1px solid ${borderColor}`,
        paddingBottom: '10px',
      },
    };

    if (this.isDeviceSize(styleResizable.statics.Sizes.MEDIUM)) {
      styles.group.width = '33%';
    }

    styles.containerCentered = Object.assign({}, styles.container, styles.containerCentered);
    styles.groupSlider = Object.assign({}, styles.group, styles.groupSlider);

    return styles;
  },

  getComponentGroup() {
    const styles = this.getStyles();

    return (
      <ClearFix>
        <div style={styles.group}>
          <div style={styles.containerCentered}>
            <FloatingActionButton iconClassName="muidocs-icon-action-grade" disabled={true} />
          </div>
          <div style={styles.containerCentered}>
            <RaisedButton label="Secondary" secondary={true} />
          </div>
          <div style={styles.containerCentered}>
            <RaisedButton label="Primary" primary={true} />
          </div>
          <div style={styles.containerCentered}>
            <RaisedButton label="Default" />
          </div>
        </div>
        <div style={styles.group}>
          <div style={styles.container}>
            <Checkbox
              name="checkboxName1"
              value="checkboxValue1"
              label="checkbox"
            />
            <Checkbox
              name="checkboxName2"
              value="checkboxValue2"
              label="disabled checkbox"
              disabled={true}
            />
          </div>
          <div style={styles.container}>
            <RadioButtonGroup
              name="shipSpeed"
              defaultSelected="usd"
            >
              <RadioButton
                value="usd"
                label="USD"
              />
              <RadioButton
                value="euro"
                label="Euro"
                defaultChecked={true}
              />
              <RadioButton
                value="mxn"
                label="MXN"
                disabled={true}
              />
            </RadioButtonGroup>
          </div>
          <div style={styles.container}>
            <Toggle
              name="toggleName1"
              value="toggleValue1"
              label="toggle"
            />
            <Toggle
              name="toggleName2"
              value="toggleValue2"
              label="disabled toggle"
              defaultToggled={true}
              disabled={true}
            />
          </div>
        </div>
        <div style={Object.assign({}, styles.group, {marginTop: 0})}>
          <div style={styles.container}>
            <TextField
              style={styles.textfield}
              hintText="TextField"
            />
          </div>
          <div style={styles.container}>
            <DatePicker
              hintText="Landscape Dialog"
              mode="landscape"
              style={{width: '100%'}}
            />
          </div>
          <div style={styles.container}>
            <DropDownMenu value={3} style={{width: '100%'}}>
              <MenuItem value={1} primaryText={'Never'} />
              <MenuItem value={2} primaryText={'Every Night'} />
              <MenuItem value={3} primaryText={'Weeknights'} />
              <MenuItem value={4} primaryText={'Weekends'} />
              <MenuItem value={5} primaryText={'Weekly'} />
            </DropDownMenu>
          </div>
        </div>
        <div style={styles.groupSlider}>
          <Slider style={styles.slider} name="slider2" defaultValue={0.5} />
        </div>
        <div style={styles.group}>
          <div style={styles.containerCentered}>
            <FlatButton label="View Dialog" onTouchTap={this.handleTouchTapDialog} />
            <Dialog
              open={this.state.dialogOpen}
              title="Dialog With Standard Actions"
              actions={[
                <FlatButton
                  label="Cancel"
                  keyboardFocus={true}
                  onTouchTap={this.handleRequestCloseDialog}
                  secondary={true}
                />,
                <FlatButton
                  label="Submit"
                  onTouchTap={this.handleRequestCloseDialog}
                  primary={true}
                />,
              ]}
              onRequestClose={this.handleRequestCloseDialog}
            >
              The actions in this window are created from tan array of element's that&#39;s passed in.
            </Dialog>
          </div>
        </div>
        <div style={styles.group}>
          <div style={styles.containerCentered}>
            <FlatButton
              onTouchTap={this.handleTouchTapDrawer}
              label="View Drawer"
            />
            <Drawer
              open={this.state.drawerOpen} docked={false}
              onRequestChange={this.handleRequestChangeDrawer}
            >
              <MenuItem index={0}>Menu Item</MenuItem>
              <MenuItem index={1}>Menu Item 2</MenuItem>
            </Drawer>
          </div>
        </div>
        <div style={styles.group}>
          <div style={styles.containerCentered}>
            <FlatButton
              onTouchTap={this.handleTouchTapSnackbar}
              label="View Snackbar"
            />
            <Snackbar
              open={this.state.snackbarOpen}
              onRequestClose={this.handleRequestCloseSnackbar}
              message="This is a snackbar"
              action="Got It!"
              onActionTouchTap={this.handleRequestCloseSnackbar}
            />
          </div>
        </div>
      </ClearFix>
    );
  },

  handleChangeTabs(valueTabs) {
    let newMuiTheme = null;

    if (valueTabs === 'light') {
      newMuiTheme = getMuiTheme();
    } else {
      newMuiTheme = getMuiTheme(darkBaseTheme);
    }

    newMuiTheme.name = valueTabs;

    this.setState({
      valueTabs: valueTabs,
    });

    this.props.onChangeMuiTheme(newMuiTheme);
  },

  getThemeExamples() {
    return (
      <div>
        <Tabs
          value={this.state.valueTabs}
          onChange={this.handleChangeTabs}
        >
          <Tab
            label="Light Theme (Default)"
            value="light"
          />
          <Tab
            label="Dark Theme"
            value="dark"
          />
        </Tabs>
        {this.getComponentGroup()}
      </div>
    );
  },

  handleTouchTapDrawer() {
    this.setState({
      drawerOpen: true,
    });
  },

  handleRequestChangeDrawer(open) {
    this.setState({
      drawerOpen: open,
    });
  },

  handleTouchTapDialog() {
    this.setState({
      dialogOpen: true,
    });
  },

  handleRequestCloseDialog() {
    this.setState({
      dialogOpen: false,
    });
  },

  handleTouchTapSnackbar() {
    this.setState({
      snackbarOpen: true,
    });
  },

  handleRequestCloseSnackbar() {
    this.setState({
      snackbarOpen: false,
    });
  },

  render() {
    const styles = this.getStyles();

    return (
      <div>
        <Title render={(previousTitle) => `Themes - ${previousTitle}`} />
        <MarkdownElement text={markdownText} />
        <Paper style={styles.liveExamplePaper}>
          <ClearFix style={styles.liveExampleBlock}>{this.getThemeExamples()}</ClearFix>
        </Paper>
        <div style={styles.bottomBorderWrapper}>
          <MarkdownElement text={themesText} />
        </div>
      </div>
    );
  },

});

export default muiThemeable()(ThemesPage);
