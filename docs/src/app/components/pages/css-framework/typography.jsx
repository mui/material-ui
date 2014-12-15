var React = require('react'),
  mui = require('mui'),
  Dom = mui.Utils.Dom,
  CodeExample = require('../../code-example/code-example.jsx');

var TypographyPage = React.createClass({

  render: function() {
    return (
      <div>
        <h2 className="mui-font-style-headline">Vertical Rhythm</h2>
        <p>Default styles for headings and paragraphs have consistent vertical rhythm. Click the text below to see. :)</p>
        {this._getVerticalRhythmExample()}

        <h2 className="mui-font-style-headline">Typographic Scale</h2>
        {this._getScaleExample()}

        <h2 className="mui-font-style-headline">Color Contrast</h2>
        {this._getColorExample()}

        <h2 className="mui-font-style-headline">Tracking and Kerning</h2>
        {this._getTrackingExample()}
      </div>
    );
  },

  _getVerticalRhythmExample: function() {
    var code = 
      '<h1>h1. Html Heading</h1>\n' +
      '<h2>h2. Html Heading</h2>\n' +
      '<h1>h1. Html Heading</h1>\n' +
      '<h2>h2. Html Heading</h2>\n' +
      '<h3>h3. Html Heading</h3>\n' +
      '<h4>h4. Html Heading</h4>\n' +
      '<h5>h5. Html Heading</h5>\n' +
      '<h6>h6. Html Heading</h6>\n' +
      '<p>\n'+
      ' p. Lorem ipsum dolor sit amet, sed docendi suscipit scripserit eu, persius invenire\n' +
      ' id sea. Ius dicant facilis propriae an, ut vim nonumy meliore lucilius, usu nonumes \n' +
      ' phaedrum ad. Ea nam error audiam, oratio nostrud pro id. Ut sea cetero labitur \n' +
      ' gubergren, munere maiorum nostrum vim ut, te feugiat vulputate cum. Choro volumus \n' +
      ' sapientem te sed, legimus splendide ad nec.\n' +
      '</p>';

    return (
      <CodeExample code={code}>
        <div ref="verticalRhythmContainer" onClick={this._onClick}>
          <h1>h1. Html Heading</h1>
          <h2>h2. Html Heading</h2>
          <h3>h3. Html Heading</h3>
          <h4>h4. Html Heading</h4>
          <h5>h5. Html Heading</h5>
          <h6>h6. Html Heading</h6>
          <p>p. Lorem ipsum dolor sit amet, sed docendi suscipit scripserit eu, persius invenire id sea. Ius dicant facilis propriae an, ut vim nonumy meliore lucilius, usu nonumes phaedrum ad. Ea nam error audiam, oratio nostrud pro id. Ut sea cetero labitur gubergren, munere maiorum nostrum vim ut, te feugiat vulputate cum. Choro volumus sapientem te sed, legimus splendide ad nec.</p>
        </div>
      </CodeExample>
    );
  },

  _getScaleExample: function() {
    var code = 
      '<div className="mui-font-style-display-4">Light 112px</div>\n' +
      '<div className="mui-font-style-display-3">Regular 56px</div>\n' +
      '<div className="mui-font-style-display-2">Regular 45px</div>\n' +
      '<div className="mui-font-style-display-1">Regular 34px</div>\n' +
      '<div className="mui-font-style-headline">Regular 24px</div>\n' +
      '<div className="mui-font-style-title">Medium 20px</div>\n' +
      '<div className="mui-font-style-subhead-1">Regular 15px</div>\n' +
      '<div className="mui-font-style-body-2">Medium 13px</div>\n' +
      '<div className="mui-font-style-body-1">Regular 13px</div>\n' +
      '<div className="mui-font-style-caption">Regular 12px</div>\n' +
      '<div className="mui-font-style-menu">Medium 13px</div>\n' +
      '<div className="mui-font-style-button">MEDIUM (ALL CAPS) 14px</div>';

    return (
      <CodeExample code={code}>
        <div className="mui-font-style-display-4">Light 112px</div>
        <div className="mui-font-style-display-3">Regular 56px</div>
        <div className="mui-font-style-display-2">Regular 45px</div>
        <div className="mui-font-style-display-1">Regular 34px</div>
        <div className="mui-font-style-headline">Regular 24px</div>
        <div className="mui-font-style-title">Medium 20px</div>
        <div className="mui-font-style-subhead-1">Regular 15px</div>
        <div className="mui-font-style-body-2">Medium 13px</div>
        <div className="mui-font-style-body-1">Regular 13px</div>
        <div className="mui-font-style-caption">Regular 12px</div>
        <div className="mui-font-style-menu">Medium 13px</div>
        <div className="mui-font-style-button">MEDIUM (ALL CAPS) 14px</div>
      </CodeExample>
    );
  },

  _getColorExample: function() {
    var code = 
      '<div className="mui-font-style-display-4">Black 54%</div>\n' +
      '<div className="mui-font-style-display-3">Black 54%</div>\n' +
      '<div className="mui-font-style-display-2">Black 54%</div>\n' +
      '<div className="mui-font-style-display-1">Black 54%</div>\n' +
      '<div className="mui-font-style-headline">Black 87%</div>\n' +
      '<div className="mui-font-style-title">Black 87%</div>\n' +
      '<div className="mui-font-style-subhead-1">Black 87%</div>\n' +
      '<div className="mui-font-style-body-2">Black 87%</div>\n' +
      '<div className="mui-font-style-body-1">Black 87%</div>\n' +
      '<div className="mui-font-style-caption">Black 54%</div>\n' +
      '<div className="mui-font-style-menu">Black 87%</div>\n' +
      '<div className="mui-font-style-button">Black 87%</div>';

    return (
      <CodeExample code={code}>
        <div className="mui-font-style-display-4">Black 54%</div>
        <div className="mui-font-style-display-3">Black 54%</div>
        <div className="mui-font-style-display-2">Black 54%</div>
        <div className="mui-font-style-display-1">Black 54%</div>
        <div className="mui-font-style-headline">Black 87%</div>
        <div className="mui-font-style-title">Black 87%</div>
        <div className="mui-font-style-subhead-1">Black 87%</div>
        <div className="mui-font-style-body-2">Black 87%</div>
        <div className="mui-font-style-body-1">Black 87%</div>
        <div className="mui-font-style-caption">Black 54%</div>
        <div className="mui-font-style-menu">Black 87%</div>
        <div className="mui-font-style-button">Black 87%</div>
      </CodeExample>
    );
  },

  _getTrackingExample: function() {
    var code = 
      '<div className="mui-font-style-display-4">Tracking -10px</div>\n' +
      '<div className="mui-font-style-display-3">Tracking -5px</div>\n' +
      '<div className="mui-font-style-display-2">Tracking 0px</div>\n' +
      '<div className="mui-font-style-display-1">Tracking 0px</div>\n' +
      '<div className="mui-font-style-headline">Tracking 0px</div>\n' +
      '<div className="mui-font-style-title">Tracking 5px</div>\n' +
      '<div className="mui-font-style-subhead-1">Tracking 10px</div>\n' +
      '<div className="mui-font-style-body-2">Tracking 10px</div>\n' +
      '<div className="mui-font-style-body-1">Tracking 10px</div>\n' +
      '<div className="mui-font-style-caption">Tracking 20px</div>\n' +
      '<div className="mui-font-style-menu">Tracking 10px</div>\n' +
      '<div className="mui-font-style-button">Tracking 10px</div>';

    return (
      <CodeExample code={code}>
        <div className="mui-font-style-display-4">Tracking -10px</div>
        <div className="mui-font-style-display-3">Tracking -5px</div>
        <div className="mui-font-style-display-2">Tracking 0px</div>
        <div className="mui-font-style-display-1">Tracking 0px</div>
        <div className="mui-font-style-headline">Tracking 0px</div>
        <div className="mui-font-style-title">Tracking 5px</div>
        <div className="mui-font-style-subhead-1">Tracking 10px</div>
        <div className="mui-font-style-body-2">Tracking 10px</div>
        <div className="mui-font-style-body-1">Tracking 10px</div>
        <div className="mui-font-style-caption">Tracking 20px</div>
        <div className="mui-font-style-menu">Tracking 10px</div>
        <div className="mui-font-style-button">Tracking 10px</div>
      </CodeExample>
    );
  },

  _onClick: function(e) {
    Dom.toggleClass(this.refs.verticalRhythmContainer.getDOMNode(), 'baseline-grid');
  }

});

module.exports = TypographyPage;
