import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Close from '@mui/icons-material/Close';
import Delete from '@mui/icons-material/Delete';
import Download from '@mui/icons-material/Download';
import InsertLink from '@mui/icons-material/InsertLink';
import Crop from '@mui/icons-material/Crop';

export default function LevelOfImportance() {
  return (
    <Box sx={{ display: 'flex', width: '100%', py: 2, borderRadius: 'xs' }}>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
          alignSelf: 'center',
          maxWidth: '100%',
          minWidth: { xs: 220, sm: 360 },
          mx: 'auto',
          boxShadow: 'sm',
          borderRadius: 'md',
          overflow: 'auto',
        }}
      >
        <Sheet
          sx={{
            borderWidth: '0 0 1px 0',
            display: 'flex',
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid',
            borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
          }}
        >
          <Typography level="h2" sx={{ fontSize: 'md' }}>
            Photo upload
          </Typography>
          <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: 'auto' }}>
            <Close />
          </IconButton>
        </Sheet>
        <Sheet sx={{ p: 2 }}>
          <Sheet
            variant="outlined"
            sx={{
              borderRadius: 'md',
              overflow: 'auto',
              borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
              bgcolor: 'background.level1',
            }}
          >
            <AspectRatio>
              <img alt="" src="/static/images/cards/yosemite.jpeg" />
            </AspectRatio>
            <Box
              sx={{
                display: 'flex',
                p: 1.5,
                gap: 1.5,
                '& > button': { bgcolor: 'background.surface' },
              }}
            >
              <IconButton
                color="danger"
                variant="plain"
                size="sm"
                sx={{ mr: 'auto' }}
              >
                <Delete />
              </IconButton>
              <IconButton color="neutral" variant="outlined" size="sm">
                <Download />
              </IconButton>
              <IconButton color="neutral" variant="outlined" size="sm">
                <InsertLink />
              </IconButton>
              <IconButton color="neutral" variant="outlined" size="sm">
                <Crop />
              </IconButton>
            </Box>
          </Sheet>
        </Sheet>
        <Sheet
          sx={{
            display: 'flex',
            p: 2,
            borderTop: '1px solid',
            borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
            gap: 1,
          }}
        >
          <Button size="md" variant="plain" sx={{ ml: 'auto' }}>
            Replace photo
          </Button>
          <Button size="md">Upload</Button>
        </Sheet>
      </Box>
    </Box>
  );
}
