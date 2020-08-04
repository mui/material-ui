import * as React from 'react';
import getThemeProps from '@material-ui/styles/getThemeProps';
import { useTheme } from '@material-ui/core/styles';

export function useDefaultProps<T>(props: T, { name }: { name: string }) {
  const theme = useTheme();

  return getThemeProps<any, T, string>({
    props,
    theme,
    name,
  });
}

export function withDefaultProps<T>(
  componentConfig: { name: string },
  Component: React.ComponentType<T>
): React.FC<T> {
  const componentName = componentConfig.name.replace('Mui', '');

  const WithDefaultProps = (props: T) => {
    Component.displayName = componentName;
    const propsWithDefault = useDefaultProps(props, componentConfig);

    return <Component {...propsWithDefault} />;
  };

  WithDefaultProps.displayName = `WithDefaultProps(${componentName})`;
  return WithDefaultProps;
}
