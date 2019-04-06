export function toShowDateTimePickerTabs(showTabsProps: boolean | undefined) {
  // do not show tabs for small screens
  return Boolean(showTabsProps && typeof window !== 'undefined' && window.innerHeight > 667);
}
