import * as React from 'react';
import styled from 'styled-components';
import { palette, PaletteProps, spacing, SpacingProps } from '@material-ui/system';
import NoSsr from '@material-ui/unstyled/NoSsr';

const Div = styled.div<PaletteProps & SpacingProps>`
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
