import React from 'react';
import Popover from '../popover/popover';

const styles = {
  actions: {
    marginRight: 8,
    paddingBottom: 12,
    textAlign: 'right',
  },
  container: {
    zIndex: 3,
    width: '100%',
    position: 'relative',
    display: 'block',
  },
  subContainer: {
    position: 'absolute',
    height: 'auto',
  },
};

const DatePickerInline = React.createClass({

  propTypes: {
    actions: React.PropTypes.node,
    children: React.PropTypes.node,
    open: React.PropTypes.bool,
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      open: false,
      anchorOrigin: {
        horizontal: 'left',
        vertical: 'bottom',
      },
      targetOrigin: {
        horizontal: 'left',
        vertical: 'top',
      },
    };
  },

  render() {
    const {
      actions,
      children,
      open,
      style,
      ...other,
    } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.subContainer} ref="anchor">
          <Popover {...other} open={open} anchorEl={this.refs.anchor}>
            {children}
            <div style={styles.actions}>
              {actions}
            </div>
          </Popover>
        </div>
      </div>
    );
  },

});

export default DatePickerInline;
