import React from 'react';
import getMuiTheme from '../styles/getMuiTheme';
import EventListener from 'react-event-listener';

const rowsHeight = 24;

function getStyles(props, state) {
  return {
    root: {
      position: 'relative', //because the shadow has position: 'absolute'
    },
    textarea: {
      height: state.height,
      width: '100%',
      resize: 'none',
      font: 'inherit',
      padding: 0,
      cursor: props.disabled ? 'default' : 'initial',
    },
    shadow: {
      resize: 'none',
      // Overflow also needed to here to remove the extra row
      // added to textareas in Firefox.
      overflow: 'hidden',
      // Visibility needed to hide the extra text area on ipads
      visibility: 'hidden',
      position: 'absolute',
      height: 'initial',
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
    shadowStyle: React.PropTypes.object,
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

  handleResize(event) {
    this._syncHeightWithShadow(undefined, event);
  },

  getInputNode() {
    return this.refs.input;
  },

  setValue(value) {
    this.getInputNode().value = value;
    this._syncHeightWithShadow(value);
  },

  _syncHeightWithShadow(newValue, event) {
    const shadow = this.refs.shadow;

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
        this.props.onHeightChange(event, newHeight);
      }
    }
  },

  handleChange(event) {
    this._syncHeightWithShadow(event.target.value);

    if (this.props.hasOwnProperty('valueLink')) {
      this.props.valueLink.requestChange(event.target.value);
    }

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  },

  render() {
    const {
      onChange,
      onHeightChange,
      rows,
      shadowStyle,
      style,
      textareaStyle,
      valueLink,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);
    const rootStyles = Object.assign({}, styles.root, style);
    const textareaStyles = Object.assign({}, styles.textarea, textareaStyle);
    const shadowStyles = Object.assign({}, textareaStyles, styles.shadow, shadowStyle);

    if (this.props.hasOwnProperty('valueLink')) {
      other.value = this.props.valueLink.value;
    }

    return (
      <div style={prepareStyles(rootStyles)}>
        <EventListener elementName="window" onResize={this.handleResize} />
        <textarea
          ref="shadow"
          style={prepareStyles(shadowStyles)}
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
          style={prepareStyles(textareaStyles)}
          onChange={this.handleChange}
        />
      </div>
    );
  },

});

export default EnhancedTextarea;
