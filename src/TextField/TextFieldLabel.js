// @flow
import React, {PropTypes, Element} from 'react';
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
      lineHeight: 1,
      transform: 'translate(0, 18px) scale(1)',
      transformOrigin: 'top left',
    },
    shrink: {
      transform: 'translate(0, 0px) scale(0.75)',
    },
    animated: {
      transition: theme.transitions.create('transform', '200ms', null, easing.easeOut),
    },
  };
});

type Props = {
  animated?: boolean,
  className?: string,
  shrink?: boolean,
};

export default function TextFieldLabel(props: Props, context: {styleManager: Object}): Element<any> {
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

TextFieldLabel.defaultProps = {
  animated: true,
};

TextFieldLabel.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};

TextFieldLabel.muiName = 'TextFieldLabel';
