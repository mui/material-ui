import * as React from 'react';
import { IUtils } from '@date-io/core/IUtils';
import { MuiPickersAdapterContext } from '../../LocalizationProvider';

export type MuiPickersAdapter<TDate = unknown> = IUtils<TDate>;

// TODO uncomment when syntax will be allowed by next babel
function checkUtils(utils: MuiPickersAdapter | null) /* :asserts utils is MuiPickersAdapter */ {
  if (!utils) {
    throw new Error(
      'Can not find utils in context. It looks like you forgot to wrap your component in LocalizationProvider, or pass dateAdapter prop directly.'
    );
  }
}

export function useUtils<T = unknown>() {
  const utils = React.useContext(MuiPickersAdapterContext);
  checkUtils(utils);

  return utils as MuiPickersAdapter<T>;
}

export function useNow<TDate = unknown>() {
  const utils = useUtils<TDate>();
  const now = React.useRef(utils.date());

  return now.current!;
}
