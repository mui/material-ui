import styled from 'styled-components';
import { palette, type PaletteProps, spacing, type SpacingProps } from '@mui/system';

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
