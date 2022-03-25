import { unstable_composeClasses as composeClasses } from '@mui/base';
import ButtonBase from '@mui/material/ButtonBase';
import { OverridableComponent } from '@mui/types';
import {
  unstable_capitalize as capitalize,
  unstable_unsupportedProp as unsupportedProp,
  unstable_useForkRef as useForkRef,
} from '@mui/utils';
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
})<{ ownerState: ChipProps }>(({ ownerState }) => ({
  display: 'inherit',
  ...(ownerState.size === 'sm' && {
    marginLeft: 8,
    marginRight: 8,
  }),
  ...(ownerState.size === 'md' && {
    marginLeft: 12,
    marginRight: 12,
  }),
  ...(ownerState.size === 'lg' && {
    marginLeft: 16,
    marginRight: 16,
  }),
}));

const ChipEndDecorator = styled('span', {
  name: 'MuiChip',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: ChipProps }>(({ ownerState }) => ({
  display: 'inherit',
  ...(ownerState.size === 'sm' && {
    marginLeft: 8,
    marginRight: 8,
  }),
  ...(ownerState.size === 'md' && {
    marginLeft: 12,
    marginRight: 12,
  }),
  ...(ownerState.size === 'lg' && {
    marginLeft: 16,
    marginRight: 16,
  }),
}));

const ChipRoot = styled('div', {
  name: 'MuiChip',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ChipProps }>(({ theme, ownerState }) => {
  return [
    {
      ...(ownerState.size === 'sm' && {
        '--Chip-height': '1.5rem',
        '--Chip-border-radius': '0.75rem',
        fontSize: theme.vars.fontSize.sm,
      }),
      ...(ownerState.size === 'md' && {
        '--Chip-height': '2rem',
        '--Chip-border-radius': '1rem',
        fontSize: theme.vars.fontSize.md,
      }),
      ...(ownerState.size === 'lg' && {
        '--Chip-height': '2.5rem',
        '--Chip-border-radius': '1.25rem',
        fontSize: theme.vars.fontSize.lg,
      }),
      maxWidth: '100%',
      fontFamily: theme.vars.fontFamily.body,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'var(--Chip-height)',
      borderRadius: 'var(--Chip-border-radius)',
      whiteSpace: 'nowrap',
      transition:
        'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      // label will inherit this from root, then `clickable` class overrides this for both
      cursor: 'default',
      // We disable the focus ring for mouse, touch and keyboard users.
      outline: 0,
      textDecoration: 'none',
      border: 0, // Remove `button` border
      padding: 0, // Remove `button` padding
      verticalAlign: 'middle',
      boxSizing: 'border-box',
      ...(ownerState.disabled && {
        opacity: 0.5,
        pointerEvents: 'none',
      }),
    },
    theme.variants[ownerState.variant!]?.[ownerState.color!],
  ];
});

const ChipLabel = styled('span', {
  name: 'MuiChip',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label,
})<{ ownerState: ChipProps }>(({ ownerState }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  ...(ownerState.size === 'sm' && {
    paddingLeft: 8,
    paddingRight: 8,
  }),
  ...(ownerState.size === 'md' && {
    paddingLeft: 12,
    paddingRight: 12,
  }),
  ...(ownerState.size === 'lg' && {
    paddingLeft: 16,
    paddingRight: 16,
  }),
}));

/**
 * Chips represent complex entities in small blocks, such as a contact.
 */
const Chip = React.forwardRef(function Chip(inProps, ref) {
  const props = useThemeProps<typeof inProps & ChipProps>({ props: inProps, name: 'MuiChip' });
  const {
    className,
    clickable: clickableProp,
    color = 'neutral',
    component: ComponentProp,
    disabled = false,
    label,
    onClick,
    size = 'md',
    variant = 'light',
    startDecorator: startDecoratorProp,
    endDecorator: endDecoratorProp,
    ...other
  } = props;

  const chipRef = React.useRef(null);
  const handleRef = useForkRef(chipRef, ref);
  const clickable = clickableProp !== false && onClick ? true : clickableProp;
  const component = clickable ? ButtonBase : ComponentProp || 'div';

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
      disabled={clickable && disabled ? true : undefined}
      onClick={onClick}
      ref={handleRef}
      ownerState={ownerState}
      {...other}
    >
      {startDecorator}
      <ChipLabel className={clsx(classes.label)} ownerState={ownerState}>
        {label}
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
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: unsupportedProp,
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
   * @default 'neutral'
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
   * The content of the component.
   */
  label: PropTypes.node,
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
   * @default 'light'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
    PropTypes.string,
  ]),
} as any;

export default Chip;
