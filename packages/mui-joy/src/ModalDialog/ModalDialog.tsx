import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { styled, useThemeProps } from '../styles';
import { SheetRoot } from '../Sheet/Sheet';
import { getModalDialogUtilityClass } from './modalDialogClasses';
import { ModalDialogProps, ModalDialogTypeMap } from './ModalDialogProps';

const useUtilityClasses = (ownerState: ModalDialogProps) => {
  const { variant, color } = ownerState;

  const slots = {
    root: [
      'root',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
    ],
  };

  return composeClasses(slots, getModalDialogUtilityClass, {});
};

export const ModalDialogRoot = styled(SheetRoot, {
  name: 'JoyModalDialog',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ModalDialogProps }>(({ theme }) => ({
  borderRadius: theme.vars.radius.sm,
  boxShadow: theme.vars.shadow.sm,
}));

const ModalDialog = React.forwardRef(function ModalDialog(inProps, ref) {
  const props = useThemeProps<typeof inProps & ModalDialogProps>({
    props: inProps,
    name: 'JoyModalDialog',
  });

  const { className, color = 'neutral', component = 'div', variant = 'outlined', ...other } = props;

  const ownerState = {
    ...props,
    color,
    component,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ModalDialogRoot
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      ref={ref}
      role="dialog"
      aria-modal="true"
      {...other}
    />
  );
}) as OverridableComponent<ModalDialogTypeMap>;

ModalDialog.propTypes /* remove-proptypes */ = {
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

export default ModalDialog;
