/**
 * @jsx React.DOM
 */

var React = require('react');

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
        </div>
    );
  }

});

module.exports = HomePage;
