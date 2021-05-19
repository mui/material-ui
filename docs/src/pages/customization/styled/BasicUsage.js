import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';

const MyComponent = styled('div')({
  color: 'darkslategray',
});

const MyThemeComponent = styled('div')(({ theme }) => ({
  backgroundColor: 'aliceblue',
  padding: theme.spacing(1),
}));

export default function StyledComponents() {
  return (
    <MyThemeComponent>
      <MyComponent>Styled div</MyComponent>
    </MyThemeComponent>
  );
}
