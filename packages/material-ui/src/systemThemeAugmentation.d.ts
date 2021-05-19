import { Theme as MuiTheme } from './styles';

declare module '@material-ui/system/Box/Box' {
  interface Theme extends MuiTheme {}
}

// disable automatic export
export {};
