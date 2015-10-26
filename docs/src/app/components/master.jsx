const React = require('react');
const Router = require('react-router');
const AppLeftNav = require('./app-left-nav');
const FullWidthSection = require('./full-width-section');
const { AppBar,
      AppCanvas,
      FontIcon,
      IconButton,
      EnhancedButton,
      Menu,
      Mixins,
      RaisedButton,
      Styles,
      Tab,
      Tabs,
      Paper} = require('material-ui');

const { StylePropable } = Mixins;
const { Colors, Spacing, Typography } = Styles;
const ThemeManager = Styles.ThemeManager;
const DefaultRawTheme = Styles.LightRawTheme;


const Master = React.createClass({
  mixins: [StylePropable],

  getInitialState () {
    let muiTheme = ThemeManager.getMuiTheme(DefaultRawTheme);
    // To switch to RTL...
    // muiTheme.isRtl = true;
    return {
      muiTheme,
    };
  },

  childContextTypes : {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getStyles() {
    let darkWhite = Colors.darkWhite;
    return {
      footer: {
        backgroundColor: Colors.grey900,
        textAlign: 'center',
      },
      a: {
        color: darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: Colors.lightWhite,
        maxWidth: 335,
      },
      github: {
        position: 'fixed',
        right: Spacing.desktopGutter/2,
        top: 8,
        zIndex: 5,
        color: 'white',
      },
       iconButton: {
        color: darkWhite,
      },
    };
  },

  componentWillMount() {
    let newMuiTheme = this.state.muiTheme;
    newMuiTheme.inkBar.backgroundColor = Colors.yellow200;
    this.setState({
      muiTheme: newMuiTheme,
      tabIndex: this._getSelectedIndex()});
    let setTabsState = function() {
      this.setState({renderTabs: !(document.body.clientWidth <= 647)});
    }.bind(this);
    setTabsState();
    window.onresize = setTabsState;
  },

  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      tabIndex: this._getSelectedIndex(),
      muiTheme: newMuiTheme,
    });
  },

  render() {
    let styles = this.getStyles();
    let title =
      this.props.history.isActive('/get-started') ? 'Get Started' :
      this.props.history.isActive('/customization') ? 'Customization' :
      this.props.history.isActive('/components') ? 'Components' : '';

    let githubButton = (
      <IconButton
        iconStyle={styles.iconButton}
        iconClassName="muidocs-icon-custom-github"
        href="https://github.com/callemall/material-ui"
        linkButton={true}
        style={styles.github} />
    );

    let githubButton2 = (
      <IconButton
        iconStyle={styles.iconButton}
        iconClassName="muidocs-icon-custom-github"
        href="https://github.com/callemall/material-ui"
        linkButton={true}/>
    );

    return (
      <AppCanvas>
        {githubButton}
        {this.state.renderTabs ? this._getTabs(): this._getAppBar()}

        {this.props.children}
        <AppLeftNav ref="leftNav" history={this.props.history} />
        <FullWidthSection style={styles.footer}>
          <p style={this.prepareStyles(styles.p)}>
            Hand crafted with love by the engineers at <a style={styles.a} href="http://call-em-all.com">Call-Em-All</a> and our
            awesome <a style={this.prepareStyles(styles.a)} href="https://github.com/callemall/material-ui/graphs/contributors">contributors</a>.
          </p>
          {githubButton2}
        </FullWidthSection>
      </AppCanvas>
    );
  },

 _getTabs() {
    let styles = {
      root: {
        backgroundColor: Colors.cyan500,
        position: 'fixed',
        height: 64,
        top: 0,
        right: 0,
        zIndex: 4,
        width: '100%',
      },
      container: {
        position: 'absolute',
        right: (Spacing.desktopGutter/2) + 48,
        bottom: 0,
      },
      span: {
        color: Colors.white,
        fontWeight: Typography.fontWeightLight,
        left: 45,
        top: 22,
        position: 'absolute',
        fontSize: 26,
      },
      svgLogoContainer: {
        position: 'fixed',
        width: 300,
        left: Spacing.desktopGutter,
      },
      svgLogo: {
        width: 65,
        backgroundColor: Colors.cyan500,
        position: 'absolute',
        top: 20,
      },
      tabs: {
        width: 425,
        bottom:0,
      },
      tab: {
        height: 64,
      },

    };

    let materialIcon= this.state.tabIndex !== '0' ? (
      <EnhancedButton
        style={styles.svgLogoContainer}
        linkButton={true}
        href="/#/home">
        <img style={this.prepareStyles(styles.svgLogo)} src="images/material-ui-logo.svg"/>
        <span style={this.prepareStyles(styles.span)}>material ui</span>
      </EnhancedButton>) : null;

    return(
      <div>
        <Paper
          zDepth={0}
          rounded={false}
          style={styles.root}>
          {materialIcon}
          <div style={this.prepareStyles(styles.container)}>
            <Tabs
              style={styles.tabs}
              value={this.state.tabIndex}
              onChange={this._handleTabChange}>
              <Tab
                value="1"
                label="GETTING STARTED"
                style={styles.tab}
                route="/get-started" />
              <Tab
                value="2"
                label="CUSTOMIZATION"
                style={styles.tab}
                route="/customization"/>
              <Tab
                value="3"
                label="COMPONENTS"
                style={styles.tab}
                route="/components"/>
            </Tabs>
          </div>
        </Paper>
      </div>
    );
  },

  _getSelectedIndex() {
    return this.props.history.isActive('/get-started') ? '1' :
      this.props.history.isActive('/customization') ? '2' :
      this.props.history.isActive('/components') ? '3' : '0';
  },

  _handleTabChange(value, e, tab) {
    this.props.history.pushState(null, tab.props.route);
    this.setState({tabIndex: this._getSelectedIndex()});
  },

  _getAppBar() {
    let title =
      this.props.history.isActive('/get-started') ? 'Get Started' :
      this.props.history.isActive('/customization') ? 'Customization' :
      this.props.history.isActive('/components') ? 'Components' : '';

    let githubButton = (
      <IconButton
        iconClassName="muidocs-icon-custom-github"
        href="https://github.com/callemall/material-ui"
        linkButton={true}/>
    );

    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
          title={title}
          zDepth={0}
          iconElementRight={githubButton}
          style={{position: 'absolute', top: 0}}/>
      </div>);
  },

  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  },
});

module.exports = Master;
