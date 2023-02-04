export interface UseTabsParameters {
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `false`.
   */
  value?: string | number | false;
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: string | number | false;
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The direction of the text.
   * @default 'ltr'
   */
  direction?: 'ltr' | 'rtl';
  /**
   * Callback invoked when new value is being set.
   */
  onChange?: (event: React.SyntheticEvent, value: number | string | boolean) => void;
  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus?: boolean;
}

export interface UseTabsReturnValue {
  tabsContextValue: {
    /**
     * Id used as a prefix for the current Tabs.
     */
    idPrefix: string | undefined;
    /**
     * The value of the currently selected `Tab`.
     * If you don't want any selected `Tab`, you can set this prop to `false`.
     */
    value: string | number | false;
    /**
     * Callback for setting new value.
     */
    onSelected: (e: React.SyntheticEvent, newValue: string | number | false) => void;
    /**
     * The component orientation (layout flow direction).
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The direction of the text.
     */
    direction: 'ltr' | 'rtl' | undefined;
    /**
     * If `true` the selected tab changes on focus. Otherwise it only
     * changes on activation.
     */
    selectionFollowsFocus: boolean | undefined;
  };
}
