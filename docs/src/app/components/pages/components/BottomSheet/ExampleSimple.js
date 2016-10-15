import React from 'react';
import BottomSheet from 'material-ui/BottomSheet';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Share from 'material-ui/svg-icons/social/share';
import CloudUpload from 'material-ui/svg-icons/file/cloud-upload';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Print from 'material-ui/svg-icons/action/print';

export default class BottomSheetExampleSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
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
          label="Show More"
        />
        <BottomSheet
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <List>
            <ListItem
              primaryText="Share"
              leftIcon={<Share />}
            />
            <ListItem
              primaryText="Upload"
              leftIcon={<CloudUpload />}
            />
            <ListItem
              primaryText="Copy"
              leftIcon={<ContentCopy />}
            />
            <ListItem
              primaryText="Print this page"
              leftIcon={<Print />}
            />
          </List>
        </BottomSheet>
      </div>
    );
  }
}
