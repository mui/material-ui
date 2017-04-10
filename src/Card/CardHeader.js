// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import Text from '../Text';
import CardContent from './CardContent';

export const styleSheet = createStyleSheet('MuiCardHeader', () => ({
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
  contentSecondary: {
    lineHeight: 1,
  },
}));

export default function CardHeader(props, context) {
  const {
    avatar,
    className: classNameProp,
    subheader,
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
          <Text type="body2" gutterBottom>
            {title}
          </Text>
          <Text type="body2" secondary className={classes.contentSecondary}>
            {subheader}
          </Text>
        </div>
      </CardContent>
    );
  }

  return (
    <CardContent className={className} {...other}>
      <Text type="headline">
        {title}
      </Text>
      <Text type="body1" secondary>
        {subheader}
      </Text>
    </CardContent>
  );
}

CardHeader.propTypes = {
  /**
   * The Avatar  for the Card Header.
   */
  avatar: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * The content of the component.
   */
  subheader: PropTypes.node,
  /**
   * The content of the Card Title.
   */
  title: PropTypes.node,
};

CardHeader.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
