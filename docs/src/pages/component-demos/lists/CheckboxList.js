// @flow weak

import React, { Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui-icons/Comment';

const styleSheet = createStyleSheet('CheckboxList', (theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
}));

export default class CheckboxList extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    checked: [0],
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
            <ListItem
              dense
              button
              key={index}
              onClick={(event) => this.handleToggle(event, index)}
            >
              <Checkbox
                checked={this.state.checked.indexOf(index) !== -1}
                tabIndex="-1"
                ripple={false}
              />
              <ListItemText primary={`Line item ${index + 1}`} />
              <ListItemSecondaryAction>
                <IconButton>
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

