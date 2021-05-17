import * as React from 'react';
import PropTypes from 'prop-types';
import { DateIOFormats, IUtils } from '@date-io/core/IUtils';

export type MuiPickersAdapter<TDate = unknown> = IUtils<TDate>;

export const MuiPickersAdapterContext = React.createContext<MuiPickersAdapter | null>(null);

export interface LocalizationProviderProps {
  children?: React.ReactNode;
  /** DateIO adapter class function */
  dateAdapter: new (...args: any) => MuiPickersAdapter;
  /** Formats that are used for any child pickers */
  dateFormats?: Partial<DateIOFormats>;
  /**
   * Date library instance you are using, if it has some global overrides
   * ```jsx
   * dateLibInstance={momentTimeZone}
   * ```
   */
  dateLibInstance?: any;
  /** Locale for the date library you are using */
  locale?: string | object;
}

/**
 * @ignore - do not document.
 */
const LocalizationProvider: React.FC<LocalizationProviderProps> = (props) => {
  const { children, dateAdapter: Utils, dateFormats, dateLibInstance, locale } = props;
  const utils = React.useMemo(
    () => new Utils({ locale, formats: dateFormats, instance: dateLibInstance }),
    [Utils, locale, dateFormats, dateLibInstance],
  );

  return (
    <MuiPickersAdapterContext.Provider value={utils}>{children}</MuiPickersAdapterContext.Provider>
  );
};

LocalizationProvider.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * DateIO adapter class function
   */
  dateAdapter: PropTypes.func.isRequired,
  /**
   * Formats that are used for any child pickers
   */
  dateFormats: PropTypes.shape({
    dayOfMonth: PropTypes.string,
    fullDate: PropTypes.string,
    fullDateTime: PropTypes.string,
    fullDateTime12h: PropTypes.string,
    fullDateTime24h: PropTypes.string,
    fullDateWithWeekday: PropTypes.string,
    fullTime: PropTypes.string,
    fullTime12h: PropTypes.string,
    fullTime24h: PropTypes.string,
    hours12h: PropTypes.string,
    hours24h: PropTypes.string,
    keyboardDate: PropTypes.string,
    keyboardDateTime: PropTypes.string,
    keyboardDateTime12h: PropTypes.string,
    keyboardDateTime24h: PropTypes.string,
    minutes: PropTypes.string,
    month: PropTypes.string,
    monthAndDate: PropTypes.string,
    monthAndYear: PropTypes.string,
    monthShort: PropTypes.string,
    normalDate: PropTypes.string,
    normalDateWithWeekday: PropTypes.string,
    seconds: PropTypes.string,
    shortDate: PropTypes.string,
    weekday: PropTypes.string,
    weekdayShort: PropTypes.string,
    year: PropTypes.string,
  }),
  /**
   * Date library instance you are using, if it has some global overrides
   * ```jsx
   * dateLibInstance={momentTimeZone}
   * ```
   */
  dateLibInstance: PropTypes.any,
  /**
   * Locale for the date library you are using
   */
  locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
} as any;

export default LocalizationProvider;
