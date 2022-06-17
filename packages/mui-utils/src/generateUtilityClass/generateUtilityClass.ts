import ClassNameGenerator from '../ClassNameGenerator';

export type GlobalStateSlot =
  | 'active'
  | 'checked'
  | 'completed'
  | 'disabled'
  | 'error'
  | 'expanded'
  | 'focused'
  | 'focusVisible'
  | 'required'
  | 'selected';

const globalStateClassesMapping: Record<GlobalStateSlot, string> = {
  active: 'Mui-active',
  checked: 'Mui-checked',
  completed: 'Mui-completed',
  disabled: 'Mui-disabled',
  error: 'Mui-error',
  expanded: 'Mui-expanded',
  focused: 'Mui-focused',
  focusVisible: 'Mui-focusVisible',
  required: 'Mui-required',
  selected: 'Mui-selected',
};

export default function generateUtilityClass(componentName: string, slot: string): string {
  const globalStateClass = globalStateClassesMapping[slot as GlobalStateSlot];
  return globalStateClass || `${ClassNameGenerator.generate(componentName)}-${slot}`;
}
