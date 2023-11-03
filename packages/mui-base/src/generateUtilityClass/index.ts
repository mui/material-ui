import { globalStateClasses, GlobalStateSlot } from '@mui/utils/generateUtilityClass';

const GLOBAL_CLASS_PREFIX = 'baseui';

function buildStateClass(state: string) {
  return `${GLOBAL_CLASS_PREFIX}--${state}`;
}

function buildSlotClass(componentName: string, slot: string) {
  return `${GLOBAL_CLASS_PREFIX}-${componentName}${slot !== 'root' ? `-${slot}` : ''}`;
}

export function generateUtilityClass(
  componentName: string,
  slot: string | GlobalStateSlot,
): string {
  const globalStateClass = globalStateClasses[slot as GlobalStateSlot];
  return globalStateClass ? buildStateClass(globalStateClass) : buildSlotClass(componentName, slot);
}
