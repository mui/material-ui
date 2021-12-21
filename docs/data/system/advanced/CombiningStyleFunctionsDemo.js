import * as React from 'react';
import styled from 'styled-components';
import { palette, spacing } from '@mui/system';
import NoSsr from '@mui/base/NoSsr';

const Div = styled.div`
  ${palette}
  ${spacing}
`;

export default function CombiningStyleFunctionsDemo() {
  return (
    <NoSsr>
      <Div color="white" bgcolor="palevioletred" p={1}>
        Styled components
      </Div>
    </NoSsr>
  );
}
