import * as React from 'react';
import styled from '@emotion/styled';
import { palette, spacing } from '@material-ui/system';

const Box = styled.div`
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
