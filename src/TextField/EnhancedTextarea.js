import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';

const rowsHeight = 24;

function getStyles(props, context, state) {
  return {
    root: {
      position: 'relative', // because the shadow has position: 'absolute'
    },
    textarea: {
      height: state.height,
      width: '100%',
      resize: 'none',
      font: 'inherit',
      padding: 0,
      cursor: 'inherit',
    },
    shadow: {
      resize: 'none',
      // Overflow also needed to here to remove the extra row
      // added to textareas in Firefox.
      overflow: 'hidden',
      // Visibility needed to hide the extra text area on ipads
      visibility: 'hidden',
      position: 'absolute',
      height: 'auto',
    },
  };
}

class EnhancedTextarea extends Component {
  static propTypes = {
    defaultValue: PropTypes.any,
    disabled: PropTypes.bool,
    hintText: PropTypes.node,
    onChange: PropTypes.func,
    onHeightChange: PropTypes.func,
    rows: PropTypes.number,
    rowsMax: PropTypes.number,
    shadowStyle: PropTypes.object,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    textareaStyle: PropTypes.object,
    value: PropTypes.string,
    valueLink: PropTypes.object,
  };

  static defaultProps = {
    rows: 1,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    height: null,
  };

  componentWillMount() {
    this.setState({
      height: this.props.rows * rowsHeight,
    });
  }

  componentDidMount() {
    this.syncHeightWithShadow(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value ||
        nextProps.rowsMax !== this.props.rowsMax) {
      this.syncHeightWithShadow(nextProps.value, null, nextProps);
    }
  }

  handleResize = (event) => {
    this.syncHeightWithShadow(this.props.value, event);
  };

  getInputNode() {
    return this.refs.input;
  }

  setValue(value) {
    this.getInputNode().value = value;
    this.syncHeightWithShadow(value);
  }

  syncHeightWithShadow(newValue, event, props) {
    const shadow = this.refs.shadow;
    const displayText = this.props.hintText && (newValue === '' || newValue === undefined || newValue === null) ?
      this.props.hintText : newValue;

    if (displayText !== undefined) {
      shadow.value = displayText;
    }

    let newHeight = shadow.scrollHeight;

    // Guarding for jsdom, where scrollHeight isn't present.
    // See https://github.com/tmpvar/jsdom/issues/1013
    if (newHeight === undefined) return;

    props = props || this.props;

    if (props.rowsMax >= props.rows) {
      newHeight = Math.min(props.rowsMax * rowsHeight, newHeight);
    }

    newHeight = Math.max(newHeight, rowsHeight);

    if (this.state.height !== newHeight) {
      const input = this.refs.input;
      const cursorPosition = input.selectionEnd;
      this.setState({
        height: newHeight,
      }, () => {
        input.setSelectionRange(cursorPosition, cursorPosition);
      });

      if (props.onHeightChange) {
        props.onHeightChange(event, newHeight);
      }
    }
  }

  handleChange = (event) => {
    if (!this.props.hasOwnProperty('value')) {
      this.syncHeightWithShadow(event.target.value);
    }

    if (this.props.hasOwnProperty('valueLink')) {
      this.props.valueLink.requestChange(event.target.value);
    }

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  render() {
    const {
      onChange, // eslint-disable-line no-unused-vars
      onHeightChange, // eslint-disable-line no-unused-vars
      rows, // eslint-disable-line no-unused-vars
      rowsMax, // eslint-disable-line no-unused-vars
      shadowStyle,
      style,
      hintText, // eslint-disable-line no-unused-vars
      textareaStyle,
      valueLink,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);
    const rootStyles = Object.assign(styles.root, style);
    const textareaStyles = Object.assign(styles.textarea, textareaStyle);
    const shadowStyles = Object.assign({}, textareaStyles, styles.shadow, shadowStyle);
    const props = {};

    if (this.props.hasOwnProperty('valueLink')) {
      other.value = valueLink.value;
      props.valueLink = valueLink;
    }

    return (
      <div style={prepareStyles(rootStyles)}>
        <EventListener target="window" onResize={this.handleResize} />
        <textarea
          ref="shadow"
          style={prepareStyles(shadowStyles)}
          tabIndex="-1"
          rows={this.props.rows}
          defaultValue={this.props.defaultValue}
          readOnly={true}
          value={this.props.value}
          {...props}
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
  }
}

export default EnhancedTextarea;
