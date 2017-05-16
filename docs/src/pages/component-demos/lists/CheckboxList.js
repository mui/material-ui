// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
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

class CheckboxList extends Component {
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
    const classes = this.props.classes;

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

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(CheckboxList);
