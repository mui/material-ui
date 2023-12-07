import * as React from 'react';
import PropTypes from 'prop-types';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import { useTheme } from '@mui/system';
import clsx from 'clsx';

export default function BasicFormControl() {
  return (
    <React.Fragment>
      <FormControl defaultValue="" required>
        <Label>Name</Label>
        <Input placeholder="Write your name here" className="CustomInput" />
        <HelperText />
      </FormControl>
      <Styles />
    </React.Fragment>
  );
}

const Label = React.forwardRef(({ className: classNameProp, children }, ref) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p className={clsx('text-sm mb-1', classNameProp)}>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <p
      ref={ref}
      className={clsx(
        'text-sm mb-1',
        classNameProp,
        error || showRequiredError ? 'invalid text-red-500' : '',
      )}
    >
      {children}
      {required ? ' *' : ''}
    </p>
  );
});

const HelperText = React.forwardRef((props, ref) => {
  const { className, ...other } = props;
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? (
    <p ref={ref} className={clsx('text-sm', className)} {...other}>
      This field is required.
    </p>
  ) : null;
});

HelperText.propTypes = {
  className: PropTypes.string,
};

const cyan = {
  50: '#E9F8FC',
  100: '#BDEBF4',
  200: '#99D8E5',
  300: '#66BACC',
  400: '#1F94AD',
  500: '#0D5463',
  600: '#094855',
  700: '#063C47',
  800: '#043039',
  900: '#022127',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

function Styles() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <style>
      {`
      .CustomInput .${inputClasses.input} {
        width: 320px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${isDarkMode ? grey[300] : grey[900]};
        background: ${isDarkMode ? grey[900] : '#fff'};
        border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${isDarkMode ? grey[900] : grey[50]};
      }
      .CustomInput .${inputClasses.input}:hover {
        border-color: ${cyan[400]};
      }
      .CustomInput .${inputClasses.input}:focus {
        outline: 0;
        border-color: ${cyan[400]};
        box-shadow: 0 0 0 3px ${isDarkMode ? cyan[600] : cyan[200]};
      }
      `}
    </style>
  );
}
