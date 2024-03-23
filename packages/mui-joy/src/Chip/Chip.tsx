'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { useButton } from '@mui/base/useButton';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize, unstable_useId as useId } from '@mui/utils';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { VariantColorProvider } from '../styles/variantColorInheritance';
import { resolveSxValue } from '../styles/styleUtils';
import chipClasses, { getChipUtilityClass } from './chipClasses';
import { ChipProps, ChipOwnerState, ChipTypeMap } from './ChipProps';
import ChipContext from './ChipContext';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState: ChipOwnerState) => {
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
})<{ ownerState: ChipOwnerState }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  const { borderRadius } = resolveSxValue({ theme, ownerState }, ['borderRadius']);
  return [
    {
      // for controlling chip delete margin offset
      '--Chip-decoratorChildOffset':
        'min(calc(var(--Chip-paddingInline) - (var(--_Chip-minHeight) - 2 * var(--variant-borderWidth, 0px) - var(--Chip-decoratorChildHeight)) / 2), var(--Chip-paddingInline))',
      '--Chip-decoratorChildRadius':
        'max(var(--_Chip-radius) - var(--variant-borderWidth, 0px) - var(--_Chip-paddingBlock), min(var(--_Chip-paddingBlock) + var(--variant-borderWidth, 0px), var(--_Chip-radius) / 2))',
      '--Chip-deleteRadius': 'var(--Chip-decoratorChildRadius)',
      '--Chip-deleteSize': 'var(--Chip-decoratorChildHeight)',
      '--Avatar-radius': 'var(--Chip-decoratorChildRadius)',
      '--Avatar-size': 'var(--Chip-decoratorChildHeight)',
      '--Icon-margin': 'initial', // reset the icon's margin.
      '--Icon-color': 'currentColor',
      '--unstable_actionRadius': 'var(--_Chip-radius)', // to be used with Radio or Checkbox
      ...(ownerState.size === 'sm' && {
        '--Chip-paddingInline': '0.375rem',
        '--Chip-decoratorChildHeight':
          'calc(var(--_Chip-minHeight) - 2 * var(--variant-borderWidth))',
        '--Icon-fontSize': theme.vars.fontSize.sm,
        '--_Chip-minHeight': 'var(--Chip-minHeight, 1.25rem)', // 20px
        gap: '3px',
      }),
      ...(ownerState.size === 'md' && {
        '--Chip-paddingInline': '0.5rem',
        '--Chip-decoratorChildHeight':
          'calc(var(--_Chip-minHeight) - 0.25rem - 2 * var(--variant-borderWidth))',
        '--Icon-fontSize': theme.vars.fontSize.md,
        '--_Chip-minHeight': 'var(--Chip-minHeight, 1.5rem)', // 26px
        gap: '0.25rem',
      }),
      ...(ownerState.size === 'lg' && {
        '--Chip-paddingInline': '0.75rem',
        '--Chip-decoratorChildHeight':
          'calc(var(--_Chip-minHeight) - 0.375rem - 2 * var(--variant-borderWidth))',
        '--Icon-fontSize': theme.vars.fontSize.lg,
        '--_Chip-minHeight': 'var(--Chip-minHeight, 1.75rem)', // 28px
        gap: '0.375rem',
      }),
      '--_Chip-radius': 'var(--Chip-radius, 1.5rem)',
      '--_Chip-paddingBlock':
        'max((var(--_Chip-minHeight) - 2 * var(--variant-borderWidth, 0px) - var(--Chip-decoratorChildHeight)) / 2, 0px)',
      minHeight: 'var(--_Chip-minHeight)',
      maxWidth: 'max-content', // to prevent Chip from stretching to full width when used with flexbox
      paddingInline: 'var(--Chip-paddingInline)',
      borderRadius: 'var(--_Chip-radius)',
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      whiteSpace: 'nowrap',
      textDecoration: 'none',
      verticalAlign: 'middle',
      boxSizing: 'border-box',
      ...theme.typography[`body-${({ sm: 'xs', md: 'sm', lg: 'md' } as const)[ownerState.size!]}`],
      fontWeight: theme.vars.fontWeight.md,
      [`&.${chipClasses.disabled}`]: {
        color: theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!]?.color,
      },
    } as const,
    ...(!ownerState.clickable
      ? [
          {
            backgroundColor: theme.vars.palette.background.surface,
            ...variantStyle,
            [`&.${chipClasses.disabled}`]:
              theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
          },
        ]
      : [
          {
            '--variant-borderWidth': '0px',
            color: variantStyle?.color,
          },
        ]),
    borderRadius !== undefined && { '--_Chip-radius': borderRadius },
  ];
});

const ChipLabel = styled('span', {
  name: 'JoyChip',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label,
})<{ ownerState: ChipOwnerState }>(({ ownerState }) => ({
  display: 'inline-block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  order: 1,
  minInlineSize: 0,
  flexGrow: 1,
  ...(ownerState.clickable && {
    zIndex: 1,
    pointerEvents: 'none',
  }),
}));

