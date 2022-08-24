import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps, styled } from '../styles';
import { getModalDialogDescriptionUtilityClass } from './modalDialogDescriptionClasses';
import {
  ModalDialogDescriptionProps,
  ModalDialogDescriptionOwnerState,
  ModalDialogDescriptionTypeMap,
} from './ModalDialogDescriptionProps';
import ModalDialogSizeContext from '../ModalDialog/ModalDialogSizeContext';
import ModalDialogAriaContext from '../ModalDialog/ModalDialogAriaContext';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getModalDialogDescriptionUtilityClass, {});
};

export const ModalDialogDescriptionRoot = styled('div', {
  name: 'JoyModalDialogDescription',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ModalDialogDescriptionOwnerState }>({
  margin: 0,
});

const ModalDialogDescription = React.forwardRef(function ModalDialogDescription(inProps, ref) {
  const props = useThemeProps<typeof inProps & ModalDialogDescriptionProps>({
    props: inProps,
    name: 'JoyModalDialogDescription',
  });

  const { className, component = 'div', ...other } = props;

  const size = React.useContext(ModalDialogSizeContext);
  const modalDialog = React.useContext(ModalDialogAriaContext);

  const ownerState = {
    ...props,
    component,
    size,
  };

  const classes = useUtilityClasses();

  return (
    <ModalDialogDescriptionRoot
      ref={ref}
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      id={modalDialog?.descriptionId}
      {...other}
    />
  );
}) as OverridableComponent<ModalDialogDescriptionTypeMap>;

ModalDialogDescription.propTypes /* remove-proptypes */ = {
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
} as any;

export default ModalDialogDescription;
