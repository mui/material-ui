// @flow
import React, {Element, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('Paper', (theme) => {
  const {palette} = theme;
  const shadows = {};

  theme.shadows.forEach((shadow, index) => {
    shadows[`dp${index}`] = {
      boxShadow: shadow,
    };
  });

  return {
    root: {
      backgroundColor: palette.background.paper,
      '& rounded': {
        borderRadius: '2px',
      },
    },
    ...shadows,
  };
});

type Props = {
  className?: string,
  rounded: boolean,
  zDepth: number,
};

export default function Paper(props:Props, context:{styleManager: Object}):Element {
  const {className, rounded, zDepth, ...other} = props;
  const classes = context.styleManager.render(styleSheet, {group: 'mui'});

  const classNames = ClassNames(classes.root, {
    [classes.rounded]: rounded,
    [classes[`dp${zDepth >= 0 ? zDepth : 0}`]]: true,
  }, className);

  return (
    <div className={classNames} {...other} />
  );
}

Paper.defaultProps = {
  rounded: true,
  zDepth: 2,
};

Paper.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
