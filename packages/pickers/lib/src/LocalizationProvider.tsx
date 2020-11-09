import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DateIOFormats } from '@date-io/core/IUtils';
import { MuiPickersAdapter } from './_shared/hooks/useUtils';

export const MuiPickersAdapterContext = React.createContext<MuiPickersAdapter | null>(null);

export interface LocalizationProviderProps {
  children?: React.ReactNode;
  dateAdapter: new (...args: any) => MuiPickersAdapter;
  dateFormats?: Partial<DateIOFormats>;
  dateLibInstance?: any;
  locale?: any;
}

const LocalizationProvider: React.FC<LocalizationProviderProps> = (props) => {
  const { children, dateAdapter: Utils, dateFormats, dateLibInstance, locale } = props;
  const utils = React.useMemo(
    () => new Utils({ locale, formats: dateFormats, instance: dateLibInstance }),
    [Utils, locale, dateFormats, dateLibInstance]
  );

  return (
    <MuiPickersAdapterContext.Provider value={utils}>{children}</MuiPickersAdapterContext.Provider>
  );
};

LocalizationProvider.propTypes = {
  dateAdapter: PropTypes.func.isRequired,
  locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /**
   * Your component tree.
   */
  children: PropTypes.node,
} as any;

export default LocalizationProvider;
