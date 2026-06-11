'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
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

function RichCard({
  title,
  shortcut,
  description,
}: {
  title: React.ReactNode;
  shortcut?: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    // Rounding/clipping/elevation live here, not on the tooltip slot — the arrow
    // is a sibling of this card at the slot level, so slot-level `overflow: hidden`
    // would clip it.
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
      {description ? (
        <Typography variant="body2" sx={{ bgcolor: 'background.paper', px: 2, py: 1.75 }}>
          {description}
        </Typography>
      ) : null}
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

// Replaces the default tooltip slot. Mirrors the popper-placement margins +
// transform-origins from Tooltip's own slot (lost when swapping the component)
// and colors the arrow to match the dark header.
const RichTooltipRoot = styled('div')(({ theme: t }) => ({
  position: 'relative',
  maxWidth: 320,
  margin: 2,
  color: (t.vars || t).palette.text.primary,
  [`& .${tooltipClasses.arrow}`]: {
    color: (t.vars || t).palette.grey[900],
  },
  [`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: {
    transformOrigin: 'right center',
    marginInlineEnd: '14px',
  },
  [`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: {
    transformOrigin: 'left center',
    marginInlineStart: '14px',
  },
  [`.${tooltipClasses.popper}[data-popper-placement*="top"] &`]: {
    transformOrigin: 'center bottom',
    marginBottom: '14px',
  },
  [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: {
    transformOrigin: 'center top',
    marginTop: '14px',
  },
}));

interface RichTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  shortcut?: React.ReactNode;
  description?: React.ReactNode;
}

const RichTooltip = React.forwardRef<HTMLDivElement, RichTooltipProps>(function RichTooltip(
  { children, shortcut, description, ...other },
  ref,
) {
  // Tooltip appends the arrow as a slot child after `title`. Split it back out so
  // the title fills the card while the arrow stays a sibling (kept unclipped).
  const items = React.Children.toArray(children);
  const arrow = items.find((child) => React.isValidElement(child));
  const title = items.filter((child) => !React.isValidElement(child));

  return (
    <RichTooltipRoot ref={ref} {...other}>
      <RichCard title={title} shortcut={shortcut} description={description} />
      {arrow}
    </RichTooltipRoot>
  );
});

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
            <RichCard
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
              <RichCard
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
            title="Settings" // only "Settings" is announced by screen readers.
            slots={{ tooltip: RichTooltip }}
            slotProps={{
              tooltip: {
                shortcut: '⌘,',
                description:
                  'Open project settings to manage members, permissions, and integrations.',
              } as RichTooltipProps,
            }}
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
