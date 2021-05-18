import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';

const MyThemeComponent = styled('div', {
  // the color prop won't be propagated to the generated div
  shouldForwardProp: (prop) => prop != 'color',
  label: 'MyThemeComponent',
})(({ theme, color }) => ({
  color,
  backgroundColor: 'aliceblue',
  padding: theme.spacing(1),
  border: `2px solid ${color}`,
}));

export default function StyledComponents() {
  return <MyThemeComponent color="darkslategray">Styled div</MyThemeComponent>;
}
