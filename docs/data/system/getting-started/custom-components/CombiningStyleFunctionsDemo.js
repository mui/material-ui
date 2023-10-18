import * as React from 'react';
import styled from 'styled-components';
import { palette, spacing } from '@mui/system';

const Div = styled.div`
  ${palette}
  ${spacing}
`;

export default function CombiningStyleFunctionsDemo() {
  return (
    <Div color="white" bgcolor="palevioletred" p={1}>
      Styled components
    </Div>
  );
}
