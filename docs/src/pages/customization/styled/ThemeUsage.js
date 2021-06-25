import * as React from 'react';
import { styled } from '@material-ui/core/styles';

const MyThemeComponent = styled('div')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

export default function ThemeUsage() {
  return <MyThemeComponent>Styled div with theme</MyThemeComponent>;
}
