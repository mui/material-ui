var React = require('react');
var mui = require('mui');
var Slider = mui.Slider;
var ComponentDoc = require('../../component-doc.jsx');

var SlidersPage = React.createClass({

  render: function() {

    var code =
      '// Default\n' +
      '<Slider name="slider1" />\n\n' +
      '// With starting value\n' +
      '<Slider name="slider2" defaultValue={0.5} />\n' +
      '<Slider name="slider3" defaultValue={1} />\n\n' +
      '// Disabled with fixed value\n' +
      '<Slider name="slider1" disabled={true} />\n' +
      '<Slider name="slider2" disabled={true} value={0.5} />\n' +
      '<Slider name="slider3" disabled={true} value={1} />';

    var componentInfo = [
    ];

    return (
      <ComponentDoc
        name="Sliders"
        code={code}
        componentInfo={componentInfo}>

        <Slider name="slider1" />
          <Slider name="slider2" value={0.5} />
          <Slider name="slider3" value={1} />
          <Slider name="slider1" disabled={true} />
          <Slider name="slider2" disabled={true} value={0.5} />
          <Slider name="slider3" disabled={true} value={1} />

      </ComponentDoc>
    );
  }

});

module.exports = SlidersPage;