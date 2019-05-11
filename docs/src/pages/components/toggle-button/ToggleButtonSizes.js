import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

const styles = theme => ({
  toggleContainer: {
    margin: theme.spacing(4, 0),
  },
  sizePicker: {
    margin: theme.spacing(2, 0),
  },
});

class ToggleButtonSizes extends React.Component {
  state = {
    alignment: 'left',
    size: 'medium',
    formats: ['bold'],
  };

  handleFormat = (event, formats) => {
    this.setState({ formats });
  };

  handleAlignment = (event, alignment) => {
    this.setState({ alignment });
  };

  handleSizeChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { alignment, formats, size } = this.state;

    return (
      <Grid container spacing={2}>
        <Grid item sm={12} md={6}>
          <div className={classes.sizePicker}>
            <FormControl component="fieldset">
              <FormLabel>size</FormLabel>
              <RadioGroup
                row
                name="size"
                aria-label="size"
                value={size}
                onChange={this.handleSizeChange('size')}
              >
                <FormControlLabel value="small" control={<Radio />} label="small" />
                <FormControlLabel value="medium" control={<Radio />} label="medium" />
                <FormControlLabel value="large" control={<Radio />} label="large" />
              </RadioGroup>
            </FormControl>
          </div>
        </Grid>
        <Grid item sm={12} md={6}>
          <div className={classes.toggleContainer}>
            <ToggleButtonGroup
              size={size}
              value={alignment}
              exclusive
              onChange={this.handleAlignment}
            >
              <ToggleButton value="left">
                <FormatAlignLeftIcon />
              </ToggleButton>
              <ToggleButton value="center">
                <FormatAlignCenterIcon />
              </ToggleButton>
              <ToggleButton value="right">
                <FormatAlignRightIcon />
              </ToggleButton>
              <ToggleButton value="justify" disabled>
                <FormatAlignJustifyIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Grid>
      </Grid>
    );
  }
}

ToggleButtonSizes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToggleButtonSizes);
