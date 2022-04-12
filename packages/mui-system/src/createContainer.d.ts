import Container from './Container';
import { CreateMUIStyled } from './createStyled';
import { Theme as DefaultTheme } from './createTheme';

export default function createContainer<Theme extends object = DefaultTheme>(options?: {
  defaultTheme?: object;
  styled?: CreateMUIStyled<Theme>;
  getContainerUtilityClass?: (slot: string) => string;
}): typeof Container;
