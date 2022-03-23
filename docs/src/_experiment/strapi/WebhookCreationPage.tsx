/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Add from '@mui/icons-material/Add';
import PlayArrow from '@mui/icons-material/PlayArrow';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Remove from '@mui/icons-material/Remove';
import MainNav from './components/MainNav';
import SettingNav from './components/SettingNav';

export default function WebhookCreationPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.level1',
        display: 'flex',
        my: '5rem',
      }}
    >
      <MainNav activeIndex={6} />
      <SettingNav activeIndex={3} />
      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
        <Box
          sx={{
            px: '3.5rem',
            pt: '2.25rem',
            pb: '2rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div>
            <Link level="tableLabel" startDecorator={<ArrowBack />} sx={{ mb: '10px' }}>
              Back
            </Link>
            <Typography level="header1">Create an Entry</Typography>
          </div>
          <Button startIcon={<PlayArrow />} disabled sx={{ ml: 'auto', mr: 1 }}>
            Trigger
          </Button>
          <Button startIcon={<Add />}>Add new webhook</Button>
        </Box>
        <Sheet
          sx={{
            py: 3,
            px: 4,
            borderRadius: 'sm',
            boxShadow: 'sm',
            mt: 3,
            mx: '3.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField label="Name" />
          <TextField label="URL" />
          <div>
            <Typography level="smallButtonText" sx={{ mb: 1 }}>
              Headers
            </Typography>
            <Sheet
              variant="light"
              sx={{
                py: 3,
                px: 4,
              }}
            >
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 2 }}>
                <TextField
                  label="Key"
                  placeholder="Select or enter a value"
                  endAdornment={<ArrowDropDown />}
                />
                <TextField label="Value" placeholder="Text" />
                <IconButton
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  sx={{ borderRadius: 'lg', alignSelf: 'flex-end', mb: '6px' }}
                >
                  <Remove />
                </IconButton>
              </Box>
              <Link
                component="button"
                startDecorator={<Add />}
                sx={{ gridColumn: '1 / -1', mt: 1 }}
              >
                Add a new header
              </Link>
            </Sheet>
          </div>
          <div>
            <Typography level="smallButtonText" sx={{ mb: 1 }}>
              Events
            </Typography>
            <Box
              sx={{
                mx: -4,
                display: 'grid',
                gridTemplateColumns: '2fr repeat(4, 1fr) 2fr',
                '& > div:not(:nth-child(6n + 1))': { p: 2 },
                '& > div:nth-child(6n + 1)': { p: 2, pl: 4 },
              }}
            >
              <div />
              {['Create', 'Update', 'Delete', 'Publish', 'Unpublish'].map((label) => (
                <Box key={label}>
                  <Typography
                    level="tableLabel"
                    color="text.tertiary"
                    display="inline-block"
                    sx={{ mb: 1, transform: 'translateX(calc(-50% + 10px))' }}
                  >
                    {label}
                  </Typography>
                  <div />
                  <Checkbox />
                </Box>
              ))}
              <Box sx={{ pl: 4, display: 'flex', gap: 1, bgcolor: 'background.level1' }}>
                <Checkbox />
                <Typography>Media</Typography>
              </Box>
              {[...Array(5)].map((empty, index) => (
                <Box key={index} sx={{ bgcolor: 'background.level1' }}>
                  <Checkbox />
                </Box>
              ))}
              <Box sx={{ pl: 4, display: 'flex', gap: 1 }}>
                <Checkbox />
                <Typography>Entry</Typography>
              </Box>
              {[...Array(5)].map((empty, index) => (
                <Box key={index}>
                  <Checkbox />
                </Box>
              ))}
            </Box>
          </div>
        </Sheet>
      </Box>
    </Box>
  );
}
