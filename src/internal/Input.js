import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('Input', () => {
  return {
    root: {
    },
  };
});

/**
 * Input
 */
export default class Input extends Component {
  static propTypes = {
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * The element or component used for the root node.
     */
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /**
     * Input type
     */
    type: PropTypes.string,
  };

  static defaultProps = {
    component: 'input',
    type: 'text',
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      className,
      component,
      type,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});

    const classNames = ClassNames({
      [classes.root]: true,
    }, className);

    const inputProps = {
      ref: (c) => this.input = c,
      className: classNames,
      ...other,
    };

    if (component === 'input' || typeof component === 'function') {
      inputProps.type = type;
    }

    return React.createElement(component, inputProps);
  }
}
