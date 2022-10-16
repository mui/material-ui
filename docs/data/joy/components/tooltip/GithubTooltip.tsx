import * as React from 'react';
import Box from '@mui/joy/Box';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import AdjustIcon from '@mui/icons-material/Adjust';

export default function GithubTooltip() {
  return (
    <Tooltip
      placement="top-end"
      title={
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 400,
            justifyContent: 'center',
            p: 1,
          }}
        >
          <Link
            underline="none"
            href="#common-examples"
            variant="plain"
            color="neutral"
            fontSize="sm"
            textColor="grey"
            endDecorator={
              <Typography fontSize="sm" textColor="grey">
                on Feb 25
              </Typography>
            }
            sx={{ '--Link-gap': '0.5rem', pr: 0, pl: 2 }}
          >
            mui/material-ui
          </Link>
          <Box sx={{ display: 'flex', gap: 0.5, width: '100%' }}>
            <Box>
              <IconButton size="lg" variant="plain" color="success">
                <AdjustIcon />
              </IconButton>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 'bold' }}>
                {'[system] grey is no more recognized as color with the sx prop'}
              </Typography>
              <Typography textColor="grey" sx={{ mb: 1 }}>
                {
                  'Duplicates I have searched the existing issues Latest version I have tested the ...'
                }
              </Typography>
              <Chip size="sm" color="danger">
                bug 🐛
              </Chip>
              <Chip size="sm" color="info" sx={{ ml: 1 }}>
                package: system
              </Chip>
            </Box>
          </Box>
        </Box>
      }
      variant="outlined"
      size="lg"
      arrow
    >
      <Link
        href="#common-examples"
        underline="none"
        startDecorator={
          <IconButton variant="plain" color="success">
            <AdjustIcon />
          </IconButton>
        }
        sx={{ '--Link-gap': '0.5rem', pr: 0, pl: 1, fontWeight: 'bold' }}
      >
        [system] grey is no more recognized as color with the sx prop
      </Link>
    </Tooltip>
  );
}
