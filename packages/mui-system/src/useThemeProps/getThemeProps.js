import { internal_resolveProps as resolveProps } from '@mui/utils';

export default function getThemeProps(params) {
  const { theme, name, props, mergePropsWhiteList } = params;

  if (
    !theme ||
    !theme.components ||
    !theme.components[name] ||
    !theme.components[name].defaultProps
  ) {
    return props;
  }

  return resolveProps(theme.components[name].defaultProps, props, mergePropsWhiteList);
}
