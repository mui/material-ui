import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getChipUtilityClass } from './chipClasses';
import { ChipProps, ChipTypeMap } from './ChipProps';
import ChipColorContext from './ChipColorContext';

const useUtilityClasses = (ownerState: ChipProps) => {
  const { disabled, size, color, clickable, variant } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
      variant && `variant${capitalize(variant)}`,
      clickable && 'clickable',
    ],
    label: ['label', size && `label${capitalize(size)}`],
    startDecorator: ['startDecorator'],
    endDecorator: ['endDecorator'],
  };

  return composeClasses(slots, getChipUtilityClass, {});
};

// base paddingBlock for the all chip sizes
const PADDING_BLOCK = '0.25rem';

const ChipStartDecorator = styled('span', {
  name: 'MuiChip',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: ChipProps }>({
  display: 'inherit',
  marginInlineEnd: 'var(--Chip-gap)',
  marginInlineStart: `calc(-1 * (var(--Chip-paddingInline) - ${PADDING_BLOCK}))`,
});

const ChipEndDecorator = styled('span', {
  name: 'MuiChip',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: ChipProps }>({
  display: 'inherit',
  marginInlineStart: 'var(--Chip-gap)',
  marginInlineEnd: `calc(-1 * (var(--Chip-paddingInline) - ${PADDING_BLOCK}))`,
});

const ChipRoot = styled('div', {
  name: 'MuiChip',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ChipProps }>(({ theme, ownerState }) => {
  return [
    {
      '--Chip-color': theme.variants[ownerState.variant!]?.[ownerState.color!].color,
      '--Chip-radius': '1.5rem',
      '--Chip-delete-radius': `max(var(--Chip-radius) - ${PADDING_BLOCK}, min(${PADDING_BLOCK} / 2, var(--Chip-radius) / 2))`,
      '--Avatar-radius': `max(var(--Chip-radius) - ${PADDING_BLOCK}, min(${PADDING_BLOCK} / 2, var(--Chip-radius) / 2))`,
      ...(ownerState.size === 'sm' && {
        '--Chip-minHeight': '1.5rem',
        '--Chip-gap': '0.25rem',
        '--Chip-paddingInline': '0.5rem',
        '--Icon-fontSize': '1rem',
        fontSize: theme.vars.fontSize.xs,
      }),
      ...(ownerState.size === 'md' && {
        '--Chip-minHeight': '2rem',
        '--Chip-gap': '0.375rem',
        '--Chip-paddingInline': '0.75rem',
        '--Icon-fontSize': '1.125rem',
        fontSize: theme.vars.fontSize.sm,
      }),
      ...(ownerState.size === 'lg' && {
        '--Chip-minHeight': '2.5rem',
        '--Chip-gap': '0.5rem',
        '--Chip-paddingInline': '1rem',
        '--Icon-fontSize': '1.25rem',
        fontSize: theme.vars.fontSize.md,
      }),
      minHeight: 'var(--Chip-minHeight)',
      paddingBlock: PADDING_BLOCK,
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
    theme.variants[ownerState.variant!]?.[ownerState.color!],
    theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
  ];
});

/**
 * Chips represent complex entities in small blocks, such as a contact.
 */
const Chip = React.forwardRef(function Chip(inProps, ref) {
  const props = useThemeProps<typeof inProps & ChipProps>({ props: inProps, name: 'MuiChip' });
  const {
    children,
    className,
    clickable: clickableProp,
    color = 'primary',
    component: ComponentProp,
    disabled = false,
    onClick,
    size = 'md',
    variant = 'contained',
    startDecorator,
    endDecorator,
    ...other
  } = props;

  const chipRef = React.useRef(null);
  const handleRef = useForkRef(chipRef, ref);
  const clickable = clickableProp !== false && onClick ? true : clickableProp;
  const component = ComponentProp || 'div';

  const ownerState = {
    ...props,
    component,
    disabled,
    size,
    color,
    clickable,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ChipColorContext.Provider value={color}>
      <ChipRoot
        as={component}
        className={clsx(classes.root, className)}
        onClick={onClick}
        ref={handleRef}
        ownerState={ownerState}
        {...other}
      >
        {startDecorator && (
          <ChipStartDecorator className={classes.startDecorator} ownerState={ownerState}>
            {startDecorator}
          </ChipStartDecorator>
        )}
        {children}
        {endDecorator && (
          <ChipEndDecorator className={classes.endDecorator} ownerState={ownerState}>
            {endDecorator}
          </ChipEndDecorator>
        )}
      </ChipRoot>
    </ChipColorContext.Provider>
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
   * If `true`, the chip will appear clickable, and will raise when pressed,
   * even if the onClick prop is not defined.
   * If `false`, the chip will not appear clickable, even if onClick prop is defined.
   * This can be used, for example,
   * along with the component prop to indicate an anchor Chip is clickable.
   * Note: this controls the UI and does not affect the onClick event.
   */
  clickable: PropTypes.bool,
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
   * The variant to use.
   * @default 'contained'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
    PropTypes.string,
  ]),
} as any;

export default Chip;
