// @flow
import React, {Component, PropTypes, Element} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('Toolbar', (theme) => {
  return {
    root: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: 56,
    },
    gutters: theme.mixins.gutters({}),
    [theme.breakpoints.up('sm')]: {
      root: {
        height: 64,
      },
    },
  };
});

type Props = {
  /**
   * Can be a `ToolbarGroup` to render a group of related items.
   */
  children?: Element<any>,
  /**
   * The css class name of the root element.
   */
  className?: string,
  /**
   * If set to true, enables gutter padding
   */
  gutters: boolean,
};

export default function Toolbar(props: Props, context) {
  const {
    children,
    className,
    gutters,
    ...other,
  } = props;

  const classes = context.styleManager.render(styleSheet, {group: 'mui'});
  const classNames = ClassNames(classes.root, {
    [classes.gutters]: gutters,
  }, className);

  return (
    <div className={classNames} {...other} >
      {children}
    </div>
  );
}

Toolbar.defaultProps = {
  gutters: true,
};

Toolbar.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
