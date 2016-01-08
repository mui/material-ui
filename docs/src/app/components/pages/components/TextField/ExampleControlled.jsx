import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';

const styles = {
  group: {
    width: '100%',
    float: 'left',
    marginBottom: 32,
  },
  textfield: {
    marginTop: 24,
  },
};

export default class TextFieldExampleControlled extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        errorText: 'This field is required.',
        error2Text: 'This field must be numeric.',
        floatingErrorText: 'This field is required.',
        floatingError2Text: 'This field must be numeric.',
        propValue: 'Prop Value',
        floatingPropValue: 'Prop Value',
        valueLinkValue: 'Value Link',
        floatingValueLinkValue: 'Value Link',
      };
    }

    _handleInputChange = (event) => {
      this.setState({
        propValue: event.target.value,
      });
    };


    _handleFloatingInputChange = (event) => {
      this.setState({
        floatingPropValue: event.target.value,
      });
    };

    render() {
      return (
        <div>
          <TextField
            style={styles.textfield}
            hintText="Custom Underline Color"
            value={this.state.propValue}
            underlineStyle={{borderColor: Colors.green500}}
            onChange={this._handleInputChange} /><br/>
          <TextField
            hintText="Hint Text"
            floatingLabelText="Floating Label Text"
            value={this.state.floatingPropValue}
            onChange={this._handleFloatingInputChange} /><br/>
        </div>
      );
    }
}
