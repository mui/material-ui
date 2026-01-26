import 'react-docgen';

declare module 'react-docgen' {
  interface PropDescriptor {
    /**
     * Custom property added by MUI's defaultPropsHandler to store JSDoc @default values
     */
    jsdocDefaultValue?: { value: string };
  }
}
