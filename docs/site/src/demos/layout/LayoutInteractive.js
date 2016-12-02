// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Block from 'material-ui/Layout';
import { Radio, RadioGroup } from 'material-ui/Radio';
import Switch from 'material-ui/Switch';
import Text from 'material-ui/Text';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { teal, deepPurple } from 'material-ui/styles/colors';

const styleSheet = createStyleSheet('LayoutInteractive', ({ shadows, palette }) => ({
  root: { width: 750, backgroundColor: palette.background.paper, position: 'relative' },
  add: { position: 'absolute', top: '42%', right: 0 },
  demo: {
    height: 300,
    boxShadow: shadows[1],
  },
  zone: {
    '& > div': {
      '&:nth-child(even)': { backgroundColor: teal[300] },
      '&:nth-child(odd)': { backgroundColor: deepPurple[300] },
    },
  },
}));

export default class Interactive extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  }
  state = {
    block: {
      direction: 'row',
      justification: 'center',
      alignment: 'center',
      padding: false,
      margin: false,
      fill: false,
      wrap: false,
    },
    cells: [{ flex: false }, { flex: false }, { flex: false }],
  }
  handleChange = (key) => (e, val) => {
    const { block } = this.state;
    this.setState({ block: { ...block, [key]: val } });
  }
  setCell = (idx) => () => {
    const { cells } = this.state;
    if (idx === undefined && cells.length < 30) {
      this.setState({ cells: [...cells, { flex: false }] });
      return;
    }
    if (cells.length > 1) {
      const cellSlice = cells.slice();
      cellSlice.splice(idx, 1);
      this.setState({ cells: cellSlice });
    }
  }
  render() {
    const { root, add, demo, zone } = this.context.styleManager.render(styleSheet);
    const {
      block: { direction, justification, alignment, padding, margin, fill, wrap },
      cells,
    } = this.state;

    return (
      <Block className={root} layout="column" margin>
        <Block flex="none" layout="row">
          <Block flex layout="column">
            <Text type="title">Direction</Text>
            <RadioGroup
              aria-label="Direction"
              selectedValue={direction}
              onChange={this.handleChange('direction')}
            >
              <Radio label="Row" value="row" />
              <Radio label="Column" value="column" />
            </RadioGroup>
          </Block>
          <Block flex>
            <Block layout="row" align="center">
              <Text type="subheading">Padding</Text>
              <Switch
                checked={padding}
                onChange={this.handleChange('padding')}
                aria-label="padding"
              />
            </Block>
            <Block layout="row" align="center">
              <Text type="subheading">Margin</Text>
              <Switch
                checked={margin}
                onChange={this.handleChange('margin')}
                aria-label="margin"
              />
            </Block>
            <Block layout="row" align="center">
              <Text type="subheading">Fill</Text>
              <Switch
                checked={fill}
                onChange={this.handleChange('fill')}
                aria-label="fill"
              />
            </Block>
            <Block layout="row" align="center">
              <Text type="subheading">Wrap</Text>
              <Switch
                checked={wrap}
                onChange={this.handleChange('wrap')}
                aria-label="wrap"
              />
            </Block>
          </Block>
          <Block flex>
            <Text type="title">Justification</Text>
            <RadioGroup
              aria-label="Justification"
              selectedValue={justification}
              onChange={this.handleChange('justification')}
            >
              <Radio label="Start" value="start" />
              <Radio label="Center" value="center" />
              <Radio label="End" value="end" />
              <Radio label="Space Between" value="space-between" />
              <Radio label="Space Around" value="space-around" />
            </RadioGroup>
          </Block>
          <Block flex>
            <Text type="title">Alignment</Text>
            <RadioGroup
              aria-label="Alignment"
              selectedValue={alignment}
              onChange={this.handleChange('alignment')}
            >
              <Radio label="Start" value="start" />
              <Radio label="Center" value="center" />
              <Radio label="End" value="end" />
              <Radio label="Stretch" value="stretch" />
            </RadioGroup>
          </Block>
        </Block>
        <Button
          fab
          accent
          disabled={cells.length >= 30}
          onClick={this.setCell()}
          className={add}
        >
          <span className="material-icons">add</span>
        </Button>
        <Block flex className={demo} layout="row">
          <Block
            scroll
            className={zone}
            flex
            layout={direction}
            justify={justification}
            align={alignment}
            padding={padding}
            margin={margin}
            fill={fill}
            wrap={wrap}
          >
            {
              cells.map((cell, i) => (
                <Block {...cell} layout="row" align="center">
                  <IconButton accent onClick={this.setCell(i)}>delete</IconButton>
                  <Button>{`Cell ${i + 1}`}</Button>
                </Block>
              ))
            }
          </Block>
        </Block>
      </Block>
    );
  }
}
