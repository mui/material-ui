import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { styled } from '@mui/material/styles';
import { textAlign } from '@mui/system';

const Table = styled('table')(({ theme }) => ({
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  overflowY: 'scroll',
  textAlign: 'left',
  fontSize: '0.875rem',
  '& thead th': {
    textAlign: 'left',
    padding: '8px 6px',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: theme.vars.palette.background.default,
  },
  '& tbody th, tbody td': {
    padding: '3px 6px',
    verticalAlign: 'top',
    '> *': {
      textAlign: 'left',
    },
  },
  '& tbody th': {
    color: theme.vars.palette.text.secondary,
    fontWeight: 'normal',
  },
  td: {
    verticalAlign: 'top',
    color: theme.vars.palette.text.primary,
    fontFamily: 'Menlo, Consolas, "Droid Sans Mono", monospace',
    fontSize: '0.75rem',
  },
  tr: {
    '&:hover': {
      backgroundColor: `rgba(${theme.vars.palette.text.primaryChannel} / 0.04)`,
    },
    '&:first-of-type': {
      '& td, & th': { paddingTop: 6 },
    },
    '&:last-of-type': {
      '& td, & th': { paddingBottom: 6 },
    },
  },
}));

export default function TokensTable({ isCopied, children }) {
  return (
    <Box sx={{ overflow: 'hidden', position: 'relative' }}>
      <Chip
        icon={<CheckCircleRoundedIcon />}
        label="Copied"
        size="small"
        color="success"
        sx={[
          {
            position: 'absolute',
            left: '50%',
            bottom: 0,
            transition: '0.3s',
            p: 0.5,
            pl: 0.5,
            pr: 1,
            zIndex: 1,
          },
          isCopied
            ? { transform: `translateX(-50%) translateY(-0.5rem)` }
            : { transform: `translateX(-50%) translateY(calc(100% + 0.5rem))` },
        ]}
      />
      <Box
        sx={{
          width: '100%',
          maxHeight: 'clamp(33.33vmax, 40vmax, 40vmin)',
          overflow: 'auto',
          position: 'relative',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '4px',
        }}
      >
        <Table>{children}</Table>
      </Box>
    </Box>
  );
}
