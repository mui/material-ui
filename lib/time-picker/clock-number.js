'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var React = require('react');
var StylePropable = require('../mixins/style-propable');

var ClockNumber = React.createClass({
  displayName: 'ClockNumber',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    value: React.PropTypes.number,
    type: React.PropTypes.oneOf(['hour', 'minute']),
    onSelected: React.PropTypes.func,
    isSelected: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      value: 0,
      type: 'minute',
      isSelected: false
    };
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.timePicker;
  },

  render: function render() {
    var pos = this.props.value;
    var inner = false;

    if (this.props.type === 'hour') {
      inner = pos < 1 || pos > 12;
      pos %= 12;
    } else {
      pos = pos / 5;
    }

    var positions = [[0, 5], [54.5, 16.6], [94.4, 59.5], [109, 114], [94.4, 168.5], [54.5, 208.4], [0, 223], [-54.5, 208.4], [-94.4, 168.5], [-109, 114], [-94.4, 59.5], [-54.5, 19.6]];

    var innerPositions = [[0, 40], [36.9, 49.9], [64, 77], [74, 114], [64, 151], [37, 178], [0, 188], [-37, 178], [-64, 151], [-74, 114], [-64, 77], [-37, 50]];

    var styles = {
      root: {
        display: 'inline-block',
        position: 'absolute',
        width: 32,
        height: 32,
        borderRadius: '100%',
        left: 'calc(50% - 16px)',
        top: 10,
        textAlign: 'center',
        paddingTop: 5,
        userSelect: 'none', /* Chrome all / Safari all */
        fontSize: '1.1em',
        pointerEvents: 'none',
        boxSizing: 'border-box'
      }
    };

    if (this.props.isSelected) {
      styles.root.backgroundColor = this.getTheme().accentColor;
      styles.root.color = this.getTheme().selectTextColor;
    }

    var transformPos = positions[pos];

    if (inner) {
      styles.root.width = '28px';
      styles.root.height = '28px';
      styles.root.left = 'calc(50% - 14px)';
      transformPos = innerPositions[pos];
    }

    var _transformPos = _slicedToArray(transformPos, 2);

    var x = _transformPos[0];
    var y = _transformPos[1];

    styles.root.transform = 'translate(' + x + 'px, ' + y + 'px)';

    return React.createElement(
      'span',
      { style: this.mergeAndPrefix(styles.root) },
      this.props.value
    );
  }
});

module.exports = ClockNumber;