/** @jsx React.DOM */

var React = require('react/addons');
var Classable = require('./mixins/classable.js');
var classSet = React.addons.classSet;

var Input = React.createClass({

  propTypes: {
    multiline: React.PropTypes.bool,
    required: React.PropTypes.bool,
    inlinePlaceholder: React.PropTypes.bool,
    rows: React.PropTypes.number,
    inputStyle: React.PropTypes.string,
    error: React.PropTypes.string,
    description: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    type: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func
  },

  mixins: [Classable],

  getInitialState: function() {
    return {
      value: this.props.defaultValue,
      rows: this.props.rows
    };
  },

  getDefaultProps: function() {
    return {
      multiline: false,
      required: true,
      type: "text"
    };
  },

  setError: function(error) {
    this.setProps({ error: error });
  },

  removeError: function() {
    this.setProps({error: undefined});
  },

  render: function() {
    var classes = this.getClasses('mui-input', {
      'mui-floating': this.props.inputStyle === 'floating',
      'mui-text': this.props.type === 'text',
      'mui-error': this.props.error !== undefined && this.props.error !== null,
      'mui-disabled': !!this.props.disabled,
    }),
    placeholder = this.props.inlinePlaceholder ? this.props.placeholder : "",
    inputIsNotEmpty = !!this.state.value,
    inputClassName = classSet({
      'mui-is-not-empty': inputIsNotEmpty
    }),
    textareaClassName = classSet({
      'mui-input-textarea': true,
      'mui-is-not-empty': inputIsNotEmpty
    }),
    inputElement = this.props.multiline ?
      this.props.valueLink ?
        <textarea {...this.props} ref="input" className={textareaClassName} placeholder={placeholder}
          rows={this.state.rows} /> :
        <textarea {...this.props} ref="input" value={this.state.value} className={textareaClassName}
          placeholder={placeholder} rows={this.state.rows} onChange={this._onTextAreaChange} /> :
        this.props.valueLink ?
          <input {...this.props} ref="input" className={inputClassName} placeholder={placeholder} /> :
          <input {...this.props} className={inputClassName} ref="input" value={this.state.value} placeholder={placeholder}
            onChange={this._onInputChange} />
    placeholderSpan = this.props.inlinePlaceholder ? null : <span className="mui-input-placeholder"
      onClick={this._onPlaceholderClick}>{this.props.placeholder}</span>;

    return (
      <div ref={this.props.ref} className={classes}>
        {inputElement}
        {placeholderSpan}
        <span className="mui-input-highlight"></span>
        <span className="mui-input-bar"></span>
        <span className="mui-input-description">{this.props.description}</span>
        <span className="mui-input-error">{this.props.error}</span>
      </div>
    );
  },

  getValue: function() {
    return this.state.value;
  },

  setValue: function(txt) {
    this.setState({value: txt});
  },

  clearValue: function() {
    this.setValue("");
  },

  blur: function() {
    if(this.isMounted()) this.refs.input.getDOMNode().blur();
  },
  
  focus: function() {
    if (this.isMounted()) this.refs.input.getDOMNode().focus();
  },

  _onInputChange: function(e) {
    var value = e.target.value;
    this.setState({value: value});
    if (this.props.onChange) this.props.onChange(e, value);
  },

  _onPlaceholderClick: function(e) {
    this.focus();
  },

  _onTextAreaChange: function(e) {
    this._onInputChange(e);
    this._onLineBreak(e);
  },

  _onLineBreak: function(e) {
    var value = e.target.value,
        input = (value.slice(-1)),
        lines = value.split('\n').length;

    if (lines > this.state.rows) {
      if (this.state.rows != 20) {
        this.setState({ rows: ((this.state.rows) + 1)});
      }
    }
  }

});

module.exports = Input;
