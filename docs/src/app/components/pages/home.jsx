/**
 * @jsx React.DOM
 */

var React = require('react');

var HomePage = React.createClass({

  render: function() {
    return (
    	<div>
    		<h2 className="mui-font-style-headline">
    			<span className="mui-font-style-display-1">Material-UI</span><br/>
    			A CSS framework and a set of React components that implement Google's Material Design
  			</h2>
    		<p>
    			Material-UI came about from our love
    			of <a href="http://facebook.github.io/react/">React</a> and <a href="https://www.google.com/design/spec/material-design/introduction.html">Google's
    			Material Design</a>. We're currently using it on a project at <a href="https://www.call-em-all.com/">Call-Em-All</a> and plan on
    			adding to it and making it better in the coming months.
    		</p>
    	</div>
    );
  }

});

module.exports = HomePage;
