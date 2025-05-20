import VariableIcon from '../VariableIcon';
import { Theme } from '../styles/createTheme';

export default function createVariableIconFromSvg<P = Record<string, any>, T = Theme>(
  variants: Record<string, React.ReactNode>,
  propsToVariantName: (props: P, theme: T) => string,
  displayName: string,
): typeof VariableIcon;
