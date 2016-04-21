import React from 'react';
import FlatButton from '../FlatButton';

class CalendarActionButton extends React.Component {
  static propTypes = {
    cancelLabel: React.PropTypes.node,
    okLabel: React.PropTypes.node,
    onTouchTapCancel: React.PropTypes.func,
    onTouchTapOk: React.PropTypes.func,
    wordings: React.PropTypes.object,
  };

  render() {
    const {cancelLabel, okLabel, wordings} = this.props;

    const styles = {
      root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 0,
        maxHeight: 48,
        padding: 0,
      },
      flatButtons: {
        fontsize: 14,
        margin: '4px 8px 8px 0px',
        maxHeight: 36,
        minWidth: 64,
        padding: 0,
      },
    };

    return (
      <div style={styles.root} >
        <FlatButton
          key={0}
          label={wordings ? wordings.cancel : cancelLabel}
          onTouchTap={this.props.onTouchTapCancel}
          primary={true}
          style={styles.flatButtons}
        />
        <FlatButton
          disabled={this.refs.calendar !== undefined && this.refs.calendar.isSelectedDateDisabled()}
          key={1}
          label={wordings ? wordings.ok : okLabel}
          onTouchTap={this.props.onTouchTapOk}
          primary={true}
          style={styles.flatButtons}
        />
      </div>
    );
  }
}

export default CalendarActionButton;
