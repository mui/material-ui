import * as React from 'react';
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

const Label = React.forwardRef<
  HTMLParagraphElement,
  { className?: string; children?: React.ReactNode }
>(({ className: classNameProp, children }, ref) => {
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

const HelperText = React.forwardRef<HTMLParagraphElement, { className?: string }>(
  (props, ref) => {
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
  },
);

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
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
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
        font-size: 0.875rem;
        font-family: IBM Plex Sans, sans-serif;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${isDarkMode ? grey[300] : grey[900]};
        background: ${isDarkMode ? grey[900] : '#fff'};
        border: 1px solid ${isDarkMode ? grey[800] : grey[300]};
      }
           .CustomInput .${inputClasses.input}:hover {
        background: ${isDarkMode ? '' : grey[100]};
        border-color: ${isDarkMode ? grey[700] : grey[400]};
      }
           .CustomInput .${inputClasses.input}:focus {
        outline: 3px solid ${isDarkMode ? cyan[600] : cyan[100]};
      }
      `}
    </style>
  );
}
