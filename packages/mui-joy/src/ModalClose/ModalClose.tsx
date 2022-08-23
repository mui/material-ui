import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { useSlotProps } from '@mui/base/utils';
import { useButton } from '@mui/base/ButtonUnstyled';
import { useThemeProps, styled } from '../styles';
import { IconButtonRoot } from '../IconButton/IconButton';
import { getModalCloseUtilityClass } from './modalCloseClasses';
import { ModalCloseProps, ModalCloseTypeMap } from './ModalCloseProps';
import CloseIcon from '../internal/svg-icons/Close';
import CloseModalContext from '../Modal/CloseModalContext';
import ModalDialogSizeContext from '../ModalDialog/ModalDialogSizeContext';
import ModalDialogVariantColorContext from '../ModalDialog/ModalDialogVariantColorContext';

const useUtilityClasses = (ownerState: ModalCloseProps & { focusVisible: boolean }) => {
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

export const ModalCloseRoot = styled(IconButtonRoot, {
  name: 'JoyModalClose',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ModalCloseProps }>(({ ownerState, theme }) => ({
  ...(ownerState.size === 'sm' && {
    '--IconButton-size': '28px',
  }),
  ...(ownerState.size === 'md' && {
    '--IconButton-size': '36px',
  }),
  ...(ownerState.size === 'lg' && {
    '--IconButton-size': '40px',
  }),
  position: 'absolute',
  top: 'var(--internal-paddingBlock)',
  right: 'var(--internal-paddingBlock)',
  borderRadius: 'var(--ModalClose-radius)',
  // for variant without a background, use `tertiary` text color to reduce the importancy of the close icon.
  ...(!theme.variants[ownerState.variant!]?.[ownerState.color!]?.backgroundColor && {
    color: theme.vars.palette.text.tertiary,
  }),
}));

const modalDialogVariantMapping = {
  plain: 'plain',
  outlined: 'plain',
  soft: 'soft',
  solid: 'solid',
} as const;

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
    ...other
  } = props;

  const closeModalContext = React.useContext(CloseModalContext);
  const modalDialogVariantColor = React.useContext(ModalDialogVariantColorContext);
  const color = inProps.color ?? modalDialogVariantColor?.color ?? colorProp;
  const variant =
    inProps.variant ?? modalDialogVariantMapping[modalDialogVariantColor?.variant!] ?? variantProp;

  const modalDialogSize = React.useContext(ModalDialogSizeContext);
  const size = inProps.size ?? modalDialogSize ?? sizeProp;

  const { focusVisible, getRootProps } = useButton({
    ...props,
    ref,
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

  const rootProps = useSlotProps({
    elementType: ModalCloseRoot,
    getSlotProps: getRootProps,
    externalSlotProps: {
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        closeModalContext?.(event, 'closeClick');
        onClick?.(event);
      },
      ...other,
    },
    additionalProps: {
      as: component,
    },
    className: classes.root,
    ownerState,
  });

  return (
    <ModalCloseRoot {...rootProps}>
      <CloseIcon />
    </ModalCloseRoot>
  );
}) as OverridableComponent<ModalCloseTypeMap>;

ModalClose.propTypes /* remove-proptypes */ = {
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
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
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
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default ModalClose;
