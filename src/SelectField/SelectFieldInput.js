// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import customPropTypes from '../utils/customPropTypes';
import ArrowDropDownIcon from '../svg-icons/arrow-drop-down';

const styleSheet = createStyleSheet('MuiSelectFieldInput', theme => {
  return {
    container: {
      position: 'relative',
      width: '100%',
    },
    select: {
      width: '100%',
      paddingRight: theme.spacing.unit * 4,
      position: 'relative',
      zIndex: 2,
    },
    selectEnabled: {
      cursor: 'pointer',
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
    rowsMax,
    ...inputProps
  } = props;
  const selectClassName = classNames(
    !inputProps.disabled && classes.selectEnabled,
    classes.select,
    classNameProp,
  );

  return (
    <div onFocus={onFocus} onBlur={onBlur} className={classes.container}>
      <select
        className={selectClassName}
        onFocus={onSelectFocus}
        onBlur={onSelectBlur}
        {...inputProps}
      >
        {/* Need this option for proper select sizing */}
        <option className={classes.labelHolder}>
          {label}
        </option>
        {React.Children.map(options, (option, index) =>
          <option key={index} value={option.props.value}>
            {option.props.value && option.props.children}
          </option>,
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
  /** @ignore */
  onBlur: PropTypes.func,
  /** @ignore */
  onFocus: PropTypes.func,
  /** @ignore */
  onSelectBlur: PropTypes.func,
  /** @ignore */
  onSelectFocus: PropTypes.func,
  /**
   * Select options.
   */
  options: PropTypes.arrayOf(PropTypes.node),
  /** @ignore */
  rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SelectFieldInput.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default SelectFieldInput;
