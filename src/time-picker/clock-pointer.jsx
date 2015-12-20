import React from 'react';
import StylePropable from '../mixins/style-propable';
import muiThemeable from '../muiThemeable';

let ClockPointer = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    hasSelected: React.PropTypes.bool,
    type: React.PropTypes.oneOf(['hour', 'minute']),
    value: React.PropTypes.number,
  },

  getInitialState() {
    return {
      inner: this.isInner(this.props.value),
    };
  },

  getDefaultProps() {
    return {
      value: null,
      type: 'minute',
      hasSelected: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      inner: this.isInner(nextProps.value),
    });
  },

  isInner(value) {
    if (this.props.type !== 'hour' ) {
      return false;
    }
    return value < 1 || value > 12 ;
  },

  getAngle() {
    if (this.props.type === 'hour') {
      return this.calcAngle(this.props.value, 12);
    }

    return this.calcAngle(this.props.value, 60);
  },

  calcAngle(value, base) {
    value %= base;
    let angle = 360 / base * value;
    return angle;
  },

  getTheme() {
    return this.props._muiTheme.timePicker;
  },

  render() {
    if (this.props.value === null) {
      return <span />;
    }

    let angle = this.getAngle();

    let styles = {
      root: {
        height: '30%',
        background: this.getTheme().accentColor,
        width: 2,
        left: 'calc(50% - 1px)',
        position: 'absolute',
        bottom: '50%',
        transformOrigin: 'bottom',
        pointerEvents: 'none',
        transform: 'rotateZ(' + angle + 'deg)',
      },
      mark: {
        background: this.getTheme().selectTextColor,
        border: '4px solid ' + this.getTheme().accentColor,
        width: 7,
        height: 7,
        position: 'absolute',
        top: -5,
        left: -6,
        borderRadius: '100%',
      },
    };

    if (!this.state.inner) {
      styles.root.height = '40%';
    }

    if (this.props.hasSelected) {
      styles.mark.display = 'none';
    }

    return (
        <div style={this.prepareStyles(styles.root)} >
          <div style={this.prepareStyles(styles.mark)} />
        </div>
    );
  },
});

ClockPointer = muiThemeable(ClockPointer);

export default ClockPointer;
