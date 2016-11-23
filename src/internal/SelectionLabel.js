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
  };
});

export default function SelectionLabel(props, context) {
  const { label, labelClassName, children } = props;
  const classes = context.styleManager.render(styleSheet);
  return (
    <label className={classNames(classes.root, labelClassName)} role="presentation">
      {children}
      <span aria-hidden="true" role="presentation">{label}</span>
    </label>
  );
}

SelectionLabel.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node,
  labelClassName: PropTypes.string,
};

SelectionLabel.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
