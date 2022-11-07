/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import ListDivider from '@mui/joy/ListDivider';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import Sheet, { SheetProps } from '@mui/joy/Sheet';
import Switch from '@mui/joy/Switch';
import Slider from '@mui/joy/Slider';
import KeyboardArrowLeftRounded from '@mui/icons-material/KeyboardArrowLeftRounded';
import CropFreeIcon from '@mui/icons-material/CropFree';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import Frame from './Frame';

const Navbar = ({ sx, ...props }: SheetProps) => (
  <Sheet
    {...props}
    sx={[(theme) => theme.materials.navbar, ...(Array.isArray(sx) ? sx : [sx])]}
  />
);

export default function IPhone() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(393px, 1fr))',
        gap: 2,
        alignItems: 'flex-start',
      }}
    >
      <Frame name="Bars / Navigation Bars - Default">
        <Navbar sx={{ display: 'flex', alignItems: 'center', pt: '54px', px: 2 }}>
          <Box sx={{ width: 0, whiteSpace: 'nowrap' }}>
            <Link
              component="button"
              color="primary"
              startDecorator={
                <KeyboardArrowLeftRounded fontSize="xl3" sx={{ ml: -2, mr: -1 }} />
              }
              underline="none"
            >
              Parent Title
            </Link>
          </Box>
          <Typography level="headline" sx={{ mx: 'auto' }}>
            Title
          </Typography>
          <Box sx={{ width: 0, writingMode: 'tb-rl' }}>
            <IconButton color="primary" variant="plain">
              <AddRoundedIcon fontSize="xl2" />
            </IconButton>
          </Box>
        </Navbar>
      </Frame>

      <Frame name="Bars / Navigation Bars - Large Title">
        <Navbar sx={{ pt: '54px', px: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Link
              component="button"
              startDecorator={
                <KeyboardArrowLeftRounded fontSize="xl3" sx={{ ml: -2, mr: -1 }} />
              }
              underline="none"
            >
              Parent Title
            </Link>
            <IconButton>
              <CropFreeIcon fontSize="xl2" />
            </IconButton>
          </Box>
          <Typography level="largeTitle" fontWeight="xl" sx={{ my: 0.5 }}>
            Large Title
          </Typography>
        </Navbar>
      </Frame>

      <Frame name="Bars / Navigation Bars - Prompt">
        <Navbar sx={{ display: 'flex', alignItems: 'center', pt: '54px' }}>
          <Box sx={{ width: 0, whiteSpace: 'nowrap' }}>
            <Button variant="plain" color="primary" sx={{ typography: 'body' }}>
              Cancel
            </Button>
          </Box>
          <Typography level="headline" sx={{ mx: 'auto' }}>
            Title
          </Typography>
          <Box sx={{ width: 0, writingMode: 'tb-rl' }}>
            <Button variant="plain" color="primary" sx={{ typography: 'body' }}>
              Done
            </Button>
          </Box>
        </Navbar>
      </Frame>

      <Frame name="Switch">
        <Navbar sx={{ px: 2, py: 0.75 }}>
          <FormControl orientation="horizontal">
            <FormLabel sx={{ flexGrow: 1 }}>Title</FormLabel>
            <Switch />
          </FormControl>
        </Navbar>
      </Frame>

      <Frame name="Slider">
        <Navbar sx={{ px: 2, py: 0.75 }}>
          <Slider defaultValue={30} />
        </Navbar>
      </Frame>

      <Frame name="Progress indicators">
        <Navbar sx={{ px: 2, py: 0.75 }}>
          <LinearProgress sx={{ mb: 1 }} />
          <LinearProgress determinate value={50} />
        </Navbar>
      </Frame>

      <Frame name="Text Field">
        <Navbar sx={{ px: 2, py: 0.75 }}>
          <FormControl orientation="horizontal">
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Placeholder Value"
              endDecorator={
                <IconButton color="neutral">
                  <CancelRoundedIcon />
                </IconButton>
              }
              sx={{ flex: 1, ml: '52px' }}
            />
          </FormControl>
        </Navbar>
      </Frame>

      <Frame name="Segmented Control">
        <Navbar sx={{ px: 2, py: 1.5 }}>
          <Tabs defaultValue={0}>
            <TabList>
              <Tab>Label</Tab>
              <Tab>Label</Tab>
              <Tab>Label</Tab>
            </TabList>
          </Tabs>
        </Navbar>
      </Frame>

      <Frame name="Stepper">
        <Navbar
          sx={{
            px: 2,
            py: 1.25,
            display: 'flex',
            justifyContent: 'space-betwen',
            alignItems: 'center',
          }}
        >
          <Typography>Title</Typography>
          <List
            row
            sx={{
              flex: 0,
              ml: 'auto',
              bgcolor: 'fill.tertiary',
              '--List-item-minHeight': '29px',
              '--List-radius': '7.92px',
              '--List-padding': '0px',
            }}
          >
            <ListItemButton>
              <RemoveRoundedIcon />
            </ListItemButton>
            <ListDivider sx={{ borderRadius: '1px', my: 1 }} />
            <ListItemButton>
              <AddRoundedIcon />
            </ListItemButton>
          </List>
        </Navbar>
      </Frame>
    </Box>
  );
}
