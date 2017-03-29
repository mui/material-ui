// @flow weak

import React, { Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
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

export default class InteractiveLayout extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  }

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
    const classes = this.context.styleManager.render(styleSheet);
    const {
      align,
      direction,
      justify,
    } = this.state;

    return (
      <Layout container className={classes.root}>
        <Layout item xs={12}>
          <Layout
            container
            className={classes.demo}
            align={align}
            direction={direction}
            justify={justify}
          >
            {Array.from({ length: 3 }, (v, k) => k).map((index) => (
              <Layout key={index} item>
                <Paper className={classes.paper}>
                  {`Cell ${index + 1}`}
                </Paper>
              </Layout>
            ))}
          </Layout>
        </Layout>
        <Layout item xs={12}>
          <Paper className={classes.control}>
            <Layout container>
              <Layout item xs={6} sm={4}>
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
              </Layout>
              <Layout item xs={6} sm={4}>
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
              </Layout>
              <Layout item xs={6} sm={4}>
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
              </Layout>
            </Layout>
          </Paper>
        </Layout>
      </Layout>
    );
  }
}
