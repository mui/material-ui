export interface UseTabPanelParameters {
  /**
   * The id of the TabPanel.
   */
  id?: string;
  /**
   * The ref of the TabPanel.
   */
  ref?: React.Ref<HTMLElement>;
  /**
   * The value of the TabPanel. It will be shown when the Tab with the corresponding value is selected.
   */
  value?: number | string;
}

export interface UseTabPanelRootSlotProps {
  'aria-labelledby'?: string;
  hidden?: boolean;
  id?: string;
  ref: React.Ref<HTMLElement>;
}

export interface UseTabPanelReturnValue {
  /**
   * If `true`, it indicates that the tab panel will be hidden.
   */
  hidden: boolean;
  /**
   * Resolver for the root slot's props.
   * @returns props that should be spread on the root slot
   */
  getRootProps: () => UseTabPanelRootSlotProps;
  ref: React.Ref<HTMLElement>;
}
