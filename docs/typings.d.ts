import {
  MuiPickersComponentsToClassName,
  MuiPickersComponentsPropsList,
} from '@material-ui/pickers/src/typings';

declare module 'moment-jalaali' {
  const value: any;
  export default value;
}

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
