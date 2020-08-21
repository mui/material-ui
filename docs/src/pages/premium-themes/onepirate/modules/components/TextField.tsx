import React from 'react';
import clsx from 'clsx';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';

const inputSyleMapping = {
  small: 'inputSizeSmall',
  medium: 'inputSizeMedium',
  large: 'inputSizeLarge',
  xlarge: 'inputSizeXlarge',
};

const styles = (theme: any) =>
  createStyles({
    root: {
      padding: 0,
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      minWidth: theme.spacing(6),
      backgroundColor: theme.palette.common.white,
      '&$disabled': {
        backgroundColor: theme.palette.divider,
      },
    },
    inputBorder: {
      border: '1px solid #e9ddd0',
      '&:focus': {
        borderColor: theme.palette.secondary.main,
      },
    },
    disabled: {},
    [inputSyleMapping['small']]: {
      fontSize: 14,
      padding: theme.spacing(1),
      width: `calc(100% - ${theme.spacing(2)}px)`,
    },
    [inputSyleMapping['medium']]: {
      fontSize: 16,
      padding: theme.spacing(2),
      width: `calc(100% - ${theme.spacing(4)}px)`,
    },
    [inputSyleMapping['large']]: {
      fontSize: 18,
      padding: 20,
      width: `calc(100% - ${20 * 2}px)`,
    },
    [inputSyleMapping['xlarge']]: {
      fontSize: 20,
      padding: 25,
      width: `calc(100% - ${25 * 2}px)`,
    },
    formLabel: {
      fontSize: 18,
    },
    select: {
      height: 'auto',
      borderRadius: 0,
    },
    selectIcon: {
      top: '50%',
      marginTop: -12,
    },
  });

export interface OnePirateTextFieldProps extends Omit<TextFieldProps, 'size'> {
  noBorder?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
}

function TextField(props: OnePirateTextFieldProps & WithStyles<typeof styles>) {
  const {
    classes,
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

  const disableUnderline = {
    disableUnderline: true,
  };

  return (
    <MuiTextField
      InputProps={{
        ...disableUnderline,
        classes: {
          root: classes.root,
          input: clsx(
            classes.input,
            classes[inputSyleMapping[size]],
            {
              [classes.inputBorder]: !noBorder,
            },
            InputPropsClassesInput,
          ),
          disabled: classes.disabled,
          ...InputPropsClassesOther,
        },
        ...InputPropsOther,
      }}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
        className: classes.formLabel,
      }}
      SelectProps={{
        ...SelectProps,
        classes: {
          select: classes.select,
          icon: classes.selectIcon,
        },
      }}
      {...other}
    />
  );
}

export default withStyles(styles)(TextField);
