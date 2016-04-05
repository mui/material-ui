import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

export default class SnackbarExampleSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openSingleLine: false,
      openMultiLine: false,
    };
  }

  handleTouchTap = (fieldName) => {
    this.setState({
      [fieldName]: true,
    });
  };

  handleRequestClose = (fieldName) => {
    this.setState({
      [fieldName]: false,
    });
  };

  render() {
    return (
      <div>
        <RaisedButton
          onTouchTap={this.handleTouchTap.bind(null, 'openSingleLine')}
          label="Add to my calendar"
        />
        <RaisedButton
          onTouchTap={this.handleTouchTap.bind(null, 'openMultiLine')}
          label="Add to my calendar - multiline"
          style={{marginLeft: '20px'}}
        />

        <Snackbar
          open={this.state.openSingleLine}
          message="Event added to your calendar"
          autoHideDuration={400000}
          onRequestClose={this.handleRequestClose.bind(null, 'openSingleLine')}
        />

        <Snackbar
          open={this.state.openMultiLine}
          message={`Event added to your calendar. Please do not forget about it.
             Kidding, don't worry - we'll notify you. Maybe.`}
          autoHideDuration={400000}
          multiline={true}
          onRequestClose={this.handleRequestClose.bind(null, 'openMultiLine')}
          action="undo"
        />
      </div>
    );
  }
}

export default SnackbarExampleSimple;
