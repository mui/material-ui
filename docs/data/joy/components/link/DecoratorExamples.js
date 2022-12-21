import * as React from 'react';
import { keyframes } from '@mui/system';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Chip from '@mui/joy/Chip';

const circulate = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export default function DecoratorExamples() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
    >
      <Link
        href="#common-examples"
        disabled
        startDecorator={
          <Box
            sx={{
              '--loader-thickness': '4px',
              borderRadius: '50%',
              border: 'var(--loader-thickness) solid',
              borderColor: 'primary.softBg',
              width: 'var(--Icon-fontSize)',
              height: 'var(--Icon-fontSize)',
              boxSizing: 'border-box',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 'calc(-1 * var(--loader-thickness))',
                left: 'calc(-1 * var(--loader-thickness))',
                width: 'inherit',
                height: 'inherit',
                borderRadius: 'inherit',
                border: 'inherit',
                boxSizing: 'inherit',
                borderColor: (theme) =>
                  `${theme.vars.palette.primary.softColor} transparent transparent`,
                animation: `${circulate} 1s ease infinite`,
              }}
            />
          </Box>
        }
      >
        Processing...
      </Link>

      <Link
        href="#common-examples"
        underline="none"
        variant="soft"
        color="success"
        endDecorator={
          <Chip color="success" size="sm" sx={{ borderRadius: '3px', mr: '2px' }}>
            HIRING!
          </Chip>
        }
        sx={{ '--Link-gap': '0.5rem', pr: 0, pl: 1 }}
      >
        Careers
      </Link>
    </Box>
  );
}
