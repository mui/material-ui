'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import type { SxProps } from '@mui/system';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getFormGroupUtilityClass } from './formGroupClasses';
import { useFormControlState } from '../FormControl/useFormControl';
import type { Theme } from '../styles';
import type { InternalStandardProps as StandardProps } from '../internal';
import type { FormGroupClasses } from './formGroupClasses';

export interface FormGroupProps extends StandardProps<React.ComponentPropsWithRef<'div'>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FormGroupClasses> | undefined;
  /**
   * Display group of elements in a compact row.
   * @default false
   */
  row?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

type OwnerState = FormGroupProps & {
  error?: boolean | undefined;
};

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes, row, error } = ownerState;

  const slots = {
    root: ['root', row && 'row', error && 'error'],
  };

  return composeClasses(slots, getFormGroupUtilityClass, classes);
};

const FormGroupRoot = styled('div', {
  name: 'MuiFormGroup',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, ownerState.row && styles.row];
  },
})<{ ownerState: OwnerState }>({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  variants: [
    {
      props: { row: true },
      style: {
        flexDirection: 'row',
      },
    },
  ],
});

/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 *
 * Demos:
 *
 * - [Checkbox](https://mui.com/material-ui/react-checkbox/)
 * - [Switch](https://mui.com/material-ui/react-switch/)
 *
 * API:
 *
 * - [FormGroup API](https://mui.com/material-ui/api/form-group/)
 */
const FormGroup = React.forwardRef(function FormGroup(
  inProps: FormGroupProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiFormGroup',
  });

  const { className, row = false, ...other } = props;
  const [fcs] = useFormControlState({
    props,
    states: ['error'],
  });

  const ownerState = { ...props, row, error: fcs.error };
  const classes = useUtilityClasses(ownerState);

  return (
    <FormGroupRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
}) as React.ForwardRefExoticComponent<FormGroupProps>;

FormGroup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Display group of elements in a compact row.
   * @default false
   */
  row: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default FormGroup;
