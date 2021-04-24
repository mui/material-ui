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
    /**
     * Day format string @example "1"
     */
    dayOfMonth: PropTypes.string,
    /**
     * Localized full date @example "Jan 1, 2019"
     */
    fullDate: PropTypes.string,
    /**
     * Date & time format string with localized time @example "Jan 1, 2018 11:44 PM"
     */
    fullDateTime: PropTypes.string,
    /**
     * Not localized date & Time format 12h @example "Jan 1, 2018 11:44 PM"
     */
    fullDateTime12h: PropTypes.string,
    /**
     * Not localized date & Time format 24h @example "Jan 1, 2018 23:44"
     */
    fullDateTime24h: PropTypes.string,
    /**
     * Partially localized full date with weekday, useful for text-to-speech accessibility @example "Tuesday, January 1, 2019"
     */
    fullDateWithWeekday: PropTypes.string,
    /**
     * Full time localized format string @example "11:44 PM" for US, "23:44" for Europe
     */
    fullTime: PropTypes.string,
    /**
     * Not localized full time format string @example "11:44 PM"
     */
    fullTime12h: PropTypes.string,
    /**
     * Not localized full time format string @example "23:44"
     */
    fullTime24h: PropTypes.string,
    /**
     * Hours format string @example "11"
     */
    hours12h: PropTypes.string,
    /**
     * Hours format string @example "23"
     */
    hours24h: PropTypes.string,
    /**
     * Localized keyboard input friendly date format @example "02/13/2020
     */
    keyboardDate: PropTypes.string,
    /**
     * Localized keyboard input friendly date/time format @example "02/13/2020 23:44"
     */
    keyboardDateTime: PropTypes.string,
    /**
     * Partially localized keyboard input friendly date/time 12h format @example "02/13/2020 11:44 PM"
     */
    keyboardDateTime12h: PropTypes.string,
    /**
     * Partially localized keyboard input friendly date/time 24h format @example "02/13/2020 23:44"
     */
    keyboardDateTime24h: PropTypes.string,
    /**
     * Minutes format string @example "44"
     */
    minutes: PropTypes.string,
    /**
     * Month format string @example "January"
     */
    month: PropTypes.string,
    /**
     * Month with date format string @example "January 1"
     */
    monthAndDate: PropTypes.string,
    /**
     * Short month format string @example "January 2018"
     */
    monthAndYear: PropTypes.string,
    /**
     * Short month format string @example "Jan"
     */
    monthShort: PropTypes.string,
    /**
     * Date format string with month and day of month @example "1 January"
     */
    normalDate: PropTypes.string,
    /**
     * Date format string with weekday, month and day of month @example "Wed, Jan 1"
     */
    normalDateWithWeekday: PropTypes.string,
    /**
     * Seconds format string @example "00"
     */
    seconds: PropTypes.string,
    /**
     * Shorter day format @example "Jan 1"
     */
    shortDate: PropTypes.string,
    /**
     * Weekday format string @example "Wednesday"
     */
    weekday: PropTypes.string,
    /**
     * Short weekday format string @example "Wed"
     */
    weekdayShort: PropTypes.string,
    /**
     * Year format string @example "2019"
     */
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
