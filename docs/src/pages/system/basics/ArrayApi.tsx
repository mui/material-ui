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
export default function ArrayApi() {
  return <Box fontSize={[12, 18, 24]}>Array API</Box>;
}
