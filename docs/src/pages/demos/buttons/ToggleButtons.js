import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import FormatAlignLeft from 'material-ui-icons/FormatAlignLeft';
import FormatAlignCenter from 'material-ui-icons/FormatAlignCenter';
import FormatAlignRight from 'material-ui-icons/FormatAlignRight';
import FormatAlignJustify from 'material-ui-icons/FormatAlignJustify';
import FormatBold from 'material-ui-icons/FormatBold';
import FormatItalic from 'material-ui-icons/FormatItalic';
import FormatUnderlined from 'material-ui-icons/FormatUnderlined';
import FormatColorFill from 'material-ui-icons/FormatColorFill';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import ToggleButton, { ToggleButtonGroup } from 'material-ui/ToggleButton';

const styles = theme => ({
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `${theme.spacing.unit}px 0`,
    background: theme.palette.background.default,
  },
});

class ToggleButtons extends React.Component {
  state = {
    alignment: 'left',
    formats: ['bold'],
  };

  handleFormat = (e, formats) => this.setState({ formats });
  handleAlignment = (e, alignment) => this.setState({ alignment });

  render() {
    const { classes } = this.props;
    const { alignment, formats } = this.state;

    return (
      <Grid container>
        <Grid item xs={12} sm={6}>
          <div className={classes.toggleContainer}>
            <ToggleButtonGroup value={alignment} exclusive onChange={this.handleAlignment}>
              <ToggleButton value="left">
                <FormatAlignLeft />
              </ToggleButton>
              <ToggleButton value="center">
                <FormatAlignCenter />
              </ToggleButton>
              <ToggleButton value="right">
                <FormatAlignRight />
              </ToggleButton>
              <ToggleButton value="justify" disabled>
                <FormatAlignJustify />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <Typography type="caption" gutterBottom>
            Exclusive Selection
          </Typography>
          <Typography type="caption">
            Text justification toggle buttons present options for left, right, center, full, and
            justified text with only one item available for selection at a time. Selecting one
            option deselects any other.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.toggleContainer}>
            <ToggleButtonGroup value={formats} onChange={this.handleFormat}>
              <ToggleButton value="bold">
                <FormatBold />
              </ToggleButton>
              <ToggleButton value="italic">
                <FormatItalic />
              </ToggleButton>
              <ToggleButton value="underlined">
                <FormatUnderlined />
              </ToggleButton>
              <ToggleButton disabled>
                <FormatColorFill />
                <ArrowDropDownIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <Typography type="caption" gutterBottom>
            Multiple Selection
          </Typography>
          <Typography type="caption">
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
