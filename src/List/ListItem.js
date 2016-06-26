import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('ListItem', (theme) => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      paddingTop: 8,
      paddingBottom: 8,
      textDecoration: 'none',
    },
    gutters: theme.mixins.gutters({}),
  };
});

export default class ListItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    gutters: PropTypes.bool,
  };

  static defaultProps = {
    component: 'div',
    gutters: true,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {className, component, gutters, ...other} = this.props;
    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});
    const classNames = ClassNames(classes.root, {
      [classes.gutters]: gutters,
    }, className);
    return React.createElement(component, {className: classNames, ...other});
  }
}
