let React = require('react');
let StylePropable = require('./mixins/style-propable');
let Draggable = require('react-draggable2');
let Transitions = require('./styles/transitions');
let FocusRipple = require('./ripples/focus-ripple');


/**
  * Verifies min/max range.
  * @param   {Object} props         Properties of the React component.
  * @param   {String} propName      Name of the property to validate.
  * @param   {String} componentName Name of the component whose property is being validated.
  * @returns {Object} Returns an Error if min >= max otherwise null.
  */
let minMaxPropType = (props, propName, componentName) => {
  let error = React.PropTypes.number(props, propName, componentName);
  if (error !== null) return error;

  if (props.min >= props.max) {
    let errorMsg = (propName === 'min') ? 'min should be less than max' : 'max should be greater than min';
    return new Error(errorMsg);
  }
};

/**
  * Verifies value is within the min/max range.
  * @param   {Object} props         Properties of the React component.
  * @param   {String} propName      Name of the property to validate.
  * @param   {String} componentName Name of the component whose property is being validated.
  * @returns {Object} Returns an Error if the value is not within the range otherwise null.
  */
let valueInRangePropType = (props, propName, componentName) => {
  let error = React.PropTypes.number(props, propName, componentName);
  if (error !== null) return error;

  let value = props[propName];
  if (value < props.min || props.max < value) {
    return new Error(propName + ' should be within the range specified by min and max');
  }
};


