import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
  },
});

class ComposedTextField extends React.Component {
  label = React.createRef();

  state = {
    labelWidth: 0,
    name: 'Composed TextField',
  };

  componentDidMount() {
    this.setState({ labelWidth: this.label.current.offsetWidth });
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { labelWidth, name } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-simple">Name</InputLabel>
          <Input id="component-simple" value={name} onChange={this.handleChange} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-helper">Name</InputLabel>
          <Input
            id="component-helper"
            value={name}
            onChange={this.handleChange}
            aria-describedby="component-helper-text"
          />
          <FormHelperText id="component-helper-text">Some important helper text</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl} disabled>
          <InputLabel htmlFor="component-disabled">Name</InputLabel>
          <Input id="component-disabled" value={name} onChange={this.handleChange} />
          <FormHelperText>Disabled</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl} error>
          <InputLabel htmlFor="component-error">Name</InputLabel>
          <Input
            id="component-error"
            value={name}
            onChange={this.handleChange}
            aria-describedby="component-error-text"
          />
          <FormHelperText id="component-error-text">Error</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel ref={this.label} htmlFor="component-outlined">
            Name
          </InputLabel>
          <OutlinedInput
            id="component-outlined"
            value={name}
            onChange={this.handleChange}
            labelWidth={labelWidth}
          />
        </FormControl>
        <FormControl className={classes.formControl} variant="filled">
          <InputLabel htmlFor="component-filled">Name</InputLabel>
          <FilledInput id="component-filled" value={name} onChange={this.handleChange} />
        </FormControl>
      </div>
    );
  }
}

ComposedTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComposedTextField);
