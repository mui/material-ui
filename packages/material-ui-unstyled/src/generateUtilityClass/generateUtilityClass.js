const globalPseudoClassesMapping = {
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

export default function generateUtilityClass(componentName, slot) {
  const globalPseudoClass = globalPseudoClassesMapping[slot];
  return globalPseudoClass || `${componentName}-${slot}`;
}
