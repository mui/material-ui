import styled from 'styled-components';
import { palette, PaletteProps, spacing, SpacingProps } from '@mui/system';

const Div = styled.div<PaletteProps & SpacingProps>`
  ${palette}
  ${spacing}
`;

export default function CombiningStyleFunctionsDemo() {
  // @focus-start @padding 1
  return (
    <Div color="white" bgcolor="palevioletred" p={1}>
      Styled components
    </Div>
  );
  // @focus-end
}
