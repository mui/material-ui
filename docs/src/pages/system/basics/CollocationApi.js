import React from 'react';
import { typography, breakpoints } from '@material-ui/system';
import styled from 'styled-components';

const Box = styled.div`
  ${breakpoints(typography)}
`;

/**
 * Outputs:
 *
 * font-size: 12px;
 * @media (min-width: 600px) {
 *   font-size: 18px;
 * }
 * @media (min-width: 960px) {
 *   font-size: 24px;
 * }
 */
export default function CollocationApi() {
  return (
    <Box xs={{ fontSize: 12 }} sm={{ fontSize: 18 }} md={{ fontSize: 24 }}>
      Collocation API
    </Box>
  );
}
