import React, { ComponentClass } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

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

export interface Props extends WithStyles<typeof styles> {}

interface State {
  name: string;
}

class ComposedTextField extends React.Component<Props, State> {
  labelRef: HTMLElement | null | undefined;

  state = {
    name: 'Composed TextField',
  };

  componentDidMount() {
    this.forceUpdate();
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-simple">Name</InputLabel>
          <Input id="component-simple" value={this.state.name} onChange={this.handleChange} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-helper">Name</InputLabel>
          <Input
            id="component-helper"
            value={this.state.name}
            onChange={this.handleChange}
            aria-describedby="component-helper-text"
          />
          <FormHelperText id="component-helper-text">Some important helper text</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl} disabled>
          <InputLabel htmlFor="component-disabled">Name</InputLabel>
          <Input id="component-disabled" value={this.state.name} onChange={this.handleChange} />
          <FormHelperText>Disabled</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl} error>
          <InputLabel htmlFor="component-error">Name</InputLabel>
          <Input
            id="component-error"
            value={this.state.name}
            onChange={this.handleChange}
            aria-describedby="component-error-text"
          />
          <FormHelperText id="component-error-text">Error</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel
            ref={ref => {
              this.labelRef = ReactDOM.findDOMNode(ref!) as HTMLLabelElement | null;
            }}
            htmlFor="component-outlined"
          >
            名称
          </InputLabel>
          <OutlinedInput
            id="component-outlined"
            value={this.state.name}
            onChange={this.handleChange}
            labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
          />
        </FormControl>
        <FormControl className={classes.formControl} variant="filled">
          <InputLabel htmlFor="component-filled">Name</InputLabel>
          <FilledInput id="component-filled" value={this.state.name} onChange={this.handleChange} />
        </FormControl>
      </div>
    );
  }
}

(ComposedTextField as ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(ComposedTextField);
