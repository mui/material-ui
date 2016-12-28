// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
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

const CELLS = [
  {},
  {},
  {},
];

export default class GuttersLayout extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  }

  state = {
    xsGutter: '16',
  }

  handleChange = (key) => (event, value) => {
    this.setState({
      [key]: value,
    });
  }

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    const {
      xsGutter,
    } = this.state;

    return (
      <Layout container className={classes.root}>
        <Layout item xs={12}>
          <Layout
            container
            className={classes.demo}
            xsJustify="center"
            xsGutter={xsGutter === 'false' ? false : Number(xsGutter)}
          >
            {CELLS.map((cell, i) => (
              <Layout key={i} item>
                <Paper className={classes.paper} />
              </Layout>
            ))}
          </Layout>
        </Layout>
        <Layout item xs={12}>
          <Paper className={classes.control}>
            <Layout container>
              <Layout item>
                <FormLabel>xsGutter</FormLabel>
                <RadioGroup
                  aria-label="xsGutter"
                  selectedValue={xsGutter}
                  onChange={this.handleChange('xsGutter')}
                  row
                >
                  <LabelRadio label="false" value="false" />
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
