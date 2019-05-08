import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = {
  button: {
    background: 'linear-gradient(45deg, var(--background-start) 30%, var(--background-end) 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px var(--box-shadow)',
  },
};

class DynamicCSSVariables extends React.Component {
  state = {
    color: 'default',
  };

  handleChange = event => {
    this.setState({ color: event.target.checked ? 'blue' : 'default' });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.color === 'blue'}
              onChange={this.handleChange}
              color="primary"
              value="dynamic-class-name"
            />
          }
          label="Blue"
        />
        <Button
          className={classes.button}
          style={
            this.state.color === 'blue'
              ? {
                  '--background-start': '#2196F3',
                  '--background-end': '#21CBF3',
                  '--box-shadow': 'rgba(33, 203, 243, .3)',
                }
              : {
                  '--background-start': '#FE6B8B',
                  '--background-end': '#FF8E53',
                  '--box-shadow': 'rgba(255, 105, 135, .3)',
                }
          }
        >
          {'CSS variables'}
        </Button>
      </React.Fragment>
    );
  }
}

DynamicCSSVariables.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DynamicCSSVariables);
