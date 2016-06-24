import React, {PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('AppContent', (theme) => {
  return {
    content: theme.mixins.gutters({
      paddingTop: 80,
      flex: '1 1 100%',
      maxWidth: 900,
      margin: '0 auto',
    }),
  };
});

export default function AppContent(props, context) {
  const {className, ...other} = props;
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={ClassNames(classes.content, className)} {...other} />
  );
}

AppContent.propTypes = {
  className: PropTypes.string,
};

AppContent.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
