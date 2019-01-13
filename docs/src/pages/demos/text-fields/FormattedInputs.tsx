import React from 'react';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
    },
  });

export interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

function TextMaskCustom(props: TextMaskCustomProps) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
} as any;

export interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { value: string } }) => void;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
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

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
} as any;

export interface Props extends WithStyles<typeof styles> {}

interface State {
  textmask: string;
  numberformat: string;
}

class FormattedInputs extends React.Component<Props, State> {
  state = {
    textmask: '(1  )    -    ',
    numberformat: '1320',
  };

  handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [name]: event.target.value,
    } as Pick<State, keyof State>);
  };

  render() {
    const { classes } = this.props;
    const { textmask, numberformat } = this.state;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="formatted-text-mask-input">react-text-mask</InputLabel>
          <Input
            value={textmask}
            onChange={this.handleChange('textmask')}
            id="formatted-text-mask-input"
            inputComponent={TextMaskCustom as any}
          />
        </FormControl>
        <TextField
          className={classes.formControl}
          label="react-number-format"
          value={numberformat}
          onChange={this.handleChange('numberformat')}
          id="formatted-numberformat-input"
          InputProps={{
            inputComponent: NumberFormatCustom as any,
          }}
        />
      </div>
    );
  }
}

(FormattedInputs as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(FormattedInputs);
