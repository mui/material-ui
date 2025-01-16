import * as React from 'react';
import styled from 'styled-components';
import type { PaletteProps, SpacingProps } from '@mui/system';
import { palette, spacing } from '@mui/system';

const Div = styled.div<PaletteProps & SpacingProps>`
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
