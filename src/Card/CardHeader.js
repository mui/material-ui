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

  // adjustments that depend on the presence of an avatar
  const titleType = avatar ? 'body2' : 'headline';
  const subheaderType = avatar ? 'body2' : 'body1';

  return (
    <CardContent className={className} {...other}>
      {avatar &&
        <div className={classes.avatar}>
          {avatar}
        </div>
      }
      <div className={classes.content}>
        <Text type={titleType}>
          {title}
        </Text>
        <Text type={subheaderType} secondary className={classes.contentSecondary}>
          {subheader}
        </Text>
      </div>
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
