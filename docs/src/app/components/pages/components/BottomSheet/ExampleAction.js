import React from 'react';
import BottomSheet from 'material-ui/BottomSheet';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Phone from 'material-ui/svg-icons/communication/phone';
import Email from 'material-ui/svg-icons/communication/email';

export default class BottomSheetExampleSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      action: 'favorite',
    };
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleActionTouchTap = () => {
    this.setState({
      open: false,
    });
    alert('Added to '+this.state.action);
  };

  handleChangeAction = (event) => {
    const value = event.target.value;
    this.setState({
      action: value,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <RaisedButton
          onTouchTap={this.handleTouchTap}
          label="contact with action"
        />
        <br />
        <TextField
          floatingLabelText="Set action name"
          value={this.state.action}
          onChange={this.handleChangeAction}
        />
        <BottomSheet
          open={this.state.open}
          action={this.state.action}
          onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={this.handleRequestClose}
        >
          <List>
            <ListItem
              primaryText="(650) 555-1234"
              secondaryText="Mobile"
              leftIcon={<Phone />}
            />
            <ListItem
              primaryText="(323) 555-6789"
              secondaryText="Work"
              insetChildren={true}
            />
            <Divider inset={true} />
            <ListItem
              primaryText="aliconnors@example.com"
              secondaryText="Personal"
              leftIcon={<Email />}
            />
          </List>
        </BottomSheet>
      </div>
    );
  }
}
