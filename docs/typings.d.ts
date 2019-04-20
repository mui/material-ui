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

declare module '@material-ui/core/styles/overrides' {
  import { MuiPickersOverrides } from '../lib/typings/overrides';

  export interface Overrides extends MuiPickersOverrides {}
}
