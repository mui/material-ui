import React, {Component, PropTypes} from 'react';
import FlatButton from '../FlatButton';
import deprecated from '../utils/deprecatedPropType';

class CalendarActionButton extends Component {
  static propTypes = {
    cancelLabel: PropTypes.node,
    okLabel: PropTypes.node,
    onTouchTapCancel: PropTypes.func,
    onTouchTapOk: PropTypes.func,
    wordings: deprecated(PropTypes.object, 'Instead, use `cancelLabel` and `okLabel`.'),
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
          label={wordings ? wordings.cancel : cancelLabel}
          onTouchTap={this.props.onTouchTapCancel}
          primary={true}
          style={styles.flatButtons}
        />
        <FlatButton
          disabled={this.refs.calendar !== undefined && this.refs.calendar.isSelectedDateDisabled()}
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
