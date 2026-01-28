'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getAvatarGroupUtilityClass } from './avatarGroupClasses';
import { AvatarGroupProps, AvatarGroupOwnerState, AvatarGroupTypeMap } from './AvatarGroupProps';
import useSlot from '../utils/useSlot';

export const AvatarGroupContext = React.createContext<AvatarGroupOwnerState | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  AvatarGroupContext.displayName = 'AvatarGroupContext';
}

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

/**
 *
 * Demos:
 *
 * - [Avatar](https://mui.com/joy-ui/react-avatar/)
 *
 * API:
 *
 * - [AvatarGroup API](https://mui.com/joy-ui/api/avatar-group/)
 */
const AvatarGroup = React.forwardRef(function AvatarGroup(inProps, ref) {
  const props = useThemeProps<typeof inProps & AvatarGroupProps>({
    props: inProps,
    name: 'JoyAvatarGroup',
  });

  const {
    className,
    color,
    component = 'div',
    size = 'md',
    variant,
    children,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const ownerState = React.useMemo(
    () => ({
      ...props,
      color,
      component,
      size,
      variant,
    }),
    [color, component, props, size, variant],
  );

  const classes = useUtilityClasses();

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: AvatarGroupGroupRoot,
    externalForwardedProps: { ...other, component, slots, slotProps },
    ownerState,
  });

  return (
    <AvatarGroupContext.Provider value={ownerState}>
      <SlotRoot {...rootProps}>{children}</SlotRoot>
    </AvatarGroupContext.Provider>
  );
}) as OverridableComponent<AvatarGroupTypeMap>;

AvatarGroup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The size of the component.
   * It accepts theme values between 'sm' and 'lg'.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['lg', 'md', 'sm']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'soft'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default AvatarGroup;
