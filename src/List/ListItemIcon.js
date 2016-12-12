// @flow weak

import { PropTypes, cloneElement } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('ListItemIcon', () => {
  return {
    root: {
      width: 40,
    },
  };
});

export default function ListItemIcon(props, context) {
  const {
    children,
    className: classNameProp,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);

  return cloneElement(children, {
    className: classNames(classes.root, classNameProp, children.props.className),
    ...other,
  });
}

ListItemIcon.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
};

ListItemIcon.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
