// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { createStyleSheet } from 'jss-theme-reactor';
import classnames from 'classnames';
import EventListener from 'react-event-listener';
import customPropTypes from '../utils/customPropTypes';

const rowsHeight = 24;

export const styleSheet = createStyleSheet('MuiTextarea', () => {
  return {
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
  };
});

export default class Textarea extends Component {
  shadow: HTMLInputElement;
  singleLineShadow: HTMLInputElement;
  input: HTMLInputElement;
  value: string;

  static propTypes = {
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
    value: PropTypes.string,
  };

  static defaultProps = {
    rows: 1,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
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
    if (nextProps.value !== this.props.value ||
      Number(nextProps.rowsMax) !== Number(this.props.rowsMax)) {
      this.syncHeightWithShadow(nextProps.value, null, nextProps);
    }
  }

  componentWillUnmount() {
    this.handleResize.cancel();
  }

  handleResize = debounce((event) => {
    this.syncHeightWithShadow(undefined, event);
  }, 100);

  syncHeightWithShadow(newValue, event, props) {
    const shadow = this.shadow;
    const singleLineShadow = this.singleLineShadow;

    const hasNewValue = newValue && newValue !== '';
    const displayText = this.props.hintText && !hasNewValue ? this.props.hintText : newValue;

    if (displayText !== undefined) {
      shadow.value = displayText;
    }

    const lineHeight = singleLineShadow.scrollHeight;
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

  handleChange = (event) => {
    const value = event.target.value;
    this.syncHeightWithShadow(value);
    this.value = value;
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  render() {
    const {
      className,
      defaultValue,
      disabled,
      hintText,
      onChange,
      onHeightChange,
      rows,
      rowsMax,
      value,
      ...other
    } = this.props;

    const { styleManager } = this.context;
    const classes = styleManager.render(styleSheet);

    return (
      <div
        className={classes.root}
        style={{ height: this.state.height }}
      >
        <EventListener target="window" onResize={this.handleResize} />
        <textarea
          ref={(node) => { this.singleLineShadow = node; }}
          className={classnames(classes.shadow, classes.textarea)}
          tabIndex="-1"
          rows="1"
          readOnly
          aria-hidden="true"
          value=""
        />
        <textarea
          ref={(node) => { this.shadow = node; }}
          className={classnames(classes.shadow, classes.textarea)}
          tabIndex="-1"
          rows={rows}
          defaultValue={defaultValue}
          aria-hidden="true"
          readOnly
          value={value}
        />
        <textarea
          ref={(node) => { this.input = node; }}
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
