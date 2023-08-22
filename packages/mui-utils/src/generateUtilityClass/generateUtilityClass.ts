import ClassNameGenerator from '../ClassNameGenerator';

// If GlobalStateSlot is changed, GLOBAL_STATE_CLASSES in
// \packages\api-docs-builder\utils\parseSlotsAndClasses.ts must be updated accordingly.
export type GlobalStateSlot =
  | 'active'
  | 'checked'
  | 'completed'
  | 'disabled'
  | 'readOnly'
  | 'error'
  | 'expanded'
  | 'focused'
  | 'focusVisible'
  | 'required'
  | 'selected';

const globalStateClassesMapping: Record<GlobalStateSlot, string> = {
  active: 'active',
  checked: 'checked',
  completed: 'completed',
  disabled: 'disabled',
  readOnly: 'readOnly',
  error: 'error',
  expanded: 'expanded',
  focused: 'focused',
  focusVisible: 'focusVisible',
  required: 'required',
  selected: 'selected',
};

export default function generateUtilityClass(
  componentName: string,
  slot: string,
  globalStatePrefix = 'Mui',
): string {
  const globalStateClass = globalStateClassesMapping[slot as GlobalStateSlot];
  return globalStateClass
    ? `${globalStatePrefix}-${globalStateClass}`
    : `${ClassNameGenerator.generate(componentName)}-${slot}`;
}
