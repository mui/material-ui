// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import remyImage from 'docs/src/assets/images/remy.jpg';

const styleSheet = createStyleSheet('CheckboxListSecondary', theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
}));

class CheckboxListSecondary extends Component {
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
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <List>
          {[0, 1, 2, 3].map(value =>
            <ListItem dense button key={value}>
              <Avatar alt="Remy Sharp" src={remyImage} />
              <ListItemText primary={`Line item ${value + 1}`} />
              <ListItemSecondaryAction>
                <Checkbox
                  onClick={event => this.handleToggle(event, value)}
                  checked={this.state.checked.indexOf(value) !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>,
          )}
        </List>
      </div>
    );
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(CheckboxListSecondary);
