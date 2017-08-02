// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';
import ArrowDropDownIcon from '../svg-icons/arrow-drop-down';

export const styleSheet = createStyleSheet(
  'MuiSelectFieldInput',
  theme => ({
    root: {
      position: 'relative',
    },
    select: {
      paddingRight: theme.spacing.unit * 4,
      position: 'relative',
      width: `calc(100% - ${theme.spacing.unit * 4}px)`,
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
  }),
  { index: 2 },
);

const SelectFieldInput = props => {
  const {
    classes,
    label,
    options,
    onFocus,
    onBlur,
    onSelectFocus,
    onSelectBlur,
    rowsMax,
    className: classNameProp,
    ...inputprops
  } = props;
  const selectClassName = classNames(
    !inputprops.disabled && classes.selectEnabled,
    classes.select,
    classNameProp,
  );

  return (
    <div className={classes.root} onFocus={onFocus} onBlur={onBlur} role="button">
      <select
        className={selectClassName}
        onFocus={onSelectFocus}
        onBlur={onSelectBlur}
        {...inputprops}
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
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
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
  options: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  /** @ignore */
  rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default withStyles(styleSheet)(SelectFieldInput);
