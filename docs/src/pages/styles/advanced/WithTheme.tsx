import React from 'react';
import { ThemeProvider, WithTheme as WithThemeProps, withTheme } from '@material-ui/styles';

interface Theme {
  spacing: string;
}

interface Props extends WithThemeProps<Theme> {}

function DeepChildRaw(props: Props) {
  return <span>{`spacing ${props.theme.spacing}`}</span>;
}

const DeepChild = withTheme<Theme, typeof DeepChildRaw>(DeepChildRaw);

function WithTheme() {
  return (
    <ThemeProvider
      theme={{
        spacing: '8px',
      }}
    >
      <DeepChild />
    </ThemeProvider>
  );
}

export default WithTheme;
