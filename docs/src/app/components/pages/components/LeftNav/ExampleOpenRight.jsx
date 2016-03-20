import React from 'react';
import LeftNav from 'material-ui/lib/LeftNav';
import AppBar from 'material-ui/lib/AppBar';
import RaisedButton from 'material-ui/lib/RaisedButton';

export default class LeftNavOpenRightExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <RaisedButton
          label="Toggle LeftNav"
          onTouchTap={this.handleToggle}
        />
        <LeftNav width={200} openRight={true} open={this.state.open} >
          <AppBar title="AppBar" />
        </LeftNav>
      </div>
    );
  }
}
