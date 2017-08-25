/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Tooltip from 'material-ui/Tooltip';

const styles = {
  formControl: {
    marginTop: 56,
  },
  fab: {
    marginLeft: 16,
  },
};

class ButtonTooltips extends React.Component {
  state = {
    placement: 'bottom',
  };

  handlePlacementChange = (event, placement) => {
    this.setState({ placement });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <div>
          <Tooltip label="Delete" placement={this.state.placement}>
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip className={classes.fab} label="Add" placement={this.state.placement}>
            <Button fab color="primary" aria-label="Add">
              <AddIcon />
            </Button>
          </Tooltip>
        </div>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Placement</FormLabel>
          <RadioGroup
            aria-label="placement"
            name="placement"
            value={this.state.placement}
            onChange={this.handlePlacementChange}
          >
            <FormControlLabel value="bottom-end" control={<Radio />} label="Bottom End" />
            <FormControlLabel value="bottom-start" control={<Radio />} label="Bottom Start" />
            <FormControlLabel value="bottom" control={<Radio />} label="Bottom" />
            <FormControlLabel value="left-end" control={<Radio />} label="Left End" />
            <FormControlLabel value="left-start" control={<Radio />} label="Left Start" />
            <FormControlLabel value="left" control={<Radio />} label="Left" />
            <FormControlLabel value="right-end" control={<Radio />} label="Right End" />
            <FormControlLabel value="right-start" control={<Radio />} label="Right Start" />
            <FormControlLabel value="right" control={<Radio />} label="Right" />
            <FormControlLabel value="top-end" control={<Radio />} label="Top End" />
            <FormControlLabel value="top-start" control={<Radio />} label="Top Start" />
            <FormControlLabel value="top" control={<Radio />} label="Top" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

ButtonTooltips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonTooltips);
