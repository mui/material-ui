// @flow
import React, {Component, Element, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';
import Paper from '../Paper';

export const styleSheet = createStyleSheet('AppBar', (theme) => {
  const {palette} = theme;

  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: theme.zIndex.appBar,
      '&primary': {
        backgroundColor: palette.primary[500],
        color: palette.getContrastText(palette.primary[500]),
      },
      '&accent': {
        backgroundColor: palette.accent.A200,
        color: palette.getContrastText(palette.accent.A200),
      },
    },
  };
});

type DefaultProps = {
  primary: boolean,
};

type Props = {
  accent?: boolean,
  children?: Element<any>,
  className?: string,
  primary?: boolean,
};

export default class AppBar extends Component<DefaultProps, Props, void> {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  static defaultProps:DefaultProps = {
    primary: true,
  };

  props:Props;

  render():Element<any> {
    const {
      accent,
      children,
      className,
      primary,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});

    const classNames = ClassNames({
      [classes.root]: true,
      [classes.primary]: primary && !accent,
      [classes.accent]: accent,
    }, className);

    return (
      <Paper
        rounded={false}
        zDepth={4}
        className={classNames}
        {...other}
      >
        {children}
      </Paper>
    );
  }
}
