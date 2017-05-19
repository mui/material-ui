// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import PersonIcon from 'material-ui-icons/Person';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';

const emails = [
  'username@gmail.com',
  'user02@gmail.com',
];

class SimpleDialog extends Component {
  static propTypes = {
    onRequestClose: PropTypes.func,
    selectedValue: PropTypes.string,
  };

  handleRequestClose = () => {
    this.props.onRequestClose(this.props.selectedValue);
  };

  handleListItemClick = (value) => {
    this.props.onRequestClose(value);
  };

  render() {
    const {
      onRequestClose, // eslint-disable-line no-unused-vars
      selectedValue,  // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    return (
      <Dialog onRequestClose={this.handleRequestClose} {...other}>
        <DialogTitle>Set backup account</DialogTitle>
        <div>
          <List>
            {emails.map((email) => (
              <ListItem
                button
                onClick={() => this.handleListItemClick(email)}
                key={email}
              >
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItem>
            ))}
            <ListItem
              button
              onClick={() => this.handleListItemClick('addAccount')}
            >
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="add account" />
            </ListItem>
          </List>
        </div>
      </Dialog>
    );
  }
}

const styleSheet = createStyleSheet('SimpleDialogDemo', () => ({
  typography: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 5,
  },
}));

class SimpleDialogDemo extends Component {
  state = {
    open: false,
    selectedValue: emails[1],
  };

  handleRequestClose = (value) => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={() => this.setState({ open: true })}>
          Open simple dialog
        </Button>
        <SimpleDialog
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        />
        <Typography type="subheading" className={this.props.classes.typography}>
          Selected: {this.state.selectedValue}
        </Typography>
      </div>
    );
  }
}

SimpleDialogDemo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(SimpleDialogDemo);
