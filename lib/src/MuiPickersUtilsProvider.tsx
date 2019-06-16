import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IUtils } from '@date-io/core/IUtils';
import { MaterialUiPickersDate } from './typings/date';

export const MuiPickersContext = React.createContext<IUtils<MaterialUiPickersDate> | null>(null);

export interface MuiPickersUtilsProviderProps {
  utils: any;
  children: React.ReactNode;
  locale?: any;
  libInstance?: any;
}

export const MuiPickersUtilsProvider: React.FC<MuiPickersUtilsProviderProps> = ({
  utils: Utils,
  children,
  locale,
  libInstance,
}) => {
  const utils = React.useMemo(() => new Utils({ locale, moment: libInstance }), [
    Utils,
    libInstance,
    locale,
  ]);

  return <MuiPickersContext.Provider value={utils} children={children} />;
};

MuiPickersUtilsProvider.propTypes = {
  utils: PropTypes.func.isRequired,
  locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired),
  ]).isRequired,
};

export default MuiPickersUtilsProvider;
