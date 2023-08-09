'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import {
  unstable_capitalize as capitalize,
  unstable_isMuiElement as isMuiElement,
  unstable_useId as useId,
} from '@mui/utils';
import { styled, useThemeProps } from '../styles';
import { ColorInversionProvider, useColorInversion } from '../styles/ColorInversion';
import { getModalDialogUtilityClass } from './modalDialogClasses';
import { ModalDialogProps, ModalDialogOwnerState, ModalDialogTypeMap } from './ModalDialogProps';
import ModalDialogSizeContext from './ModalDialogSizeContext';
import ModalDialogVariantColorContext from './ModalDialogVariantColorContext';
import useSlot from '../utils/useSlot';
import { StyledCardRoot } from '../Card/Card';

const useUtilityClasses = (ownerState: ModalDialogOwnerState) => {
  const { variant, color, size, layout } = ownerState;

  const slots = {
    root: [
      'root',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
      layout && `layout${capitalize(layout)}`,
    ],
  };

  return composeClasses(slots, getModalDialogUtilityClass, {});
};

const ModalDialogRoot = styled(StyledCardRoot, {
  name: 'JoyModalDialog',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ModalDialogOwnerState }>(({ theme, ownerState }) => ({
  '--ModalDialog-minWidth':
    typeof ownerState.minWidth === 'number' ? `${ownerState.minWidth}px` : ownerState.minWidth,
  '--ModalDialog-maxWidth':
    typeof ownerState.maxWidth === 'number' ? `${ownerState.maxWidth}px` : ownerState.maxWidth,
  '--ModalClose-radius':
    'max((var(--Card-radius) - var(--variant-borderWidth, 0px)) - var(--ModalClose-inset), min(var(--ModalClose-inset) / 2, (var(--Card-radius) - var(--variant-borderWidth, 0px)) / 2))',
  ...(ownerState.variant === 'solid' && {
    '--DialogContent-color': 'currentColor',
  }),
  ...(ownerState.size === 'sm' && {
    '--Card-padding': '0.625rem',
    '--ModalDialog-titleOffset': theme.spacing(0.25),
    '--ModalDialog-descriptionOffset': theme.spacing(0.25),
    '--ModalClose-inset': theme.spacing(1),
  }),
  ...(ownerState.size === 'md' && {
    '--ModalDialog-titleOffset': theme.spacing(0.25),
    '--ModalDialog-descriptionOffset': theme.spacing(0.75),
    '--ModalClose-inset': theme.spacing(1.5),
  }),
  ...(ownerState.size === 'lg' && {
    '--ModalDialog-titleOffset': theme.spacing(0.5),
    '--ModalDialog-descriptionOffset': theme.spacing(1),
    '--ModalClose-inset': theme.spacing(1.5),
  }),
  boxSizing: 'border-box',
  boxShadow: theme.shadow.md,
  minWidth: 'min(calc(100vw - 2 * var(--Card-padding)), var(--ModalDialog-minWidth, 300px))',
  outline: 0,
  position: 'absolute',
  ...(ownerState.layout === 'fullscreen' && {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: 0,
    borderRadius: 0,
  }),
  ...(ownerState.layout === 'center' && {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 'min(calc(100vw - 2 * var(--Card-padding)), var(--ModalDialog-maxWidth, 100vw))',
    maxHeight: 'calc(100% - 2 * var(--Card-padding))',
  }),
  [`& [id="${ownerState['aria-labelledby']}"]`]: {
    '--Typography-margin': 'calc(-1 * var(--ModalDialog-titleOffset)) 0 var(--ModalDialog-gap) 0',
    '--Typography-fontSize': '1.125em',
    [`& + [id="${ownerState['aria-describedby']}"]`]: {
      '--unstable_ModalDialog-descriptionOffset': 'calc(-1 * var(--ModalDialog-descriptionOffset))',
    },
  },
  [`& [id="${ownerState['aria-describedby']}"]`]: {
    '--Typography-fontSize': '1em',
    '--Typography-margin':
      'var(--unstable_ModalDialog-descriptionOffset, var(--ModalDialog-gap)) 0 0 0',
    '&:not(:last-child)': {
      // create spacing between description and the next element.
      '--Typography-margin':
        'var(--unstable_ModalDialog-descriptionOffset, var(--ModalDialog-gap)) 0 var(--ModalDialog-gap) 0',
    },
  },
}));
/**
 *
 * Demos:
 *
 * - [Modal](https://mui.com/joy-ui/react-modal/)
 *
 * API:
 *
 * - [ModalDialog API](https://mui.com/joy-ui/api/modal-dialog/)
 */
const ModalDialog = React.forwardRef(function ModalDialog(inProps, ref) {
  const props = useThemeProps<typeof inProps & ModalDialogProps>({
    props: inProps,
    name: 'JoyModalDialog',
  });

  const {
    className,
    children,
    invertedColors = false,
    orientation = 'vertical',
    color: colorProp = 'neutral',
    component = 'div',
    variant = 'outlined',
    size = 'md',
    layout = 'center',
    maxWidth,
    minWidth,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, colorProp);

  const ownerState = {
    ...props,
    color,
    component,
    maxWidth,
    minWidth,
    layout,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const labelledBy = useId();
  const describedBy = useId();
  const contextValue = React.useMemo(
    () => ({ variant, color: color === 'context' ? undefined : color, labelledBy, describedBy }),
    [color, variant, labelledBy, describedBy],
  );

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: ModalDialogRoot,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      as: component,
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': labelledBy,
      'aria-describedby': describedBy,
    },
  });

  const result = (
    <ModalDialogSizeContext.Provider value={size}>
      <ModalDialogVariantColorContext.Provider value={contextValue}>
        <SlotRoot {...rootProps}>
          {React.Children.map(children, (child, index) => {
            if (!React.isValidElement(child)) {
              return child;
            }
            const extraProps: Record<string, any> = {};
            if (isMuiElement(child, ['Divider'])) {
              extraProps.inset = 'inset' in child.props ? child.props.inset : 'context';

              const dividerOrientation = orientation === 'vertical' ? 'horizontal' : 'vertical';
              extraProps.orientation =
                'orientation' in child.props ? child.props.orientation : dividerOrientation;
            }
            if (isMuiElement(child, ['CardOverflow'])) {
              if (orientation === 'horizontal') {
                extraProps['data-parent'] = 'Card-horizontal';
              }
              if (orientation === 'vertical') {
                extraProps['data-parent'] = 'Card-vertical';
              }
            }
            if (index === 0) {
              extraProps['data-first-child'] = '';
            }
            if (index === React.Children.count(children) - 1) {
              extraProps['data-last-child'] = '';
            }
            return React.cloneElement(child, extraProps);
          })}
        </SlotRoot>
      </ModalDialogVariantColorContext.Provider>
    </ModalDialogSizeContext.Provider>
  );

  if (invertedColors) {
    return <ColorInversionProvider variant={variant}>{result}</ColorInversionProvider>;
  }
  return result;
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
    PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the children with an implicit color prop invert their colors to match the component's variant and color.
   * @default false
   */
  invertedColors: PropTypes.bool,
  /**
   * The layout of the dialog
   * @default 'center'
   */
  layout: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['center', 'fullscreen']),
    PropTypes.string,
  ]),
  /**
   * The maximum width of the component.
   */
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The minimum width of the component.
   */
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The component orientation.
   * @default 'vertical'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
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
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default ModalDialog;
