var React = require('react');
var Router = require('react-router');
var mui = require('mui');
var RaisedButton = mui.RaisedButton;
var HomeFeature = require('./home-feature.jsx');
var FullWidthSection = require('../full-width-section.jsx');
var Typography = mui.Styles.Typography;
var ThemeManager = new mui.Styles.ThemeManager().getCurrentTheme();

class HomePage extends React.Component {

  constructor() {
    super();
    this._onDemoClick = this._onDemoClick.bind(this);
  }

  _raisedButton() {
    return {
      label: {
        color: ThemeManager.palette.primary1Color,
      },
      githubStyle: {
        margin: '16px 32px 0px 8px'
      },
      demoStyle: {
        margin: '16px 32px 0px 32px'
      },
    }
  }

  getStyles() {
    return {
      root: {

      },
      featureContainer: {
        maxWidth: '906px'
        // margin: '0 auto'
      },
      purposeContent: {
        maxWidth: '700px',
        padding: 0,
        margin: 0,
        fontStyle: Typography.fontStyleTitle,
        fontWeight: Typography.fontWeightLight
      }
    };
  }

  render() {

    return (
      <div className="app-content-canvas">
        <FullWidthSection className="home-page-hero">
            <img className="svg-logo" src="images/material-ui-logo.svg" />
            <div className="tagline">
              <h1 className="brand-name">material ui</h1>
              <h2 className="mui-font-style-headline">
                A Set of React Components <span className="no-wrap">
                that Implement</span> <span className="no-wrap">
                Google&apos;s Material Design</span>
              </h2>
              <RaisedButton 
                className="demo-button" 
                label="Demo" 
                onTouchTap={this._onDemoClick}
                linkButton={true} 
                style={this._raisedButton().demoStyle} 
                labelStyle={this._raisedButton().label}/>
              <RaisedButton 
                className="github-button" 
                label="GitHub" 
                linkButton={true} 
                href="https://github.com/callemall/material-ui" 
                style={this._raisedButton().githubStyle} 
                labelStyle={this._raisedButton().label}/>
            </div>
        </FullWidthSection>

        <FullWidthSection useContent={true} contentStyle={this.getStyles().purposeContent} contentType="p" className="home-purpose">
          Material-UI came about from our love of&nbsp;
          <a href="http://facebook.github.io/react/">React</a> and&nbsp;
          <a href="https://www.google.com/design/spec/material-design/introduction.html">
            Google's Material Design
          </a>. We're currently using it on a project at&nbsp;
          <a href="https://www.call-em-all.com/">Call-Em-All</a> and plan on adding to it 
          and making it better in the coming months.
        </FullWidthSection>

        <FullWidthSection useContent={true} contentStyle={this.getStyles().featureContainer} className="home-features">
          <HomeFeature heading="Get Started" route="get-started" img="images/get-started.svg" />
          <HomeFeature heading="Customization" route="customization" img="images/css-framework.svg" />
          <HomeFeature heading="Components" route="components" img="images/components.svg" />
        </FullWidthSection>

        <FullWidthSection useContent={true} className="home-contribute">
          <h3>
            Want to help make this <span className="no-wrap">project awesome?</span> <span className="no-wrap">Check out our repo.</span>
          </h3>
          <RaisedButton label="GitHub" primary={true} linkButton={true} href="https://github.com/callemall/material-ui" />
        </FullWidthSection>

      </div>
    );
  }

  _onDemoClick() {
    this.context.router.transitionTo('components');
  }

}

HomePage.contextTypes = {
  router: React.PropTypes.func
};

module.exports = HomePage;
