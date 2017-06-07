import React from 'react';
import BottomSheet from 'material-ui/BottomSheet';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {grey600} from 'material-ui/styles/colors';

const styles = {
  leftBody: {
    height: 64,
    float: 'left',
  },
  rightBody: {
    float: 'right',
  },
  icon: {
    color: grey600,
    padding: 16,
    paddingLeft: 16,
    fontSize: 36,
  },
  iconButton: {
    color: grey600,
    paddingTop: 6,
    fontSize: 36,
  },
};

export default class BottomSheetExampleSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleTouchTap = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    return (
      <div>
        <RaisedButton
          onTouchTap={this.handleTouchTap}
          label="Show Inset"
        />
        <BottomSheet
          open={this.state.open}
          persistent={true}
          inset={true}
        >
          <div style={styles.leftBody}>
            <IconButton tooltip="Close sheet" iconStyle={styles.iconButton} onTouchTap={this.handleTouchTap}>
              <FontIcon className="material-icons">close</FontIcon>
            </IconButton>
          </div>
          <div style={styles.rightBody}>
            <FontIcon style={styles.icon} className="material-icons">fast_rewind</FontIcon>
            <FontIcon style={styles.icon} className="material-icons">play_arrow</FontIcon>
            <FontIcon style={styles.icon} className="material-icons">fast_forward</FontIcon>
          </div>
        </BottomSheet>
      </div>
    );
  }
}
