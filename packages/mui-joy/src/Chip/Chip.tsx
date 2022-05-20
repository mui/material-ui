import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses, useButton } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import {
  unstable_capitalize as capitalize,
  unstable_useId as useId,
  unstable_useForkRef as useForkRef,
} from '@mui/utils';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getChipUtilityClass } from './chipClasses';
import { ChipProps, ChipTypeMap } from './ChipProps';
import ChipContext from './ChipContext';

const useUtilityClasses = (
  ownerState: ChipProps & { focusVisible: boolean; clickable: boolean },
) => {
  const { disabled, size, color, clickable, variant, focusVisible } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
      variant && `variant${capitalize(variant)}`,
      clickable && 'clickable',
    ],
    action: ['action', disabled && 'disabled', focusVisible && 'focusVisible'],
    label: ['label', size && `label${capitalize(size)}`],
    startDecorator: ['startDecorator'],
    endDecorator: ['endDecorator'],
  };

  return composeClasses(slots, getChipUtilityClass, {});
};

const ChipRoot = styled('div', {
  name: 'JoyChip',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ChipProps & { clickable: boolean } }>(({ theme, ownerState }) => {
  return [
    {
      '--Chip-paddingBlock':
        ownerState.clickable || ownerState.variant !== 'outlined'
          ? '0.25rem'
          : 'calc(0.25rem - var(--variant-outlinedBorderWidth, 0px))',
      '--Chip-radius': '1.5rem',
      '--internal-action-radius': 'var(--Chip-radius)',
      '--Chip-delete-radius': `max(var(--Chip-radius) - var(--Chip-paddingBlock), min(var(--Chip-paddingBlock) / 2, var(--Chip-radius) / 2))`,
      '--Avatar-radius': `max(var(--Chip-radius) - var(--Chip-paddingBlock), min(var(--Chip-paddingBlock) / 2, var(--Chip-radius) / 2))`,
      ...(ownerState.size === 'sm' && {
        '--Chip-gap': '0.25rem',
        '--Chip-paddingInline': '0.5rem',
        '--Chip-delete-size': '1.25rem',
        '--Icon-fontSize': '0.875rem',
        minHeight: '1.5rem',
        fontSize: theme.vars.fontSize.xs,
      }),
      ...(ownerState.size === 'md' && {
        '--Chip-gap': '0.375rem',
        '--Chip-paddingInline': '0.75rem',
        '--Chip-delete-size': '1.5rem',
        '--Icon-fontSize': '1.125rem',
        minHeight: '2rem',
        fontSize: theme.vars.fontSize.sm,
      }),
      ...(ownerState.size === 'lg' && {
        '--Chip-gap': '0.5rem',
        '--Chip-paddingInline': '1rem',
        '--Chip-delete-size': '2rem',
        '--Icon-fontSize': '1.25rem',
        minHeight: '2.5rem',
        fontSize: theme.vars.fontSize.md,
      }),
      paddingBlock: 'var(--Chip-paddingBlock)',
      paddingInline: 'var(--Chip-paddingInline)',
      borderRadius: 'var(--Chip-radius)',
      position: 'relative',
      fontWeight: theme.vars.fontWeight.md,
      fontFamily: theme.vars.fontFamily.body,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      whiteSpace: 'nowrap',
      transition:
        'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      textDecoration: 'none',
      verticalAlign: 'middle',
      boxSizing: 'border-box',
    },
    ...(!ownerState.clickable
      ? [
          theme.variants[ownerState.variant!]?.[ownerState.color!],
          theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
        ]
      : [
          {
            color: theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}Color`],
          },
        ]),
  ];
});

const ChipLabel = styled('span', {
  name: 'JoyChip',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label,
})<{ ownerState: ChipProps & { clickable: boolean } }>(({ ownerState }) => ({
  display: 'inherit',
  alignItems: 'center',
  order: 1,
  ...(ownerState.clickable && {
    zIndex: 1,
    pointerEvents: 'none',
  }),
}));

const ChipAction = styled('button', {
  name: 'JoyChip',
  slot: 'Action',
  overridesResolver: (props, styles) => styles.action,
})<{ ownerState: ChipProps }>(({ theme, ownerState }) => [
  {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    border: 'none',
    padding: 'initial',
    margin: 'initial',
    backgroundColor: 'initial',
    textDecoration: 'none',
    borderRadius: 'inherit',
    transition:
      'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    [theme.focus.selector]: theme.focus.default,
  },
  theme.variants[ownerState.variant!]?.[ownerState.color!],
  theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
  theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!],
  theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
]);

const ChipStartDecorator = styled('span', {
  name: 'JoyChip',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: ChipProps & { clickable: boolean } }>({
  display: 'inherit',
  marginInlineEnd: 'var(--Chip-gap)',
  marginInlineStart: `calc(-1 * (var(--Chip-paddingInline) - var(--Chip-paddingBlock)))`,
  // set zIndex to 1 with order to stay on top of other controls, eg. Checkbox, Radio
  order: 0,
  zIndex: 1,
  pointerEvents: 'none',
});

const ChipEndDecorator = styled('span', {
  name: 'JoyChip',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: ChipProps & { clickable: boolean } }>({
  display: 'inherit',
  marginInlineStart: 'var(--Chip-gap)',
  marginInlineEnd: `calc(-1 * (var(--Chip-paddingInline) - var(--Chip-paddingBlock)))`,
  // set zIndex to 1 with order to stay on top of other controls, eg. Checkbox, Radio
  order: 2,
  zIndex: 1,
  pointerEvents: 'none',
});

/**
 * Chips represent complex entities in small blocks, such as a contact.
 */
const Chip = React.forwardRef(function Chip(inProps, ref) {
  const props = useThemeProps<typeof inProps & ChipProps>({ props: inProps, name: 'JoyChip' });
  const {
    children,
    className,
    componentsProps = {},
    color = 'primary',
    component,
    onClick,
    disabled = false,
    size = 'md',
    variant = 'solid',
    startDecorator,
    endDecorator,
    ...other
  } = props;
  const { component: actionComponent, ...actionProps } = componentsProps.action || {};

  const clickable = !!onClick || !!componentsProps.action;
  const id = useId(componentsProps.action?.id);
  const actionRef = React.useRef<HTMLElement | null>(null);
  const handleActionRef = useForkRef(actionRef, actionProps.ref);
  const { focusVisible, getRootProps } = useButton({
    disabled,
    ...actionProps,
    ref: handleActionRef,
  });

  const ownerState = {
    ...props,
    component,
    onClick,
    disabled,
    focusVisible,
    size,
    color,
    clickable,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ChipContext.Provider value={{ disabled, variant, color }}>
      <ChipRoot
        as={component}
        className={clsx(classes.root, className)}
        ref={ref}
        ownerState={ownerState}
        {...other}
      >
        {clickable && (
          <ChipAction
            aria-labelledby={id}
            {...actionProps}
            // @ts-expect-error getRootProps typings should be fixed.
            {...getRootProps({ onClick, ...actionProps })}
            as={actionComponent}
            className={clsx(classes.action, actionProps.className)}
            ownerState={ownerState}
          />
        )}

        {/* label is always the first element for integrating with other controls, eg. Checkbox, Radio. Use CSS order to rearrange position */}
        <ChipLabel
          id={id}
          {...componentsProps.label}
          className={clsx(classes.label, componentsProps.label?.className)}
          ownerState={ownerState}
        >
          {children}
        </ChipLabel>
        {startDecorator && (
          <ChipStartDecorator
            {...componentsProps.startDecorator}
            className={clsx(classes.startDecorator, componentsProps.startDecorator?.className)}
            ownerState={ownerState}
          >
            {startDecorator}
          </ChipStartDecorator>
        )}

        {endDecorator && (
          <ChipEndDecorator
            {...componentsProps.endDecorator}
            className={clsx(classes.endDecorator, componentsProps.endDecorator?.className)}
            ownerState={ownerState}
          >
            {endDecorator}
          </ChipEndDecorator>
        )}
      </ChipRoot>
    </ChipContext.Provider>
  );
}) as OverridableComponent<ChipTypeMap>;

Chip.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
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
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    action: PropTypes.object,
    endDecorator: PropTypes.object,
    label: PropTypes.object,
    root: PropTypes.object,
    startDecorator: PropTypes.object,
  }),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Element placed after the children.
   */
  endDecorator: PropTypes.node,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
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
   * Element placed before the children.
   */
  startDecorator: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The variant to use.
   * @default 'solid'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Chip;
