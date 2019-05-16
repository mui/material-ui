import React from 'react';
import { typography, breakpoints } from '@material-ui/system';
import styled from 'styled-components';

const Box = styled.div`
  ${breakpoints(typography)}
`;

function CollocationApi() {
  return (
    <Box
      xs={{ fontSize: 12 }}
      sm={{ fontSize: 18 }}
      md={{ fontSize: 24 }}
      lg={{ fontSize: 36 }}
      xl={{ fontSize: 72 }}
    >
      Collocation API
    </Box>
  );
}

export default CollocationApi;
