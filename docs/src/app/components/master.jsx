import React from 'react';
import ReactDom from 'react-dom';
import AppLeftNav from './app-left-nav';
import FullWidthSection from './full-width-section';
import {AppBar,
      AppCanvas,
      IconButton,
      EnhancedButton,
      RaisedButton,
      Mixins,
      Styles,
      Tab,
      Tabs} from 'material-ui';

const {StylePropable, StyleResizable} = Mixins;
const {Colors, Spacing, Typography} = Styles;
const ThemeManager = Styles.ThemeManager;
const DefaultRawTheme = Styles.LightRawTheme;


const Master = React.createClass({
  mixins: [
    StylePropable,
    StyleResizable,
  ],

  getInitialState() {
    let muiTheme = ThemeManager.getMuiTheme(DefaultRawTheme);
    // To switch to RTL...
    // muiTheme.isRtl = true;
    return {
      muiTheme,
    };
  },

  propTypes: {
    children: React.PropTypes.node,
    history: React.PropTypes.object,
    location: React.PropTypes.object,
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
      githubButton2: {
        color: darkWhite,
      },
      container: {
        position: 'absolute',
        right: (Spacing.desktopGutter / 2) + 48,
        bottom: 0,
      },
      logoText: {
        color: Colors.white,
        fontWeight: Typography.fontWeightLight,
        fontSize: 26,
      },
      svgLogo: {
        width: 65,
        backgroundColor: Colors.cyan500,
        marginRight: '-20px',
        marginBottom: '-2px',
      },
      tabs: {
        width: 425,
        bottom:0,
        textTransform: 'uppercase',
      },
      tab: {
        height: 64,
      },
    };
  },

  componentWillMount() {
    let newMuiTheme = this.state.muiTheme;
    newMuiTheme.inkBar.backgroundColor = Colors.yellow200;
    this.setState({
      muiTheme: newMuiTheme,
      currentSection: this._getCurrentSectionFromHistory(),
    });
    let setTabsState = function() {
      this.setState({renderTabs: !(document.body.clientWidth <= 647)});
    }.bind(this);
    setTabsState();
    window.onresize = setTabsState;
  },

  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
      currentSection: this._getCurrentSectionFromHistory(),
    });
  },

  render() {
    let styles = this.getStyles();

    let githubButton2 = (
      <IconButton
        iconStyle={styles.githubButton2}
        iconClassName="muidocs-icon-custom-github"
        href="https://github.com/callemall/material-ui"
        linkButton={true}/>
    );
    return (
      <AppCanvas>
        {this._getAppBar()}
        {this.props.children}
        <AppLeftNav ref="leftNav" history={this.props.history} location={this.props.location} />
        <FullWidthSection style={styles.footer}>
          <p style={this.prepareStyles(styles.p)}>
            Hand crafted with love by the engineers at
            <a style={styles.a} href="http://call-em-all.com">Call-Em-All</a> and our
            awesome <a style={this.prepareStyles(styles.a)}
              href="https://github.com/callemall/material-ui/graphs/contributors">contributors</a>.
          </p>
          {githubButton2}
        </FullWidthSection>
      </AppCanvas>
    );
  },

  _getSectionsData() {
    return [
      {
        route: '/get-started',
        title: 'Get Started',
      },
      {
        route: '/customization',
        title: 'Customization',
      },
      {
        route: '/components',
        title: 'Components',
      },
    ];
  },

  _getAppBar() {
    const styles = this.getStyles();

    let
      title = null,
      tabs = null,
      waterfall,
      position = 'fixed'
      ;

    if (this.state.renderTabs || !this.state.currentSection) {
      title = (
        <EnhancedButton
          linkButton={true}
          href="/#/home"
          ref={el => { this.logoElement = ReactDom.findDOMNode(el); }}>
          <img style={this.prepareStyles(styles.svgLogo)} src="images/material-ui-logo.svg"/>
          <span style={this.prepareStyles(styles.logoText)}>material ui</span>
        </EnhancedButton>
      );
    } else {
      title = this.state.currentSection.title;
    }
    if (this.state.renderTabs) {
      tabs = (
        <div style={this.prepareStyles(styles.container)}>
          <Tabs
            style={styles.tabs}
            value={this.state.currentSection ? this.state.currentSection.route : '-1'}
            onChange={this._handleTabChange}>
            {this._getSectionsData().map(section =>
              <Tab
                value={section.route}
                key={section.route}
                label={section.title}
                style={styles.tab}
                route={section.route} />
            )}
          </Tabs>
        </div>
      );
    }

    let githubButton = (
      <IconButton
        iconClassName="muidocs-icon-custom-github"
        href="https://github.com/callemall/material-ui"
        linkButton={true}/>
    );

    if (!this.state.currentSection) {
      position = 'waterfall';
      waterfall = {
        minHeight: 64,
        maxHeight: 475 + 64,
        // overflow hidden is needed because image may be translated outside
        // of viewport creating horizontal scroll
        children: this._getHomePageHero(),
      };

      waterfall.onHeightChange = ({height, minHeight, maxHeight}) => {
        // interpolate opacity
        let interpolation = (height - minHeight) / (maxHeight - minHeight);

        if (this.homePageHero) {
          this.homePageHero.style.transform = 'scale3d(' + interpolation + ', ' + interpolation + ', 1)';
          this.homePageHero.style.transformOrigin = '50% 100% 0';
          this.homePageHero.style.opacity = interpolation;
        }

        if (this.logoElement) {
          this.logoElement.style.opacity = 1 - interpolation;
        }
      };
    }

    return (
      <AppBar
        onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
        title={title}
        zDepth={0}
        showMenuIconButton={!this.state.renderTabs}
        iconElementRight={githubButton}
        position={position}
        waterfall={waterfall}
        style={{
          zIndex: 1100,
        }}>
        {tabs}
      </AppBar>
    );
  },


  _getHomePageHero() {
    let styles = {
      root: {
        overflow: 'hidden',
      },
      svgLogo: {
        marginLeft: (window.innerWidth * 0.5) - 130 + 'px',
        width: 420,
      },
      tagline: {
        margin: '16px auto 0 auto',
        textAlign: 'center',
        maxWidth: 575,
      },
      label: {
        color: DefaultRawTheme.palette.primary1Color,
      },
      githubStyle: {
        margin: '16px 32px 0px 8px',
      },
      demoStyle: {
        margin: '16px 32px 0px 32px',
      },
      h1: {
        color: Colors.darkWhite,
        fontWeight: Typography.fontWeightLight,
      },
      h2: {
        fontSize: 20,
        lineHeight: '28px',
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0,
      },
      nowrap: {
        whiteSpace: 'nowrap',
      },
      taglineWhenLarge: {
        marginTop: 32,
      },
      h1WhenLarge: {
        fontSize: 56,
      },
      h2WhenLarge: {
        fontSize: 24,
        lineHeight: '32px',
        paddingTop: 16,
        marginBottom: 12,
      },
    };

    styles.h2 = this.mergeStyles(styles.h1, styles.h2);

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.tagline = this.mergeStyles(styles.tagline, styles.taglineWhenLarge);
      styles.h1 = this.mergeStyles(styles.h1, styles.h1WhenLarge);
      styles.h2 = this.mergeStyles(styles.h2, styles.h2WhenLarge);
    }

    return (
      <FullWidthSection style={styles.root}>
        <div ref={el => { this.homePageHero = el; }}>
          <img style={styles.svgLogo} src="images/material-ui-logo.svg" />
          <div style={styles.tagline}>
            <h1 style={styles.h1}>material ui</h1>
            <h2 style={styles.h2}>
              A Set of React Components <span style={styles.nowrap}>
                that Implement</span> <span style={styles.nowrap}>
                Google&apos;s Material Design</span>
            </h2>
            <RaisedButton
              className="demo-button"
              label="Demo"
              onTouchTap={this._onDemoClick}
              linkButton={true}
              style={styles.demoStyle}
              labelStyle={styles.label}/>
          </div>
        </div>
      </FullWidthSection>
    );
  },

  _onDemoClick() {
    this.props.history.pushState(null, '/components');
  },

  _getCurrentSectionFromHistory() {
    return this._getCurrentSection(
      section => this.props.history.isActive(section.route)
    );
  },

  _getCurrentSection(test) {
    const sections = this._getSectionsData();
    for (let i = 0; i < sections.length; i++) {
      if (test(sections[i])) {
        return sections[i];
      }
    }
  },

  _handleTabChange(value) {
    // route is passed as value
    this.props.history.pushState(null, value);
    this.setState({currentSection: this._getCurrentSection(s => s.route === value)});
  },

  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  },
});

export default Master;
