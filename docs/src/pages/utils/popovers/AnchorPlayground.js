import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormControl, FormLabel, FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';
import Input, { InputLabel } from 'material-ui/Input';

const styles = theme => ({
  button: {
    marginBottom: theme.spacing.unit * 4,
  },
  typography: {
    margin: theme.spacing.unit * 2,
  },
});

class AnchorPlayground extends React.Component {
  state = {
    open: false,
    anchorOriginVertical: 'bottom',
    anchorOriginHorizontal: 'center',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'center',
    positionTop: 200, // Just so the popover can be spotted more easily
    positionLeft: 400, // Same as above
    anchorReference: 'anchorEl',
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleNumberInputChange = key => event => {
    this.setState({
      [key]: parseInt(event.target.value, 10),
    });
  };

  handleClickButton = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  anchorEl = null;

  render() {
    const { classes } = this.props;
    const {
      open,
      anchorOriginVertical,
      anchorOriginHorizontal,
      transformOriginVertical,
      transformOriginHorizontal,
      positionTop,
      positionLeft,
      anchorReference,
    } = this.state;

    return (
      <div>
        <Button
          buttonRef={node => {
            this.anchorEl = node;
          }}
          variant="raised"
          className={classes.button}
          onClick={this.handleClickButton}
        >
          Open Popover
        </Button>
        <Popover
          open={open}
          anchorEl={this.anchorEl}
          anchorReference={anchorReference}
          anchorPosition={{ top: positionTop, left: positionLeft }}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: anchorOriginVertical,
            horizontal: anchorOriginHorizontal,
          }}
          transformOrigin={{
            vertical: transformOriginVertical,
            horizontal: transformOriginHorizontal,
          }}
        >
          <Typography className={classes.typography}>The content of the Popover.</Typography>
        </Popover>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">anchorReference</FormLabel>
              <RadioGroup
                row
                aria-label="anchorReference"
                name="anchorReference"
                value={this.state.anchorReference}
                onChange={this.handleChange('anchorReference')}
              >
                <FormControlLabel value="anchorEl" control={<Radio />} label="anchorEl" />
                <FormControlLabel
                  value="anchorPosition"
                  control={<Radio />}
                  label="anchorPosition"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="position-top">anchorPosition.top</InputLabel>
              <Input
                id="position-top"
                type="number"
                value={this.state.positionTop}
                onChange={this.handleNumberInputChange('positionTop')}
              />
            </FormControl>
            &nbsp;
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="position-left">anchorPosition.left</InputLabel>
              <Input
                id="position-left"
                type="number"
                value={this.state.positionLeft}
                onChange={this.handleNumberInputChange('positionLeft')}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">anchorOrigin.vertical</FormLabel>
              <RadioGroup
                aria-label="anchorOriginVertical"
                name="anchorOriginVertical"
                value={this.state.anchorOriginVertical}
                onChange={this.handleChange('anchorOriginVertical')}
              >
                <FormControlLabel value="top" control={<Radio />} label="Top" />
                <FormControlLabel value="center" control={<Radio />} label="Center" />
                <FormControlLabel value="bottom" control={<Radio />} label="Bottom" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">transformOrigin.vertical</FormLabel>
              <RadioGroup
                aria-label="transformOriginVertical"
                name="transformOriginVertical"
                value={this.state.transformOriginVertical}
                onChange={this.handleChange('transformOriginVertical')}
              >
                <FormControlLabel value="top" control={<Radio />} label="Top" />
                <FormControlLabel value="center" control={<Radio />} label="Center" />
                <FormControlLabel value="bottom" control={<Radio />} label="Bottom" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">anchorOrigin.horizontal</FormLabel>
              <RadioGroup
                row
                aria-label="anchorOriginHorizontal"
                name="anchorOriginHorizontal"
                value={this.state.anchorOriginHorizontal}
                onChange={this.handleChange('anchorOriginHorizontal')}
              >
                <FormControlLabel value="left" control={<Radio />} label="Left" />
                <FormControlLabel value="center" control={<Radio />} label="Center" />
                <FormControlLabel value="right" control={<Radio />} label="Right" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">transformOrigin.horizontal</FormLabel>
              <RadioGroup
                row
                aria-label="transformOriginHorizontal"
                name="transformOriginHorizontal"
                value={this.state.transformOriginHorizontal}
                onChange={this.handleChange('transformOriginHorizontal')}
              >
                <FormControlLabel value="left" control={<Radio />} label="Left" />
                <FormControlLabel value="center" control={<Radio />} label="Center" />
                <FormControlLabel value="right" control={<Radio />} label="Right" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );
  }
}

AnchorPlayground.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnchorPlayground);
