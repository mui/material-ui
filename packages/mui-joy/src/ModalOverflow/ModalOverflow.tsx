import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps, styled } from '../styles';
import useSlot from '../utils/useSlot';
import { getModalOverflowUtilityClass } from './modalOverflowClasses';
import {
  ModalOverflowProps,
  ModalOverflowOwnerState,
  ModalOverflowTypeMap,
} from './ModalOverflowProps';
import CloseModalContext from '../Modal/CloseModalContext';
import ModalOverflowContext from './ModalOverflowContext';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getModalOverflowUtilityClass, {});
};

export const ModalOverflowRoot = styled('div', {
  name: 'JoyModalOverflow',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ModalOverflowOwnerState }>({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  height: '100%',
  overflow: 'hidden auto',
  outline: 'none',
});

const ModalOverflow = React.forwardRef(function ModalOverflow(inProps, ref) {
  const props = useThemeProps<typeof inProps & ModalOverflowProps>({
    props: inProps,
    name: 'JoyModalOverflow',
  });

  const { children, onMouseDown, ...other } = props;

  const onClose = React.useContext(CloseModalContext);

  const ownerState = props;

  const classes = useUtilityClasses();

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: classes.root,
    elementType: ModalOverflowRoot,
    externalForwardedProps: other,
    ownerState,
    additionalProps: {
      role: 'presentation',
      tabIndex: -1,
      onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
          onClose?.(event, 'backdropClick');
        }
        onMouseDown?.(event);
      },
    },
  });

  return (
    <ModalOverflowContext.Provider value>
      <SlotRoot {...rootProps}>{children}</SlotRoot>
    </ModalOverflowContext.Provider>
  );
}) as OverridableComponent<ModalOverflowTypeMap>;

ModalOverflow.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
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

export default ModalOverflow;
