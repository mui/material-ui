import * as React from 'react';
import getThemeProps from '@material-ui/styles/getThemeProps';
import { useTheme } from '@material-ui/core/styles';

export function withDefaultProps<T>(
  { name }: { name: string },
  Component: React.ComponentType<T>
): React.FC<T> {
  return ({ ...props }) => {
    const theme = useTheme();
    const propsWithDefault = getThemeProps<any, T, string>({
      props,
      theme,
      name,
    });

    return <Component {...propsWithDefault} />;
  };
}
