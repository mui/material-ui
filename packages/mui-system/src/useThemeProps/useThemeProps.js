import getThemeProps from './getThemeProps';
import useTheme from '../useTheme';

export default function useThemeProps({ props, name, defaultTheme, mergePropsWhiteList }) {
  const theme = useTheme(defaultTheme);
  const mergedProps = getThemeProps({ theme, name, props, mergePropsWhiteList });
  return mergedProps;
}
