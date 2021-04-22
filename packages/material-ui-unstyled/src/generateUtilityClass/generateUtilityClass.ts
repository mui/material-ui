const globalPseudoClassesMapping: Record<string, string> = {
  active: 'Mui-active',
  checked: 'Mui-checked',
  disabled: 'Mui-disabled',
  error: 'Mui-error',
  focused: 'Mui-focused',
  focusVisible: 'Mui-focusVisible',
  required: 'Mui-required',
  expanded: 'Mui-expanded',
  selected: 'Mui-selected',
};

export default function generateUtilityClass(componentName: string, slot: string): string {
  const globalPseudoClass = globalPseudoClassesMapping[slot];
  return globalPseudoClass || `${componentName}-${slot}`;
}
