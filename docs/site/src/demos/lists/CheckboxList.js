// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import { List, ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';

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
    checked: [],
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
          {Array.from({ length: 5 }, (v, k) => k).map((n, index) => (
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
              <IconButton>comment</IconButton>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

