import { capitalize } from '@material-ui/core/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { deepmerge } from '@material-ui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import imageListItemBarClasses, { getImageListItemBarUtilityClass } from './imageListItemBarClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(styles.root || {}, {
    ...styles[`position${capitalize(styleProps.position)}`],
    ...styles[`titleWrap${capitalize(styleProps.position)}`],
    ...(styleProps.actionIcon && styles[`titleWrapActionPos${capitalize(styleProps.actionPosition)}`]),
    ...(styleProps.actionIcon && styles[`actionIconActionPos${capitalize(styleProps.actionPosition)}`]),
    [`& .${imageListItemBarClasses.title}`]: styles.title,
    [`& .${imageListItemBarClasses.subtitle}`]: styles.subtitle,
    [`& .${imageListItemBarClasses.actionIcon}`]: styles.actionIcon,
  });
};

const useUtilityClasses = (styleProps) => {
  const { classes, position, actionPosition } = styleProps;

  const slots = {
    root: ['root', `position${capitalize(position)}`],
    titleWrap: [
      'titleWrap',
      `titleWrap${capitalize(position)}`,
      `titleWrapActionPos${capitalize(actionPosition)}`,
    ],
    title: ['title'],
    subtitle: ['subtitle'],
    actionIcon: ['actionIcon', `actionIconActionPos${capitalize(actionPosition)}`,],
  };

  return composeClasses(slots, getImageListItemBarUtilityClass, classes);
};

const ImageListItemBarRoot = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiImageListItemBar',
    slot: 'Root',
    overridesResolver,
  },
)(({ theme, styleProps }) => {
  return {
    position: 'absolute',
    left: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    fontFamily: theme.typography.fontFamily,
    ...(styleProps.position === 'bottom' && {
      bottom: 0,
    }),
    ...(styleProps.position === 'top' && {
      top: 0,
    }),
    ...(styleProps.position === 'below' && {
      position: 'relative',
      background: 'transparent',
      alignItems: 'normal',
    }),
  };
});

const ImageListItemBarTitleWrap = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiImageListItemBar',
    slot: 'TitleWrap',
    overridesResolver,
  },
)(({ theme, styleProps }) => {
  return {
    flexGrow: 1,
    padding: '12px 16px',
    color: theme.palette.common.white,
    overflow: 'hidden',
    ...(styleProps.position === 'below' && {
      padding: '6px 0 12px',
      color: 'inherit',
    }),
    ...(styleProps.actionIcon && styleProps.actionPosition === 'left' && {
      paddingLeft: 0,
    }),
    ...(styleProps.actionIcon && styleProps.actionPosition === 'right' && {
      paddingRight: 0,
    }),
  };
});

const ImageListItemBarTitle = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiImageListItemBar',
    slot: 'Title',
    overridesResolver,
  },
)(({ theme }) => {
  return {
    fontSize: theme.typography.pxToRem(16),
    lineHeight: '24px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };
});

const ImageListItemBarSubtitle = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiImageListItemBar',
    slot: 'Subtitle',
    overridesResolver,
  },
)(({ theme }) => {
  return {
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };
});

const ImageListItemBarActionIcon = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiImageListItemBar',
    slot: 'ActionIcon',
    overridesResolver,
  },
)(({ styleProps }) => {
  return {
    ...(styleProps.actionIcon && styleProps.actionPosition === 'left' && {
      order: -1,
    }),
  };
});

const ImageListItemBar = React.forwardRef(function ImageListItemBar(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiImageListItemBar',
  });

  const {
    actionIcon,
    actionPosition = 'right',
    className,
    subtitle,
    title,
    position = 'bottom',
    ...other
  } = props;

  const actionPos = actionIcon && actionPosition;

  const styleProps = { ...props, position, actionPosition };

  const classes = useUtilityClasses(styleProps);

  return (
    <ImageListItemBarRoot
      styleProps={styleProps}
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
      <ImageListItemBarTitleWrap
        styleProps={styleProps}
        className={clsx(classes.titleWrap, {
          [classes.titleWrapBelow]: position === 'below',
          [classes.titleWrapActionPosLeft]: actionPos === 'left',
          [classes.titleWrapActionPosRight]: actionPos === 'right',
        })}
      >
        <ImageListItemBarTitle className={classes.title}>{title}</ImageListItemBarTitle>
        {subtitle ? (
          <ImageListItemBarSubtitle className={classes.subtitle}>
            {subtitle}
          </ImageListItemBarSubtitle>
        ) : null}
      </ImageListItemBarTitleWrap>
      {actionIcon ? (
        <ImageListItemBarActionIcon
          styleProps={styleProps}
          className={clsx(classes.actionIcon, {
            [classes.actionIconActionPosLeft]: actionPos === 'left',
          })}
        >
          {actionIcon}
        </ImageListItemBarActionIcon>
      ) : null}
    </ImageListItemBarRoot>
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * Title to be displayed.
   */
  title: PropTypes.node,
};

export default ImageListItemBar;
