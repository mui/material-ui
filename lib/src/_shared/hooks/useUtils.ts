import { useContext } from 'react';
import { checkUtils } from '../WithUtils';
import { MuiPickersContext } from '../../MuiPickersUtilsProvider';

export function useUtils() {
  const utils = useContext(MuiPickersContext);
  checkUtils(utils);

  return utils!;
}
