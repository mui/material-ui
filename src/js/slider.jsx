
var React = require('react');
var Paper = require('./paper');
var Classable = require('./mixins/classable');
var StylePropable = require('./mixins/style-propable');
var Draggable = require('react-draggable2');
var Transitions = require('./styles/mixins/transitions.js');
var CustomVariables = require('./styles/variables/custom-variables.js');

var Slider = React.createClass({

  propTypes: {
    required: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    error: React.PropTypes.string,
    description: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    onDragStart: React.PropTypes.func,
    onDragStop: React.PropTypes.func
  },

  mixins: [Classable, StylePropable],

  getDefaultProps: function() {
    return {
      required: true,
      disabled: false,
      defaultValue: 0,
      min: 0,
      max: 1,
      dragging: false
    };
  },

  getInitialState: function() {
    var value = this.props.value;
    if (value == null) value = this.props.defaultValue;
    var percent = value / this.props.max;
    if (isNaN(percent)) percent = 0;
    return {
      value: value,
      percent: percent,
      focused: false,
      active: false,
      hovered: false
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value != null) {
      this.setValue(nextProps.value);
    }
  },

  render: function() {
    var classes = this.getClasses('mui-input', {
      'mui-error': this.props.error != null
    });

    var sliderClasses = this.getClasses('mui-slider', {
      'mui-slider-zero': this.state.percent == 0,
      'mui-disabled': this.props.disabled
    });


    var percent = this.state.percent;
    
    if (percent > 1) percent = 1; else if (percent < 0) percent = 0;
    
    var fillGutter = CustomVariables.sliderHandleSizeDisabled - CustomVariables.sliderTrackSize;
    
    var sliderStyles = {
      // -webkit-touch-callout: 'none',
      cursor: 'default',
      height: CustomVariables.sliderHandleSizeActive,
      position: 'relative',
    };

    var sliderTrackStyles = {
      position: 'absolute',
      top: (CustomVariables.sliderHandleSizeActive - CustomVariables.sliderTrackSize) / 2,
      left: 0,
      width: '100%',
      height: CustomVariables.sliderTrackSize
    };

    var sliderSelectionLowStyles = {
      position: 'absolute',
      top: 0,
      height: '100%',
      transition: Transitions.easeOut(null, 'margin'),

      left: 0,
      backgroundColor: CustomVariables.sliderSelectionColor,
      marginRight: fillGutter,
      width: (percent * 100) + ((this.props.disabled) ? -1 : 0) + '%'
    };

    var sliderSelectionHighStyles = {
      position: 'absolute',
      top: 0,
      height: '100%',
      transition: Transitions.easeOut(null, 'margin'),

      right: 0,
      backgroundColor: CustomVariables.sliderTrackColor,
      marginLeft: fillGutter,
      width: ((1 - percent) * 100) + ((this.props.disabled) ? -1 : 0) + '%'
    };

    var sliderHandleStyles = {
      position: 'absolute',
      cursor: 'pointer',
      top: 0,
      left: '0%',
      zIndex: 1,
      margin: (CustomVariables.sliderTrackSize / 2) + 'px 0 0 0',   
      width: CustomVariables.sliderHandleSize,
      height: CustomVariables.sliderHandleSize,
      backgroundColor: CustomVariables.sliderHandleFillColor,

      backgroundClip: 'padding-box',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      transition:
        Transitions.easeOut('450ms', 'border') + ',' +
        Transitions.easeOut('450ms', 'width') + ',' +
        Transitions.easeOut('450ms', 'height'),
    };




    var gutter = (CustomVariables.sliderHandleSizeDisabled + CustomVariables.sliderTrackSize) / 2;

    if (this.props.disabled) {

      sliderHandleStyles = this.mergeStyles(sliderHandleStyles, {
        cursor: 'not-allowed',
        backgroundColor: CustomVariables.sliderTrackColor,
        width: CustomVariables.sliderHandleSizeDisabled,
        height: CustomVariables.sliderHandleSizeDisabled,
      });

      sliderSelectionHighStyles.backgroundColor = CustomVariables.sliderTrackColor;
      sliderSelectionLowStyles.backgroundColor = CustomVariables.sliderTrackColor;

    } else {
      sliderHandleStyles = this.mergeStyles(sliderHandleStyles, {
        border: '0px solid transparent',
        backgroundColor: CustomVariables.sliderSelectionColor,
      });
    }


    if (percent === 0) {
      sliderHandleStyles = this.mergeStyles(sliderHandleStyles, {
        border: CustomVariables.sliderTrackSize + 'px solid ' + CustomVariables.sliderTrackColor,
        backgroundColor: CustomVariables.sliderHandleFillColor,
        boxShadow: 'none'
      });

      sliderSelectionHighStyles = this.mergeStyles(sliderSelectionHighStyles, {
        left: 1,
        width: sliderSelectionHighStyles.width - sliderSelectionHighStyles.left
      });
      


      sliderSelectionHighStyles.marginLeft = gutter;
      sliderSelectionLowStyles.marginRight = gutter;

      if ((this.state.hovered || this.state.focused) && !this.props.disabled) {
        var size = CustomVariables.sliderHandleSize + CustomVariables.sliderTrackSize;
        sliderHandleStyles = this.mergeStyles(sliderHandleStyles, {
          border: CustomVariables.sliderTrackSize + 'px solid ' + CustomVariables.sliderHandleColorZero,
          width: size,
          height: size
        });
      }
    } else {

    }

    if (this.state.active && !this.props.disabled) {
        sliderHandleStyles = this.mergeStyles(sliderHandleStyles, {
          borderColor: CustomVariables.sliderTrackColorSelected,
          width: CustomVariables.sliderHandleSizeActive,
          height: CustomVariables.sliderHandleSizeActive,
          transition:
            Transitions.easeOut('450ms', 'backgroundColor') + ',' +
            Transitions.easeOut('450ms', 'width') + ',' +
            Transitions.easeOut('450ms', 'height')
        });
      }

    if (this.state.focused) sliderHandleStyles.outline = 'none';

    if ((this.state.hovered || this.state.focused) && !this.props.disabled) {
      sliderSelectionHighStyles.backgroundColor = CustomVariables.sliderTrackColorSelected;
    }

    if (this.state.percent === 0 && this.state.active) {
      sliderSelectionHighStyles.marginLeft = fillGutter;
    }

    return (
      <div className={classes} style={this.props.style}>
        <span className="mui-input-highlight"></span>
        <span className="mui-input-bar"></span>
        <span className="mui-input-description">{this.props.description}</span>
        <span className="mui-input-error">{this.props.error}</span>
        <div className={sliderClasses} 
          onClick={this._onClick}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          onMouseOver={this._onMouseOver} 
          onMouseOut={this._onMouseOut} 
          onMouseUp={this._onMouseUp} 
          onMouseDown={this._onMouseDown}>
          <div ref="track" style={sliderTrackStyles}>
            <Draggable axis="x" bound="point"
              cancel={this.props.disabled ? '*' : null}
              start={{x: (percent * 100) + '%'}}
              onStart={this._onDragStart}
              onStop={this._onDragStop}
              onDrag={this._onDragUpdate}>
              <div style={sliderHandleStyles} tabIndex={0}></div>
            </Draggable>
            <div style={sliderSelectionLowStyles}></div>
            <div style={sliderSelectionHighStyles}></div>
          </div>
        </div>
        <input ref="input" type="hidden"
          name={this.props.name}
          value={this.state.value}
          required={this.props.required}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step} />
      </div>
    );
  },

  getValue: function() {
    return this.state.value;
  },

  setValue: function(i) {
    // calculate percentage
    var percent = (i - this.props.min) / (this.props.max - this.props.min);
    if (isNaN(percent)) percent = 0;
    // update state
    this.setState({
      value: i,
      percent: percent
    });
  },

  getPercent: function() {
    return this.state.percent;
  },

  setPercent: function (percent) {
    var value = this._percentToValue(percent);
    this.setState({value: value, percent: percent});
  },

  clearValue: function() {
    this.setValue(0);
  },

  _onClick: function (e) {
    // let draggable handle the slider
    if (this.state.dragging || this.props.disabled) return;
    var value = this.state.value;
    var node = this.refs.track.getDOMNode();
    var boundingClientRect = node.getBoundingClientRect();
    var offset = e.clientX - boundingClientRect.left;
    this._updateWithChangeEvent(e, offset / node.clientWidth);
  },

  _onFocus: function (e) {
    this.setState({focused: true});
  },

  _onBlur: function (e) {
    this.setState({focused: false, active: false});
  },

  _onMouseOver: function (e) {
    this.setState({hovered: true});
  },

  _onMouseOut: function (e) {
    this.setState({hovered: false});
  },

  _onMouseUp: function (e) {
    this.setState({active: false});
  },

  _onMouseDown: function (e) {
    this.setState({active: true});
  },

  _onDragStart: function(e, ui) {
    this.setState({
      dragging: true,
      active: true
    });
    if (this.props.onDragStart) this.props.onDragStart(e, ui);
  },

  _onDragStop: function(e, ui) {
    this.setState({
      dragging: false,
      active: false
    });
    if (this.props.onDragStop) this.props.onDragStop(e, ui);
  },

  _onDragUpdate: function(e, ui) {
    if (!this.state.dragging) return;
    if (!this.props.disabled) this._dragX(e, ui.position.left);
  },

  _dragX: function(e, pos) {
    var max = this.refs.track.getDOMNode().clientWidth;
    if (pos < 0) pos = 0; else if (pos > max) pos = max;
    this._updateWithChangeEvent(e, pos / max);
  },

  _updateWithChangeEvent: function(e, percent) {
    if (this.state.percent === percent) return;
    this.setPercent(percent);
    var value = this._percentToValue(percent);
    if (this.props.onChange) this.props.onChange(e, value);
  },

  _percentToValue: function(percent) {
    return percent * (this.props.max - this.props.min) + this.props.min;
  }

});

module.exports = Slider;
