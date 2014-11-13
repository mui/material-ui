/**
 * @jsx React.DOM
 */

var React = require('react'),
  Router = require('react-router'),
  Link = Router.Link,
  mui = require('mui'),
  PaperButton = mui.PaperButton,
  Icon = mui.Icon;

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
                A CSS Framework and a Set of React Components that Implement Google's
                Material Design
              </h2>
              <p className="mui-font-style-subhead-1">
                Material-UI came about from our love of&nbsp;
                <a href="http://facebook.github.io/react/">React</a> and&nbsp;
                <a href="https://www.google.com/design/spec/material-design/introduction.html">
                  Google's Material Design
                </a>. We're currently using it on a project at&nbsp;
                <a href="https://www.call-em-all.com/">Call-Em-All</a> and plan on adding to it 
                and making it better in the coming months.
              </p>

              <PaperButton className="demo-button" label="Demo" onClick={this._onDemoClick} />
              <PaperButton className="github-button" label="GitHub" href="https://github.com/callemall/material-ui" />
            </div>
          </div>
        </div>

        <div className="home-features">

          <div className="feature">
            <Link className="icon-circle" to="get-started"><Icon icon="action-done-all" /></Link>
            <h3>Get Started</h3>
            <p>
              The best way to get started is check out our repo and download the code. 
              This doc site, along with its live examples, are all built with react. :)
            </p>
          </div>

          <div className="feature">
            <Link className="icon-circle" to="css-framework"><Icon icon="av-web" /></Link>
            <h3>CSS Framework</h3>
            <p>
              The CSS Framework is built with <a href="http://lesscss.org">Less</a>. We've 
              included handy things like resets, colors, and typography to help get you going.
            </p>
          </div>

          <div className="feature">
            <Link className="icon-circle" to="components"><Icon icon="content-select-all" /></Link>
            <h3>Components</h3>
            <p>
              We've started building out some material design components using react. 
              Here's a sneak peek at a few - with more on the way.
            </p>
          </div>
        </div>

        <div className="home-contribute">
          <div className="content-container">
            <h3>Want to help make this project awesome? Check out our repo.</h3>
            <PaperButton 
              type={PaperButton.Types.RAISED} 
              primary={true} 
              label="Github" 
              href="https://github.com/callemall/material-ui" />
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