const ChipAction = styled('button', {
  name: 'JoyChip',
  slot: 'Action',
  overridesResolver: (props, styles) => styles.action,
})<{ ownerState: ChipOwnerState }>(({ theme, ownerState }) => [
  {
    '--Icon-color':
      ownerState.color !== 'neutral' || ownerState.variant === 'solid'
        ? 'currentColor'
        : theme.vars.palette.text.icon,
    position: 'absolute',
    zIndex: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%', // To fix Firefox issue (https://github.com/mui/material-ui/issues/36877)
    border: 'none',
    cursor: 'pointer',
    padding: 'initial',
    margin: 'initial',
    backgroundColor: 'initial',
    textDecoration: 'none',
    borderRadius: 'inherit',
    [theme.focus.selector]: theme.focus.default,
  } as const,
  {
    backgroundColor: theme.vars.palette.background.surface,
    ...theme.variants[ownerState.variant!]?.[ownerState.color!],
  },
  {
    '&:hover': {
      '@media (hover: hover)': theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
    },
  },
  { '&:active': theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!] },
  {
    [`&.${chipClasses.disabled}`]:
      theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
  },
]);

const ChipStartDecorator = styled('span', {
  name: 'JoyChip',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: ChipOwnerState }>({
  '--Avatar-marginInlineStart': 'calc(var(--Chip-decoratorChildOffset) * -1)',
  '--IconButton-margin':
    '0 calc(-1 * var(--Chip-paddingInline) / 3) 0 calc(var(--Chip-decoratorChildOffset) * -1)',
  '--Icon-margin': '0 0 0 calc(var(--Chip-paddingInline) / -4)',
  display: 'inherit',
  // set zIndex to 1 with order to stay on top of other controls, for example Checkbox, Radio
  order: 0,
  zIndex: 1,
  pointerEvents: 'none',
});

const ChipEndDecorator = styled('span', {
  name: 'JoyChip',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: ChipOwnerState }>({
  '--IconButton-margin':
    '0 calc(var(--Chip-decoratorChildOffset) * -1) 0 calc(-1 * var(--Chip-paddingInline) / 3)',
  '--Icon-margin': '0 calc(var(--Chip-paddingInline) / -4) 0 0',
  display: 'inherit',
  // set zIndex to 1 with order to stay on top of other controls, for example Checkbox, Radio
  order: 2,
  zIndex: 1,
  pointerEvents: 'none',
});

/**
 * Chips represent complex entities in small blocks, such as a contact.
 *
 * Demos:
 *
 * - [Chip](https://mui.com/joy-ui/react-chip/)
 *
 * API:
 *
 * - [Chip API](https://mui.com/joy-ui/api/chip/)
 */
const Chip = React.forwardRef(function Chip(inProps, ref) {
  const props = useThemeProps<typeof inProps & ChipProps>({ props: inProps, name: 'JoyChip' });
  const {
    children,
    className,
    color = 'neutral',
    onClick,
    disabled = false,
    size = 'md',
    variant = 'soft',
    startDecorator,
    endDecorator,
    component,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const clickable = !!onClick || !!slotProps.action;
  const ownerState: ChipOwnerState = {
    ...props,
    disabled,
    size,
    color,
    variant,
    clickable,
    focusVisible: false,
  };

  const resolvedActionProps =
    typeof slotProps.action === 'function' ? slotProps.action(ownerState) : slotProps.action;
  const actionRef = React.useRef<HTMLElement>(null);
  const { focusVisible, getRootProps } = useButton({
    ...resolvedActionProps,
    disabled,
    rootRef: actionRef,
  });

  ownerState.focusVisible = focusVisible;

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: ChipRoot,
    externalForwardedProps,
    ownerState,
  });

  const [SlotLabel, labelProps] = useSlot('label', {
    className: classes.label,
    elementType: ChipLabel,
    externalForwardedProps,
    ownerState,
  });

  // @ts-ignore internal logic.
  const id = useId(labelProps.id);

  const [SlotAction, actionProps] = useSlot('action', {
    className: classes.action,
    elementType: ChipAction,
    externalForwardedProps,
    ownerState,
    getSlotProps: getRootProps,
    additionalProps: {
      'aria-labelledby': id,
      as: resolvedActionProps?.component,
      onClick,
    },
  });

  const [SlotStartDecorator, startDecoratorProps] = useSlot('startDecorator', {
    className: classes.startDecorator,
    elementType: ChipStartDecorator,
    externalForwardedProps,
    ownerState,
  });

  const [SlotEndDecorator, endDecoratorProps] = useSlot('endDecorator', {
    className: classes.endDecorator,
    elementType: ChipEndDecorator,
    externalForwardedProps,
    ownerState,
  });

  const chipContextValue = React.useMemo(() => ({ disabled }), [disabled]);

  return (
    <ChipContext.Provider value={chipContextValue}>
      <VariantColorProvider variant={variant} color={color}>
        <SlotRoot {...rootProps}>
          {clickable && <SlotAction {...actionProps} />}

          {/* label is always the first element for integrating with other controls, for example Checkbox, Radio. Use CSS order to rearrange position */}
          <SlotLabel {...labelProps} id={id}>
            {children}
          </SlotLabel>
          {startDecorator && (
            <SlotStartDecorator {...startDecoratorProps}>{startDecorator}</SlotStartDecorator>
          )}

          {endDecorator && (
            <SlotEndDecorator {...endDecoratorProps}>{endDecorator}</SlotEndDecorator>
          )}
        </SlotRoot>
      </VariantColorProvider>
    </ChipContext.Provider>
  );
}) as OverridableComponent<ChipTypeMap>;

Chip.propTypes /* remove-proptypes */ = {
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
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Element placed after the children.
   */
  endDecorator: PropTypes.node,
  /**
   * Element action click handler.
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
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    action: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    endDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    startDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    action: PropTypes.elementType,
    endDecorator: PropTypes.elementType,
    label: PropTypes.elementType,
    root: PropTypes.elementType,
    startDecorator: PropTypes.elementType,
  }),
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
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'soft'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Chip;
