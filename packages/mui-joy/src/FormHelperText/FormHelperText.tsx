'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { FormHelperTextProps, FormHelperTextTypeMap } from './FormHelperTextProps';
import { getFormHelperTextUtilityClass } from './formHelperTextClasses';
import FormControlContext from '../FormControl/FormControlContext';
import formControlClasses from '../FormControl/formControlClasses';
import formLabelClasses from '../FormLabel/formLabelClasses';
import useSlot from '../utils/useSlot';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getFormHelperTextUtilityClass, {});
};

const FormHelperTextRoot = styled('div', {
  name: 'JoyFormHelperText',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: FormHelperTextProps }>(({ theme }) => ({
  '--Icon-fontSize': 'calc(var(--FormHelperText-lineHeight) * 1em)',
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  fontFamily: theme.vars.fontFamily.body,
  fontSize: `var(--FormHelperText-fontSize, ${theme.vars.fontSize.sm})`,
  lineHeight: `var(--FormHelperText-lineHeight, ${theme.vars.lineHeight.sm})`,
  color: `var(--FormHelperText-color, ${theme.vars.palette.text.tertiary})`,
  margin: 'var(--FormHelperText-margin, 0px)',
  [`.${formLabelClasses.root} + &`]: {
    '--FormHelperText-margin': '0px', // remove the margin if the helper text is next to the form label.
  },
  [`.${formControlClasses.error} &`]: {
    '--Icon-color': 'currentColor',
  },
}));
/**
 *
 * Demos:
 *
 * - [Input](https://mui.com/joy-ui/react-input/)
 *
 * API:
 *
 * - [FormHelperText API](https://mui.com/joy-ui/api/form-helper-text/)
 */
const FormHelperText = React.forwardRef(function FormHelperText(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyFormHelperText',
  });

  const { children, component, slots = {}, slotProps = {}, ...other } = props;
  const rootRef = React.useRef<HTMLElement>(null);
  const handleRef = useForkRef(rootRef, ref);
  const formControl = React.useContext(FormControlContext);
  const setHelperText = formControl?.setHelperText;

  React.useEffect(() => {
    setHelperText?.(rootRef.current);
    return () => {
      setHelperText?.(null);
    };
  }, [setHelperText]);

  const classes = useUtilityClasses();
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref: handleRef,
    elementType: FormHelperTextRoot,
    externalForwardedProps,
    ownerState: props,
    additionalProps: {
      as: component,
      id: formControl?.['aria-describedby'],
    },
    className: classes.root,
  });

  return <SlotRoot {...rootProps}>{children}</SlotRoot>;
}) as OverridableComponent<FormHelperTextTypeMap>;

FormHelperText.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
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
} as any;

export default FormHelperText;
