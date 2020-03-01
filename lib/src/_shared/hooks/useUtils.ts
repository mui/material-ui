import { useContext, useRef } from 'react';
import { IUtils } from '@date-io/core/IUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import { MuiPickersAdapterContext } from '../../LocalizationProvider';

export type MuiPickersAdapter = IUtils<MaterialUiPickersDate>;

// TODO uncomment when syntax will be allowed by next babel
function checkUtils(utils: MuiPickersAdapter | null) /* : asserts utils is MuiPickersUtils */ {
  if (!utils) {
    throw new Error(
      'Can not find utils in context. It looks like you forgot to wrap your component in LocalizationProvider, or pass dateAdapter prop directly.'
    );
  }
}

export function useUtils() {
  const utils = useContext(MuiPickersAdapterContext);
  checkUtils(utils);

  return utils!;
}

export function useNow() {
  const utils = useUtils();
  const now = useRef(utils.date());

  return now.current;
}
