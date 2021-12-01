import { internal_mergeProps as mergeProps } from '@mui/utils';

export default function getThemeProps(params) {
  const { theme, name, props } = params;

  if (
    !theme ||
    !theme.components ||
    !theme.components[name] ||
    !theme.components[name].defaultProps
  ) {
    return props;
  }

  return mergeProps(theme.components[name].defaultProps, props);
}
