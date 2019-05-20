import React from 'react';
import Box from '@material-ui/core/Box';

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
export default function ObjectApi() {
  return (
    <Box
      fontSize={{
        xs: 12,
        sm: 18,
        md: 24,
      }}
    >
      Object API
    </Box>
  );
}
