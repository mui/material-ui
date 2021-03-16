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

export default function DirectionStack() {
  return (
    <Stack direction="row" spacing={2}>
      {[0, 1, 2].map((value) => (
        <Cell key={value}>{`Cell ${value + 1}`}</Cell>
      ))}
    </Stack>
  );
}
