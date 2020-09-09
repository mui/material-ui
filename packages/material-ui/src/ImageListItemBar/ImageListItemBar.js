import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    fontFamily: theme.typography.fontFamily,
  },
  /* Styles applied to the root element if `position="bottom"`. */
  positionBottom: {
    bottom: 0,
  },
  /* Styles applied to the root element if `position="top"`. */
  positionTop: {
    top: 0,
  },
  /* Styles applied to the root element if `position="below"`. */
  positionBelow: {
    position: 'relative',
    background: 'transparent',
    alignItems: 'normal',
  },
  /* Styles applied to the title and subtitle container element. */
  titleWrap: {
    flexGrow: 1,
    padding: '12px 16px',
    color: theme.palette.common.white,
    overflow: 'hidden',
  },
  /* Styles applied to the title and subtitle container element if `position="below"`. */
  titleWrapBelow: {
    padding: '6px 0 12px',
    color: 'inherit',
  },
  /* Styles applied to the container element if `actionPosition="left"`. */
  titleWrapActionPosLeft: {
    paddingLeft: 0,
  },
  /* Styles applied to the container element if `actionPosition="right"`. */
  titleWrapActionPosRight: {
    paddingRight: 0,
  },
  /* Styles applied to the title container element. */
  title: {
    fontSize: theme.typography.pxToRem(16),
    lineHeight: '24px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  /* Styles applied to the subtitle container element. */
  subtitle: {
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  /* Styles applied to the actionIcon if supplied. */
  actionIcon: {},
  /* Styles applied to the actionIcon if `actionPosition="left"`. */
  actionIconActionPosLeft: {
    order: -1,
  },
});

const ImageListItemBar = React.forwardRef(function ImageListItemBar(props, ref) {
  const {
    actionIcon,
    actionPosition = 'right',
    classes,
    className,
    subtitle,
    title,
    position = 'bottom',
    ...other
  } = props;

  const actionPos = actionIcon && actionPosition;

  return (
    <div
      className={clsx(
        classes.root,
        {
          [classes.positionBelow]: position === 'below',
          [classes.positionBottom]: position === 'bottom',
          [classes.positionTop]: position === 'top',
        },
        className,
      )}
      ref={ref}
      {...other}
    >
      <div
        className={clsx(classes.titleWrap, {
          [classes.titleWrapBelow]: position === 'below',
          [classes.titleWrapActionPosLeft]: actionPos === 'left',
          [classes.titleWrapActionPosRight]: actionPos === 'right',
        })}
      >
        <div className={classes.title}>{title}</div>
        {subtitle ? <div className={classes.subtitle}>{subtitle}</div> : null}
      </div>
      {actionIcon ? (
        <div
          className={clsx(classes.actionIcon, {
            [classes.actionIconActionPosLeft]: actionPos === 'left',
          })}
        >
          {actionIcon}
        </div>
      ) : null}
    </div>
  );
});

ImageListItemBar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the item itself).
   */
  actionIcon: PropTypes.node,
  /**
   * Position of secondary action IconButton.
   * @default 'right'
   */
  actionPosition: PropTypes.oneOf(['left', 'right']),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Position of the title bar.
   * @default 'bottom'
   */
  position: PropTypes.oneOf(['below', 'bottom', 'top']),
  /**
   * String or element serving as subtitle (support text).
   */
  subtitle: PropTypes.node,
  /**
   * Title to be displayed.
   */
  title: PropTypes.node,
};

export default withStyles(styles, { name: 'MuiImageListItemBar' })(ImageListItemBar);
