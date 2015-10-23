const React = require('react');
const Paper = require('../paper');

const DatePickerInline = React.createClass({

  propTypes: {
    open: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      open: false,
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

    if (!open) {
      return <span />;
    }

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
  },

});

module.exports = DatePickerInline;
