import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('List', () => {
  return {
    root: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    padding: {
      padding: '8px 0',
    },
  };
});

export default class List extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    el: PropTypes.string,
    padding: PropTypes.bool,
  };

  static defaultProps = {
    el: 'div',
    padding: true,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {className, el, padding, ...other} = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    const classNames = ClassNames(classes.root, {
      [classes.padding]: padding,
    }, className);
    return React.createElement(el, {className: classNames, ...other});
  }
}
