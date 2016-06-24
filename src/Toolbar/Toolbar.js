import React, {Component, PropTypes} from 'react';
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

export default class Toolbar extends Component {
  static propTypes = {
    /**
     * Can be a `ToolbarGroup` to render a group of related items.
     */
    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    gutters: PropTypes.bool,
  };

  static defaultProps = {
    gutters: true,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      children,
      className,
      gutters,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div className={ClassNames(classes.root, {[classes.gutters]: gutters}, className)} {...other} >
        {children}
      </div>
    );
  }
}
