import ClassNameGenerator, { muiStateClasses, MuiStateClassKey } from './ClassNameGenerator';

export default function generateUtilityClass(componentName: string, slot: string): string {
  const muiStateClass = muiStateClasses[slot as MuiStateClassKey];
  return muiStateClass || `${ClassNameGenerator.generate(componentName)}-${slot}`;
}
