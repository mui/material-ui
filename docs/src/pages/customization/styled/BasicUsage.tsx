import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';

const MyComponent = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  padding: 8,
  borderRadius: 4,
});

export default function BasicUsage() {
  return <MyComponent>Styled div</MyComponent>;
}
