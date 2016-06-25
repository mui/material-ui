import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';
import Paper from '../Paper';
import Modal from '../internal/Modal';
import Slide from '../Animation/Slide';

export const styleSheet = createStyleSheet('Drawer', () => {
  return {
    paper: {
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

class Drawer extends Component {
  static propTypes = {
    /**
     * The contents of the `Drawer`
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    open: PropTypes.bool,
    /**
     * The CSS class name of the paper element.
     */
    paperClassName: PropTypes.string,
    transition: PropTypes.any,
    zDepth: PropTypes.number,
  };

  static defaultProps = {
    open: false,
    transition: Slide,
    zDepth: 16,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      children,
      className,
      open,
      paperClassName,
      transition, // eslint-disable-line no-unused-vars
      zDepth,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});

    const drawer = (
      <Slide in={open}>
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

export default Drawer;
