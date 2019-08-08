export interface OptionsState {
  options: {
    codeVariant: 'JS' | 'TS';
    userLanguage: string;
    t: (key: string, options?: { ignoreWarning: boolean }) => string;
  };
}
