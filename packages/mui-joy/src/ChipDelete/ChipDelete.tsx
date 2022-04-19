import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import { unstable_composeClasses as composeClasses, useButton } from '@mui/base';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import Close from '../internal/svg-icons/Close';
import { getChipDeleteUtilityClass } from './chipDeleteClasses';
import { ChipDeleteProps, ChipDeleteTypeMap } from './ChipDeleteProps';
import ChipContext from '../Chip/ChipContext';

const useUtilityClasses = (ownerState: ChipDeleteProps & { focusVisible: boolean }) => {
  const { focusVisible, variant, color, disabled } = ownerState;
  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
    ],
  };

  return composeClasses(slots, getChipDeleteUtilityClass, {});
};

const ChipDeleteRoot = styled('button', {
  name: 'MuiChipDelete',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ChipDeleteProps }>(({ theme, ownerState }) => [
  {
    pointerEvents: 'visible', // force the ChipDelete to be hoverable because the decorator can have pointerEvents 'none'
    width: 'var(--Chip-delete-size, 1.5rem)',
    height: 'var(--Chip-delete-size, 1.5rem)',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 'var(--Chip-delete-radius)',
    zIndex: 1, // overflow above sibling button or anchor
    border: 'none', // reset user agent stylesheet
    background: 'none', // reset user agent stylesheet
    padding: '0px', // reset user agent stylesheet
  },
  theme.focus.default,
  theme.variants[ownerState.variant!]?.[ownerState.color!],
  theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
  theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!],
  theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
]);

const chipVariantMapping = {
  outlined: 'light',
  light: 'contained',
  contained: 'light',
} as const;

const ChipDelete = React.forwardRef(function ChipDelete(inProps, ref) {
  const props = useThemeProps<typeof inProps & ChipDeleteProps>({
    props: inProps,
    name: 'MuiChipDelete',
  });

  const {
    className,
    component,
    children,
    variant: variantProp,
    color: colorProp,
    disabled: disabledProp,
    ...other
  } = props;
  const chipContext = React.useContext(ChipContext);
  const color = colorProp || chipContext.color || 'primary';
  const variant = variantProp || chipVariantMapping[chipContext.variant!] || 'contained';
  const disabled = disabledProp ?? chipContext.disabled;

  const buttonRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(buttonRef, ref);

  const { focusVisible, getRootProps } = useButton({
    ...props,
    disabled,
    component,
    ref: handleRef,
  });

  const ownerState = {
    ...props,
    disabled,
    variant,
    color,
    focusVisible,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ChipDeleteRoot
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
      {...getRootProps()}
    >
      {children ?? <Close />}
    </ChipDeleteRoot>
  );
}) as OverridableComponent<ChipDeleteTypeMap>;

ChipDelete.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If provided, it will replace the default icon.
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
  color: PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * The variant to use.
   * @default 'contained'
   */
  variant: PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
} as any;

export default ChipDelete;
