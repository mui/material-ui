'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var Paper = require('../paper');

var DatePickerInline = React.createClass({
  displayName: 'DatePickerInline',

  propTypes: {
    open: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      open: false
    };
  },

  render: function render() {
    var _props = this.props;
    var actions = _props.actions;
    var children = _props.children;
    var open = _props.open;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['actions', 'children', 'open', 'style']);

    if (!open) {
      return React.createElement('span', null);
    }

    var styles = {
      actions: {
        marginRight: 8,
        paddingBottom: 12,
        textAlign: 'right'
      },
      container: {
        zIndex: 3,
        width: '100%',
        position: 'relative',
        display: 'block'
      },
      subContainer: {
        position: 'absolute',
        height: 'auto'
      }
    };
    return React.createElement(
      'div',
      { style: styles.container },
      React.createElement(
        'div',
        { style: styles.subContainer },
        React.createElement(
          Paper,
          other,
          children,
          React.createElement(
            'div',
            { style: styles.actions },
            actions
          )
        )
      )
    );
  }

});

module.exports = DatePickerInline;