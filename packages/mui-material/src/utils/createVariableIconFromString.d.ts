import VariableIcon from '../VariableIcon';

export default function createVariableIconFromString(
  iconName: string,
  displayName: string,
  family: string,
  staticVariations?: Record<string, number>,
  className?: string,
): typeof VariableIcon;
