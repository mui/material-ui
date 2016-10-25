// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import CardContent from './CardContent';
import Text from '../Text';

export const styleSheet = createStyleSheet('CardHeader', () => ({
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    flex: '0 0 auto',
    marginRight: 16,
  },
  content: {
    flex: '1 1 auto',
  },
}));

export default function CardHeader(props, context) {
  const {
    avatar,
    className: classNameProp,
    subhead,
    title,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.cardHeader, classNameProp);

  if (avatar) {
    return (
      <CardContent className={className} {...other}>
        <div className={classes.avatar}>
          {avatar}
        </div>
        <div className={classes.content}>
          <Text type="body2" gutterBottom>{title}</Text>
          <Text type="body2" secondary>{subhead}</Text>
        </div>
      </CardContent>
    );
  }

  return (
    <CardContent className={className} {...other}>
      <Text type="headline">{title}</Text>
      <Text type="body1" secondary>{subhead}</Text>
    </CardContent>
  );
}

CardHeader.propTypes = {
  avatar: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  subhead: PropTypes.string,
  title: PropTypes.string,
};

CardHeader.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
