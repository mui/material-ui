import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Stack from '@material-ui/core/Stack';

function Cell({ children }) {
  return <Paper sx={{ padding: 2, color: 'text.secondary' }}>{children}</Paper>;
}

Cell.propTypes = {
  children: PropTypes.node,
};

export default function ResponsiveStack() {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
    >
      <Cell>Cell 1</Cell>
      <Cell>Cell 2</Cell>
      <Cell>Cell 3</Cell>
    </Stack>
  );
}
