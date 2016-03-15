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
        padding: 0,
        maxHeight: 48,
      },
      flatButtons: {
        minWidth: 64,
        maxHeight: 36,
        padding: 0,
        fontsize: 14,
        margin: '4px 8px 8px 0px',
      },
    };

    return (
      <div style={styles.root} >
        <FlatButton
          key={0}
          label={wordings ? wordings.cancel : cancelLabel}
          primary={true}
          style={styles.flatButtons}
          onTouchTap={this.props.onTouchTapCancel}
        />
        <FlatButton
          key={1}
          label={wordings ? wordings.ok : okLabel}
          primary={true}
          disabled={this.refs.calendar !== undefined && this.refs.calendar.isSelectedDateDisabled()}
          style={styles.flatButtons}
          onTouchTap={this.props.onTouchTapOk}
        />
      </div>
    );
  }
}

export default CalendarActionButton;
