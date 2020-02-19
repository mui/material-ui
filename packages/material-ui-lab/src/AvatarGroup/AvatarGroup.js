import React from 'react';
import PropTypes from 'prop-types';
import { isFragment } from 'react-is';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

const SPACINGS = {
  small: -16,
  medium: null,
};

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
  },
  /* Styles applied to the avatar elements. */
  avatar: {
    border: `2px solid ${theme.palette.background.default}`,
    marginLeft: -8,
  },
});

const AvatarGroup = React.forwardRef(function AvatarGroup(props, ref) {
  const { children: childrenProp, classes, className, spacing = 'medium', ...other } = props;

  const children = React.Children.toArray(childrenProp).filter(child => {
    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(
          [
            "Material-UI: the AvatarGroup component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join('\n'),
        );
      }
    }

    return React.isValidElement(child);
  });

  return (
    <div className={clsx(classes.root, className)} ref={ref} {...other}>
      {children.map((child, index) => {
        return React.cloneElement(child, {
          className: clsx(child.props.className, classes.avatar),
          style: {
            zIndex: children.length - index,
            marginLeft: spacing && SPACINGS[spacing] !== undefined ? SPACINGS[spacing] : -spacing,
            ...child.props.style,
          },
        });
      })}
    </div>
  );
});

AvatarGroup.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The avatars to stack.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Spacing between avatars.
   */
  spacing: PropTypes.oneOfType([PropTypes.oneOf(['medium', 'small']), PropTypes.number]),
};

export default withStyles(styles, { name: 'MuiAvatarGroup' })(AvatarGroup);
