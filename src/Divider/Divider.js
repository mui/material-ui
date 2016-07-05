// @flow
import React, {Element} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('Divider', (theme) => {
  const {palette} = theme;

  return {
    root: {
      height: 1,
      margin: '0 -1px 0 0',
      border: 'none',
      backgroundColor: palette.text.divider,
    },
    absolute: {
      margin: 0,
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
    },
  };
});

type Props = {
  absolute?: boolean,
  className?: string,
};

export default function Divider(props:Props, context:{styleManager: Object}):Element {
  const {absolute, className, ...other} = props;
  const classes = context.styleManager.render(styleSheet, {group: 'mui'});
  const classNames = ClassNames(classes.root, {
    [classes.absolute]: absolute,
  }, className);
  return (
    <hr className={classNames} {...other} />
  );
}

Divider.contextTypes = {
  styleManager: Object,
};
