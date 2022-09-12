import { useThemeProps as systemUseThemeProps } from '@mui/system';
import defaultTheme from './defaultTheme';

export default function useThemeProps<T extends {}>({
  props,
  name,
}: {
  props: T & {};
  name: string;
}) {
  return systemUseThemeProps({ props, name, defaultTheme: { ...defaultTheme, components: {} } });
}
