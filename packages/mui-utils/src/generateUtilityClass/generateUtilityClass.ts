import ClassNameGenerator from '../ClassNameGenerator';

// If GlobalStateSlot is changed, GLOBAL_STATE_CLASSES in
// \packages\api-docs-builder\utils\parseSlotsAndClasses.ts must be updated accordingly.
export type GlobalStateSlot = keyof typeof globalStateClasses;

export const globalStateClasses = {
  active: 'active',
  checked: 'checked',
  completed: 'completed',
  disabled: 'disabled',
  error: 'error',
  expanded: 'expanded',
  focused: 'focused',
  focusVisible: 'focusVisible',
  open: 'open',
  readOnly: 'readOnly',
  required: 'required',
  selected: 'selected',
};

export default function generateUtilityClass(
  componentName: string,
  slot: string,
  globalStatePrefix = 'Mui',
): string {
  const globalStateClass = globalStateClasses[slot as GlobalStateSlot];
  return globalStateClass
    ? `${globalStatePrefix}-${globalStateClass}`
    : `${ClassNameGenerator.generate(componentName)}-${slot}`;
}
