// @flow weak
import React, { Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import type { Gutters } from 'material-ui/Layout/Layout';
import Layout from 'material-ui/Layout';
import { LabelRadio, RadioGroup } from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import { FormLabel } from 'material-ui/Form';

const styleSheet = createStyleSheet('GuttersLayout', () => {
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

type State = {
  gutter: Gutters,
}

export default class GuttersLayout extends Component<void, void, State> {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state: State = {
    gutter: 16,
  };

  handleChange = (key) => (event, value) => {
    this.setState({
      [key]: Number(value),
    });
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    const {
      gutter,
    } = this.state;

    return (
      <Layout container className={classes.root}>
        <Layout item xs={12}>
          <Layout
            container
            className={classes.demo}
            justify="center"
            gutter={gutter}
          >
            {Array.from({ length: 3 }, (v, k) => k).map((index) => (
              <Layout key={index} item>
                <Paper className={classes.paper} />
              </Layout>
            ))}
          </Layout>
        </Layout>
        <Layout item xs={12}>
          <Paper className={classes.control}>
            <Layout container>
              <Layout item>
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
              </Layout>
            </Layout>
          </Paper>
        </Layout>
      </Layout>
    );
  }
}