let Slider = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    name: React.PropTypes.string.isRequired,
    defaultValue: valueInRangePropType,
    description: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.string,
    max: minMaxPropType,
    min: minMaxPropType,
    required: React.PropTypes.bool,
    step: React.PropTypes.number,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onDragStart: React.PropTypes.func,
    onDragStop: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    value: valueInRangePropType,
  },

  getDefaultProps() {
    return {
      defaultValue: 0,
      disabled: false,
      max: 1,
      min: 0,
      required: true,
      step: 0.01,
    };
  },

  getInitialState() {
    let value = this.props.value;
    if (value === undefined) {
      value = this.props.defaultValue;
    }
    let percent = (value - this.props.min) / (this.props.max - this.props.min);
    if (isNaN(percent)) percent = 0;

    return {
      active: false,
      dragging: false,
      focused: false,
      hovered: false,
      percent: percent,
      value: value,
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined) {
      this.setValue(nextProps.value);
    }
  },

  getTheme() {
    return this.context.muiTheme.component.slider;
  },

  getStyles() {
    let size = this.getTheme().handleSize + this.getTheme().trackSize;
    let gutter =
      (this.getTheme().handleSizeDisabled + this.getTheme().trackSize) / 2;
    let fillGutter =
      this.getTheme().handleSizeDisabled - this.getTheme().trackSize;
    let styles = {
      root: {
        touchCallout: 'none',
        userSelect: 'none',
        cursor: 'default',
        height: this.getTheme().handleSizeActive,
        position: 'relative',
        marginTop: 24,
        marginBottom: 48,
      },
      track: {
        position: 'absolute',
        top: (this.getTheme().handleSizeActive - this.getTheme().trackSize) / 2,
        left: 0,
        width: '100%',
        height: this.getTheme().trackSize,
      },
      filledAndRemaining: {
        position: 'absolute',
        top: 0,
        height: '100%',
        transition: Transitions.easeOut(null, 'margin'),
      },
      percentZeroRemaining: {
        left: 1,
        marginLeft: gutter,
      },
      handle: {
        boxSizing: 'border-box',
        position: 'absolute',
        cursor: 'pointer',
        pointerEvents: 'inherit',
        top: ((this.getTheme().handleSizeActive - this.getTheme().trackSize) / 2) + 'px',
        left: '0%',
        zIndex: 1,
        margin: (this.getTheme().trackSize / 2) + 'px 0 0 0',
        width: this.getTheme().handleSize,
        height: this.getTheme().handleSize,
        backgroundColor: this.getTheme().selectionColor,
        backgroundClip: 'padding-box',
        border: '0px solid transparent',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        transition:
          Transitions.easeOut('450ms', 'border') + ',' +
          Transitions.easeOut('450ms', 'width') + ',' +
          Transitions.easeOut('450ms', 'height'),
        overflow: 'visible',
      },
      handleWhenDisabled: {
        boxSizing: 'content-box',
        cursor: 'not-allowed',
        backgroundColor: this.getTheme().trackColor,
        width: this.getTheme().handleSizeDisabled,
        height: this.getTheme().handleSizeDisabled,
        border: '2px solid white',
      },
      handleWhenPercentZero: {
        border: this.getTheme().trackSize + 'px solid ' + this.getTheme().trackColor,
        backgroundColor: this.getTheme().handleFillColor,
        boxShadow: 'none',
      },
      handleWhenActive: {
        borderColor: this.getTheme().trackColorSelected,
        width: this.getTheme().handleSizeActive,
        height: this.getTheme().handleSizeActive,
        transition:
          Transitions.easeOut('450ms', 'backgroundColor') + ',' +
          Transitions.easeOut('450ms', 'width') + ',' +
          Transitions.easeOut('450ms', 'height'),
      },
      ripples: {
        height: '300%',
        width: '300%',
        top: '-12px',
        left: '-12px',
      },
      handleWhenDisabledAndZero: {
        width: (size / 2) + 'px',
        height: (size /2) + 'px',
      },
      handleWhenPercentZeroAndHovered: {
        border: this.getTheme().trackSize + 'px solid ' +
          this.getTheme().handleColorZero,
        width: size + 'px',
        height: size + 'px',
      },
    };
    styles.filled = this.mergeAndPrefix(styles.filledAndRemaining, {
      left: 0,
      backgroundColor: (this.props.disabled) ?
        this.getTheme().trackColor :
        this.getTheme().selectionColor,
      marginRight: fillGutter,
      width: (this.state.percent * 100) + (this.props.disabled ? -1 : 0) + '%',
    });
    styles.remaining = this.mergeAndPrefix(styles.filledAndRemaining, {
      right: 0,
      backgroundColor: this.getTheme().trackColor,
      marginLeft: fillGutter,
      width: ((1 - this.state.percent) * 100) + (this.props.disabled ? -1 : 0) + '%',
    });

    styles.percentZeroRemaining.width = styles.remaining.width - styles.percentZeroRemaining.left;

    return styles;
  },

  render() {
    let { ...others } = this.props;
    let percent = this.state.percent;
    if (percent > 1) percent = 1; else if (percent < 0) percent = 0;
    let gutter = (this.getTheme().handleSizeDisabled + this.getTheme().trackSize) / 2;
    let fillGutter = this.getTheme().handleSizeDisabled - this.getTheme().trackSize;

    let styles = this.getStyles();
    let sliderStyles = this.mergeAndPrefix(styles.root, this.props.style);
    let trackStyles = styles.track;
    let filledStyles = styles.filled;
    let remainingStyles = this.mergeAndPrefix(
      styles.remaining,
      percent === 0 && styles.percentZeroRemaining
    );
    let handleStyles = percent === 0 ? this.mergeAndPrefix(
      styles.handle,
      styles.handleWhenPercentZero,
      this.state.active && styles.handleWhenActive,
      this.state.focused && {outline: 'none'},
      this.state.hovered && styles.handleWhenPercentZeroAndHovered,
      this.props.disabled && styles.handleWhenDisabledAndZero
    ) : this.mergeAndPrefix(
      styles.handle,
      this.state.active && styles.handleWhenActive,
      this.state.focused && {outline: 'none'},
      this.props.disabled && styles.handleWhenDisabled
    );

    let rippleStyle = {height: '12px', width: '12px'};

    if ((this.state.hovered || this.state.focused) && !this.props.disabled) {
      remainingStyles.backgroundColor = this.getTheme().trackColorSelected;
    }

    if (percent === 0) filledStyles.marginRight = gutter;
    if (this.state.percent === 0 && this.state.active) remainingStyles.marginLeft = fillGutter;

    let rippleShowCondition = (this.state.hovered || this.state.focused) && !this.state.active && this.state.percent !== 0;
    let rippleColor = this.state.percent === 0 ? this.getTheme().handleColorZero : this.getTheme().rippleColor;
    let focusRipple;
    if (!this.props.disabled && !this.props.disableFocusRipple) {
      focusRipple = (
        <FocusRipple
          ref="focusRipple"
          key="focusRipple"
          style={rippleStyle}
          innerStyle={styles.ripples}
          show={rippleShowCondition}
          color={rippleColor}/>
      );
    }

    return (
      <div {...others } style={this.props.style}>
        <span className="mui-input-highlight"></span>
        <span className="mui-input-bar"></span>
        <span className="mui-input-description">{this.props.description}</span>
        <span className="mui-input-error">{this.props.error}</span>
        <div style={sliderStyles}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          onMouseDown={this._onMouseDown}
          onMouseEnter={this._onMouseEnter}
          onMouseLeave={this._onMouseLeave}
          onMouseUp={this._onMouseUp} >
          <div ref="track" style={trackStyles}>
              <div style={filledStyles}></div>
              <div style={remainingStyles}></div>
              <Draggable axis="x" bound="point"
                cancel={this.props.disabled ? '*' : null}
                start={{x: (percent * 100) + '%'}}
                constrain={this._constrain()}
                onStart={this._onDragStart}
                onStop={this._onDragStop}
                onDrag={this._onDragUpdate}
                onMouseDown={this._onMouseDownKnob}>
                  <div style={handleStyles} tabIndex={0}>
                    {focusRipple}
                  </div>
              </Draggable>
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

  getValue() {
    return this.state.value;
  },

  setValue(i) {
    // calculate percentage
    let percent = (i - this.props.min) / (this.props.max - this.props.min);
    if (isNaN(percent)) percent = 0;
    // update state
    this.setState({
      value: i,
      percent: percent,
    });
  },

  getPercent() {
    return this.state.percent;
  },

  setPercent(percent) {
    let value = this._alignValue(this._percentToValue(percent));
    this.setState({value: value, percent: percent});
  },

  clearValue() {
    this.setValue(this.props.min);
  },

  _alignValue(val) {
    let { step, min } = this.props;

    let valModStep = (val - min) % step;
    let alignValue = val - valModStep;

    if (Math.abs(valModStep) * 2 >= step) {
      alignValue += (valModStep > 0) ? step : (-step);
    }

    return parseFloat(alignValue.toFixed(5));
  },

  _constrain() {
    let { min, max, step } = this.props;
    return (pos) => {
      let pixelMax = React.findDOMNode(this.refs.track).clientWidth;
      let pixelStep = pixelMax / ((max - min) / step);

      let cursor = min;
      let i;
      for (i = 0; i < (max - min) / step; i++) {
        let distance = (pos.left - cursor);
        let nextDistance = (cursor + pixelStep) - pos.left;
        if (Math.abs(distance) > Math.abs(nextDistance)) {
          cursor += pixelStep;
        }
        else {
          break;
        }
      }

      return {
        left: cursor,
      };
    };
  },

  _onFocus(e) {
    this.setState({focused: true});
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _onBlur(e) {
    this.setState({focused: false, active: false});
    if (this.props.onBlur) this.props.onBlur(e);
  },

  _onMouseDown(e) {
    this._pos = e.clientX;
  },

  _onMouseEnter() {
    this.setState({hovered: true});
  },

  _onMouseLeave() {
    this.setState({hovered: false});
  },

  _onMouseUp(e) {
    if (!this.props.disabled) this.setState({active: false});
    if (!this.state.dragging && Math.abs(this._pos - e.clientX) < 5) {
      let pos = e.clientX - React.findDOMNode(this).getBoundingClientRect().left;
      this._dragX(e, pos);
    }

    this._pos = undefined;
  },

  _onMouseDownKnob() {
    if (!this.props.disabled) this.setState({active: true});
  },

  _onDragStart(e, ui) {
    this.setState({
      dragging: true,
      active: true,
    });
    if (this.props.onDragStart) this.props.onDragStart(e, ui);
  },

  _onDragStop(e, ui) {
    this.setState({
      dragging: false,
      active: false,
    });
    if (this.props.onDragStop) this.props.onDragStop(e, ui);
  },

  _onDragUpdate(e, ui) {
    if (!this.state.dragging) return;
    if (!this.props.disabled) this._dragX(e, ui.position.left);
  },

  _dragX(e, pos) {
    let max = React.findDOMNode(this.refs.track).clientWidth;
    if (pos < 0) pos = 0; else if (pos > max) pos = max;
    if (pos === this.props.min) {
      return this._updateWithChangeEvent(e, 0);
    }
    this._updateWithChangeEvent(e, pos / max);
  },

  _updateWithChangeEvent(e, percent) {
    if (this.state.percent === percent) return;
    this.setPercent(percent);
    let value = this._alignValue(this._percentToValue(percent));
    if (this.props.onChange) this.props.onChange(e, value);
  },

  _percentToValue(percent) {
    return percent * (this.props.max - this.props.min) + this.props.min;
  },

});

module.exports = Slider;
