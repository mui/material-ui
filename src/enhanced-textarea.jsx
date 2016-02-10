import React from 'react';
import getMuiTheme from './styles/getMuiTheme';

const rowsHeight = 24;

function getStyles(props, state) {
  return {
    textarea: {
      height: state.height,
      width: '100%',
      resize: 'none',
      font: 'inherit',
      padding: 0,
    },
    shadow: {
      width: '100%',
      resize: 'none',
      // Overflow also needed to here to remove the extra row
      // added to textareas in Firefox.
      overflow: 'hidden',
      // Visibility needed to hide the extra text area on ipads
      visibility: 'hidden',
      font: 'inherit',
      padding: 0,
      position: 'absolute',
    },
  };
}

const EnhancedTextarea = React.createClass({

  propTypes: {
    defaultValue: React.PropTypes.any,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onHeightChange: React.PropTypes.func,
    rows: React.PropTypes.number,
    rowsMax: React.PropTypes.number,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    textareaStyle: React.PropTypes.object,
    value: React.PropTypes.string,
    valueLink: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      rows: 1,
    };
  },

  getInitialState() {
    return {
      height: this.props.rows * rowsHeight,
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    this._syncHeightWithShadow();
  },

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.value !== this.props.value) {
      this._syncHeightWithShadow(nextProps.value);
    }

    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  getInputNode() {
    return this.refs.input;
  },

  setValue(value) {
    this.getInputNode().value = value;
    this._syncHeightWithShadow(value);
  },

  _syncHeightWithShadow(newValue, e) {
    let shadow = this.refs.shadow;

    if (newValue !== undefined) {
      shadow.value = newValue;
    }

    let newHeight = shadow.scrollHeight;

    if (this.props.rowsMax >= this.props.rows) {
      newHeight = Math.min(this.props.rowsMax * rowsHeight, newHeight);
    }

    newHeight = Math.max(newHeight, rowsHeight);

    if (this.state.height !== newHeight) {
      this.setState({
        height: newHeight,
      });

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

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    if (this.props.hasOwnProperty('valueLink')) {
      other.value = this.props.valueLink.value;
    }

    if (this.props.disabled) {
      style.cursor = 'default';
    }

    return (
      <div style={prepareStyles(Object.assign({}, style))}>
        <textarea
          ref="shadow"
          style={prepareStyles(styles.shadow)}
          tabIndex="-1"
          rows={this.props.rows}
          defaultValue={this.props.defaultValue}
          readOnly={true}
          value={this.props.value}
          valueLink={this.props.valueLink}
        />
        <textarea
          {...other}
          ref="input"
          rows={this.props.rows}
          style={prepareStyles(Object.assign(styles.textarea, textareaStyle))}
          onChange={this._handleChange}
        />
      </div>
    );
  },

});

export default EnhancedTextarea;
