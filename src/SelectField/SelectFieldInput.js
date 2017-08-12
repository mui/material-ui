// @flow weak

import React from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ArrowDropDownIcon from '../svg-icons/arrow-drop-down';

export const styles = (theme: Object) => ({
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
});

type DefaultProps = {
  classes: Object,
};

export type Props = {
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * The CSS class name of the select element.
   */
  className?: string,
  /**
   * The label content.
   */
  label?: string | Element<*>,
  children?: Element<*>,
  /** @ignore */
  onBlur?: Function,
  /** @ignore */
  onFocus?: Function,
  /** @ignore */
  onSelectBlur?: Function,
  /** @ignore */
  onSelectFocus?: Function,
  /**
   * Select options.
   */
  options?: Element<*>,
  /** @ignore */
  rowsMax?: string | number,
};

type AllProps = DefaultProps & Props;

function SelectFieldInput(props: AllProps) {
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
}

export default withStyles(styles, { name: 'MuiSelectFieldInput', index: 2 })(SelectFieldInput);
