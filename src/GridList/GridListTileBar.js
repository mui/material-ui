// @flow weak

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 48,
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    fontFamily: theme.typography.fontFamily,
  },
  rootBottom: {
    bottom: 0,
  },
  rootTop: {
    top: 0,
  },
  rootWithSubtitle: {
    height: 68,
  },
  titleWrap: {
    flexGrow: 1,
    marginLeft: theme.mixins.gutters({}).paddingLeft,
    marginRight: theme.mixins.gutters({}).paddingRight,
    color: 'white',
    overflow: 'hidden',
  },
  titleWrapActionLeft: {
    marginLeft: 0,
  },
  titleWrapActionRight: {
    marginRight: 0,
  },
  title: {
    fontSize: 16,
    lineHeight: '24px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  actionIconPositionLeft: {
    order: -1,
  },
  childImg: {
    height: '100%',
    transform: 'translateX(-50%)',
    position: 'relative',
    left: '50%',
  },
});

export type TitlePosition = 'top' | 'bottom';
export type ActionPosition = 'left' | 'right';

type ProvidedProps = {
  actionPosition: ActionPosition,
  classes: Object,
  titlePosition: TitlePosition,
};

export type Props = {
  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the tile itself).
   */
  actionIcon?: Node,
  /**
   * Position of secondary action IconButton.
   */
  actionPosition?: ActionPosition,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * String or element serving as subtitle (support text).
   */
  subtitle?: Node,
  /**
   * Title to be displayed on tile.
   */
  title: Node,
  /**
   * Position of the title bar.
   */
  titlePosition?: TitlePosition,
};

function GridListTileBar(props: ProvidedProps & Props) {
  const {
    actionIcon,
    actionPosition,
    classes,
    className: classNameProp,
    subtitle,
    title,
    titlePosition,
    ...other
  } = props;

  const actionPos = actionIcon && actionPosition;
  const className = classNames(
    classes.root,
    {
      [classes.rootBottom]: titlePosition === 'bottom',
      [classes.rootTop]: titlePosition === 'top',
      [classes.rootWithSubtitle]: subtitle,
    },
    classNameProp,
  );

  // Remove the margin between the title / subtitle wrapper, and the Action Icon
  const titleWrapClassName = classNames(classes.titleWrap, {
    [classes.titleWrapActionLeft]: actionPos === 'left',
    [classes.titleWrapActionRight]: actionPos === 'right',
  });

  return (
    <div className={className} {...other}>
      <div className={titleWrapClassName}>
        <div className={classes.title}>{title}</div>
        {subtitle ? <div className={classes.subtitle}>{subtitle}</div> : null}
      </div>
      {actionIcon ? (
        <div className={classNames({ [classes.actionIconPositionLeft]: actionPos === 'left' })}>
          {actionIcon}
        </div>
      ) : null}
    </div>
  );
}

GridListTileBar.defaultProps = {
  actionPosition: 'right',
  titlePosition: 'bottom',
};

export default withStyles(styles, { name: 'MuiGridListTileBar' })(GridListTileBar);
