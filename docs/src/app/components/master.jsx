let React = require('react');
let Router = require('react-router');
let AppLeftNav = require('./app-left-nav');
let FullWidthSection = require('./full-width-section');
let { AppBar, AppCanvas, FontIcon, IconButton, Menu, Mixins, RaisedButton, Styles, Tab, Tabs} = require('material-ui');

let RouteHandler = Router.RouteHandler;
let { Colors, Typography } = Styles;
let ThemeManager = new Styles.ThemeManager();
let {StylePropable} = Mixins;  //let {StylePropable, StyleResizable} = Mixins;

class Master extends React.Component {

  constructor() {
    super();
    this._onLeftIconButtonTouchTap = this._onLeftIconButtonTouchTap.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  }

  getStyles() {
    let darkWhite = Colors.darkWhite;
    return {
      footer: {
        backgroundColor: Colors.grey900,
        textAlign: 'center'
      },
      a: {
        color: darkWhite
      },
      p: {
        margin: '0 auto',
        padding: '0',
        color: Colors.lightWhite,
        maxWidth: '335px'
      },
      iconButton: {
        color: darkWhite
      }
    };
  }

  render() {
    let styles = this.getStyles();
    let title =
      this.context.router.isActive('get-started') ? 'Get Started' :
      this.context.router.isActive('customization') ? 'Customization' :
      this.context.router.isActive('components') ? 'Components' : '';

    let githubButton = (
      <IconButton
        iconStyle={styles.iconButton}
        iconClassName="muidocs-icon-custom-github"
        href="https://github.com/callemall/material-ui"
        linkButton={true} />
    );

    return (
      <AppCanvas>
        {this._getHomePageHero()}
        {this._getTabs()}

        <RouteHandler />

        <FullWidthSection style={styles.footer}>
          <p style={styles.p}>
            Hand crafted with love by the engineers at <a style={styles.a} href="http://call-em-all.com">Call-Em-All</a> and our
            awesome <a style={styles.a} href="https://github.com/callemall/material-ui/graphs/contributors">contributors</a>.
          </p>
          {githubButton}
        </FullWidthSection>

      </AppCanvas>
    );
  }


  _getHomePageHero() {
    let styles = {
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

    styles.h2 = StylePropable.mergeStyles(styles.h1, styles.h2);

    /*if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.tagline = StylePropable.mergeStyles(styles.tagline, styles.taglineWhenLarge);
      styles.h1 = StylePropable.mergeStyles(styles.h1, styles.h1WhenLarge);
      styles.h2 = StylePropable.mergeStyles(styles.h2, styles.h2WhenLarge);
    }*/
    let initialIndex =
      this.context.router.isActive('get-started') ? 1 :
      this.context.router.isActive('customization') ? 2:
      this.context.router.isActive('components') ? 3 : 0;

    let topImage = initialIndex===0 ? (
      <div>
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
      </div>) : null;

    return (
      <FullWidthSection style={styles.root}>
          {topImage}
      </FullWidthSection>
    );
  }

  _onTabChange (tabIndex, tab){
      switch(tabIndex){
        case 0:  
          this.context.router.transitionTo('home');
          break;
        case 1:  
          this.context.router.transitionTo('get-started');
          break;
        case 2:  
          this.context.router.transitionTo('customization');
          break;
        case 3:  
          this.context.router.transitionTo('components');
        }
  }

  _getTabs() {
    let styles = {
      root: {
        backgroundColor: Colors.cyan500,
        overflow: 'hidden'
      },
      tabsStyles: {
        width: '60%',
      },
      tabStyles: {
        backgroundColor : Colors.cyan500
      }
    };
    let initialIndex =
      this.context.router.isActive('get-started') ? 1 :
      this.context.router.isActive('customization') ? 2:
      this.context.router.isActive('components') ? 3 : 0;
    let homeIcon = (<FontIcon className="material-icons" style={{display: 'block'}}>face</FontIcon>);
    return(
      <div style={styles.root} >  
        <Tabs onChange={this._onTabChange.bind(this)} initialSelectedIndex={initialIndex} style={styles.tabsStyles} >
          <Tab label="Home" style={styles.tabStyles} />
          <Tab label="Getting Started" style={styles.tabStyles} />
          <Tab label="Customization" style={styles.tabStyles}/>
          <Tab label="Components" style={styles.tabStyles}/>
          <Tab style={styles.tabStyles} fontIcon={homeIcon} />
        </Tabs>
      </div>
    );
  }

  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  }
}

Master.contextTypes = {
  router: React.PropTypes.func
};

Master.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Master;
