var React = require('react');
var Router = require('react-router');
var mui = require('mui');
var RaisedButton = mui.RaisedButton;
var HomeFeature = require('./home-feature.jsx');

var HomePage = React.createClass({

  mixins: [Router.Navigation],

  render: function() {

    return (
      <div className="mui-app-content-canvas">
        <div className="home-page-hero full-width-section">
          <div className="home-page-hero-content">
            <img className="svg-logo" src="images/material-ui-logo.svg" />
            <div className="tagline">
              <h1 className="brand-name">material ui</h1>
              <h2 className="mui-font-style-headline">
                A CSS Framework and a Set of React
                Components <span className="no-wrap">that
                Implement</span> <span className="no-wrap">Google's Material Design</span>
              </h2>
              <RaisedButton className="demo-button" label="Demo" onTouchTap={this._onDemoClick} linkButton={true} />
              <RaisedButton className="github-button" label="GitHub" linkButton={true} href="https://github.com/callemall/material-ui" />
            </div>
          </div>
        </div>

        <div className="full-width-section home-purpose">
          <p className="full-width-section-content">
            Material-UI came about from our love of&nbsp;
            <a href="http://facebook.github.io/react/">React</a> and&nbsp;
            <a href="https://www.google.com/design/spec/material-design/introduction.html">
              Google's Material Design
            </a>. We're currently using it on a project at&nbsp;
            <a href="https://www.call-em-all.com/">Call-Em-All</a> and plan on adding to it 
            and making it better in the coming months.
          </p>
        </div>

        <div className="full-width-section home-features">

          <div className="feature-container full-width-section-content">
            <HomeFeature heading="Get Started" route="get-started" img="images/get-started.svg" />
            <HomeFeature heading="CSS Framework" route="css-framework" img="images/css-framework.svg" />
            <HomeFeature heading="Components" route="components" img="images/components.svg" />
          </div>

        </div>

        <div className="full-width-section home-contribute">
          <div className="full-width-section-content">
            <h3>
              Want to help make this <span className="no-wrap">project awesome?</span> <span className="no-wrap">Check out our repo.</span>
            </h3>
            <RaisedButton label="GitHub" primary={true} linkButton={true} href="https://github.com/callemall/material-ui" />
          </div>
        </div>

      </div>
    );
  },

  _onDemoClick: function() {
    this.transitionTo('components');
  }

});

module.exports = HomePage;