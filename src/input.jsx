let React = require('react');
let Classable = require('./mixins/classable');
let ClassNames = require('classnames');


let Input = React.createClass({

  propTypes: {
    multiline: React.PropTypes.bool,
    inlinePlaceholder: React.PropTypes.bool,
    rows: React.PropTypes.number,
    inputStyle: React.PropTypes.string,
    error: React.PropTypes.string,
    description: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    type: React.PropTypes.string,
    onChange: React.PropTypes.func
  },

  mixins: [Classable],

  getInitialState() {
    return {
      value: this.props.defaultValue,
      rows: this.props.rows
    };
  },

  getDefaultProps() {
    return {
      multiline: false,
      type: "text"
    };
  },

  componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Input has been deprecated. Please use TextField instead. See http://material-ui.com/#/components/text-fields');
    }
  },

  render() {
    let classes = this.getClasses('mui-input', {
      'mui-floating': this.props.inputStyle === 'floating',
      'mui-text': this.props.type === 'text',
      'mui-error': this.props.error || false,
      'mui-disabled': !!this.props.disabled,
    });
    let placeholder = this.props.inlinePlaceholder ? this.props.placeholder : "";
    let inputIsNotEmpty = !!this.state.value;
    let inputClassName = ClassNames({
      'mui-is-not-empty': inputIsNotEmpty
    });
    let textareaClassName = ClassNames({
      'mui-input-textarea': true,
      'mui-is-not-empty': inputIsNotEmpty
    });
    let inputElement = this.props.multiline ?
      this.props.valueLink ?
        <textarea {...this.props} ref="input"
          className={textareaClassName}
          placeholder={placeholder}
          rows={this.state.rows} /> :
        <textarea {...this.props} ref="input"
          value={this.state.value}
          className={textareaClassName}
          placeholder={placeholder}
          rows={this.state.rows}
          onChange={this._onTextAreaChange} /> :
        this.props.valueLink ?
          <input {...this.props} ref="input"
            className={inputClassName}
            placeholder={placeholder} /> :
          <input {...this.props} ref="input"
            className={inputClassName}
            value={this.state.value}
            placeholder={placeholder}
            onChange={this._onInputChange} />;
    let placeholderSpan = this.props.inlinePlaceholder ? null :
      <span className="mui-input-placeholder" onClick={this._onPlaceholderClick}>
        {this.props.placeholder}
      </span>;

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

  getValue() {
    return this.state.value;
  },

  setValue(txt) {
    this.setState({value: txt});
  },

  clearValue() {
    this.setValue('');
  },

  blur() {
    if (this.isMounted()) React.findDOMNode(this.refs.input).blur();
  },

  focus() {
    if (this.isMounted()) React.findDOMNode(this.refs.input).focus();
  },

  _onInputChange(e) {
    let value = e.target.value;
    this.setState({value: value});
    if (this.props.onChange) this.props.onChange(e, value);
  },

  _onPlaceholderClick() {
    this.focus();
  },

  _onTextAreaChange(e) {
    this._onInputChange(e);
    this._onLineBreak(e);
  },

  _onLineBreak(e) {
    let value = e.target.value;
    let lines = value.split('\n').length;

    if (lines > this.state.rows) {
      if (this.state.rows !== 20) {
        this.setState({ rows: ((this.state.rows) + 1)});
      }
    }
  }

});

module.exports = Input;
