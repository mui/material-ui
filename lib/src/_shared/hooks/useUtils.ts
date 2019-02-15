import { useContext } from 'react';
import { MuiPickersContext } from '../../MuiPickersUtilsProvider';
import { checkUtils } from '../WithUtils';

export function useUtils() {
  const utils = useContext(MuiPickersContext);
  checkUtils(utils);

  return utils!;
}
