import { Theme as MuiTheme } from './styles';

declare module '@material-ui/system' {
  interface Theme extends MuiTheme {}
}

// disable automatic export
export {};
