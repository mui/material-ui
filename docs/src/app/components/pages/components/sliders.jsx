/**
 * @jsx React.DOM
 */

var React = require('react'),
  mui = require('mui');

var SlidersPage = React.createClass({

  render: function() {
    return (
      <div>
        <h2 className="mui-font-style-headline">Sliders</h2>
        <mui.Slider name="slider1" />
        <mui.Slider name="slider2" value={0.5} />
        <mui.Slider name="slider3" value={1} />
        <mui.Slider name="slider1" disabled={true} />
        <mui.Slider name="slider2" disabled={true} value={0.5} />
        <mui.Slider name="slider3" disabled={true} value={1} />
      </div>
    );
  }

});

module.exports = SlidersPage;
