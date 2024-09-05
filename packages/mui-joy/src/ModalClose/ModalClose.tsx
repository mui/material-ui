'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { useButton } from '@mui/base/useButton';
import useSlot from '../utils/useSlot';
import { useThemeProps, styled } from '../styles';
import { StyledIconButton } from '../IconButton/IconButton';
import { getModalCloseUtilityClass } from './modalCloseClasses';
import { ModalCloseProps, ModalCloseOwnerState, ModalCloseTypeMap } from './ModalCloseProps';
import CloseIcon from '../internal/svg-icons/Close';
import CloseModalContext from '../Modal/CloseModalContext';
import ModalDialogSizeContext from '../ModalDialog/ModalDialogSizeContext';
import ModalDialogVariantColorContext from '../ModalDialog/ModalDialogVariantColorContext';

const useUtilityClasses = (ownerState: ModalCloseOwnerState) => {
  const { variant, color, disabled, focusVisible, size } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getModalCloseUtilityClass, {});
};

export const ModalCloseRoot = styled(StyledIconButton, {
  name: 'JoyModalClose',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ModalCloseOwnerState }>(({ ownerState, theme }) => ({
  ...(ownerState.size === 'sm' && {
    '--IconButton-size': '1.75rem',
  }),
  ...(ownerState.size === 'md' && {
    '--IconButton-size': '2rem',
  }),
  ...(ownerState.size === 'lg' && {
    '--IconButton-size': '2.25rem',
  }),
  position: 'absolute',
  zIndex: 1, // stay on top of the title in case it is positioned relatively
  top: `var(--ModalClose-inset, 0.625rem)`,
  right: `var(--ModalClose-inset, 0.625rem)`,
  borderRadius: `var(--ModalClose-radius, ${theme.vars.radius.sm})`,
  // for variant without a background, use `tertiary` text color to reduce the importance of the close icon.
  ...(!theme.variants[ownerState.variant!]?.[ownerState.color!]?.backgroundColor && {
    color: theme.vars.palette.text.secondary,
  }),
}));

const modalDialogVariantMapping = {
  plain: 'plain',
  outlined: 'plain',
  soft: 'soft',
  solid: 'solid',
} as const;
/**
 *
 * Demos:
 *
 * - [Drawer](https://mui.com/joy-ui/react-drawer/)
 * - [Modal](https://mui.com/joy-ui/react-modal/)
 *
 * API:
 *
 * - [ModalClose API](https://mui.com/joy-ui/api/modal-close/)
 */
const ModalClose = React.forwardRef(function ModalClose(inProps, ref) {
  const props = useThemeProps<typeof inProps & ModalCloseProps>({
    props: inProps,
    name: 'JoyModalClose',
  });

  const {
    component = 'button',
    color: colorProp = 'neutral',
    variant: variantProp = 'plain',
    size: sizeProp = 'md',
    onClick,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const closeModalContext = React.useContext(CloseModalContext);
  const modalDialogVariantColor = React.useContext(ModalDialogVariantColorContext);
  const variant =
    inProps.variant ?? modalDialogVariantMapping[modalDialogVariantColor?.variant!] ?? variantProp;
  const color = inProps.color ?? modalDialogVariantColor?.color ?? colorProp;

  const modalDialogSize = React.useContext(ModalDialogSizeContext);
  const size = inProps.size ?? modalDialogSize ?? sizeProp;

  const { focusVisible, getRootProps } = useButton({
    ...props,
    rootRef: ref,
  });

  const ownerState = {
    ...props,
    color,
    component,
    variant,
    size,
    focusVisible,
  };

  const classes = useUtilityClasses(ownerState);

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    elementType: ModalCloseRoot,
    getSlotProps: getRootProps,
    externalForwardedProps: {
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        closeModalContext?.(event, 'closeClick');
        onClick?.(event);
      },
      ...other,
      component,
      slots,
      slotProps,
    },
    className: classes.root,
    ownerState,
  });

  return (
    <SlotRoot {...rootProps}>
      <CloseIcon />
    </SlotRoot>
  );
}) as OverridableComponent<ModalCloseTypeMap>;

ModalClose.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
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
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
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
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default ModalClose;
