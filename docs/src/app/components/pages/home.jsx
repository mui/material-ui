var React = require('react');
var Router = require('react-router');
var mui = require('mui');
var RaisedButton = mui.RaisedButton;
var HomeFeature = require('./home-feature.jsx');
var FullWidthSection = require('../full-width-section.jsx');
var ThemeManager = new mui.Styles.ThemeManager().getCurrentTheme();

var {StylePropable, StyleResizable} = mui.Mixins;
var {Colors, Spacing, Typography} = mui.Styles;

var HomePage = React.createClass({

  mixins: [StylePropable, StyleResizable],

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    var style = {
      paddingTop: Spacing.desktopKeylineIncrement
    };

    return (
      <div style={style}>
        {this._getHomePageHero()}
        {this._getHomePurpose()}
        {this._getHomeFeatures()}
        {this._getHomeContribute()}
      </div>
    );
  },

  _getHomePageHero: function() {
    var styles = {
      root: {
        backgroundColor: Colors.cyan500,
        overflow: 'hidden'
      },
      svgLogo: {
        marginLeft: (window.innerWidth * 0.5) - 130 + 'px',
        width: '420px'
      },
      tagline: {
        margin: '16px auto 0 auto',
        textAlign: 'center',
        maxWidth: '575px'
      },
      label: {
        color: ThemeManager.palette.primary1Color,
      },
      githubStyle: {
        margin: '16px 32px 0px 8px'
      },
      demoStyle: {
        margin: '16px 32px 0px 32px'
      },
      h1: {
        color: Colors.darkWhite,
        fontWeight: Typography.fontWeightLight,
      },
      h2: {
        //.mui-font-style-title
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
      },
      nowrap: {
        whiteSpace: 'nowrap'
      },
      taglineWhenLarge: {
        marginTop: '32px'
      },
      h1WhenLarge: {
        fontSize: '56px'
      },
      h2WhenLarge: {
        //.mui-font-style-headline;
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '16px',
        marginBottom: '12px'
      }
    };

    styles.h2 = this.mergeStyles(styles.h1, styles.h2);

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.tagline = this.mergeStyles(styles.tagline, styles.taglineWhenLarge);
      styles.h1 = this.mergeStyles(styles.h1, styles.h1WhenLarge);
      styles.h2 = this.mergeStyles(styles.h2, styles.h2WhenLarge);
    }

    return (
      <FullWidthSection style={styles.root}>
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
            <RaisedButton 
              className="github-button" 
              label="GitHub" 
              linkButton={true} 
              href="https://github.com/callemall/material-ui" 
              style={styles.githubStyle} 
              labelStyle={styles.label}/>
          </div>
      </FullWidthSection>
    );
  },

  _getHomePurpose: function() {
    var styles = {
      root: {
        backgroundColor: Colors.grey200
      },
      content: {
        maxWidth: '700px',
        padding: 0,
        margin: '0 auto',
        fontWeight: Typography.fontWeightLight,
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        color: Typography.textDarkBlack
      }
    };

    return (
      <FullWidthSection style={styles.root} useContent={true} contentStyle={styles.content} contentType="p" className="home-purpose">
        Material-UI came about from our love of&nbsp;
        <a href="http://facebook.github.io/react/">React</a> and&nbsp;
        <a href="https://www.google.com/design/spec/material-design/introduction.html">
          Google's Material Design
        </a>. We're currently using it on a project at&nbsp;
        <a href="https://www.call-em-all.com/">Call-Em-All</a> and plan on adding to it 
        and making it better in the coming months.
      </FullWidthSection>
    );
  },

  _getHomeFeatures: function() {
    var styles = {maxWidth: '906px'};
    return (
      <FullWidthSection useContent={true} contentStyle={styles}>
        <HomeFeature heading="Get Started" route="get-started" img="images/get-started.svg" firstChild={true}/>
        <HomeFeature heading="Customization" route="customization" img="images/css-framework.svg" />
        <HomeFeature heading="Components" route="components" img="images/components.svg" lastChild={true}/>
      </FullWidthSection>
    );
  },

  _getHomeContribute: function() {
    var styles = {
      root: {
        backgroundColor: Colors.grey200,
        textAlign: 'center'
      },
      h3: {
        margin: '0',
        padding: '0',
        fontWeight: Typography.fontWeightLight,
        fontSize: '22'
      },
      button: {
        marginTop: 32
      }
    };

    return (
      <FullWidthSection useContent={true} style={styles.root}>
        <h3 style={styles.h3}>
          Want to help make this <span style={styles.nowrap}>project awesome?</span> <span style={styles.nowrap}>Check out our repo.</span>
        </h3>
        <RaisedButton label="GitHub" primary={true} linkButton={true} href="https://github.com/callemall/material-ui" style={styles.button}/>
      </FullWidthSection>
    );
  },

  _onDemoClick: function() {
    this.context.router.transitionTo('components');
  }
});

module.exports = HomePage;
