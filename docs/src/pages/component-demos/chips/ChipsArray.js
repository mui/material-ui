// @flow weak

import React, { Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Chip from 'material-ui/Chip';

const styleSheet = createStyleSheet('ChipsArray', (theme) => ({
  chip: {
    margin: theme.spacing.unit / 2,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}));

export default class ChipsArray extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = { chipData: [
    { key: 0, label: 'Angular' },
    { key: 1, label: 'JQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'ReactJS' },
    { key: 4, label: 'Vue.js' },
  ] };

  styles = {
    chip: {
      margin: 4,
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  };

  handleRequestDelete = (key) => {
    if (key === 3) {
      alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
      return;
    }

    const chipData = [...this.state.chipData];
    const chipToDelete = chipData.indexOf(chipData.find((chip) => chip.key === key));
    chipData.splice(chipToDelete, 1);
    this.setState({ chipData });
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    const renderChip = (data) => {
      return (
        <Chip
          label={data.label}
          key={data.key}
          onRequestDelete={() => this.handleRequestDelete(data.key)}
          className={classes.chip}
        />
      );
    };

    return (
      <div className={classes.row}>
        {this.state.chipData.map(renderChip, this)}
      </div>
    );
  }
}
