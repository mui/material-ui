import * as React from 'react';
import MuiError from '@material-ui/utils/macros/MuiError.macro';
import { MuiPickersAdapterContext } from '../../../LocalizationProvider';

// Required for babel https://github.com/vercel/next.js/issues/7882. Replace with `export type` in future
export type MuiPickersAdapter<TDate = unknown> =
  import('../../../LocalizationProvider/LocalizationProvider').MuiPickersAdapter<TDate>;

export function useUtils<T = unknown>() {
  const utils = React.useContext(MuiPickersAdapterContext);
  if (utils === null) {
    throw new MuiError(
      'Can not find utils in context. It looks like you forgot to wrap your component in LocalizationProvider, or pass dateAdapter prop directly.',
    );
  }

  return utils as MuiPickersAdapter<T>;
}

export function useNow<TDate = unknown>(): TDate {
  const utils = useUtils<TDate>();
  const now = React.useRef(utils.date());

  return now.current!;
}
