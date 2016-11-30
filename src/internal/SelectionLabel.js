// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('SelectionLabel', () => {
  return {
    root: {
      marginLeft: -12,
      marginRight: 16, // used for row presentation of radio/checkbox
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
    reverse: {
      flexDirection: 'row-reverse',
    },
  };
});

export default function SelectionLabel(props, context) {
  const { label, labelClassName: labelClassNameProp, labelReverse, children } = props;
  const classes = context.styleManager.render(styleSheet);
  const labelClassName = classNames(classes.root, { [classes.reverse]: labelReverse }, labelClassNameProp);
  return (
    <label className={labelClassName} role="presentation">
      {children}
      <span aria-hidden="true" role="presentation">{label}</span>
    </label>
  );
}

SelectionLabel.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node,
  labelClassName: PropTypes.string,
  labelReverse: PropTypes.bool.isRequired,
};

SelectionLabel.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
