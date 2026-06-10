'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import type { TooltipProps } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SettingsIcon from '@mui/icons-material/Settings';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const theme = createTheme({});

const Shortcut = styled('kbd')(({ theme: t }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 2,
  font: 'inherit',
  fontSize: t.typography.pxToRem(12),
  lineHeight: 1,
  padding: '4px 8px',
  borderRadius: 6,
  color: (t.vars || t).palette.common.white,
  backgroundColor: t.alpha((t.vars || t).palette.common.white, 0.16),
}));

function RichTitle({
  title,
  shortcut,
  description,
}: {
  title: string;
  shortcut?: React.ReactNode;
  description: string;
}) {
  return (
    // Inner wrapper owns rounding + clipping + elevation so the Tooltip slot
    // stays unclipped — otherwise `overflow: hidden` would clip the arrow,
    // which renders as a child of the tooltip positioned outside its box.
    <Box sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 8 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          bgcolor: 'grey.900',
          color: 'common.white',
          px: 2,
          py: 1.25,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {shortcut ? <Shortcut>{shortcut}</Shortcut> : null}
      </Box>
      <Typography variant="body2" sx={{ bgcolor: 'background.paper', px: 2, py: 1.75 }}>
        {description}
      </Typography>
    </Box>
  );
}

const richSlotProps: TooltipProps['slotProps'] = {
  tooltip: {
    sx: {
      p: 0,
      maxWidth: 320,
      bgcolor: 'transparent',
      color: 'text.primary',
    },
  },
  arrow: {
    // Match the dark header, not the body surface.
    sx: { color: 'grey.900' },
  },
};

const triggerSx = {
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 1.5,
} as const;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          p: 8,
          bgcolor: 'background.default',
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Rich Tooltip — header + shortcut + description (existing Tooltip, no new component)
        </Typography>

        <Tooltip
          arrow
          open
          placement="top"
          slotProps={{ ...richSlotProps, arrow: { sx: { color: 'white' } } }}
          title={
            <RichTitle
              title="Publish to ACC"
              shortcut={
                <React.Fragment>
                  <span>⌘</span>
                  <span>⇧</span>
                  <span>P</span>
                </React.Fragment>
              }
              description="Upload the latest reviewed model version to Autodesk Construction Cloud."
            />
          }
        >
          <IconButton sx={triggerSx}>
            <FileUploadOutlinedIcon />
          </IconButton>
        </Tooltip>

        <Typography variant="body2" color="text.secondary">
          Hover the icons below (default open state off)
        </Typography>

        <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
          <Tooltip
            arrow
            placement="bottom"
            slotProps={richSlotProps}
            title={
              <RichTitle
                title="Copy link"
                shortcut={
                  <React.Fragment>
                    <span>⌘</span>
                    <span>C</span>
                  </React.Fragment>
                }
                description="Copy a shareable link to this item to your clipboard."
              />
            }
          >
            <IconButton sx={triggerSx}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>

          <Tooltip
            arrow
            placement="bottom"
            slotProps={richSlotProps}
            title={
              <RichTitle
                title="Settings"
                shortcut={
                  <React.Fragment>
                    <span>⌘</span>
                    <span>,</span>
                  </React.Fragment>
                }
                description="Open project settings to manage members, permissions, and integrations."
              />
            }
          >
            <IconButton sx={triggerSx}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
