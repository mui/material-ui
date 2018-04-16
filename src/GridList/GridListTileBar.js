import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
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
  titlePositionBottom: {
    bottom: 0,
  },
  titlePositionTop: {
    top: 0,
  },
  rootSubtitle: {
    height: 68,
  },
  titleWrap: {
    flexGrow: 1,
    marginLeft: theme.mixins.gutters().paddingLeft,
    marginRight: theme.mixins.gutters().paddingRight,
    color: theme.palette.common.white,
    overflow: 'hidden',
  },
  titleWrapActionPosLeft: {
    marginLeft: 0,
  },
  titleWrapActionPosRight: {
    marginRight: 0,
  },
  title: {
    fontSize: theme.typography.pxToRem(16),
    lineHeight: '24px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  subtitle: {
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  actionIcon: {},
  actionIconActionPosLeft: {
    order: -1,
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
      [classes.titlePositionBottom]: titlePosition === 'bottom',
      [classes.titlePositionTop]: titlePosition === 'top',
      [classes.rootSubtitle]: subtitle,
    },
    classNameProp,
  );

  // Remove the margin between the title / subtitle wrapper, and the Action Icon
  const titleWrapClassName = classNames(classes.titleWrap, {
    [classes.titleWrapActionPosLeft]: actionPos === 'left',
    [classes.titleWrapActionPosRight]: actionPos === 'right',
  });

  return (
    <div className={className} {...other}>
      <div className={titleWrapClassName}>
        <div className={classes.title}>{title}</div>
        {subtitle ? <div className={classes.subtitle}>{subtitle}</div> : null}
      </div>
      {actionIcon ? (
        <div
          className={classNames(classes.actionIcon, {
            [classes.actionIconActionPosLeft]: actionPos === 'left',
          })}
        >
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
  actionIcon: PropTypes.node,
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
  title: PropTypes.node,
  /**
   * Position of the title bar.
   */
  titlePosition: PropTypes.oneOf(['top', 'bottom']),
};

GridListTileBar.defaultProps = {
  actionPosition: 'right',
  titlePosition: 'bottom',
};

export default withStyles(styles, { name: 'MuiGridListTileBar' })(GridListTileBar);
