import { useContext, useRef } from 'react';
import { IUtils } from '@date-io/core/IUtils';
import { MuiPickersAdapterContext } from '../../LocalizationProvider';

export type MuiPickersAdapter<TDate = unknown> = IUtils<TDate>;

// TODO uncomment when syntax will be allowed by next babel
function checkUtils(utils: MuiPickersAdapter | null): asserts utils is MuiPickersAdapter {
  if (!utils) {
    throw new Error(
      'Can not find utils in context. It looks like you forgot to wrap your component in LocalizationProvider, or pass dateAdapter prop directly.'
    );
  }
}

export function useUtils() {
  const utils = useContext(MuiPickersAdapterContext);
  checkUtils(utils);

  return utils;
}

export function useNow() {
  const utils = useUtils();
  const now = useRef(utils.date());

  return now.current;
}
