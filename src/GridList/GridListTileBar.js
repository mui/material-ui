// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
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

function GridListTileBar(props) {
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

GridListTileBar.propTypes = {
  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the tile itself).
   */
  actionIcon: PropTypes.element,
  /**
   * Position of secondary action IconButton.
   */
  actionPosition: PropTypes.oneOf(['left', 'right']),
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * String or element serving as subtitle (support text).
   */
  subtitle: PropTypes.node,
  /**
   * Title to be displayed on tile.
   */
  title: PropTypes.node.isRequired,
  /**
   * Position of the title bar.
   */
  titlePosition: PropTypes.oneOf(['top', 'bottom']),
};

GridListTileBar.defaultProps = {
  titlePosition: 'bottom',
  actionPosition: 'right',
};

export default withStyles(styles, { name: 'MuiGridListTileBar' })(GridListTileBar);
