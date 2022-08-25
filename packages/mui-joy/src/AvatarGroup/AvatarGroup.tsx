import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getAvatarGroupUtilityClass } from './avatarGroupClasses';
import { AvatarGroupProps, AvatarGroupOwnerState, AvatarGroupTypeMap } from './AvatarGroupProps';

export const AvatarGroupContext = React.createContext<undefined | AvatarGroupOwnerState>(undefined);

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getAvatarGroupUtilityClass, {});
};

const AvatarGroupGroupRoot = styled('div', {
  name: 'JoyAvatarGroup',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: AvatarGroupOwnerState }>(({ ownerState, theme }) => ({
  ...(ownerState.size === 'sm' && {
    '--AvatarGroup-gap': '-0.375rem',
    '--Avatar-ringSize': '2px',
  }),
  ...(ownerState.size === 'md' && {
    '--AvatarGroup-gap': '-0.5rem',
    '--Avatar-ringSize': '2px',
  }),
  ...(ownerState.size === 'lg' && {
    '--AvatarGroup-gap': '-0.625rem',
    '--Avatar-ringSize': '4px',
  }),
  '--Avatar-ring': `0 0 0 var(--Avatar-ringSize) var(--Avatar-ringColor, ${theme.vars.palette.background.surface})`,
  '--Avatar-marginInlineStart': 'var(--AvatarGroup-gap)',
  display: 'flex',
  marginInlineStart: 'calc(-1 * var(--AvatarGroup-gap))',
}));

const AvatarGroup = React.forwardRef(function AvatarGroup(inProps, ref) {
  const props = useThemeProps<typeof inProps & AvatarGroupProps>({
    props: inProps,
    name: 'JoyAvatarGroup',
  });

  const { className, color, component = 'div', size = 'md', variant, children, ...other } = props;

  const ownerState = {
    ...props,
    color,
    component,
    size,
    variant,
  };

  const classes = useUtilityClasses();

  return (
    <AvatarGroupContext.Provider value={ownerState}>
      <AvatarGroupGroupRoot
        as={component}
        ownerState={ownerState}
        className={clsx(classes.root, className)}
        ref={ref}
        {...other}
      >
        {children}
      </AvatarGroupGroupRoot>
    </AvatarGroupContext.Provider>
  );
}) as OverridableComponent<AvatarGroupTypeMap>;

AvatarGroup.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the AvatarGroup if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color context for the avatar children.
   * It has no effect on the AvatarGroup.
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The size of the component and the avatar children.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['lg', 'md', 'sm']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The variant context for the avatar children.
   * It has no effect on the AvatarGroup.
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default AvatarGroup;
