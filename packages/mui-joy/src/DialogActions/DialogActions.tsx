'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getDialogActionsUtilityClass } from './dialogActionsClasses';
import { DialogActionsProps, DialogActionsTypeMap } from './DialogActionsProps';
import useSlot from '../utils/useSlot';
import { StyledCardActionsRoot } from '../CardActions/CardActions';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getDialogActionsUtilityClass, {});
};

const DialogActionsRoot = styled(StyledCardActionsRoot, {
  name: 'JoyDialogActions',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: DialogActionsProps }>({});
/**
 *
 * Demos:
 *
 * - [Modal](https://mui.com/joy-ui/react-modal/)
 *
 * API:
 *
 * - [DialogActions API](https://mui.com/joy-ui/api/dialog-actions/)
 */
const DialogActions = React.forwardRef(function DialogActions(inProps, ref) {
  const props = useThemeProps<typeof inProps & DialogActionsProps>({
    props: inProps,
    name: 'JoyDialogActions',
  });

  const {
    component = 'div',
    children,
    buttonFlex,
    orientation = 'horizontal-reverse',
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const ownerState = {
    ...props,
    component,
    buttonFlex,
    orientation,
  };

  const classes = useUtilityClasses();

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: classes.root,
    elementType: DialogActionsRoot,
    externalForwardedProps,
    ownerState,
  });

  return <SlotRoot {...rootProps}>{children}</SlotRoot>;
}) as OverridableComponent<DialogActionsTypeMap>;

DialogActions.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The CSS `flex` for the Button and its wrapper.
   */
  buttonFlex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Used to render icon or text elements inside the DialogActions if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The component orientation.
   * @default 'horizontal-reverse'
   */
  orientation: PropTypes.oneOf(['horizontal-reverse', 'horizontal', 'vertical']),
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
    PropTypes.func,
    PropTypes.object,
    PropTypes.shape({
      '--LinearProgress-circulation': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-percent': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-progressMaxWidth': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-progressMinWidth': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-progressRadius': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-progressThickness': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-radius': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-thickness': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    PropTypes.shape({
      '__@iterator@86359': PropTypes.func.isRequired,
      '__@unscopables@86607': PropTypes.shape({
        '__@iterator@86359': PropTypes.bool,
        '__@unscopables@86607': PropTypes.bool,
        at: PropTypes.bool,
        concat: PropTypes.bool,
        entries: PropTypes.bool,
        every: PropTypes.bool,
        filter: PropTypes.bool,
        find: PropTypes.bool,
        findIndex: PropTypes.bool,
        flat: PropTypes.bool,
        flatMap: PropTypes.bool,
        forEach: PropTypes.bool,
        includes: PropTypes.bool,
        indexOf: PropTypes.bool,
        join: PropTypes.bool,
        keys: PropTypes.bool,
        lastIndexOf: PropTypes.bool,
        length: PropTypes.bool,
        map: PropTypes.bool,
        reduce: PropTypes.bool,
        reduceRight: PropTypes.bool,
        slice: PropTypes.bool,
        some: PropTypes.bool,
        toLocaleString: PropTypes.bool,
        toString: PropTypes.bool,
        values: PropTypes.bool,
      }).isRequired,
      '--LinearProgress-circulation': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-percent': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-progressMaxWidth': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-progressMinWidth': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-progressRadius': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-progressThickness': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-radius': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-thickness': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      at: PropTypes.func.isRequired,
      concat: PropTypes.func.isRequired,
      entries: PropTypes.func.isRequired,
      every: PropTypes.func.isRequired,
      filter: PropTypes.func.isRequired,
      find: PropTypes.func.isRequired,
      findIndex: PropTypes.func.isRequired,
      flat: PropTypes.func.isRequired,
      flatMap: PropTypes.func.isRequired,
      forEach: PropTypes.func.isRequired,
      includes: PropTypes.func.isRequired,
      indexOf: PropTypes.func.isRequired,
      join: PropTypes.func.isRequired,
      keys: PropTypes.func.isRequired,
      lastIndexOf: PropTypes.func.isRequired,
      length: PropTypes.number.isRequired,
      map: PropTypes.func.isRequired,
      reduce: PropTypes.func.isRequired,
      reduceRight: PropTypes.func.isRequired,
      slice: PropTypes.func.isRequired,
      some: PropTypes.func.isRequired,
      toLocaleString: PropTypes.func.isRequired,
      toString: PropTypes.func.isRequired,
      values: PropTypes.func.isRequired,
    }),
  ]),
} as any;

export default DialogActions;
