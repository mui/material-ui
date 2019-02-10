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

const styles = theme => ({
  toggleContainer: {
    margin: theme.spacing(2, 0),
  },
});

class ToggleButtons extends React.Component {
  state = {
    alignment: 'left',
    formats: ['bold'],
  };

  handleFormat = (event, formats) => {
    this.setState({ formats });
  };

  handleAlignment = (event, alignment) => {
    this.setState({ alignment });
  };

  render() {
    const { classes } = this.props;
    const { alignment, formats } = this.state;

    return (
      <Grid container spacing={2}>
        <Grid item sm={12} md={6}>
          <div className={classes.toggleContainer}>
            <ToggleButtonGroup value={alignment} exclusive onChange={this.handleAlignment}>
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
          <Typography gutterBottom>Exclusive Selection</Typography>
          <Typography>
            Text justification toggle buttons present options for left, right, center, full, and
            justified text with only one item available for selection at a time. Selecting one
            option deselects any other.
          </Typography>
        </Grid>
        <Grid item sm={12} md={6}>
          <div className={classes.toggleContainer}>
            <ToggleButtonGroup value={formats} onChange={this.handleFormat}>
              <ToggleButton value="bold">
                <FormatBoldIcon />
              </ToggleButton>
              <ToggleButton value="italic">
                <FormatItalicIcon />
              </ToggleButton>
              <ToggleButton value="underlined">
                <FormatUnderlinedIcon />
              </ToggleButton>
              <ToggleButton disabled value="color">
                <FormatColorFillIcon />
                <ArrowDropDownIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <Typography gutterBottom>Multiple Selection</Typography>
          <Typography>
            Logically-grouped options, like Bold, Italic, and Underline, allow multiple options to
            be selected.
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

ToggleButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToggleButtons);
