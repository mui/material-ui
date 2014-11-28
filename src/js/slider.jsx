/**
 * @jsx React.DOM
 */

var React = require('react'),
    Paper = require('./paper.jsx'),
    Classable = require('./mixins/classable.js'),
    Draggable = require('react-draggable');

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
    onChange: React.PropTypes.func
  },

  mixins: [Classable],

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
      disabled: this.props.disabled
    }
  },

  render: function() {
    var classes = this.getClasses('mui-input', {
      'mui-error': this.props.error != null
    });

    var sliderClasses = this.getClasses('mui-slider', {
      'mui-slider-zero': this.state.percent == 0,
      'mui-disabled': this.state.disabled
    });

    var percent = this.state.percent;
    if (percent > 1) percent = 1; else if (percent < 0) percent = 0;

    return (
      <div className={classes}>
        <span className="mui-input-highlight"></span>
        <span className="mui-input-bar"></span>
        <span className="mui-input-description">{this.props.description}</span>
        <span className="mui-input-error">{this.props.error}</span>
        <div className={sliderClasses} onClick={this._onClick}>
          <div ref="track" className="mui-slider-track">
            <Draggable axis="x" bound="point"
              cancel={this.state.disabled ? '*' : null}
              start={{x: (percent * 100) + '%'}}
              onStart={this._onDragStart}
              onStop={this._onDragStop}
              onDrag={this._onDragUpdate}>
              <div className="mui-slider-handle" tabIndex={0}></div>
            </Draggable>
            <div className="mui-slider-selection mui-slider-selection-low"
              style={{width: (percent * 100) + '%'}}>
              <div className="mui-slider-selection-fill"></div>
            </div>
            <div className="mui-slider-selection mui-slider-selection-high"
              style={{width: ((1 - percent) * 100) + '%'}}>
              <div className="mui-slider-selection-fill"></div>
            </div>
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
    var percent = (i - this.props.min) / (this.props.max - this.props.min);
    if (isNaN(percent)) percent = 0;
    this.setState({value: i, percent: percent});
  },

  getPercent: function() {
    return this.state.percent;
  },

  setPercent: function (percent) {
    var value = percent * (this.props.max - this.props.min) + this.props.min;
    this.setState({value: value, percent: percent});
  },

  clearValue: function() {
    this.setValue(0);
  },

  _onClick: function (e) {
    // let draggable handle the slider
    if (this.state.dragging || this.state.disabled) return;
    var node = this.refs.track.getDOMNode();
    var boundingClientRect = node.getBoundingClientRect();
    var offset = e.clientX - boundingClientRect.left;
    var percent = offset / node.clientWidth;
    this.setPercent(percent);
  },

  _onDragStart: function(e, ui) {
    this.setState({
      dragging: true
    });
  },

  _onDragStop: function(e, ui) {
    this.setState({
      dragging: false
    });
  },

  _onDragUpdate: function(e, ui) {
    if (!this.state.dragging) return;
    var value = this.state.value;
    if (!this.props.disabled) this._dragX(ui.position.left);
    if (this.state.value != value && this.props.onChange) {
      this.props.onChange(e, this.state.value);
    }
  },

  _dragX: function(pos) {
    var max = this.refs.track.getDOMNode().clientWidth;
    if (pos < 0) pos = 0; else if (pos > max) pos = max;
    this.setPercent(pos / max);
  }

});

module.exports = Slider;
