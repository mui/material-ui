export default `declare module '@material-ui/core/styles/overrides' {
  import { MuiPickersOverrides } from 'material-ui-pickers/typings/overrides'

  export interface Overrides extends MuiPickersOverrides { }
}`;
