import * as React from 'react';
import styled from '@emotion/styled';
import {
  palette,
  PaletteProps,
  spacing,
  SpacingProps,
} from '@material-ui/system';

const Box = styled.div<PaletteProps & SpacingProps>`
  ${palette}
  ${spacing}
`;

export default function Emotion() {
  return (
    <Box color="white" bgcolor="palevioletred" p={1}>
      Emotion
    </Box>
  );
}
