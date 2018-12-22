import React from 'react';
import styled from '@emotion/styled';
import { palette, spacing } from '@material-ui/system';
import NoSsr from '@material-ui/core/NoSsr';

const Box = styled.div`
  ${palette}
  ${spacing}
`;

function Emotion() {
  return (
    <NoSsr>
      <Box color="white" bgcolor="palevioletred" p={1}>
        Emotion
      </Box>
    </NoSsr>
  );
}

export default Emotion;
