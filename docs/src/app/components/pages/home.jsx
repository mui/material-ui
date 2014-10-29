/**
 * @jsx React.DOM
 */

var React = require('react'),
    Dispatcher = require('../../app-dispatcher.js'),
    mui = require('mui'),
    PaperButton = mui.PaperButton,
    Icon = mui.Icon;

var HomePage = React.createClass({

  render: function() {
    return (
        <div>
        	<div className="home-page-hero full-width-section">
                <div className="home-page-hero-content">
                    <img className="svg-logo" src="images/material-ui-logo.svg" />
                    <div className="tagline">
                        <h1 className="brand-name">material ui</h1>
                        <h2 className="mui-font-style-headline">A CSS Framework and a Set of React Components that Implement Google's Material Design</h2>
                        <p className="mui-font-style-subhead-1">Material-UI came about from our love
                        of <a href="http://facebook.github.io/react/">React</a> and <a href="https://www.google.com/design/spec/material-design/introduction.html">Google's
                        Material Design</a>. We're currently using it on a project at <a href="https://www.call-em-all.com/">Call-Em-All</a> and plan on
                        adding to it and making it better in the coming months.
                        </p>
                    </div>
                </div>
        	</div>
            <div className="home-features">
                <div className="feature">
                    <div className="icon-circle" onClick={this._getStartedClick}><Icon icon="check-all" /></div>
                    <h3>Get Started</h3>
                    <p>
                        The best way to get started is check out our repo and download the code. This doc site, along with its live examples, are all built with react. :)
                    </p>
                </div>
                <div className="feature">
                    <div className="icon-circle" onClick={this._cssFrameworkClick}><Icon icon="web" /></div>
                    <h3>Css Framework</h3>
                    <p>
                        The Css Framework is built with <a href="http://lesscss.org">Less</a>. We've included handy things like resets, colors, and typography to help get you going.
                    </p>
                </div>
                <div className="feature">
                    <div className="icon-circle" onClick={this._componentsClick}><Icon icon="select-all" /></div>
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
                    <PaperButton type={PaperButton.Types.RAISED} primary={true} label="Github" onClick={this._onContributeClick} />
                </div>
            </div>

        </div>
    );
  },

  _onContributeClick: function() {
    document.location.href='https://github.com/callemall/material-ui';
  },

  _getStartedClick: function() {
    Dispatcher.dispatchAction(Dispatcher.ActionTypes.NAV_USER_CLICK, { url: 'get-started' } ); 
  },

  _cssFrameworkClick: function() {
    Dispatcher.dispatchAction(Dispatcher.ActionTypes.NAV_USER_CLICK, { url: 'css-framework/colors' } ); 
  },

  _componentsClick: function() {
    Dispatcher.dispatchAction(Dispatcher.ActionTypes.NAV_USER_CLICK, { url: 'components/buttons' } ); 
  }



});

module.exports = HomePage;
