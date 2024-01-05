import ClassNameGenerator from '../ClassNameGenerator';

// If GlobalStateSlot is changed, GLOBAL_STATE_CLASSES in
// \packages\api-docs-builder\utils\parseSlotsAndClasses.ts must be updated accordingly.
export type GlobalStateSlot =
  | 'active'
  | 'checked'
  | 'completed'
  | 'disabled'
  | 'error'
  | 'expanded'
  | 'focused'
  | 'focusVisible'
  | 'open'
  | 'readOnly'
  | 'required'
  | 'selected';

const globalStateClassesMapping: Record<GlobalStateSlot, string> = {
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
  const globalStateClass = globalStateClassesMapping[slot as GlobalStateSlot];
  return globalStateClass
    ? `${globalStatePrefix}-${globalStateClass}`
    : `${ClassNameGenerator.generate(componentName)}-${slot}`;
}
