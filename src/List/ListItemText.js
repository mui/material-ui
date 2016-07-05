// @flow
import React, {Component, Element, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';
import shallowEqual from 'recompose/shallowEqual';
import Text from '../Text';

export const styleSheet = createStyleSheet('ListItemText', (theme) => {
  return {
    root: {
      flex: '1 1 auto',
      padding: '0 16px',
    },
    secondary: {
      color: theme.palette.text.secondary,
    },
  };
});

type Props = {
  className?: string,
  primary?: Object,
  secondary?: Object,
};

export default class ListItemText extends Component<void, Props, void> {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps:Props, nextState:any, nextContext:{styleManager: Object}) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.context, nextContext)
    );
  }

  props:Props;

  render():Element {
    const {className, primary, secondary, ...other} = this.props;
    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});
    const classNames = ClassNames(classes.root, className);
    return (
      <div className={classNames} {...other}>
        {primary && (
          typeof primary === 'string' ? (
            <Text type="subheading">{primary}</Text>
          ) : {primary}
        )}
        {secondary && (
          typeof secondary === 'string' ? (
            <Text className={classes.secondary} type="body1">{secondary}</Text>
          ) : {secondary}
        )}
      </div>
    );
  }
}
