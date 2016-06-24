import React, {PropTypes} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('ToolbarTitle', (theme) => {
  return {
    root: {
      ...theme.typography.title,
      marginLeft: 24,
      '&:first-child': {
        marginLeft: 0,
      },
    },
  };
});

export default function ToolbarTitle(props, context) {
  const {className, el, ...other} = props;
  const classes = context.styleManager.render(styleSheet);
  const titleProps = Object.assign(other, {className: ClassNames(classes.root, className)});
  return React.createElement(el ? el : 'h1', titleProps);
}

ToolbarTitle.propTypes = {
  className: PropTypes.string,
  el: PropTypes.string,
};

ToolbarTitle.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
