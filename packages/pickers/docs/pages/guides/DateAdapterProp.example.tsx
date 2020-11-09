import * as React from 'react';
import ruLocale from 'date-fns/locale/ru';
import deLocale from 'date-fns/locale/de';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from '@material-ui/pickers';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';

const staticDateAdapter = new DateFnsAdapter({ locale: ruLocale });

export default function UsingDateAdapterProp() {
  const [locale] = React.useState(deLocale);
  const [value, setValue] = React.useState<Date | null>(new Date());

  const memoizedDateAdapter = React.useMemo(() => {
    return new DateFnsAdapter({ locale });
  }, [locale]);

  return (
    <React.Fragment>
      <DatePicker
        renderInput={(props) => <TextField {...props} />}
        value={value}
        onChange={(newValue) => setValue(newValue)}
        dateAdapter={staticDateAdapter}
      />
      <DatePicker
        value={value}
        onChange={(newValue) => setValue(newValue)}
        dateAdapter={memoizedDateAdapter}
        renderInput={(props) => (
          <TextField helperText="In case you need to generate adapter from state" {...props} />
        )}
      />
    </React.Fragment>
  );
}
