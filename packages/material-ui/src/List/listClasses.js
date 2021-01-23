import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getListUtilityClass(slot) {
  return generateUtilityClass('MuiList', slot);
}

const listClasses = generateUtilityClasses('MuiList', ['root', 'padding', 'dense', 'subheader']);

export default listClasses;
