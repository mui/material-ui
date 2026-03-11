import styled from 'styled-components';
import { palette, PaletteProps, spacing, SpacingProps } from '@mui/system';
import { createTheme } from '@mui/material/styles';

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
