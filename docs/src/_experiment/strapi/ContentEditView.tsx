/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import ListDivider from '@mui/joy/ListDivider';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import AddPhotoAlternate from '@mui/icons-material/AddPhotoAlternate';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Check from '@mui/icons-material/Check';
import FileCopy from '@mui/icons-material/FileCopy';
import Public from '@mui/icons-material/Public';
import Segment from '@mui/icons-material/Segment';
import { ToggleButton, ToggleButtonGroup } from 'docs/src/_experiment/joy/Toggle';
import MainNav from './components/MainNav';
import ContentNav from './components/ContentNav';

export default function ContentEditView() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.level1',
        display: 'flex',
        my: '5rem',
      }}
    >
      <MainNav activeIndex={0} />
      <ContentNav activeIndex={2} />
      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
        <Box
          sx={{
            px: '3.5rem',
            pt: '2.25rem',
            pb: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Link
              component="button"
              startDecorator={<ArrowBack />}
              sx={{ typography: 'tableLabel', color: 'primary.textColor', mb: 1 }}
            >
              BACK
            </Link>
            <Typography level="header1">Create an Entry</Typography>
            <Typography color="text.tertiary">API ID: Restaurants</Typography>
          </div>
          <Button startIcon={<Check fontSize="md" />} sx={{ alignSelf: 'center' }}>
            Save
          </Button>
        </Box>

        <Box sx={{ mx: '3.5rem', display: 'grid', gridTemplateColumns: '1fr 227px', gap: '1rem' }}>
          <Sheet
            sx={{
              borderRadius: 'xs',
              boxShadow: 'sm',
              py: 3,
              px: 4,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              rowGap: 3,
              columnGap: 2,
            }}
          >
            <Box>
              <Typography level="smallButtonText" mb={0.5}>
                Cover (1/4)
              </Typography>
              <Button
                variant="outlined"
                color="neutral"
                size="lg"
                sx={{
                  px: 7,
                  pt: 5,
                  pb: 4.5,
                  flexDirection: 'column',
                  color: 'neutral.500',
                  bgcolor: 'neutral.100',
                }}
              >
                <AddPhotoAlternate fontSize="xl3" sx={{ mb: 1 }} />
                Click to select an asset or drag and drop in this area
              </Button>
            </Box>
            <TextField label="Name" />
            <TextField label="Description" />
            <TextField label="Address" />
            <TextField label="Website" />
            <TextField label="Phone" />
            <TextField
              label="Price"
              endAdornment={<ArrowDropDown sx={{ color: 'neutral.500' }} />}
            />
            <TextField
              label="District"
              endAdornment={<ArrowDropDown sx={{ color: 'neutral.500' }} />}
            />
            <div>
              <Typography
                level="smallButtonText"
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}
              >
                Active <Public fontSize="xs" color="neutral" />
              </Typography>
              <ToggleButtonGroup role="group">
                <ToggleButton color="danger">Off</ToggleButton>
                <ToggleButton pressed>On</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </Sheet>
          <Box sx={{ display: 'grid', gap: 1 }}>
            <Sheet
              sx={{
                borderRadius: 'xs',
                boxShadow: 'sm',
                p: 2,
                gap: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box>
                <Typography level="tableLabel" color="text.secondary" sx={{ my: 1 }}>
                  Information
                </Typography>
                <ListDivider component="hr" />
              </Box>
              <div>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography level="smallButtonText">Last updated</Typography>
                  <Typography level="smallButtonText" fontWeight="normal">
                    3 months ago
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography level="smallButtonText">By</Typography>
                  <Typography level="smallButtonText" fontWeight="normal">
                    Kai do
                  </Typography>
                </Box>
              </div>
              <Box>
                <Typography level="tableLabel" color="text.secondary" sx={{ my: 1 }}>
                  Internationalization
                </Typography>
                <ListDivider component="hr" />
              </Box>
              <TextField
                label="Locales"
                defaultValue="French (FR)"
                endAdornment={<ArrowDropDown sx={{ color: 'neutral.500' }} />}
              />
              <Link startDecorator={<FileCopy />} sx={{ fontSize: '0.75rem' }}>
                Fill in from another locale
              </Link>
            </Sheet>
            <Sheet
              sx={{
                borderRadius: 'xs',
                boxShadow: 'sm',
                p: 2,
                gap: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box>
                <Typography level="tableLabel" color="text.secondary" sx={{ my: 1 }}>
                  Relations
                </Typography>
                <ListDivider component="hr" />
              </Box>
              <TextField
                label="Reviews (0)"
                placeholder="Add an entry"
                endAdornment={<ArrowDropDown sx={{ color: 'neutral.500' }} />}
              />
              <TextField
                label="Category"
                placeholder="Add an entry"
                endAdornment={<ArrowDropDown sx={{ color: 'neutral.500' }} />}
              />
            </Sheet>
            <Button variant="outlined" startIcon={<Edit />}>
              Edit the model
            </Button>
            <Button variant="outlined" startIcon={<Segment />}>
              Edit the model
            </Button>
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', my: 2, mr: '227px' }}>
          <Button
            variant="text"
            color="neutral"
            size="lg"
            startIcon={
              <Box
                sx={{
                  borderRadius: '20px',
                  p: 0.5,
                  display: 'flex',
                  bgcolor: 'neutral.150',
                  color: 'neutral.600',
                }}
              >
                <Add fontSize="lg" />
              </Box>
            }
            sx={{
              borderRadius: '40px',
              bgcolor: 'background.body',
              boxShadow: 'sm',
              color: 'neutral.500',
            }}
          >
            Add a Dynamic Zone
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
