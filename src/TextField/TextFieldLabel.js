import React, {PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';
import {easing} from '../styles/transitions';

export const styleSheet = createStyleSheet('TextFieldLabel', (theme) => {
  return {
    root: {
      color: theme.palette.text.secondary,
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 0,
      transform: 'translate(0, 14px) scale(1)',
      transformOrigin: 'top left',
    },
    animated: {
      transition: theme.transitions.create('transform', '200ms', null, easing.easeOut),
      willChange: 'transform',
    },
    shrink: {
      transform: 'translate(0, 0px) scale(0.75)',
    },
  };
});

export default function TextFieldLabel(props, context) {
  const {animated, className, shrink, ...other} = props;
  const classes = context.styleManager.render(styleSheet, {group: 'mui'});

  const classNames = ClassNames(classes.root, {
    [classes.animated]: animated,
    [classes.shrink]: shrink,
  }, className);

  return (
    <label className={classNames} {...other} />
  );
}

TextFieldLabel.propTypes = {
  animated: PropTypes.bool,
  className: PropTypes.string,
  shrink: PropTypes.bool,
};

TextFieldLabel.defaultProps = {
  animated: true,
};

TextFieldLabel.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};

TextFieldLabel.muiName = 'TextFieldLabel';
