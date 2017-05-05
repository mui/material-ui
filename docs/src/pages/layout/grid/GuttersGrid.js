/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Grid from 'material-ui/Grid';
import { LabelRadio, RadioGroup } from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import { FormLabel } from 'material-ui/Form';

const styleSheet = createStyleSheet('GuttersGrid', () => {
  return {
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: 12,
    },
  };
});

export default class GuttersGrid extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  }

  state = {
    gutter: '16',
  }

  handleChange = (key) => (event, value) => {
    this.setState({
      [key]: value,
    });
  }

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    const {
      gutter,
    } = this.state;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.demo}
            justify="center"
            gutter={Number(gutter)}
          >
            {Array.from({ length: 3 }, (v, k) => k).map((index) => (
              <Grid key={index} item>
                <Paper className={classes.paper} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.control}>
            <Grid container>
              <Grid item>
                <FormLabel>gutter</FormLabel>
                <RadioGroup
                  aria-label="gutter"
                  selectedValue={gutter}
                  onChange={this.handleChange('gutter')}
                  row
                >
                  <LabelRadio label="0" value="0" />
                  <LabelRadio label="8" value="8" />
                  <LabelRadio label="16" value="16" />
                  <LabelRadio label="24" value="24" />
                  <LabelRadio label="40" value="40" />
                </RadioGroup>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
