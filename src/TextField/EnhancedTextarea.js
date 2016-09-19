import React, {Component, PropTypes} from 'react';
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
      cursor: props.disabled ? 'not-allowed' : 'initial',
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

class EnhancedTextarea extends Component {
  static propTypes = {
    defaultValue: PropTypes.any,
    disabled: PropTypes.bool,
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
    this.syncHeightWithShadow();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.syncHeightWithShadow(nextProps.value);
    }
  }

  handleResize = (event) => {
    this.syncHeightWithShadow(undefined, event);
  };

  getInputNode() {
    return this.refs.input;
  }

  setValue(value) {
    this.getInputNode().value = value;
    this.syncHeightWithShadow(value);
  }

  syncHeightWithShadow(newValue, event) {
    const shadow = this.refs.shadow;

    if (newValue !== undefined) {
      shadow.value = newValue;
    }

    let newHeight = shadow.scrollHeight;

    // Guarding for jsdom, where scrollHeight isn't present.
    // See https://github.com/tmpvar/jsdom/issues/1013
    if (newHeight === undefined) return;

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
  }

  handleChange = (event) => {
    this.syncHeightWithShadow(event.target.value);

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
      textareaStyle,
      valueLink, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);
    const rootStyles = Object.assign(styles.root, style);
    const textareaStyles = Object.assign(styles.textarea, textareaStyle);
    const shadowStyles = Object.assign({}, textareaStyles, styles.shadow, shadowStyle);

    if (this.props.hasOwnProperty('valueLink')) {
      other.value = this.props.valueLink.value;
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
  }
}

export default EnhancedTextarea;
