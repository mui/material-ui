// @flow
import React, {Component, Element} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';
import Paper from '../Paper';
import Modal from '../internal/Modal';
import Slide from '../internal/transitions/Slide';

export const styleSheet = createStyleSheet('Drawer', () => {
  return {
    paper: {
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      height: '100vh',
      flex: '1 0 auto',
      '&:focus': {
        outline: 'none',
      },
    },
  };
});

type Props = {
  /**
   * The contents of the `Drawer`
   */
  children?: Object,
  /**
   * The CSS class name of the root element.
   */
  className?: string,
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

  render():Element {
    const {
      children,
      className,
      open,
      paperClassName,
      zDepth,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});

    const drawer = (
      <Slide in={open} transitionAppear={true}>
        <Paper
          zDepth={zDepth}
          rounded={false}
          className={ClassNames(classes.paper, paperClassName)}
        >
          {children}
        </Paper>
      </Slide>
    );

    const containerProps = {className, show: open, ...other};

    return (
      <Modal {...containerProps}>
        {drawer}
      </Modal>
    );
  }
}
