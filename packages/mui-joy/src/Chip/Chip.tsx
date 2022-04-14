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

const ChipStartDecorator = styled('span', {
  name: 'MuiChip',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: ChipProps }>({
  display: 'inherit',
  margin: '0 var(--Chip-decorator-marginX)',
});

const ChipEndDecorator = styled('span', {
  name: 'MuiChip',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: ChipProps }>({
  display: 'inherit',
  margin: '0 var(--Chip-decorator-marginX)',
});

const ChipRoot = styled('div', {
  name: 'MuiChip',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ChipProps }>(({ theme, ownerState }) => {
  return [
    {
      ...(ownerState.size === 'sm' && {
        '--Chip-radius': '1rem',
        '--Chip-fontSize': theme.vars.fontSize.xs,
      }),
      ...(ownerState.size === 'md' && {
        '--Chip-radius': '1.25rem',
        '--Chip-fontSize': theme.vars.fontSize.sm,
      }),
      ...(ownerState.size === 'lg' && {
        '--Chip-radius': '1.5rem',
        '--Chip-fontSize': theme.vars.fontSize.md,
      }),
      '--Chip-color': theme.variants[ownerState.variant!]?.[ownerState.color!].color,
      '--Chip-paddingX': '0.5rem',
      '--Chip-label-paddingX': '0.2rem',
      '--Chip-decorator-marginX': '0.5rem',
      '--Chip-delete-radius':
        'max(var(--Chip-radius) - var(--Chip-paddingX), min(var(--Chip-paddingX) / 2, var(--Chip-radius) / 2))',
      padding: '0.25rem var(--Chip-paddingX)',
      borderRadius: 'var(--Chip-radius)',
      fontSize: 'var(--Chip-fontSize)',
      position: 'relative',
      maxWidth: '100%',
      fontFamily: theme.vars.fontFamily.body,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      whiteSpace: 'nowrap',
      transition:
        'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      // We disable the focus ring for mouse, touch and keyboard users.
      outline: 0,
      textDecoration: 'none',
      verticalAlign: 'middle',
      boxSizing: 'border-box',
      ...(ownerState.disabled && {
        opacity: 0.5,
        pointerEvents: 'none',
      }),
      ...(ownerState.clickable && {
        cursor: 'pointer',
      }),
    },
    theme.variants[ownerState.variant!]?.[ownerState.color!],
  ];
});

const ChipLabel = styled('span', {
  name: 'MuiChip',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label,
})<{ ownerState: ChipProps }>({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  padding: '0 var(--Chip-label-paddingX)',
  '& > button': {
    fontSize: 'var(--Chip-fontSize)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    border: 'none',
    background: 'none',
    color: 'var(--Chip-color)',
  },
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
    startDecorator: startDecoratorProp,
    endDecorator: endDecoratorProp,
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

  const startDecorator = startDecoratorProp && (
    <ChipStartDecorator className={classes.startDecorator} ownerState={ownerState}>
      {startDecoratorProp}
    </ChipStartDecorator>
  );

  const endDecorator = endDecoratorProp && (
    <ChipEndDecorator className={classes.endDecorator} ownerState={ownerState}>
      {endDecoratorProp}
    </ChipEndDecorator>
  );

  return (
    <ChipRoot
      as={component}
      className={clsx(classes.root, className)}
      onClick={onClick}
      ref={handleRef}
      ownerState={ownerState}
      {...other}
    >
      {startDecorator}
      <ChipLabel className={clsx(classes.label)} ownerState={ownerState}>
        {clickable ? <button type="button">{children}</button> : children}
      </ChipLabel>
      {endDecorator}
    </ChipRoot>
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
