// @flow
import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import shallowEqual from 'recompose/shallowEqual';
import ClassNames from 'classnames';
import {easing} from '../styles/transitions';
import {createChainedFunction} from '../utils/helpers';
import TextFieldInput from './TextFieldInput';
import TextFieldLabel from './TextFieldLabel';

export const styleSheet = createStyleSheet('TextField', (theme) => {
  const focusColor = theme.palette.accent.A200;

  return {
    root: {
      display: 'flex',
      position: 'relative',
      marginTop: 16,
      // Expanding underline
      '&:after': {
        backgroundColor: focusColor,
        left: 0,
        bottom: 9,
        content: '\'\'',
        height: 2,
        position: 'absolute',
        width: '100%',
        transform: 'scaleX(0)',
        transition: theme.transitions.create(
          'transform',
          '200ms',
          null,
          easing.easeOut
        ),
      },
      input: {
        display: 'block',
        marginTop: 10,
        marginBottom: 10,
        zIndex: 1,
      },
    },
    focused: {
      label: {
        color: focusColor,
      },
      '&:after': {
        transform: 'scaleX(1)',
      },
    },
  };
});


type Props = {
  /**
   * The contents of the `TextField`
   */
  children?: Element<any>,
  /**
   * The CSS class name of the root element.
   */
  className?: string,
};

type State = {
  dirty: boolean,
  focused: boolean
}

/**
 * TextField
 *
 * @see https://material.google.com/components/text-fields.html
 *
 * ```js
 * import TextField from 'material-ui/TextField';
 *
 * const Component = () => <TextField value="Hello World">;
 * ```
 */
export default class TextField extends Component<void, Props, State> {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state:State = {
    dirty: false,
    focused: false,
  };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  }

  props: Props;
  classes: Object;

  handleFocus = () => this.setState({focused: true});
  handleBlur = () => this.setState({focused: false});

  handleDirty = () => {
    if (!this.state.dirty) {
      this.setState({dirty: true});
    }
  };

  handleClean = () => {
    if (this.state.dirty) {
      this.setState({dirty: false});
    }
  };

  renderChild = (child: TextFieldInput|TextFieldLabel) => {
    const {muiName} = child.type;

    if (muiName === 'TextFieldInput') {
      return this.renderInput(child);
    } else if (muiName === 'TextFieldLabel') {
      return this.renderLabel(child);
    }

    return child;
  };

  renderInput = (input: TextFieldInput) =>
    React.cloneElement(input, {
      className: ClassNames(this.classes.input, input.props.className),
      onDirty: this.handleDirty,
      onClean: this.handleClean,
      onFocus: createChainedFunction(this.handleFocus, input.props.onFocus),
      onBlur: createChainedFunction(this.handleBlur, input.props.onBlur),
    });

  renderLabel = (label: TextFieldLabel) =>
    React.cloneElement(label, {
      className: ClassNames(this.classes.label, label.props.className),
      shrink: label.props.hasOwnProperty('shrink') ? // Shrink the label if dirty or focused
        label.props.shrink : (this.state.dirty || this.state.focused),
    });

  render() {
    const {
      children,
      className,
      ...other,
    } = this.props;

    this.classes = this.context.styleManager.render(styleSheet, {group: 'mui'});

    const classNames = ClassNames({
      [this.classes.root]: true,
      [this.classes.focused]: this.state.focused,
    }, className);

    return (
      <div className={classNames} {...other}>
        {React.Children.map(children, this.renderChild)}
      </div>
    );
  }
}
