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

export default function LevelOfImportancy() {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        py: 2,
        borderRadius: 'xs',
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.body',
          border: '1px solid',
          borderColor: 'background.level2',
          alignSelf: 'center',
          maxWidth: '100%',
          minWidth: 373,
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
            borderRadius: 'md',
          }}
        >
          <Typography level="h2" fontSize="lg">
            Photo upload
          </Typography>
          <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: 'auto' }}>
            <Close />
          </IconButton>
        </Sheet>
        <Box sx={{ px: 2, pt: 1, pb: 2 }}>
          <Sheet
            variant="outlined"
            sx={{
              borderRadius: 'md',
              overflow: 'auto',
              borderColor: 'background.level2',
            }}
          >
            <AspectRatio>
              <img alt="" src="/static/images/cards/yosemite.jpeg" />
            </AspectRatio>
            <Box sx={{ display: 'flex', p: 1, gap: 1 }}>
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
        </Box>
        <Sheet
          sx={{
            bgcolor: 'background.level1',
            display: 'flex',
            p: 2,
            gap: 1,
          }}
        >
          <Button size="md" variant="plain" sx={{ ml: 'auto' }}>
            Replace media
          </Button>
          <Button size="md">Finish</Button>
        </Sheet>
      </Box>
    </Box>
  );
}
