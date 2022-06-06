import * as React from 'react';
import { keyframes } from '@mui/system';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Chip from '@mui/joy/Chip';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

const circulate = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export default function TypographyScales() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
    >
      <Typography
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
      </Typography>

      <Typography
        startDecorator={
          <Box
            sx={{
              bgcolor: 'neutral.400',
              width: '0.5em',
              height: '0.5em',
              borderRadius: '50%',
            }}
          />
        }
      >
        Inactive
      </Typography>

      <Typography
        fontSize="xl4"
        lineHeight={1}
        startDecorator={
          <Typography fontSize="lg" textColor="text.secondary">
            $
          </Typography>
        }
        sx={{ alignItems: 'flex-start' }}
      >
        25
      </Typography>

      <Typography
        endDecorator={
          <Chip color="success" size="sm" sx={{ borderRadius: 'xs' }}>
            HIRING!
          </Chip>
        }
      >
        Careers
      </Typography>

      <Typography
        level="body2"
        startDecorator={<InfoOutlined />}
        sx={{ alignItems: 'flex-start', maxWidth: 240, wordBreak: 'break-all' }}
      >
        This example demonstrates multiple lines of the text.
      </Typography>

      <Typography
        variant="soft"
        color="danger"
        startDecorator="🚨"
        py={1}
        px={1}
        borderRadius="xs"
        display="inline-flex"
        fontSize="sm"
        sx={{ '--Typography-gap': '0.5rem' }}
      >
        Simple alert using only Typography.
      </Typography>
    </Box>
  );
}
