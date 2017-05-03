// @flow weak

import React, { Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import remyImage from 'docs/src/assets/images/remy.jpg';

const styleSheet = createStyleSheet('CheckboxListSecondary', (theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
}));

export default class CheckboxListSecondary extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    checked: [1],
  };

  handleToggle = (event, value) => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div className={classes.root}>
        <List>
          {Array.from({ length: 4 }, (v, k) => k).map((index) => (
            <ListItem dense button key={index}>
              <Avatar alt="Remy Sharp" src={remyImage} />
              <ListItemText primary={`Line item ${index + 1}`} />
              <ListItemSecondaryAction>
                <Checkbox
                  onClick={(event) => this.handleToggle(event, index)}
                  checked={this.state.checked.indexOf(index) !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

