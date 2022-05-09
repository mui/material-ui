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
        bgcolor: 'background.level3',
        display: 'flex',
        width: '100%',
        py: 5,
        borderRadius: 'xs',
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.body',
          alignSelf: 'center',
          maxWidth: '100%',
          minWidth: 373,
          mx: 'auto',
          boxShadow: 'md',
          borderRadius: 'xs',
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            borderWidth: '0 0 1px 0',
            bgcolor: 'background.level1',
            display: 'flex',
            alignItems: 'center',
            p: 2,
            borderRadius: '4px 4px 0 0',
          }}
        >
          <Typography level="h2" fontSize="lg">
            <b>Details</b>
          </Typography>
          <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: 'auto' }}>
            <Close />
          </IconButton>
        </Sheet>
        <Box sx={{ p: 2 }}>
          <Sheet
            variant="outlined"
            sx={{
              borderRadius: 'xs',
              bgcolor: 'background.level1',
            }}
          >
            <Box sx={{ display: 'flex', p: 1, gap: 0.5 }}>
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
            <AspectRatio>
              <img alt="" src="/static/images/cards/yosemite.jpeg" />
            </AspectRatio>
          </Sheet>
        </Box>
        <Sheet
          variant="outlined"
          sx={{
            borderWidth: '1px 0 0 0',
            bgcolor: 'background.level1',
            display: 'flex',
            p: 2,
            gap: 1,
            borderRadius: '0 0 4px 4px',
          }}
        >
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            sx={{ bgcolor: 'background.body' }}
          >
            Cancel
          </Button>
          <Button size="sm" variant="soft" sx={{ ml: 'auto' }}>
            Replace media
          </Button>
          <Button size="sm">Finish</Button>
        </Sheet>
      </Box>
    </Box>
  );
}
