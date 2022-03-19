import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import Close from '@mui/icons-material/Close';
import Delete from '@mui/icons-material/Delete';
import Download from '@mui/icons-material/Download';
import InsertLink from '@mui/icons-material/InsertLink';
import Crop from '@mui/icons-material/Crop';

export default function MediaEditAsset() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.level3',
        display: 'flex',
        my: '5rem',
      }}
    >
      <Sheet
        sx={{
          alignSelf: 'center',
          width: 829,
          maxWidth: '100%',
          mx: 'auto',
          mt: '40px',
          boxShadow: 'md',
          borderRadius: 'xs',
        }}
      >
        <Sheet
          variant="light"
          sx={{
            borderWidth: '0 0 1px 0',
            borderStyle: 'solid',
            borderColor: 'neutral.outlinedBorder',
            display: 'flex',
            alignItems: 'center',
            p: 2,
            borderRadius: '4px 4px 0 0',
          }}
        >
          <Typography component="h2" level="subtitle" color="text.secondary">
            <b>Details</b>
          </Typography>
          <IconButton
            size="sm"
            variant="outlined"
            color="neutral"
            sx={{ ml: 'auto', color: 'neutral.600' }}
          >
            <Close fontSize="xl" />
          </IconButton>
        </Sheet>
        <Box sx={{ p: 4, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Sheet variant="outlined" sx={{ bgcolor: 'background.level2', borderRadius: 'xs' }}>
            <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
              <IconButton
                color="neutral"
                variant="outlined"
                size="sm"
                sx={{ color: 'neutral.600' }}
              >
                <Delete />
              </IconButton>
              <IconButton
                color="neutral"
                variant="outlined"
                size="sm"
                sx={{ color: 'neutral.600' }}
              >
                <Download />
              </IconButton>
              <IconButton
                color="neutral"
                variant="outlined"
                size="sm"
                sx={{ color: 'neutral.600' }}
              >
                <InsertLink />
              </IconButton>
              <IconButton
                color="neutral"
                variant="outlined"
                size="sm"
                sx={{ color: 'neutral.600' }}
              >
                <Crop />
              </IconButton>
            </Box>
          </Sheet>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Sheet
              variant="light"
              sx={{ py: 2, px: 3, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}
            >
              <div>
                <Typography level="tableLabel" color="text.tertiary" sx={{ mb: 0.5 }}>
                  Size
                </Typography>
                <Typography level="smallText">2.3MB</Typography>
              </div>
              <div>
                <Typography level="tableLabel" color="text.tertiary" sx={{ mb: 0.5 }}>
                  Date
                </Typography>
                <Typography level="smallText">Wed, March 13th 2019</Typography>
              </div>
              <div>
                <Typography level="tableLabel" color="text.tertiary" sx={{ mb: 0.5 }}>
                  Dimensions
                </Typography>
                <Typography level="smallText">2500x3209</Typography>
              </div>
              <div>
                <Typography level="tableLabel" color="text.tertiary" sx={{ mb: 0.5 }}>
                  Extension
                </Typography>
                <Typography level="smallText">PNG</Typography>
              </div>
            </Sheet>
            <TextField label="File name" defaultValue="lavender.png" />
            <TextField
              label="Alternative text"
              helperText="This text will be displayed if the asset can’t be shown"
            />
            <TextField label="Caption" />
          </Box>
        </Box>
        <Sheet
          variant="light"
          sx={{
            borderWidth: '1px 0 0 0',
            borderStyle: 'solid',
            borderColor: 'neutral.outlinedBorder',
            display: 'flex',
            p: 2,
            gap: 1,
            borderRadius: '0 0 4px 4px',
          }}
        >
          <Button variant="outlined" color="neutral">
            Cancel
          </Button>
          <Button variant="outlined" sx={{ ml: 'auto' }}>
            Replace media
          </Button>
          <Button>Finish</Button>
        </Sheet>
      </Sheet>
    </Box>
  );
}
