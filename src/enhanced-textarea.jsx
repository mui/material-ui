let React = require('react');
let StylePropable = require('./mixins/style-propable');
let AutoPrefix = require('./styles/auto-prefix');


let EnhancedTextarea = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    onChange: React.PropTypes.func,
    onHeightChange: React.PropTypes.func,
    textareaStyle: React.PropTypes.object,
    rows: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      rows: 1,
    };
  },

  getInitialState() {
    return {
      height: this.props.rows * 24,
    };
  },

  componentDidMount() {
    this._syncHeightWithShadow();
  },

  getStyles() {
    let styles = {
      root: {
        width: '100%',
        resize: 'none',
        overflow: 'hidden',
        font: 'inherit',
        padding: 0,
      },
    };
    return styles;
  },

  render() {
    let {
      onChange,
      onHeightChange,
      rows,
      style,
      textareaStyle,
      valueLink,
      ...other,
    } = this.props;

    let styles = this.getStyles().root;

    let textAreaStyles = {
      width: '100%',
      resize: 'none',
      overflow: 'hidden',
      font: 'inherit',
      padding: 0,
    };

    let inputStyles = this.mergeAndPrefix(styles, {
      height: this.state.height + 'px',
    });

    inputStyles = this.mergeAndPrefix(inputStyles, textareaStyle);


    // Overflow also needed to here to remove the extra row
    // added to textareas in Firefox.
    let shadowStyles = this.mergeAndPrefix(textAreaStyles, {
      position: 'absolute',
      opacity: 0,
    });

    if (this.props.hasOwnProperty('valueLink')) {
      other.value = this.props.valueLink.value;
    }
    if (this.props.disabled) {
      style.cursor = 'default';
    }

    return (
      <div style={this.props.style}>
        <textarea
          ref="shadow"
          style={AutoPrefix.all(shadowStyles)}
          tabIndex="-1"
          rows={this.props.rows}
          defaultValue={this.props.defaultValue}
          readOnly={true}
          value={this.props.value}
          valueLink={this.props.valueLink} />
        <textarea
          {...other}
          ref="input"
          rows={this.props.rows}
          style={AutoPrefix.all(inputStyles)}
          onChange={this._handleChange} />
      </div>
    );
  },

  getInputNode() {
    return React.findDOMNode(this.refs.input);
  },

  setValue(value) {
    this.getInputNode().value = value;
    this._syncHeightWithShadow(value);
  },

  _syncHeightWithShadow(newValue, e) {
    let shadow = React.findDOMNode(this.refs.shadow);
    let currentHeight = this.state.height;
    let newHeight;

    if (newValue !== undefined) {
      shadow.value = newValue;
    }
    newHeight = shadow.scrollHeight;

    if (currentHeight !== newHeight) {
      this.setState({height: newHeight});
      if (this.props.onHeightChange) {
        this.props.onHeightChange(e, newHeight);
      }
    }
  },

  _handleChange(e) {
    this._syncHeightWithShadow(e.target.value);

    if (this.props.hasOwnProperty('valueLink')) {
      this.props.valueLink.requestChange(e.target.value);
    }

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this._syncHeightWithShadow(nextProps.value);
    }
  },
});

module.exports = EnhancedTextarea;
