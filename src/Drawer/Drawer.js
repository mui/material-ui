// @flow
import React, {Component, Element} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';
import Paper from '../Paper';
import Modal from '../internal/Modal';
import Slide from '../transitions/Slide';

export const styleSheet = createStyleSheet('Drawer', (theme) => {
  return {
    paper: {
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      height: '100vh',
      flex: '1 0 auto',
      zIndex: theme.zIndex.navDrawer,
      willChange: 'transform',
      '&:focus': {
        outline: 'none',
      },
    },
    docked: {
      flex: '0 0 auto',
      paper: {
        borderRight: `1px solid ${theme.palette.text.divider}`,
      },
    },
  };
});

type Props = {
  /**
   * The contents of the `Drawer`
   */
  children?: Element<any>,
  /**
   * The CSS class name of the root element.
   */
  className?: string,
  /**
   * If set to true, the drawer will dock itself
   * and will no longer slide in with an overlay
   */
  docked?: boolean,
  open: boolean,
  /**
   * The CSS class name of the paper element.
   */
  paperClassName?: string,
  zDepth: number,
};

/**
 * This is a drawer
 */
export default class Drawer extends Component {
  static contextTypes = {
    styleManager: Object,
  };

  props:Props = {
    open: false,
    zDepth: 16,
  };

  render():Element<any> {
    const {
      children,
      className,
      docked,
      open,
      paperClassName,
      zDepth,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});

    const drawer = (
      <Slide in={open} transitionAppear={true}>
        <Paper
          zDepth={docked ? 0 : zDepth}
          rounded={false}
          className={ClassNames(classes.paper, paperClassName)}
        >
          {children}
        </Paper>
      </Slide>
    );

    const containerProps = {className, ...other};

    if (docked) {
      return (
        <div className={ClassNames(classes.docked, className)}>
          {drawer}
        </div>
      );
    }

    containerProps.show = open;

    return (
      <Modal {...containerProps}>
        {drawer}
      </Modal>
    );
  }
}
