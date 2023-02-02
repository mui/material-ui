export interface UseTabPanelParameters {
  /**
   * The value of the TabPanel. It will be shown when the Tab with the corresponding value is selected.
   */
  value: number | string;
}

export interface UseTabPanelRootSlotProps {
  'aria-labelledby'?: string;
  hidden?: boolean;
  id?: string;
}

export interface UseTabPanelReturnValue {
  hidden: boolean;
  getRootProps: () => {
    'aria-labelledby': string | undefined;
    hidden: boolean;
    id: string | undefined;
  };
}
