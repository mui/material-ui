// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import { LabelRadio as Radio, RadioGroup } from 'material-ui/Radio';

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

class ConfirmationDialog extends Component {
  static propTypes = {
    onRequestClose: PropTypes.func,
    selectedValue: PropTypes.string,
  };

  state = {
    selectedValue: undefined,
  };

  componentWillMount() {
    this.setState({ selectedValue: this.props.selectedValue });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.selectedValue !== this.props.selectedValue) {
      // eslint-disable-next-line react/no-will-update-set-state
      this.setState({ selectedValue: nextProps.selectedValue });
    }
  }

  radioGroup = null;

  handleEntering = () => {
    this.radioGroup.focus();
  };

  handleCancel = () => {
    this.props.onRequestClose(this.props.selectedValue);
  };

  handleOk = () => {
    this.props.onRequestClose(this.state.selectedValue);
  };

  handleChange = (event, value) => {
    this.setState({ selectedValue: value });
  };

  render() {
    const {
      onRequestClose, // eslint-disable-line no-unused-vars
      selectedValue, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    return (
      <Dialog onEntering={this.handleEntering} {...other}>
        <DialogTitle>Phone Ringtone</DialogTitle>
        <DialogContent>
          <RadioGroup
            innerRef={(node) => { this.radioGroup = node; }}
            aria-label="Gender"
            name="gender"
            selectedValue={this.state.selectedValue}
            onChange={this.handleChange}
          >
            {options.map((option) => (
              <Radio
                label={option}
                value={option}
                key={option}
              />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} primary>Cancel</Button>
          <Button onClick={this.handleOk} primary>Ok</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const styleSheet = createStyleSheet('ConfirmationDialogDemo', (theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  dialog: {
    width: '80%',
    maxHeight: 435,
  },
}));

class ConfirmationDialogDemo extends Component {
  state = {
    anchorEl: undefined,
    open: false,
    selectedValue: 'Dione',
  };

  button = undefined;

  handleClickListItem = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = (value) => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <List>
          <ListItem button divider disabled>
            <ListItemText primary="Interruptions" />
          </ListItem>
          <ListItem
            button
            divider
            aria-haspopup="true"
            aria-controls="ringtone-menu"
            aria-label="Phone ringtone"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary="Phone ringtone"
              secondary={this.state.selectedValue}
            />
          </ListItem>
          <ListItem button divider disabled>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
          <ConfirmationDialog
            maxWidth="xs"
            paperClassName={classes.dialog}
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
            selectedValue={this.state.selectedValue}
          />
        </List>
      </div>
    );
  }
}

ConfirmationDialogDemo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ConfirmationDialogDemo);
