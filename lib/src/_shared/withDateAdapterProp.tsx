import * as React from 'react';
import { MuiPickersAdapter } from './hooks/useUtils';
import { MuiPickersAdapterContext } from '../LocalizationProvider';

export interface WithDateAdapterProps<TDate> {
  /**
   * Allows to pass configured date-io adapter directly. More info [here](https://material-ui-pickers.dev/guides/date-adapter-passing)
   * ```jsx
   * dateAdapter={new DateFnsAdapter({ locale: ruLocale })}
   * ```
   */
  dateAdapter?: MuiPickersAdapter<TDate>;
}

export function withDateAdapterProp<TProps>(
  Component: React.ComponentType<TProps>
): React.FC<TProps & WithDateAdapterProps<unknown>> {
  return ({ dateAdapter, ...other }: TProps & WithDateAdapterProps<unknown>) => {
    if (dateAdapter) {
      return (
        <MuiPickersAdapterContext.Provider value={dateAdapter}>
          <Component {...(other as TProps)} />
        </MuiPickersAdapterContext.Provider>
      );
    }
    return <Component {...(other as TProps)} />;
  };
}
