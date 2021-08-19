import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { TransitionProps } from '@material-ui/core/transitions';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';

const NoTransition = React.forwardRef(function NoTransition(
  props: TransitionProps & { children?: React.ReactNode },
  ref: React.Ref<HTMLDivElement>,
) {
  const { children, in: inProp } = props;

  if (!inProp) {
    return null;
  }
  return (
    <div ref={ref} tabIndex={-1}>
      {children}
    </div>
  );
});

export default function UncontrolledDateTimePicker() {
  const [mode, toggleMode] = React.useReducer(
    (state) => (state === 'desktop' ? 'mobile' : 'desktop'),
    'desktop',
  );
  React.useEffect(() => {
    (window as any).muiTogglePickerMode = toggleMode;
    return () => {
      delete (window as any).muiTogglePickerMode;
    };
  }, []);
  const desktopMediaQuery = '(pointer: fine)';

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        // Simulating what would happen if the media query matches/not matches
        // Simpler to implement than mocking window.matchMedia
        desktopModeMediaQuery={mode === 'desktop' ? desktopMediaQuery : `not(${desktopMediaQuery})`}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        TransitionComponent={NoTransition}
        value={null}
      />
    </LocalizationProvider>
  );
}
