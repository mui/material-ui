var React = require('react');
var StylePropable = require('./mixins/style-propable');
var AutoPrefix = require('./styles/auto-prefix');

var EnhancedTextarea = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    onChange: React.PropTypes.func,
    onHeightChange: React.PropTypes.func,
    textareaStyle: React.PropTypes.object,
    rows: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      rows: 1
    };
  },

  getInitialState: function() {
    return {
      height: this.props.rows * 24
    };
  },

  componentDidMount: function() {
    this._syncHeightWithShadow();
  },

  getStyles: function() {
    var styles = {
      root: {
        width: '100%',
        resize: 'none',
        overflow: 'hidden',
        font: 'inherit',
        padding: 0,
      }
    };
    return styles;
  },

  render: function() {

    var {
      onChange,
      onHeightChange,
      rows,
      style,
      textareaStyle,
      valueLink,
      ...other,
    } = this.props;

    var styles = this.getStyles().root;

    var textAreaStyles = {
      width: '100%',
      resize: 'none',
      overflow: 'hidden',
      font: 'inherit',
      padding: 0,
    };

    var inputStyles = this.m(styles,{
      height: this.state.height + 'px',
    });

    inputStyles = this.m(inputStyles, textareaStyle);


    // Overflow also needed to here to remove the extra row 
    // added to textareas in Firefox.
    var shadowStyles = this.m(textAreaStyles, {
      position: 'absolute',
      opacity: 0
    });

    if (this.props.hasOwnProperty('valueLink')) other.value = this.props.valueLink.value;
    if (this.props.disabled) style.cursor = 'default';

    return (
      <div style={this.props.style}>
        <textarea
          ref="shadow"
          style={AutoPrefix.all(shadowStyles)}
          tabIndex="-1"
          rows={this.props.rows}
          defaultValue={this.props.defaultValue}
          readOnly={true}
          value={this.props.value} />
        <textarea
          {...other}
          ref="input"
          style={inputStyles}
          rows={this.props.rows}
          style={AutoPrefix.all(inputStyles)}
          onChange={this._handleChange} />
      </div>
    );
  },

  getInputNode: function() {
    return this.refs.input.getDOMNode();
  },

  _syncHeightWithShadow: function(newValue, e) {
    var shadow = this.refs.shadow.getDOMNode();
    var currentHeight = this.state.height;
    var newHeight;

    if (newValue !== undefined) shadow.value = newValue;
    newHeight = shadow.scrollHeight;
    
    if (currentHeight !== newHeight) {
      this.setState({height: newHeight});
      if (this.props.onHeightChange) this.props.onHeightChange(e, newHeight);
    }
  },

  _handleChange: function(e) {
    this._syncHeightWithShadow(e.target.value);

    if (this.props.hasOwnProperty('valueLink')) {
      this.props.valueLink.requestChange(e.target.value);
    }

    if (this.props.onChange) this.props.onChange(e);
  },
  
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value != this.props.value) {
      this._syncHeightWithShadow(nextProps.value);
    }
  }
});

module.exports = EnhancedTextarea;
