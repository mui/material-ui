// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { createStyleSheet } from 'jss-theme-reactor';
import classnames from 'classnames';
import EventListener from 'react-event-listener';
import withStyles from '../styles/withStyles';

const rowsHeight = 24;

export const styleSheet = createStyleSheet('MuiTextarea', {
  root: {
    position: 'relative', // because the shadow has position: 'absolute',
  },
  textarea: {
    width: '100%',
    height: '100%',
    resize: 'none',
    font: 'inherit',
    padding: 0,
    cursor: 'inherit',
    boxSizing: 'border-box',
    lineHeight: 'inherit',
    border: 'none',
    outline: 'none',
    background: 'transparent',
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
    whiteSpace: 'pre-wrap',
  },
});

class Textarea extends Component {
  shadow: HTMLInputElement;
  singlelineShadow: HTMLInputElement;
  input: HTMLInputElement;
  value: string;

  static defaultProps = {
    rows: 1,
  };

  state = {
    height: null,
  };

  componentWillMount() {
    // <Input> expects the components it renders to respond to 'value'
    // so that it can check whether they are dirty
    this.value = this.props.defaultValue;
    this.setState({
      height: Number(this.props.rows) * rowsHeight,
    });
  }

  componentDidMount() {
    this.syncHeightWithShadow();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.value !== this.props.value ||
      Number(nextProps.rowsMax) !== Number(this.props.rowsMax)
    ) {
      this.syncHeightWithShadow(nextProps.value, null, nextProps);
    }
  }

  componentWillUnmount() {
    this.handleResize.cancel();
  }

  handleResize = debounce(event => {
    this.syncHeightWithShadow(undefined, event);
  }, 100);

  syncHeightWithShadow(newValue, event, props) {
    const shadow = this.shadow;
    const singlelineShadow = this.singlelineShadow;

    const hasNewValue = newValue && newValue !== '';
    const displayText = this.props.hintText && !hasNewValue ? this.props.hintText : newValue;

    if (displayText !== undefined) {
      shadow.value = displayText;
    }

    const lineHeight = singlelineShadow.scrollHeight;
    let newHeight = shadow.scrollHeight;

    // Guarding for jsdom, where scrollHeight isn't present.
    // See https://github.com/tmpvar/jsdom/issues/1013
    if (newHeight === undefined) return;

    props = props || this.props;

    if (Number(props.rowsMax) >= Number(props.rows)) {
      newHeight = Math.min(Number(props.rowsMax) * lineHeight, newHeight);
    }

    newHeight = Math.max(newHeight, lineHeight);

    if (this.state.height !== newHeight) {
      this.setState({
        height: newHeight,
      });

      if (props.onHeightChange) {
        props.onHeightChange(event, newHeight);
      }
    }
  }

  handleChange = event => {
    const value = event.target.value;
    this.syncHeightWithShadow(value);
    this.value = value;
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  handleRefInput = node => {
    this.input = node;
    if (this.props.textareaRef) {
      this.props.textareaRef(node);
    }
  };

  handleRefSinglelineShadow = node => {
    this.singlelineShadow = node;
  };

  handleRefShadow = node => {
    this.shadow = node;
  };

  render() {
    const {
      classes,
      className,
      defaultValue,
      disabled,
      hintText,
      onChange,
      onHeightChange,
      rows,
      rowsMax,
      textareaRef,
      value,
      ...other
    } = this.props;

    return (
      <div className={classes.root} style={{ height: this.state.height }}>
        <EventListener target="window" onResize={this.handleResize} />
        <textarea
          ref={this.handleRefSinglelineShadow}
          className={classnames(classes.shadow, classes.textarea)}
          tabIndex="-1"
          rows="1"
          readOnly
          aria-hidden="true"
          value=""
        />
        <textarea
          ref={this.handleRefShadow}
          className={classnames(classes.shadow, classes.textarea)}
          tabIndex="-1"
          rows={rows}
          defaultValue={defaultValue}
          aria-hidden="true"
          readOnly
          value={value}
        />
        <textarea
          ref={this.handleRefInput}
          rows={rows}
          className={classnames(classes.textarea, className)}
          onChange={this.handleChange}
          defaultValue={defaultValue}
          value={value}
          {...other}
        />
      </div>
    );
  }
}

Textarea.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  hintText: PropTypes.string,
  onChange: PropTypes.func,
  onHeightChange: PropTypes.func,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Maxium number of rows to display when multiline option is set to true.
   */
  rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Use that property to pass a ref callback to the native textarea component.
   */
  textareaRef: PropTypes.func,
  value: PropTypes.string,
};

export default withStyles(styleSheet)(Textarea);
