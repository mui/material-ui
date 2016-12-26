// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Layout from 'material-ui/Layout';
import { LabelRadio, RadioGroup } from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import { FormLabel } from 'material-ui/Form';

const styleSheet = createStyleSheet('InteractiveLayout', () => {
  return {
    root: {
      flexGrow: 1,
    },
    demo: {
      height: 240,
    },
    paper: {
      padding: 12,
      height: '100%',
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

export default class InteractiveLayout extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  }

  state = {
    xsDirection: 'row',
    xsJustify: 'center',
    xsAlign: 'center',
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
      xsAlign,
      xsDirection,
      xsJustify,
    } = this.state;

    return (
      <Layout container className={classes.root}>
        <Layout item xs={12}>
          <Layout
            container
            className={classes.demo}
            xsAlign={xsAlign}
            xsDirection={xsDirection}
            xsJustify={xsJustify}
          >
            {CELLS.map((cell, i) => (
              <Layout key={i} item>
                <Paper className={classes.paper}>
                  {`Cell ${i + 1}`}
                </Paper>
              </Layout>
            ))}
          </Layout>
        </Layout>
        <Layout item xs={12}>
          <Paper className={classes.control}>
            <Layout container>
              <Layout item xs={6} sm={4}>
                <FormLabel>xsDirection</FormLabel>
                <RadioGroup
                  aria-label="xsDirection"
                  selectedValue={xsDirection}
                  onChange={this.handleChange('xsDirection')}
                >
                  <LabelRadio label="row" value="row" />
                  <LabelRadio label="row-reverse" value="row-reverse" />
                  <LabelRadio label="column" value="column" />
                  <LabelRadio label="column-reverse" value="column-reverse" />
                </RadioGroup>
              </Layout>
              <Layout item xs={6} sm={4}>
                <FormLabel>xsJustify</FormLabel>
                <RadioGroup
                  aria-label="xsJustify"
                  selectedValue={xsJustify}
                  onChange={this.handleChange('xsJustify')}
                >
                  <LabelRadio label="flex-start" value="flex-start" />
                  <LabelRadio label="center" value="center" />
                  <LabelRadio label="flex-end" value="flex-end" />
                  <LabelRadio label="space-between" value="space-between" />
                  <LabelRadio label="space-around" value="space-around" />
                </RadioGroup>
              </Layout>
              <Layout item xs={6} sm={4}>
                <FormLabel>xsAlign</FormLabel>
                <RadioGroup
                  aria-label="xsAlign"
                  selectedValue={xsAlign}
                  onChange={this.handleChange('xsAlign')}
                >
                  <LabelRadio label="flex-start" value="flex-start" />
                  <LabelRadio label="center" value="center" />
                  <LabelRadio label="flex-end" value="flex-end" />
                  <LabelRadio label="stretch" value="stretch" />
                </RadioGroup>
              </Layout>
            </Layout>
          </Paper>
        </Layout>
      </Layout>
    );
  }
}
