import React, {PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('TextFieldLabel', (theme) => {
  return {
    root: {
      color: theme.palette.text.secondary,
      position: 'absolute',
      left: 0,
      top: 14,
      zIndex: 0,
    },
  };
});

export default function TextFieldLabel(props, context) {
  const {className, ...other} = props;
  const classes = context.styleManager.render(styleSheet, {group: 'mui'});
  const classNames = ClassNames(classes.root, className);
  return (
    <label className={classNames} {...other} />
  );
}

TextFieldLabel.propTypes = {
  className: PropTypes.string,
};

TextFieldLabel.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};

TextFieldLabel.muiName = 'TextFieldLabel';
