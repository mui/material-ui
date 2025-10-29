import { ColorSystemOptions } from '../styles/createThemeFoundation';

declare function createColorScheme(
  options: ColorSystemOptions & { colorSpace?: string },
): ColorSystemOptions;

export default createColorScheme;
