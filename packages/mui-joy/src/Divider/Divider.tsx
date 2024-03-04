'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { DividerOwnerState, DividerTypeMap } from './DividerProps';
import { getDividerUtilityClass } from './dividerClasses';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState: DividerOwnerState) => {
  const { orientation, inset } = ownerState;
  const slots = {
    root: ['root', orientation, inset && `inset${capitalize(inset)}`],
  };

  return composeClasses(slots, getDividerUtilityClass, {});
};

export const DividerRoot = styled('hr', {
  name: 'JoyDivider',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: DividerOwnerState }>(({ theme, ownerState }) => ({
  '--Divider-thickness': '1px',
  '--Divider-lineColor': theme.vars.palette.divider,
  ...(ownerState.inset === 'none' && {
    '--_Divider-inset': '0px',
  }),
  ...(ownerState.inset === 'context' && {
    '--_Divider-inset': 'var(--Divider-inset, 0px)',
  }),
  margin: 'initial', // reset margin for `hr` tag
  marginInline: ownerState.orientation === 'vertical' ? 'initial' : 'var(--_Divider-inset)',
  marginBlock: ownerState.orientation === 'vertical' ? 'var(--_Divider-inset)' : 'initial',
  position: 'relative',
  alignSelf: 'stretch',
  flexShrink: 0,
  ...(ownerState.children
    ? {
        '--Divider-gap': theme.spacing(1),
        '--Divider-childPosition': '50%',
        display: 'flex',
        flexDirection: ownerState.orientation === 'vertical' ? 'column' : 'row',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        border: 0,
        ...theme.typography['body-sm'],
        '&::before, &::after': {
          position: 'relative',
          inlineSize:
            ownerState.orientation === 'vertical' ? 'var(--Divider-thickness)' : 'initial',
          blockSize: ownerState.orientation === 'vertical' ? 'initial' : 'var(--Divider-thickness)',
          backgroundColor: 'var(--Divider-lineColor)', // use logical size + background is better than border because they work with gradient.
          content: '""',
        },
        '&::before': {
          marginInlineEnd:
            ownerState.orientation === 'vertical'
              ? 'initial'
              : 'min(var(--Divider-childPosition) * 999, var(--Divider-gap))',
          marginBlockEnd:
            ownerState.orientation === 'vertical'
              ? 'min(var(--Divider-childPosition) * 999, var(--Divider-gap))'
              : 'initial',
          flexBasis: 'var(--Divider-childPosition)',
        },
        '&::after': {
          marginInlineStart:
            ownerState.orientation === 'vertical'
              ? 'initial'
              : 'min((100% - var(--Divider-childPosition)) * 999, var(--Divider-gap))',
          marginBlockStart:
            ownerState.orientation === 'vertical'
              ? 'min((100% - var(--Divider-childPosition)) * 999, var(--Divider-gap))'
              : 'initial',
          flexBasis: 'calc(100% - var(--Divider-childPosition))',
        },
      }
    : {
        border: 'none', // reset the border for `hr` tag
        listStyle: 'none',
        backgroundColor: 'var(--Divider-lineColor)', // use logical size + background is better than border because they work with gradient.
        inlineSize: ownerState.orientation === 'vertical' ? 'var(--Divider-thickness)' : 'initial',
        blockSize: ownerState.orientation === 'vertical' ? 'initial' : 'var(--Divider-thickness)',
      }),
}));
/**
 *
 * Demos:
 *
 * - [Divider](https://mui.com/joy-ui/react-divider/)
 *
 * API:
 *
 * - [Divider API](https://mui.com/joy-ui/api/divider/)
 */
const Divider = React.forwardRef(function Divider(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyDivider',
  });

  const {
    className,
    children,
    component = children !== undefined && children !== null ? 'div' : 'hr',
    inset,
    orientation = 'horizontal',
    role = component !== 'hr' ? 'separator' : undefined,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const ownerState = {
    ...props,
    inset,
    role,
    orientation,
    component,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: DividerRoot,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      as: component,
      role,
      ...(role === 'separator' &&
        orientation === 'vertical' && {
          // The implicit aria-orientation of separator is 'horizontal'
          // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role
          'aria-orientation': 'vertical',
        }),
    },
  });

  return <SlotRoot {...rootProps}>{children}</SlotRoot>;
}) as OverridableComponent<DividerTypeMap>;

Divider.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Class name applied to the divider to shrink or stretch the line based on the orientation.
   */
  inset: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['none', 'context']),
    PropTypes.string,
  ]),
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * @ignore
   */
  role: PropTypes /* @typescript-to-proptypes-ignore */.string,
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
} as any;

// @ts-ignore internal logic
Divider.muiName = 'Divider';

export default Divider;
