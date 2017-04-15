// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import customPropTypes from '../utils/customPropTypes';
import ArrowDropDownIcon from '../svg-icons/arrow-drop-down';

const styleSheet = createStyleSheet('MuiSelectFieldInput', (theme) => {
  return {
    root: {

      // minWidth: 182
    },
    select: {
      cursor: 'pointer',
      height: 32,
      paddingRight: 32,
      position: 'relative',
      zIndex: 2,
    },
    labelHolder: {
      display: 'none',
    },
    icon: {
      color: theme.palette.text.secondary,
      position: 'absolute',
      right: 0,
      top: 4,
      zIndex: 1,
    },
  };
});

const SelectFieldInput = (props, context) => {
  const classes = context.styleManager.render(styleSheet);
  const {
    label,
    options,
    onFocus,
    onBlur,
    onSelectFocus,
    onSelectBlur,
    className: classNameProp,
    ...inputprops
  } = props;

  return (
    <div
      className={classes.root}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <select
        className={classNames(classNameProp, classes.select)}
        onFocus={onSelectFocus}
        onBlur={onSelectBlur}
        {...inputprops}
      >
        {/* Need this option for proper select sizing */}
        <option className={classes.labelHolder}>{label}</option>
        {React.Children.map(options, (option, index) =>
          React.createElement('option', {
            key: index,
            value: option.props.value,
          }, option.props.value && option.props.children),
        )}
      </select>
      <ArrowDropDownIcon className={classes.icon} />
    </div>
  );
};

SelectFieldInput.propTypes = {
  /**
   * The CSS class name of the select element.
   */
  className: PropTypes.string,
  /**
   * The label text.
   */
  label: PropTypes.node,
  /**
   * Select options.
   */
  options: PropTypes.arrayOf(PropTypes.node),
};

SelectFieldInput.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default SelectFieldInput;
