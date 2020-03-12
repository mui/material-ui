import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DateIOFormats } from '@date-io/core/IUtils';
import { MuiPickersAdapter } from './_shared/hooks/useUtils';

export const MuiPickersAdapterContext = React.createContext<MuiPickersAdapter | null>(null);

export interface LocalizationProviderProps {
  dateAdapter: new (...args: any) => MuiPickersAdapter;
  children: React.ReactNode;
  locale?: any;
  dateLibInstance?: any;
  dateFormats?: Partial<DateIOFormats>;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  dateAdapter: Utils,
  children,
  locale,
  dateFormats: libFormats,
  dateLibInstance: libInstance,
}) => {
  const utils = React.useMemo(
    () => new Utils({ locale, formats: libFormats, instance: libInstance }),
    [Utils, locale, libFormats, libInstance]
  );

  return <MuiPickersAdapterContext.Provider value={utils} children={children} />;
};

LocalizationProvider.propTypes = {
  dateAdapter: PropTypes.func.isRequired,
  locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired),
  ]).isRequired,
} as any;

export default LocalizationProvider;
