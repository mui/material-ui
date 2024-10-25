import * as React from 'react';
import Box from '@mui/joy/Box';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Chip from '@mui/joy/Chip';
import AdjustIcon from '@mui/icons-material/Adjust';

export default function GitHubTooltip() {
  return (
    <Tooltip
      placement="top-end"
      variant="outlined"
      arrow
      title={
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 320,
            justifyContent: 'center',
            p: 1,
          }}
        >
          <Typography
            textColor="grey"
            startDecorator={
              <Link
                underline="always"
                href="#common-examples"
                color="neutral"
                sx={{ fontSize: 'sm' }}
              >
                mui/material-ui
              </Link>
            }
            sx={{ fontSize: 'sm' }}
          >
            on Feb 25
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, width: '100%', mt: 1 }}>
            <AdjustIcon color="success" />
            <div>
              <Typography sx={{ fontWeight: 'lg', fontSize: 'sm' }}>
                [system] grey is no more recognized as color with the sx prop
              </Typography>
              <Typography textColor="text.secondary" sx={{ fontSize: 'sm', mb: 1 }}>
                Duplicates I have searched the existing issues Latest version I have
                tested the …
              </Typography>
              <Chip size="sm" color="danger" sx={{ fontWeight: 'lg' }}>
                bug 🐛
              </Chip>
              <Chip size="sm" color="primary" sx={{ ml: 1, fontWeight: 'lg' }}>
                package: system
              </Chip>
            </div>
          </Box>
        </Box>
      }
    >
      <Link
        href="#common-examples"
        underline="none"
        startDecorator={<AdjustIcon color="success" />}
        sx={{ fontWeight: 'lg' }}
      >
        [system] grey is no more recognized as color with the sx prop
      </Link>
    </Tooltip>
  );
}
