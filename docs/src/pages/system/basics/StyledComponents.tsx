import React from 'react';
import styled from 'styled-components';
import { palette, PaletteProps, spacing, SpacingProps } from '@material-ui/system';
import NoSsr from '@material-ui/core/NoSsr';

const Box = styled.div<PaletteProps & SpacingProps>`
  ${palette}
  ${spacing}
`;

export default function StyledComponents() {
  return (
    <NoSsr>
      <Box color="white" bgcolor="palevioletred" p={1}>
        Styled components
      </Box>
    </NoSsr>
  );
}
