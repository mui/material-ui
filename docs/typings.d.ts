import { ParsableDate } from '@material-ui/pickers/src/constants/prop-types';
import {
  MuiPickersComponentsToClassName,
  MuiPickersComponentsPropsList,
  MaterialUiPickersDate,
} from '@material-ui/pickers/src/typings';

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey extends MuiPickersComponentsToClassName {}
}

declare module '@material-ui/core/styles/props' {
  export interface ComponentsPropsList extends MuiPickersComponentsPropsList {}
}

interface NavigatorClipboard {
  clipboard: {
    writeText: (value: string) => Promise<void>;
  };
}

interface Navigator extends NavigatorClipboard {}

declare module '*.mdx' {
  const value: React.ComponentType;
  export default value;
}

declare module '@date-io/type' {
  export type DateType = any;
}

declare module '@material-ui/pickers/src/typings/BasePicker' {
  // In order to display user readable code in the examples we must not use `Date | Moment | DayJS | DateTime` type.
  interface BasePickerProps<TInputValue = ParsableDate, TDateValue = MaterialUiPickersDate | null> {
    value: any;
    onChange: (value: any) => void;
  }
}
