// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { LabelRadio, RadioGroup } from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import { FormLabel } from 'material-ui/Form';

const styleSheet = createStyleSheet('InteractiveGrid', (theme) => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: 240,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
}));

class InteractiveGrid extends Component {
  state = {
    direction: 'row',
    justify: 'center',
    align: 'center',
    gutter: '16',
  }

  handleChange = (key) => (event, value) => {
    this.setState({
      [key]: value,
    });
  }

  render() {
    const classes = this.props.classes;
    const {
      align,
      direction,
      justify,
    } = this.state;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.demo}
            align={align}
            direction={direction}
            justify={justify}
          >
            {Array.from({ length: 3 }, (v, k) => k).map((index) => (
              <Grid key={index} item>
                <Paper className={classes.paper}>
                  {`Cell ${index + 1}`}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.control}>
            <Grid container>
              <Grid item xs={6} sm={4}>
                <FormLabel>direction</FormLabel>
                <RadioGroup
                  aria-label="direction"
                  selectedValue={direction}
                  onChange={this.handleChange('direction')}
                >
                  <LabelRadio label="row" value="row" />
                  <LabelRadio label="row-reverse" value="row-reverse" />
                  <LabelRadio label="column" value="column" />
                  <LabelRadio label="column-reverse" value="column-reverse" />
                </RadioGroup>
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormLabel>justify</FormLabel>
                <RadioGroup
                  aria-label="justify"
                  selectedValue={justify}
                  onChange={this.handleChange('justify')}
                >
                  <LabelRadio label="flex-start" value="flex-start" />
                  <LabelRadio label="center" value="center" />
                  <LabelRadio label="flex-end" value="flex-end" />
                  <LabelRadio label="space-between" value="space-between" />
                  <LabelRadio label="space-around" value="space-around" />
                </RadioGroup>
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormLabel>align</FormLabel>
                <RadioGroup
                  aria-label="align"
                  selectedValue={align}
                  onChange={this.handleChange('align')}
                >
                  <LabelRadio label="flex-start" value="flex-start" />
                  <LabelRadio label="center" value="center" />
                  <LabelRadio label="flex-end" value="flex-end" />
                  <LabelRadio label="stretch" value="stretch" />
                </RadioGroup>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

InteractiveGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(InteractiveGrid);
