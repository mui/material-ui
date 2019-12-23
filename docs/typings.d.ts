// import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';
// import '@material-ui/core/styles/overrides';

// declare module '@material-ui/core/styles/overrides' {
//   type overridesNameToClassKey = {
//     [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
//   };

//   export interface ComponentNameToClassKey extends overridesNameToClassKey {}
// }

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
