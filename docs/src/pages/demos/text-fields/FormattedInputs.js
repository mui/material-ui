/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
});

class TextMaskCustom extends React.Component {
  render() {
    return (
      <MaskedInput
        {...this.props}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }
}

class NumberFormatCustom extends React.Component {
  render() {
    return (
      <NumberFormat
        {...this.props}
        onValueChange={values => {
          this.props.onChange({
            target: {
              value: values.value,
            },
          });
        }}
        thousandSeparator
        prefix="$"
      />
    );
  }
}

NumberFormatCustom.propTypes = {
  onChange: PropTypes.func.isRequired,
};

class FormattedInputs extends React.Component {
  state = {
    textmask: '(1  )    -    ',
    numberformat: '1320',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Input
          value={this.state.textmask}
          inputComponent={TextMaskCustom}
          onChange={this.handleChange('textmask')}
          className={classes.input}
          inputProps={{
            'aria-label': 'Description',
          }}
        />
        <Input
          value={this.state.numberformat}
          onChange={this.handleChange('numberformat')}
          inputComponent={NumberFormatCustom}
          className={classes.input}
          inputProps={{
            'aria-label': 'Description',
          }}
        />
      </div>
    );
  }
}

FormattedInputs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormattedInputs);
