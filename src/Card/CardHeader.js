// @flow
// @inheritedComponent CardContent

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
import CardContent from './CardContent';

export const styles = (theme: Object) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    flex: '0 0 auto',
    marginRight: theme.spacing.unit * 2,
  },
  content: {
    flex: '1 1 auto',
  },
  title: {},
  subheader: {},
});

type DefaultProps = {
  classes: Object,
};

export type Props = {
  /**
   * The Avatar for the Card Header.
   */
  avatar?: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The content of the component.
   */
  subheader?: Node,
  /**
   * The content of the Card Title.
   */
  title?: Node,
};

type AllProps = DefaultProps & Props;

function CardHeader(props: AllProps) {
  const { avatar, classes, className: classNameProp, subheader, title, ...other } = props;

  const className = classNames(classes.root, classNameProp);

  // Adjustments that depend on the presence of an avatar
  const titleType = avatar ? 'body2' : 'headline';
  const subheaderType = avatar ? 'body2' : 'body1';

  return (
    <CardContent className={className} {...other}>
      {avatar &&
        <div className={classes.avatar}>
          {avatar}
        </div>}
      <div className={classes.content}>
        <Typography type={titleType} component="span" className={classes.title}>
          {title}
        </Typography>
        <Typography
          type={subheaderType}
          component="span"
          color="secondary"
          className={classes.subheader}
        >
          {subheader}
        </Typography>
      </div>
    </CardContent>
  );
}

export default withStyles(styles, { name: 'MuiCardHeader' })(CardHeader);
