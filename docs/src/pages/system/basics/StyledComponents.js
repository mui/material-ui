import React from 'react';
import styled from 'styled-components';
import { palette, spacing } from '@material-ui/system';
import NoSsr from '@material-ui/core/NoSsr';

const Box = styled.div`
  ${palette}
  ${spacing}
`;

function StyledComponents() {
  return (
    <NoSsr>
      <Box color="white" bgcolor="palevioletred" p={1}>
        Styled components
      </Box>
    </NoSsr>
  );
}

export default StyledComponents;
