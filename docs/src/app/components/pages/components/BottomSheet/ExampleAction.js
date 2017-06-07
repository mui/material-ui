import React from 'react';
import BottomSheet from 'material-ui/BottomSheet';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Phone from 'material-ui/svg-icons/communication/phone';
import Email from 'material-ui/svg-icons/communication/email';


const listStyle = {
  paddingTop: 26
};

export default class BottomSheetExampleSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      action: 'star',
    };
  }

  handleTouchTap = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleActionTouchTap = () => {
    this.setState({
      open: false,
    });
    alert(`Added to ${this.state.action}`);
  };

  handleChangeAction = (event) => {
    const value = event.target.value;
    this.setState({
      action: value,
    });
  };

  render() {
    return (
      <div>
        <RaisedButton
          onTouchTap={this.handleTouchTap}
          label="Toggle contact"
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
          persistent={true}
          onActionTouchTap={this.handleActionTouchTap}
        >
          <List style={listStyle}>
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
            <ListItem
              primaryText="ali_connors@example.com"
              secondaryText="Work"
              insetChildren={true}
            />
          </List>
        </BottomSheet>
      </div>
    );
  }
}
