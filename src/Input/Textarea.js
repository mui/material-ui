// @flow

import * as React from 'react';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import EventListener from 'react-event-listener';
import withStyles from '../styles/withStyles';

const rowsHeight = 24;

export const styles = {
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

type DefaultProps = {
  classes: Object,
};

export type Props = {
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * @ignore
   */
  defaultValue?: string,
  /**
   * @ignore
   */
  disabled?: boolean,
  /**
   * @ignore
   */
  onChange?: Function,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows?: string | number,
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rowsMax?: string | number,
  /**
   * Use that property to pass a ref callback to the native textarea component.
   */
  textareaRef?: Function,
  /**
   * @ignore
   */
  value?: string,
};

type AllProps = DefaultProps & Props;

type State = {
  height: ?number,
};

class Textarea extends React.Component<AllProps, State> {
  props: AllProps;
  shadow: ?HTMLInputElement;
  singlelineShadow: ?HTMLInputElement;
  input: ?HTMLInputElement;
  value: string;

  static defaultProps = {
    classes: {},
    rows: 1,
  };

  state: State = {
    height: null,
  };

  componentWillMount() {
    // <Input> expects the components it renders to respond to 'value'
    // so that it can check whether they are dirty
    this.value = this.props.value || this.props.defaultValue || '';
    this.setState({
      height: Number(this.props.rows) * rowsHeight,
    });
  }

  componentDidMount() {
    this.syncHeightWithShadow(null);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.value !== this.props.value ||
      Number(nextProps.rowsMax) !== Number(this.props.rowsMax)
    ) {
      this.syncHeightWithShadow(null, nextProps);
    }
  }

  componentWillUnmount() {
    this.handleResize.cancel();
  }

  handleResize = debounce(event => {
    this.syncHeightWithShadow(event);
  }, 166);

  syncHeightWithShadow(event, props = this.props) {
    if (this.shadow && this.singlelineShadow) {
      // The component is controlled, we need to update the shallow value.
      if (typeof this.props.value !== 'undefined') {
        this.shadow.value = props.value || '';
      }

      const lineHeight = this.singlelineShadow.scrollHeight;
      let newHeight = this.shadow.scrollHeight;

      // Guarding for jsdom, where scrollHeight isn't present.
      // See https://github.com/tmpvar/jsdom/issues/1013
      if (newHeight === undefined) {
        return;
      }

      if (Number(props.rowsMax) >= Number(props.rows)) {
        newHeight = Math.min(Number(props.rowsMax) * lineHeight, newHeight);
      }

      newHeight = Math.max(newHeight, lineHeight);

      if (this.state.height !== newHeight) {
        this.setState({
          height: newHeight,
        });
      }
    }
  }

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

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.value = event.target.value;

    if (typeof this.props.value === 'undefined' && this.shadow) {
      // The component is not controlled, we need to update the shallow value.
      this.shadow.value = this.value;
      this.syncHeightWithShadow(event);
    }

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  render() {
    const {
      classes,
      className,
      defaultValue,
      onChange,
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
          aria-hidden="true"
          readOnly
          defaultValue={defaultValue}
          value={value}
        />
        <textarea
          ref={this.handleRefInput}
          rows={rows}
          className={classnames(classes.textarea, className)}
          defaultValue={defaultValue}
          value={value}
          onChange={this.handleChange}
          {...other}
        />
      </div>
    );
  }
}

export default withStyles(styles, { name: 'MuiTextarea' })(Textarea);
