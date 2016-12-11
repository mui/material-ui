  // @flow weak

import React, { Component, Children, cloneElement, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

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
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    selectedValue: PropTypes.string,
  };

  static defaultProps = {
    component: 'div',
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  handleRadioChange = (event, checked) => {
    if (checked && this.props.onChange) {
      this.props.onChange(event, event.target.value);
    }
  };

  render() {
    const {
      children,
      className: classNameProp,
      component: ComponentProp,
      name,
      selectedValue,
      onChange, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    return (
      <ComponentProp
        className={classNames(classes.root, classNameProp)}
        data-mui-test="RadioGroup"
        role="radiogroup"
        {...other}
      >
        {Children.map(children, (child, index) => {
          return cloneElement(child, {
            key: index,
            name,
            checked: selectedValue === child.props.value,
            onChange: this.handleRadioChange,
          });
        })}
      </ComponentProp>
    );
  }
}
