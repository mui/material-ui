// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import { findDOMNode } from 'react-dom';
import keycode from 'keycode';
import querySelectorAll from 'dom-helpers/query/querySelectorAll';
import contains from 'dom-helpers/query/contains';
import activeElement from 'dom-helpers/activeElement';
import ownerDocument from 'dom-helpers/ownerDocument';

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
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /**
     * @ignore
     * For uncontrolled support
     */
    defaultValue: PropTypes.string,
    name: PropTypes.string,
    selectedValue: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
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

      for (let i = 0; i < radios.length; i++) {
        if (radios[i] === currentFocus || contains(radios[i], currentFocus)) {
          currentFocusIndex = i;
          break;
        }
      }

      this.changeFocus(currentFocusIndex, event, radios);
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
      const radios = querySelectorAll(group, '[role="radio"]');
      for (let i = 0; i < radios.length; i++) {
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

  changeFocus(currentFocusIndex = 0, event, radios) {
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
      component,
      name,
      selectedValue: selectedValueProp,
      onChange, // eslint-disable-line no-unused-vars
      ...groupProps,
    } = this.props;

    const selectedValue = this.isControlled ? selectedValueProp : this.state.selectedValue;
    const classes = this.context.styleManager.render(styleSheet, { group: 'mui' });

    groupProps.className = classes.root;
    groupProps['data-mui-test'] = 'RadioGroup';
    groupProps.ref = (c) => this.group = c;
    groupProps.role = 'radiogroup';
    groupProps.onKeyDown = this.handleKeyDown;
    groupProps.onBlur = this.handleBlur;

    return React.createElement(
      component,
      groupProps,
      React.Children.map(children, (child, index) => {
        return React.cloneElement(
          child,
          {
            key: index,
            name,
            checked: selectedValue === child.props.value,
            tabIndex: index === this.state.currentTabIndex ? '0' : '-1',
            onChange: this.handleRadioChange,
            onFocus: this.handleRadioFocus,
          }
        );
      })
    );
  }
}

