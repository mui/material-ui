var React = require('react/addons');
var mui = require('mui');
var ClearFix = mui.ClearFix;
var TextField = mui.TextField;
var StyleResizable = mui.Mixins.StyleResizable;
var ComponentDoc = require('../../component-doc.jsx');

var TextFieldsPage = React.createClass({

  mixins: [StyleResizable, React.addons.LinkedStateMixin],

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

  getStyles: function() {
    var styles = {
      group: {
        width: '100%',
        float: 'left',
        marginBottom: 32
      },
      textfield: {
        marginTop: 24
      }
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.group.width = '50%';
    }

    return styles;
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
      '  hintText="Hint Text"\n' +
      '  floatingLabelText="Floating Label Text" />\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  defaultValue="Default Value"\n' +
      '  floatingLabelText="Floating Label Text" />\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  floatingLabelText="Floating Label Text"\n' +
      '  value={this.state.floatingPropValue}\n' +
      '  onChange={this._handleFloatingInputChange} />\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  floatingLabelText="Floating Label Text"\n' +
      '  valueLink={this.linkState(\'floatingValueLinkValue\')} />\n' +
      '<TextField\n' +
      '  hintText="Hint Text (MultiLine)"\n' +
      '  floatingLabelText="Floating Label Text"\n' +
      '  multiLine={true} />\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  errorText={this.state.floatingErrorText}\n' +
      '  floatingLabelText="Floating Label Text"\n' +
      '  onChange={this._handleFloatingErrorInputChange} />\n' +
      '<TextField\n' +
      '  hintText="Hint Text"\n' +
      '  errorText={this.state.floatingError2Text}\n' +
      '  defaultValue="abc"\n' +
      '  floatingLabelText="Floating Label Text"\n' +
      '  onChange={this._handleFloating2ErrorInputChange} />\n' +
      '<TextField\n' +
      '  hintText="Disabled Hint Text"\n' +
      '  disabled={true}\n' +
      '  floatingLabelText="Floating Label Text" />\n' +
      '<TextField\n' +
      '  hintText="Disabled Hint Text"\n' +
      '  disabled={true}\n' +
      '  defaultValue="Disabled With Value"\n' +
      '  floatingLabelText="Floating Label Text" />';

    var desc = 'This component extends the current input element and will support all of its props and events. It supports ' +
      'valueLink and can be controlled or uncontrolled.' ;

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
            name: 'floatingLabelText',
            type: 'string',
            header: 'optional',
            desc: 'The text string to use for the floating label element.'
          },
          {
            name: 'fullWidth',
            type: 'bool',
            header: 'optional',
            desc: 'If true, the field receives the property width 100%.'
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
          },
          {
            name: 'onEnterKeyDown',
            type: 'function',
            header: 'optional',
            desc: 'The function to call when the user presses the Enter key.'
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the TextField\'s root element.'
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
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onBlur',
            header: 'function(e)',
            desc: 'Callback function that is fired when the textfield loses' +
                  'focus.'
          },
          {
            name: 'onChange',
            header: 'function(e)',
            desc: 'Callback function that is fired when the textfield\'s value ' +
                  'changes.'
          },
          {
            name: 'onFocus',
            header: 'function(e)',
            desc: 'Callback function that is fired when the textfield gains ' +
                  'focus.'
          },
        ]
      }
    ];

    var styles = this.getStyles();

    return (
      <ComponentDoc
        name="Text Field"
        code={code}
        desc={desc}
        componentInfo={componentInfo}>

        <ClearFix>
          <div style={styles.group}>
            <TextField
              style={styles.textfield}
              hintText="Hint Text" /><br/>
            <TextField
              style={styles.textfield}
              hintText="Hint Text"
              defaultValue="Default Value" /><br/>
            <TextField
              style={styles.textfield}
              hintText="Hint Text"
              value={this.state.propValue}
              onChange={this._handleInputChange} /><br/>
            <TextField
              style={styles.textfield}
              hintText="Hint Text"
              valueLink={this.linkState('valueLinkValue')} /><br/>
            <TextField
              style={styles.textfield}
              hintText="Hint Text (MultiLine)"
              multiLine={true} /><br/>
            <TextField
              style={styles.textfield}
              hintText="Hint Text"
              errorText={this.state.errorText}
              onChange={this._handleErrorInputChange} /><br/>
            <TextField
              style={styles.textfield}
              hintText="Hint Text"
              errorText={this.state.error2Text}
              onChange={this._handleError2InputChange}
              defaultValue="abc" /><br/>
            <TextField
              style={styles.textfield}
              hintText="Disabled Hint Text"
              disabled={true} /><br/>
            <TextField
              style={styles.textfield}
              hintText="Disabled Hint Text"
              disabled={true}
              defaultValue="Disabled With Value" /><br/>
          </div>
          <div style={styles.group}>
            <TextField
              hintText="Hint Text"
              floatingLabelText="Floating Label Text" /><br/>
            <TextField
              hintText="Hint Text"
              defaultValue="Default Value"
              floatingLabelText="Floating Label Text" /><br/>
            <TextField
              hintText="Hint Text"
              floatingLabelText="Floating Label Text"
              value={this.state.floatingPropValue}
              onChange={this._handleFloatingInputChange} /><br/>
            <TextField
              hintText="Hint Text"
              floatingLabelText="Floating Label Text"
              valueLink={this.linkState('floatingValueLinkValue')} /><br/>
            <TextField
              hintText="Hint Text (MultiLine)"
              floatingLabelText="Floating Label Text"
              multiLine={true} /><br/>
            <TextField
              hintText="Hint Text"
              errorText={this.state.floatingErrorText}
              floatingLabelText="Floating Label Text"
              onChange={this._handleFloatingErrorInputChange} /><br/>
            <TextField
              hintText="Hint Text"
              errorText={this.state.floatingError2Text}
              defaultValue="abc"
              floatingLabelText="Floating Label Text"
              onChange={this._handleFloating2ErrorInputChange} /><br/>
            <TextField
              hintText="Disabled Hint Text"
              disabled={true}
              floatingLabelText="Floating Label Text" /><br/>
            <TextField
              hintText="Disabled Hint Text"
              disabled={true}
              defaultValue="Disabled With Value"
              floatingLabelText="Floating Label Text" /><br/>
          </div>
        </ClearFix>
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
