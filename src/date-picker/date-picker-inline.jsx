import React from 'react';
import Paper from '../paper';

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

class DatePickerInline extends React.Component {
  static propTypes = {
    actions: React.PropTypes.node,
    children: React.PropTypes.node,
    open: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  };

  static defaultProps = {
    open: false,
  };

  render() {
    const {
      actions,
      children,
      open,
      style,
      ...other,
    } = this.props;

    if (!open) {
      return <span />;
    }

    return (
      <div style={styles.container}>
        <div style={styles.subContainer}>
          <Paper {...other}>
            {children}
            <div style={styles.actions}>
              {actions}
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default DatePickerInline;
