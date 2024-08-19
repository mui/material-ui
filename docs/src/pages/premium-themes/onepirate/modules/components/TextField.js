import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';
import { selectClasses } from '@mui/material/Select';
import { inputLabelClasses } from '@mui/material/InputLabel';

const inputStyleMappingClasses = {
  small: 'OnePirateTextField-inputSizeSmall',
  medium: 'OnePirateTextField-inputSizeMedium',
  large: 'OnePirateTextField-inputSizeLarge',
  xlarge: 'OnePirateTextField-inputSizeXLarge',
};

const classes = {
  root: 'OnePirateTextField-root',
  input: 'OnePirateTextField-input',
  inputBorder: 'OnePirateTextField-inputBorder',
};

const styles = ({ theme }) => ({
  [`& .${classes.root}`]: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  [`& .${classes.input}`]: {
    minWidth: theme.spacing(6),
    backgroundColor: theme.palette.common.white,
    '&.Mui-disabled': {
      backgroundColor: theme.palette.divider,
    },
  },
  [`& .${classes.inputBorder}`]: {
    border: '1px solid #e9ddd0',
    '&:focus': {
      borderColor: theme.palette.secondary.main,
    },
  },
  [`& .${inputStyleMappingClasses.small}`]: {
    fontSize: 14,
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(2)})`,
  },
  [`& .${inputStyleMappingClasses.medium}`]: {
    fontSize: 16,
    padding: theme.spacing(2),
    width: `calc(100% - ${theme.spacing(4)})`,
  },
  [`& .${inputStyleMappingClasses.large}`]: {
    fontSize: 18,
    padding: 20,
    width: `calc(100% - ${20 * 2}px)`,
  },
  [`& .${inputStyleMappingClasses.xlarge}`]: {
    fontSize: 20,
    padding: 25,
    width: `calc(100% - ${25 * 2}px)`,
  },
  [`& .${inputLabelClasses.root}`]: {
    fontSize: 18,
  },
  [`& .${selectClasses.select}`]: {
    height: 'auto',
    borderRadius: 0,
  },
  [`& .${selectClasses.icon}`]: {
    top: '50%',
    marginTop: -12,
  },
});

function TextField(props) {
  const {
    InputProps = {},
    InputLabelProps,
    noBorder,
    size = 'medium',
    SelectProps,
    ...other
  } = props;

  const {
    classes: { input: InputPropsClassesInput, ...InputPropsClassesOther } = {},
    ...InputPropsOther
  } = InputProps;

  return (
    <MuiTextField
      InputProps={{
        classes: {
          root: classes.root,
          input: clsx(
            classes.input,
            inputStyleMappingClasses[size],
            {
              [classes.inputBorder]: !noBorder,
            },
            InputPropsClassesInput,
          ),
          ...InputPropsClassesOther,
        },
        disableUnderline: true,
        ...InputPropsOther,
      }}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
      }}
      SelectProps={SelectProps}
      {...other}
    />
  );
}

TextField.propTypes = {
  /**
   * Props applied to the [`InputLabel`](/material-ui/api/input-label/) element.
   * Pointer events like `onClick` are enabled if and only if `shrink` is `true`.
   * @deprecated Use `slotProps.inputLabel` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  InputLabelProps: PropTypes.object,
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/material-ui/api/filled-input/),
   * [`OutlinedInput`](/material-ui/api/outlined-input/) or [`Input`](/material-ui/api/input/)
   * component depending on the `variant` prop value.
   * @deprecated Use `slotProps.input` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  InputProps: PropTypes.object,
  noBorder: PropTypes.bool,
  /**
   * Props applied to the [`Select`](/material-ui/api/select/) element.
   * @deprecated Use `slotProps.select` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  SelectProps: PropTypes.object,
  size: PropTypes.oneOf(['large', 'medium', 'small', 'xlarge']),
};

export default styled(TextField)(styles);
