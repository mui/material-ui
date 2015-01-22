var React = require('react');
var mui = require('mui');
var TextField = mui.TextField;
var ComponentDoc = require('../../component-doc.jsx');

var TextFieldsPage = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      errorText: 'This field is required.',
      error2Text: 'This field must be numeric.',
      floatingErrorText: 'This field is required.',
      floatingError2Text: 'This field must be numeric.',
      propValue: 'Prop Value',
      floatingPropValue: 'Prop Value',
      valueLinkValue: 'Value Link',
      floatingValueLinkValue: 'Value Link'
    };
  },

  render: function() {

    var code =
      '//In Line Hint Text\n' +
      '<TextField\n' +
      '  hintText="Hint Text" />\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  defaultValue="Default Value" />\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  value={this.state.propValue}\n' +
      '  onChange={this._handleInputChange} />\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  valueLink={this.linkState(\'valueLinkValue\')} />\n' +
      '<TextField\n' +
      '  hintText="Hint Text (MultiLine)"\n' +
      '  multiLine={true} />\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  errorText={this.state.errorText}\n' +
      '  onChange={this._handleErrorInputChange} />\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  errorText={this.state.error2Text}\n' +
      '  onChange={this._handleError2InputChange}\n' +
      '  defaultValue="abc" />\n' +
      '<TextField\n' +
      '  hintText="Disabled Hint Text"\n' +
      '  disabled={true} />\n' +
      '<TextField\n' +
      '  hintText="Disabled Hint Text"\n' +
      '  disabled={true}\n' +
      '  defaultValue="Disabled With Value" />\n\n' +

      '//Floating Hint Text Labels\n' +
      '<TextField\n' +
      '  hintText="Floating Label Hint Text"\n' +
      '  floatingLabels={true} />\n' +
      '<TextField\n' +
      '  hintText="Floating Label Hint Text"\n' +
      '  floatingLabels={true}\n' +
      '  defaultValue="Default Value" />\n' +
      '<TextField\n' +
      '  hintText="Floating Label Hint Text"\n' +
      '  floatingLabels={true}\n' +
      '  value={this.state.floatingPropValue}\n' +
      '  onChange={this._handleFloatingInputChange} />\n' +
      '<TextField\n' +
      '  hintText="Floating Label Hint Text"\n' +
      '  floatingLabels={true}\n' +
      '  valueLink={this.linkState(\'floatingValueLinkValue\')} />\n' +
      '<TextField\n' +
      '  hintText="Floating Label Hint Text (MultiLine)"\n' +
      '  floatingLabels={true} multiLine={true} />\n' +
      '<TextField\n' +
      '  hintText="Floating Label Hint Text"\n' +
      '  errorText={this.state.floatingErrorText}\n' +
      '  floatingLabels={true}\n' +
      '  onChange={this._handleFloatingErrorInputChange} />\n' +
      '<TextField\n' +
      '  hintText="Floating Label Hint Text"\n' +
      '  errorText={this.state.floatingError2Text}\n' +
      '  floatingLabels={true} defaultValue="abc"\n' +
      '  onChange={this._handleFloating2ErrorInputChange} />\n' +
      '<TextField\n' +
      '  hintText="Floating Label Disabled Hint Text"\n' +
      '  disabled={true}\n' +
      '  floatingLabels={true} />\n' +
      '<TextField\n' +
      '  hintText="Floating Label Disabled Hint Text"\n' +
      '  disabled={true}\n' +
      '  floatingLabels={true}\n' +
      '  defaultValue="Disabled With Value" />'; 

    var componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'errorText',
            type: 'string',
            header: 'optional',
            desc: 'The error text string to display.'
          },
          {
            name: 'floatingLabels',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, hint text labels will float above the input box.'
          },
          {
            name: 'hintText',
            type: 'string',
            header: 'optional',
            desc: 'The hint text string to display.'
          },
          {
            name: 'multiLine',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, a textarea element will be rendered. The textarea also grows and shrinks according to the number of lines.'
          }
        ]
      },
      {
        name: 'Methods',
        infoArray: [
          {
            name: 'blur',
            header: 'TextField.blur()',
            desc: 'Removes focus on the input element.'
          },
          {
            name: 'clearValue',
            header: 'TextField.clearValue()',
            desc: 'Clears the value on the input element.'
          },
          {
            name: 'focus',
            header: 'TextField.focus()',
            desc: 'Sets the focus on the input element.'
          },
          {
            name: 'getValue',
            header: 'TextField.getValue()',
            desc: 'Returns the value of the input.'
          },
          {
            name: 'setErrorText',
            header: 'TextField.setErrorText(newErrorText)',
            desc: 'Sets the error text on the input element.'
          },
          {
            name: 'setValue',
            header: 'TextField.setValue(newValue)',
            desc: 'Sets the value of the input element.'
          }
        ]
      }
    ];

    return (
      <ComponentDoc
        name="Text Field"
        code={code}
        componentInfo={componentInfo}>

        <div className="text-field-example">
          <div className="text-field-example-group text-field-example-single-line">
            <TextField
              hintText="Hint Text" /><br/>
            <TextField
              hintText="Hint Text"
              defaultValue="Default Value" /><br/>
            <TextField
              hintText="Hint Text"
              value={this.state.propValue}
              onChange={this._handleInputChange} /><br/>
            <TextField
              hintText="Hint Text"
              valueLink={this.linkState('valueLinkValue')} /><br/>
            <TextField
              hintText="Hint Text (MultiLine)"
              multiLine={true} /><br/>
            <TextField
              hintText="Hint Text"
              errorText={this.state.errorText}
              onChange={this._handleErrorInputChange} /><br/>
            <TextField
              hintText="Hint Text"
              errorText={this.state.error2Text}
              onChange={this._handleError2InputChange}
              defaultValue="abc" /><br/>
            <TextField
              hintText="Disabled Hint Text"
              disabled={true} /><br/>
            <TextField
              hintText="Disabled Hint Text"
              disabled={true}
              defaultValue="Disabled With Value" /><br/>
          </div>

          <div className="text-field-example-group">
            <TextField
              hintText="Floating Label Hint Text"
              floatingLabels={true} /><br/>
            <TextField
              hintText="Floating Label Hint Text"
              floatingLabels={true}
              defaultValue="Default Value" /><br/>
            <TextField
              hintText="Floating Label Hint Text"
              floatingLabels={true}
              value={this.state.floatingPropValue}
              onChange={this._handleFloatingInputChange} /><br/>
            <TextField
              hintText="Floating Label Hint Text"
              floatingLabels={true}
              valueLink={this.linkState('floatingValueLinkValue')} /><br/>
            <TextField
              hintText="Floating Label Hint Text (MultiLine)"
              floatingLabels={true} multiLine={true} /><br/>
            <TextField
              hintText="Floating Label Hint Text"
              errorText={this.state.floatingErrorText}
              floatingLabels={true}
              onChange={this._handleFloatingErrorInputChange} /><br/>
            <TextField
              hintText="Floating Label Hint Text"
              errorText={this.state.floatingError2Text}
              floatingLabels={true} defaultValue="abc"
              onChange={this._handleFloating2ErrorInputChange} /><br/>
            <TextField
              hintText="Floating Label Disabled Hint Text"
              disabled={true}
              floatingLabels={true} /><br/>
            <TextField
              hintText="Floating Label Disabled Hint Text"
              disabled={true}
              floatingLabels={true}
              defaultValue="Disabled With Value" /><br/>
          </div>
        </div>
      </ComponentDoc>
    );
  },

  _handleErrorInputChange: function(e) {
    this.setState({
      errorText: e.target.value ? '' : 'This field is required.' 
    });
  },

  _handleError2InputChange: function(e) {
    var value = e.target.value;
    var isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    this.setState({
      error2Text: isNumeric ? '' : 'This field must be numeric.' 
    });
  },

  _handleFloatingErrorInputChange: function(e) {
    this.setState({
      floatingErrorText: e.target.value ? '' : 'This field is required.' 
    });
  },

  _handleFloating2ErrorInputChange: function(e) {
    var value = e.target.value;
    var isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    this.setState({
      floatingError2Text: isNumeric ? '' : 'This field must be numeric.' 
    });
  },

  _handleInputChange: function(e) {
    this.setState({
      propValue: e.target.value
    });
  },

  _handleFloatingInputChange: function(e) {
    this.setState({
      floatingPropValue: e.target.value
    });
  }

});

module.exports = TextFieldsPage;