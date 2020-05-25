import { MuiPickersComponentsToClassName, MuiPickersComponentsPropsList } from '../../src/typings';

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey extends MuiPickersComponentsToClassName {}
}

declare module '@material-ui/core/styles/props' {
  export interface ComponentsPropsList extends MuiPickersComponentsPropsList {}
}
