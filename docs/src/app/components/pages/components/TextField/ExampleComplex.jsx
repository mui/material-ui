import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';

export default class TextFieldExampleComplex extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errorText: 'This field must be numeric.',
    };
  }

  _handleErrorInputChange = (event) => {
    let value = event.target.value;
    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    this.setState({
      errorText: isNumeric ? '' : 'This field must be numeric.',
    });
  };

  render() {
    return (
      <TextField
        hintText="Hint Text (custom error color)"
        errorText={this.state.errorText}
        errorStyle={{color: Colors.orange500}}
        onChange={this._handleErrorInputChange}
        defaultValue="Custom error color" />
    );
  }
}
