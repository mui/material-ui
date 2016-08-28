// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';

const styleSheet = createStyleSheet('CheckboxList', (theme) => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    background: theme.palette.background.paper,
  },
}));

export default class CheckboxList extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
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
          {Array.from({ length: 4 }, (v, k) => k).map((n, index) => (
            <ListItem dense button key={index}>
              <Avatar
                alt="Remy Sharp"
                src="https://s3.amazonaws.com/uifaces/faces/twitter/rem/73.jpg"
              />
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

