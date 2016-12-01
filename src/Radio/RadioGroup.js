// @flow weak

import React, { Component, Children, cloneElement, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import keycode from 'keycode';
import querySelectorAll from 'dom-helpers/query/querySelectorAll';
import contains from 'dom-helpers/query/contains';
import activeElement from 'dom-helpers/activeElement';
import ownerDocument from 'dom-helpers/ownerDocument';

function changeFocus(currentFocusIndex = 0, event, radios) {
  const key = keycode(event);

  if (key === 'down' || key === 'right') {
    event.preventDefault();
    if (currentFocusIndex < radios.length - 1) {
      radios[currentFocusIndex + 1].focus();
    } else {
      radios[0].focus();
    }
  } else if (key === 'up' || key === 'left') {
    event.preventDefault();
    if (currentFocusIndex > 0) {
      radios[currentFocusIndex - 1].focus();
    } else {
      radios[radios.length - 1].focus();
    }
  }
}

export const styleSheet = createStyleSheet('RadioGroup', () => {
  return {
    root: {
      flex: '1 1 auto',
      margin: 0,
      padding: 0,
    },
  };
});

export default class RadioGroup extends Component {
  static propTypes = {
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /**
     * @ignore
     * For uncontrolled support
     */
    defaultValue: PropTypes.string,
    /**
     * Whether the label should be displayed in an error state.
     */
    error: PropTypes.bool,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    /**
     * Whether this label should indicate that a response is required.
     */
    required: PropTypes.bool,
    selectedValue: PropTypes.string,
  };

  static defaultProps = {
    component: 'div',
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    radioGroup: PropTypes.object,
  };

  state = {
    currentTabIndex: undefined,
    focused: false, // used for optional label required/error
    selectedValue: undefined, // used for uncontrolled support
  };

  componentWillMount() {
    this.isControlled = this.props.selectedValue !== undefined;

    // not controlled, use internal state
    if (!this.isControlled && this.props.defaultValue) {
      this.setState({ selectedValue: this.props.defaultValue });
    }
  }

  componentDidMount() {
    this.resetTabIndex();
  }

  componentWillUnmount() {
    clearTimeout(this.blurTimer);
  }

  group = undefined;
  blurTimer = undefined;
  isControlled = undefined;

  handleBlur = (event) => {
    this.blurTimer = setTimeout(() => {
      if (this.group) {
        const group = findDOMNode(this.group);
        const currentFocus = activeElement(ownerDocument(group));
        if (!contains(group, currentFocus)) {
          this.resetTabIndex();
        }
      }
    }, 50);

    this.setState({ focused: false });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  handleKeyDown = (event) => {
    const group = findDOMNode(this.group);

    if (group) {
      const currentFocus = activeElement(ownerDocument(group));
      const radios = querySelectorAll(group, '[role="radio"]');

      let currentFocusIndex = -1;

      for (let i = 0; i < radios.length; i += 1) {
        if (radios[i] === currentFocus || contains(radios[i], currentFocus)) {
          currentFocusIndex = i;
          break;
        }
      }

      changeFocus(currentFocusIndex, event, radios);
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  };

  handleRadioChange = (event, checked) => {
    if (checked) {
      if (!this.isControlled) {
        this.setState({ selectedValue: event.target.value });
      }
      if (this.props.onChange) {
        this.props.onChange(event, event.target.value);
      }
    }
  };

  handleRadioFocus = (event) => {
    const group = findDOMNode(this.group);
    if (group) {
      this.setState({ focused: true });
      const radios = querySelectorAll(group, '[role="radio"]');
      for (let i = 0; i < radios.length; i += 1) {
        if (radios[i] === event.currentTarget || contains(radios[i], event.currentTarget)) {
          this.setTabIndex(i);
          break;
        }
      }
    }
  };

  focus() {
    const { currentTabIndex } = this.state;
    if (currentTabIndex && currentTabIndex >= 0) {
      const group = findDOMNode(this.group);
      const radios = querySelectorAll(group, '[role="radio"]');
      if (radios && radios[currentTabIndex]) {
        radios[currentTabIndex].focus();
      }
    }
  }

  resetTabIndex() {
    const group = findDOMNode(this.group);
    const currentFocus = activeElement(ownerDocument(group));
    const radios = querySelectorAll(group, '[role="radio"]');
    const currentFocusIndex = radios.indexOf(currentFocus);

    if (currentFocusIndex !== -1) {
      return this.setTabIndex(currentFocusIndex);
    }

    const selectedRadio = group.querySelector('[aria-checked="true"]');

    if (selectedRadio) {
      return this.setTabIndex(radios.indexOf(selectedRadio));
    }

    return this.setTabIndex(0);
  }

  setTabIndex(n) {
    this.setState({ currentTabIndex: n });
  }

  render() {
    const {
      children,
      className: classNameProp,
      component: ComponentProp,
      error,
      name,
      selectedValue: selectedValueProp,
      onChange, // eslint-disable-line no-unused-vars
      required,
      ...other
    } = this.props;

    const selectedValue = this.isControlled ? selectedValueProp : this.state.selectedValue;
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <ComponentProp
        className={classNames(classes.root, classNameProp)}
        data-mui-test="RadioGroup"
        ref={(c) => { this.group = c; }}
        role="radiogroup"
        {...other}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
      >
        {Children.map(children, (child, index) => {
          const { muiName } = child.type;
          if (muiName === 'FormLabel') {
            return cloneElement(child, {
              error,
              required,
              focused: this.state.focused,
            });
          }

          return cloneElement(child, {
            key: index,
            name,
            checked: selectedValue === child.props.value,
            tabIndex: index === this.state.currentTabIndex ? '0' : '-1',
            onChange: this.handleRadioChange,
            onFocus: this.handleRadioFocus,
          });
        })}
      </ComponentProp>
    );
  }
}

