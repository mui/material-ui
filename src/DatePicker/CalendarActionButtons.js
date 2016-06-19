import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';

import FlatButton from '../FlatButton';

const styleSheet = createStyleSheet('CalendarActionButton', () => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  };
});

const styles = {
  flatButtons: {
    margin: '4px 8px 8px 0px',
    minWidth: 64,
  },
};

class CalendarActionButton extends Component {
  static propTypes = {
    autoOk: PropTypes.bool,
    cancelLabel: PropTypes.node,
    okLabel: PropTypes.node,
    onTouchTapCancel: PropTypes.func,
    onTouchTapOk: PropTypes.func,
    wordings: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      cancelLabel,
      okLabel,
      wordings,
      onTouchTapOk,
      autoOk,
    } = this.props;

    const classes = this.context.muiTheme.styleManager.render(styleSheet);

    return (
      <div className={classes.root} >
        <FlatButton
          label={wordings ? wordings.cancel : cancelLabel}
          onTouchTap={this.props.onTouchTapCancel}
          primary={true}
          style={styles.flatButtons}
        />
        {!autoOk &&
          <FlatButton
            disabled={this.refs.calendar !== undefined && this.refs.calendar.isSelectedDateDisabled()}
            label={wordings ? wordings.ok : okLabel}
            onTouchTap={onTouchTapOk}
            primary={true}
            style={styles.flatButtons}
          />
        }
      </div>
    );
  }
}

export default CalendarActionButton;
