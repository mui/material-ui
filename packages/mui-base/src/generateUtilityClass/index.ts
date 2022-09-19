import { unstable_generateUtilityClass as generateUtilityClass } from '@mui/utils';

export type { GlobalStateSlot } from '@mui/utils';
export const ProductClass = 'Mui-base';

export default function generateBaseUtilityClass(
  componentName: string,
  slot: string,
  globalStatePrefix = 'Mui',
) {
  const slotClass = generateUtilityClass(componentName, slot, globalStatePrefix);
  if (slot === 'root') {
    return `${ProductClass} ${slotClass}`;
  }

  return slotClass;
}
