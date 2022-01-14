import * as React from 'react';
import PropTypes from 'prop-types';
import { isFragment } from 'react-is';
import clsx from 'clsx';
import { chainPropTypes } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Avatar, { avatarClasses } from '../Avatar';
import avatarGroupClasses, { getAvatarGroupUtilityClass } from './avatarGroupClasses';

const SPACINGS = {
  small: -16,
  medium: null,
};

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    avatar: ['avatar'],
  };

  return composeClasses(slots, getAvatarGroupUtilityClass, classes);
};

const AvatarGroupRoot = styled('div', {
  name: 'MuiAvatarGroup',
  slot: 'Root',
  overridesResolver: (props, styles) => ({
    [`& .${avatarGroupClasses.avatar}`]: styles.avatar,
    ...styles.root,
  }),
})(({ theme, cascade }) => ({
  [`& .${avatarClasses.root}`]: {
    border: `2px solid ${theme.palette.background.default}`,
    boxSizing: 'content-box',
    ...(cascade === 'below'
      ? {
          marginLeft: theme.spacing(-1),
          '&:last-child': {
            marginLeft: 0,
          },
        }
      : {
          marginRight: theme.spacing(-1),
          '&:last-child': {
            marginRight: 0,
          },
        }),
  },
  display: 'flex',
  flexDirection: cascade === 'below' ? 'row-reverse' : 'row',
}));

const AvatarGroupAvatar = styled(Avatar, {
  name: 'MuiAvatarGroup',
  slot: 'Avatar',
  overridesResolver: (props, styles) => styles.avatar,
})(({ theme, cascade }) => ({
  border: `2px solid ${theme.palette.background.default}`,
  boxSizing: 'content-box',
  ...(cascade === 'below'
    ? {
        marginRight: theme.spacing(-1),
      }
    : {
        marginLeft: theme.spacing(-1),
        '&:last-child': {
          marginLeft: 0,
        },
      }),
}));

const AvatarGroup = React.forwardRef(function AvatarGroup(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiAvatarGroup',
  });

  const {
    children: childrenProp,
    className,
    max = 5,
    spacing = 'medium',
    total,
    variant = 'circular',
    cascade = 'below',
    ...other
  } = props;
  let clampedMax = max < 2 ? 2 : max;

  const ownerState = {
    ...props,
    max,
    spacing,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const children = React.Children.toArray(childrenProp).filter((child) => {
    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(
          [
            "MUI: The AvatarGroup component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join('\n'),
        );
      }
    }

    return React.isValidElement(child);
  });

  const totalAvatars = total || children.length;

  if (totalAvatars === clampedMax) {
    clampedMax += 1;
  }

  clampedMax = Math.min(totalAvatars + 1, clampedMax);

  const maxAvatars = Math.min(children.length, clampedMax - 1);
  const extraAvatars = Math.max(totalAvatars - clampedMax, totalAvatars - maxAvatars, 0);

  const marginLeft = spacing && SPACINGS[spacing] !== undefined ? SPACINGS[spacing] : -spacing;

  const counter = extraAvatars ? (
    <AvatarGroupAvatar
      ownerState={ownerState}
      className={classes.avatar}
      style={{
        marginLeft,
      }}
      key="counter"
      variant={variant}
    >
      +{extraAvatars}
    </AvatarGroupAvatar>
  ) : null;

  const childrenAvatars = children.slice(0, maxAvatars).map((child) => {
    return React.cloneElement(child, {
      className: clsx(child.props.className, classes.avatar),
      style: {
        marginLeft,
        ...child.props.style,
      },
      variant: child.props.variant || variant,
    });
  });

  const allChildren = [...childrenAvatars, counter];

  return (
    <AvatarGroupRoot
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      ref={ref}
      cascade={cascade}
      {...other}
    >
      {cascade === 'below' ? allChildren.reverse() : allChildren}
    </AvatarGroupRoot>
  );
});

AvatarGroup.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Defines whether each avatar in the stack, including the total counter, is positioned on top of or under the one that came before.
   * @default 'below'
   */
  cascade: PropTypes.oneOf(['above', 'below']),
  /**
   * The avatars to stack.
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
   * Max avatars to show before +x.
   * @default 5
   */
  max: chainPropTypes(PropTypes.number, (props) => {
    if (props.max < 2) {
      return new Error(
        [
          'MUI: The prop `max` should be equal to 2 or above.',
          'A value below is clamped to 2.',
        ].join('\n'),
      );
    }

    return null;
  }),
  /**
   * Spacing between avatars.
   * @default 'medium'
   */
  spacing: PropTypes.oneOfType([PropTypes.oneOf(['medium', 'small']), PropTypes.number]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The total number of avatars. Used for calculating the number of extra avatars.
   * @default children.length
   */
  total: PropTypes.number,
  /**
   * The variant to use.
   * @default 'circular'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['circular', 'rounded', 'square']),
    PropTypes.string,
  ]),
};

export default AvatarGroup;
