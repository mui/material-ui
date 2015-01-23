var React = require('react');
var Classable = require('./mixins/classable.js');

var EnhancedTextarea = React.createClass({

  mixins: [Classable],

  propTypes: {
    onChange: React.PropTypes.func,
    onHeightChange: React.PropTypes.func,
    textareaClassName: React.PropTypes.string,
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

  render: function() {

    var {
      className,
      onChange,
      onHeightChange,
      textareaClassName,
      rows,
      ...other
    } = this.props;

    var classes = this.getClasses('mui-enhanced-textarea');
    var textareaClassName = 'mui-enhanced-textarea-input';
    var style = {
      height: this.state.height + 'px'
    };

    if (this.props.textareaClassName) {
      textareaClassName += ' ' + this.props.textareaClassName;
    }

    return (
      <div className={classes}>
        <textarea
          ref="shadow"
          className="mui-enhanced-textarea-shadow"
          rows={this.props.rows}
          tabIndex="-1" />
        <textarea
          {...other}
          ref="input"
          className={textareaClassName}
          rows={this.props.rows}
          style={style}
          onChange={this._handleChange} />
      </div>
    );
  },

  getInputNode: function() {
    return this.refs.input.getDOMNode();
  },

  _handleChange: function(e) {
    var shadow = this.refs.shadow.getDOMNode();
    var currentHeight = this.state.height;
    var newHeight;

    shadow.value = e.target.value;
    newHeight = shadow.scrollHeight;

    if (currentHeight !== newHeight) {
      this.setState({height: newHeight});
      if (this.props.onHeightChange) this.props.onHeightChange(e, newHeight);
    }

    if (this.props.onChange) this.props.onChange(e);
  }
});

module.exports = EnhancedTextarea;