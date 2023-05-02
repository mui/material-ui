import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import useSlot from '../utils/useSlot';
import { FormLabelProps, FormLabelTypeMap } from './FormLabelProps';
import { getFormLabelUtilityClass } from './formLabelClasses';
import FormControlContext from '../FormControl/FormControlContext';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
    asterisk: ['asterisk'],
  };

  return composeClasses(slots, getFormLabelUtilityClass, {});
};

const FormLabelRoot = styled('label', {
  name: 'JoyFormLabel',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: FormLabelProps }>(({ theme }) => ({
  WebkitTapHighlightColor: 'transparent',
  alignSelf: 'var(--FormLabel-alignSelf)', // to not fill the block space. It seems like a bug when clicking on empty space (within the label area), even though it is not.
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  userSelect: 'none',
  fontFamily: theme.vars.fontFamily.body,
  fontSize: `var(--FormLabel-fontSize, ${theme.vars.fontSize.sm})`,
  fontWeight: theme.vars.fontWeight.md,
  lineHeight: theme.vars.lineHeight.md,
  color: `var(--FormLabel-color, ${theme.vars.palette.text.primary})`,
  margin: 'var(--FormLabel-margin, 0px)',
}));

const AsteriskComponent = styled('span', {
  name: 'JoyFormLabel',
  slot: 'Asterisk',
  overridesResolver: (props, styles) => styles.asterisk,
})<{ ownerState: FormLabelProps }>({
  color: 'var(--FormLabel-asteriskColor)',
});
/**
 *
 * Demos:
 *
 * - [Input](https://mui.com/joy-ui/react-input/)
 *
 * API:
 *
 * - [FormLabel API](https://mui.com/joy-ui/api/form-label/)
 */
const FormLabel = React.forwardRef(function FormLabel(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyFormLabel',
  });

  const { children, component = 'label', slots = {}, slotProps = {}, ...other } = props;
  const formControl = React.useContext(FormControlContext);
  const required = inProps.required ?? formControl?.required ?? false;

  const ownerState = {
    ...props,
    required,
  };

  const classes = useUtilityClasses();
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    additionalProps: {
      htmlFor: formControl?.htmlFor,
      id: formControl?.labelId,
    },
    ref,
    className: classes.root,
    elementType: FormLabelRoot,
    externalForwardedProps,
    ownerState,
  });

  const [SlotAsterisk, asteriskProps] = useSlot('asterisk', {
    additionalProps: { 'aria-hidden': true },
    className: classes.asterisk,
    elementType: AsteriskComponent,
    externalForwardedProps,
    ownerState,
  });

  return (
    <SlotRoot {...rootProps}>
      {children}
      {required && <SlotAsterisk {...asteriskProps}>&thinsp;{'*'}</SlotAsterisk>}
    </SlotRoot>
  );
}) as OverridableComponent<FormLabelTypeMap>;

FormLabel.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
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
   * The asterisk is added if required=`true`
   */
  required: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    asterisk: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    asterisk: PropTypes.elementType,
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

export default FormLabel;
