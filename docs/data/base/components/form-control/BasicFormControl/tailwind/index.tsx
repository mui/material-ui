import * as React from 'react';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input } from '@mui/base/Input';
import { useTheme } from '@mui/system';
import clsx from 'clsx';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function BasicFormControl() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <FormControl defaultValue="" className="font-sans" required>
        <Label>Name</Label>
        <Input
          placeholder="Write your name here"
          slotProps={{
            input: {
              className:
                'w-80 text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0',
            },
          }}
        />
        <HelperText />
      </FormControl>
    </div>
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
