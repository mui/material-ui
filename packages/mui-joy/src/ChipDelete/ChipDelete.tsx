import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import { unstable_composeClasses as composeClasses, useButton } from '@mui/base';
import { useSlotProps } from '@mui/base/utils';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import Close from '../internal/svg-icons/Close';
import chipDeleteClasses, { getChipDeleteUtilityClass } from './chipDeleteClasses';
import { ChipDeleteProps, ChipDeleteOwnerState, ChipDeleteTypeMap } from './ChipDeleteProps';
import ChipContext from '../Chip/ChipContext';

const useUtilityClasses = (ownerState: ChipDeleteOwnerState) => {
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
  name: 'JoyChipDelete',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ChipDeleteOwnerState }>(({ theme, ownerState }) => [
  {
    '--Icon-margin': 'initial', // prevent overrides from parent
    pointerEvents: 'visible', // force the ChipDelete to be hoverable because the decorator can have pointerEvents 'none'
    width: 'var(--Chip-delete-size, 2rem)',
    height: 'var(--Chip-delete-size, 2rem)',
    borderRadius: 'var(--Chip-delete-radius, 50%)',
    margin: 'var(--Chip-delete-margin)',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // overflow above sibling button or anchor
    border: 'none', // reset user agent stylesheet
    background: 'none', // reset user agent stylesheet
    padding: '0px', // reset user agent stylesheet
    [theme.focus.selector]: theme.focus.default,
  },
  theme.variants[ownerState.variant!]?.[ownerState.color!],
  { '&:hover': theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!] },
  { '&:active': theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!] },
  {
    [`&.${chipDeleteClasses.disabled}`]:
      theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
  },
]);

const chipVariantMapping = {
  plain: 'outlined',
  outlined: 'soft',
  soft: 'solid',
  solid: 'solid',
} as const;

const ChipDelete = React.forwardRef(function ChipDelete(inProps, ref) {
  const props = useThemeProps<typeof inProps & ChipDeleteProps>({
    props: inProps,
    name: 'JoyChipDelete',
  });

  const {
    component,
    children,
    variant: variantProp,
    color: colorProp,
    disabled: disabledProp,
    ...other
  } = props;
  const chipContext = React.useContext(ChipContext);
  const color = colorProp || chipContext.color || 'primary';
  const variant = variantProp || chipVariantMapping[chipContext.variant!] || 'solid';
  const disabled = disabledProp ?? chipContext.disabled;

  const buttonRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(buttonRef, ref);

  const { focusVisible, getRootProps } = useButton({
    ...props,
    disabled,
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

  const rootProps = useSlotProps({
    elementType: ChipDeleteRoot,
    getSlotProps: getRootProps,
    externalSlotProps: {},
    externalForwardedProps: other,
    ownerState,
    additionalProps: {
      as: component,
    },
    className: classes.root,
  });

  return <ChipDeleteRoot {...rootProps}>{children ?? <Close />}</ChipDeleteRoot>;
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
  variant: PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
} as any;

export default ChipDelete;
