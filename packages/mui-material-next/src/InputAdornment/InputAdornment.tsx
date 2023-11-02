'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import { unstable_composeClasses as composeClasses, useSlotProps } from '@mui/base';
import Typography from '@mui/material/Typography';
import { styled, useThemeProps } from '../styles';
import FormControlContext from '../FormControl/FormControlContext';
import useFormControl from '../FormControl/useFormControl';
import { getInputAdornmentUtilityClass } from './inputAdornmentClasses';
import {
  InputAdornmentOwnerState,
  InputAdornmentProps,
  InputAdornmentTypeMap,
} from './InputAdornment.types';

const useUtilityClasses = (ownerState: InputAdornmentOwnerState) => {
  const { classes, disablePointerEvents, hiddenLabel, position, size, variant } = ownerState;
  const slots = {
    root: [
      'root',
      disablePointerEvents && 'disablePointerEvents',
      position && `position${capitalize(position)}`,
      variant,
      hiddenLabel && 'hiddenLabel',
      size && `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getInputAdornmentUtilityClass, classes);
};

const InputAdornmentRoot = styled('div', {
  name: 'MuiInputAdornment',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[`position${capitalize(ownerState.position)}`],
      ownerState.disablePointerEvents === true && styles.disablePointerEvents,
      styles[ownerState.variant],
    ];
  },
})<{ ownerState: InputAdornmentOwnerState }>(({ theme, ownerState }) => {
  const { vars: tokens } = theme;
  return {
    '--md-comp-input-adornment-color': tokens.sys.color.onSurfaceVariant,
    display: 'flex',
    maxHeight: '2em',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    color: 'var(--md-comp-input-adornment-color)',
    // TODO: this may not be needed, resolve when integrating TextField+Label
    // https://github.com/mui/material-ui/issues/39628#issuecomment-1786842659
    // ...(ownerState.variant === 'filled' && {
    //   // Styles applied to the root element if `variant="filled"`.
    //   [`&.${inputAdornmentClasses.positionStart}&:not(.${inputAdornmentClasses.hiddenLabel})`]: {
    //     marginTop: 16,
    //   },
    // }),
    ...(ownerState.position === 'start' && {
      // Styles applied to the root element if `position="start"`.
      marginRight: 8,
    }),
    ...(ownerState.position === 'end' && {
      // Styles applied to the root element if `position="end"`.
      marginLeft: 8,
    }),
    ...(ownerState.disablePointerEvents === true && {
      // Styles applied to the root element if `disablePointerEvents={true}`.
      pointerEvents: 'none',
    }),
  };
});

const InputAdornment = React.forwardRef(function InputAdornment<
  RootComponentType extends React.ElementType,
>(inProps: InputAdornmentProps<RootComponentType>, forwardedRef: React.ForwardedRef<Element>) {
  const props = useThemeProps({ props: inProps, name: 'MuiInputAdornment' });
  const {
    children,
    component = 'div',
    disablePointerEvents = false,
    disableTypography = false,
    position,
    variant: variantProp,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const muiFormControl = useFormControl();

  if (variantProp && muiFormControl?.variant) {
    if (process.env.NODE_ENV !== 'production') {
      if (variantProp === muiFormControl.variant) {
        console.error(
          'MUI: The `InputAdornment` variant infers the variant prop ' +
            'you do not have to provide one.',
        );
      }
    }
  }

  const ownerState: InputAdornmentOwnerState = {
    ...props,
    hiddenLabel: muiFormControl?.hiddenLabel ?? false,
    size: muiFormControl?.size ?? 'medium',
    disablePointerEvents,
    position,
    variant: muiFormControl?.variant ?? variantProp ?? 'outlined',
  };

  const classes = useUtilityClasses(ownerState);

  const Root = slots.root ?? InputAdornmentRoot;

  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: forwardedRef,
      as: component,
    },
    externalForwardedProps: other,
    ownerState,
    className: [classes.root],
  });

  return (
    <FormControlContext.Provider value={undefined}>
      <Root {...rootProps}>
        {typeof children === 'string' && !disableTypography ? (
          <Typography color="text.secondary">{children}</Typography>
        ) : (
          <React.Fragment>
            {/* To have the correct vertical alignment baseline */}
            {position === 'start' ? (
              /* notranslate needed while Google Translate will not fix zero-width space issue */
              <span className="notranslate">&#8203;</span>
            ) : null}
            {children}
          </React.Fragment>
        )}
      </Root>
    </FormControlContext.Provider>
  );
}) as OverridableComponent<InputAdornmentTypeMap>;

InputAdornment.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component, normally an `IconButton` or string.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Disable pointer events on the root.
   * This allows for the content of the adornment to focus the `input` on click.
   * @default false
   */
  disablePointerEvents: PropTypes.bool,
  /**
   * If children is a string then disable wrapping in a Typography component.
   * @default false
   */
  disableTypography: PropTypes.bool,
  /**
   * The position this adornment should appear relative to the `Input`.
   */
  position: PropTypes.oneOf(['end', 'start']).isRequired,
  /**
   * The components used for each slot inside the InputAdornment.
   * Either a string to use a HTML element or a component.
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
   * The variant to use.
   * Note: If you are using the `TextField` component or the `FormControl` component
   * you do not have to set this manually.
   */
  variant: PropTypes.oneOf(['filled', 'outlined']),
} as any;

export default InputAdornment;
