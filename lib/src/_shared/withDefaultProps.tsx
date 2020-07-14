import * as React from 'react';
import getThemeProps from '@material-ui/styles/getThemeProps';
import { useTheme } from '@material-ui/core/styles';

export function withDefaultProps<T>(
  { name }: { name: string },
  Component: React.ComponentType<T>
): React.FC<T> {
  const componentName = name.replace('Mui', '');
  const WithDefaultProps = (props: T) => {
    const theme = useTheme();
    const propsWithDefault = getThemeProps<any, T, string>({
      props,
      theme,
      name,
    });

    Component.displayName = componentName;

    return <Component {...propsWithDefault} />;
  };

  WithDefaultProps.displayName = `WithDefaultProps(${componentName})`;
  return WithDefaultProps;
}
