// @flow weak
import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import SwitchBase from '../internal/SwitchBase';
export const styleSheet = createStyleSheet('Radio', (theme) => {
  return {
    default: {
      color: theme.palette.text.secondary,
    },
    checked: {
      color: theme.palette.accent[500],
    },
    label: {
      //  marginLeft: -12,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
  };
});
export default function Radio(props, context) {
  const {
    className,
    checkedClassName,
    label,
    onChange,
    value,
    icon,
    checkedIcon,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const switchProps = {
    className: classNames(classes.default, className),
    checkedClassName: classNames(classes.checked, checkedClassName),
    icon: icon || <i className="fa fa-circle-o"/>,
    checkedIcon: checkedIcon || <i className="fa fa-circle"/>,
    type: 'radio',
    value,
    onChange,
    ...other,
  };
  if (label) {
    switchProps['aria-label'] = label;
    return (
      <label className={classes.label} role="presentation">
        <SwitchBase {...switchProps} isform/>
      </label>
    );
  }
  return <SwitchBase {...switchProps} />;
}
Radio.propTypes = {
  checkedClassName: PropTypes.string,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};
Radio.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
