// @flow
import React, {Element} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('ListItemIcon', () => {
  return {
    root: {
      flex: '0 0 40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 16px',
      '&:first-child': {
        marginLeft: 0,
      },
    },
  };
});

type Props = {
  children?: Object,
  className?: string,
  primary?: Object,
  secondary?: Object,
};

export default function ListItemIcon(props:Props, context:{styleManager: Object}):Element {
  const {children, className} = props;
  const classes = context.styleManager.render(styleSheet);
  const classNames = ClassNames(classes.root, className);
  return (
    <div className={classNames}>
      {children}
    </div>
  );
}

ListItemIcon.contextTypes = {
  styleManager: Object,
};
