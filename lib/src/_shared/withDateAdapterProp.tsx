import * as React from 'react';
import { MuiPickersAdapter } from './hooks/useUtils';
import { MuiPickersAdapterContext } from '../LocalizationProvider';

export interface WithDateAdapterProps {
  /**
   * Allows to pass configured date-io adapter directly. More info [here](https://material-ui-pickers.dev/guides/date-adapter-passing)
   * ```jsx
   * dateAdapter={new DateFnsAdapter({ locale: ruLocale })}
   * ```
   */
  dateAdapter?: MuiPickersAdapter;
}

export function withDateAdapterProp<T>(
  Component: React.ComponentType<T>
): React.FC<T & WithDateAdapterProps> {
  return ({ dateAdapter, ...other }: T & WithDateAdapterProps) => {
    if (dateAdapter) {
      return (
        <MuiPickersAdapterContext.Provider value={dateAdapter}>
          <Component {...(other as T)} />
        </MuiPickersAdapterContext.Provider>
      );
    }
    return <Component {...(other as T)} />;
  };
}
