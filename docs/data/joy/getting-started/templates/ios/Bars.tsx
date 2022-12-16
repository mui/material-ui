/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowLeftRounded from '@mui/icons-material/KeyboardArrowLeftRounded';
import CropFreeIcon from '@mui/icons-material/CropFree';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import EditIcon from '@mui/icons-material/EditOutlined';
import StarIcon from '@mui/icons-material/StarRounded';
import UploadIcon from '@mui/icons-material/UploadOutlined';
import FolderIcon from '@mui/icons-material/FolderOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Frame from './Frame';

export default function Bars() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(393px, 1fr))',
        gap: 2,
        alignItems: 'flex-start',
        '& > .wrapper': {
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        },
      }}
    >
      <Box className="wrapper">
        <Frame name="Navigation Bars">
          <Sheet
            sx={{
              material: 'navbar',
              display: 'flex',
              alignItems: 'center',
              pt: '54px',
              px: 2,
            }}
          >
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
              <IconButton>
                <AddRoundedIcon />
              </IconButton>
            </Box>
          </Sheet>
        </Frame>

        <Frame>
          <Sheet
            sx={{
              material: 'navbar',
              display: 'flex',
              alignItems: 'center',
              pt: '54px',
            }}
          >
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
          </Sheet>
        </Frame>

        <Frame>
          <Sheet sx={{ material: 'navbar', pt: '54px', px: 2 }}>
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
                <CropFreeIcon />
              </IconButton>
            </Box>
            <Typography
              level="largeTitle"
              fontWeight="xl"
              sx={{ pt: '4px', pb: '7px' }}
            >
              Large Title
            </Typography>
          </Sheet>
        </Frame>
      </Box>

      <Box className="wrapper">
        <Frame name="Search Bars">
          <Sheet
            sx={{
              material: 'navbar',
              display: 'flex',
              alignItems: 'center',
              pt: '54px',
              px: 2,
              pb: 1,
            }}
          >
            <Input
              placeholder="Search"
              type="search"
              startDecorator={<SearchIcon />}
              endDecorator={<MicIcon sx={{ color: 'label.secondary' }} />}
              sx={{ flex: 1 }}
            />
          </Sheet>
        </Frame>
        <Frame>
          <Sheet
            sx={{
              material: 'navbar',
              pt: '54px',
              px: 2,
              pb: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 44 }}>
              <Box sx={{ width: 0, whiteSpace: 'nowrap' }}>
                <Link
                  component="button"
                  color="primary"
                  startDecorator={
                    <KeyboardArrowLeftRounded
                      fontSize="xl3"
                      sx={{ ml: -2, mr: -1 }}
                    />
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
                <IconButton>
                  <AddRoundedIcon />
                </IconButton>
              </Box>
            </Box>
            <Input
              placeholder="Search"
              type="search"
              startDecorator={<SearchIcon />}
              endDecorator={<MicIcon sx={{ color: 'label.secondary' }} />}
              sx={{ flex: 1 }}
            />
          </Sheet>
        </Frame>
        <Frame>
          <Sheet
            sx={{
              material: 'navbar',
              pt: '54px',
              px: 2,
              pb: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 44 }}>
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
              <IconButton sx={{ ml: 'auto' }}>
                <EditIcon />
              </IconButton>
            </Box>
            <Typography
              level="largeTitle"
              fontWeight="xl"
              sx={{ pt: '4px', pb: '7px' }}
            >
              Large Title
            </Typography>
            <Input
              placeholder="Search"
              type="search"
              startDecorator={<SearchIcon />}
              endDecorator={<MicIcon sx={{ color: 'label.secondary' }} />}
              sx={{ flex: 1 }}
            />
          </Sheet>
        </Frame>
        <Frame sx={{ bgcolor: '#000' }}>
          <Sheet
            sx={{
              material: 'navbar',
              mt: '47px',
              px: 2,
              pb: 1,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <Typography
              level="footnote"
              textAlign="center"
              sx={{ pt: '11px', pb: '14px' }}
            >
              This is a prompt message.
            </Typography>
            <Input
              placeholder="Search"
              type="search"
              startDecorator={<SearchIcon />}
              endDecorator={<MicIcon sx={{ color: 'label.secondary' }} />}
              sx={{ flex: 1 }}
            />
          </Sheet>
        </Frame>
        <Frame sx={{ bgcolor: '#000' }}>
          <Sheet
            sx={{
              material: 'navbar',
              mt: '47px',
              px: 2,
              pb: 1,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <Typography level="footnote" textAlign="center" sx={{ pt: '11px' }}>
              This is a prompt message.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mx: -2,
                minHeight: 44,
                my: '7px',
              }}
            >
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
            </Box>
            <Input
              placeholder="Search"
              type="search"
              startDecorator={<SearchIcon />}
              endDecorator={<MicIcon sx={{ color: 'label.secondary' }} />}
              sx={{ flex: 1 }}
            />
          </Sheet>
        </Frame>
      </Box>

      <Box className="wrapper">
        <Frame name="Tab Bars">
          <Sheet
            sx={{
              material: 'toolbar',
              pb: '47px',
              px: 2,
            }}
          >
            <Tabs variant="iosBar" defaultValue={0}>
              <TabList variant="iosBar">
                <Tab variant="iosBar" orientation="vertical">
                  <ListItemDecorator>
                    <StarIcon />
                  </ListItemDecorator>
                  Tab 1
                </Tab>
                <Tab variant="iosBar" orientation="vertical">
                  <ListItemDecorator>
                    <StarIcon />
                  </ListItemDecorator>
                  Sharing
                </Tab>
                <Tab variant="iosBar" orientation="vertical">
                  <ListItemDecorator>
                    <StarIcon />
                  </ListItemDecorator>
                  Browse
                </Tab>
              </TabList>
            </Tabs>
          </Sheet>
        </Frame>
        <Frame>
          <Sheet
            sx={{
              material: 'toolbar',
              pb: '47px',
              px: 2,
            }}
          >
            <Tabs variant="iosBar" defaultValue={0}>
              <TabList variant="iosBar" sx={{ justifyContent: 'space-around' }}>
                <Tab variant="iosBar" orientation="vertical">
                  <ListItemDecorator>
                    <StarIcon />
                  </ListItemDecorator>
                  Tab 1
                </Tab>
                <Tab variant="iosBar" orientation="vertical">
                  <ListItemDecorator>
                    <StarIcon />
                  </ListItemDecorator>
                  Tab 2
                </Tab>
                <Tab variant="iosBar" orientation="vertical">
                  <ListItemDecorator>
                    <StarIcon />
                  </ListItemDecorator>
                  Tab 3
                </Tab>
                <Tab variant="iosBar" orientation="vertical">
                  <ListItemDecorator>
                    <StarIcon />
                  </ListItemDecorator>
                  Tab 4
                </Tab>
              </TabList>
            </Tabs>
          </Sheet>
        </Frame>
        <Frame name="Toolbars">
          <Sheet
            sx={{
              material: 'toolbar',
              pt: '5px',
              pb: '47px',
              px: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <IconButton>
              <CropFreeIcon />
            </IconButton>
            <IconButton>
              <UploadIcon />
            </IconButton>
          </Sheet>
        </Frame>
        <Frame>
          <Sheet
            sx={{
              material: 'toolbar',
              pt: '5px',
              pb: '47px',
              px: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <IconButton>
              <CropFreeIcon />
            </IconButton>
            <IconButton>
              <UploadIcon />
            </IconButton>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Sheet>
        </Frame>
        <Frame>
          <Sheet
            sx={{
              material: 'toolbar',
              pt: '5px',
              pb: '47px',
              px: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <IconButton>
              <CropFreeIcon />
            </IconButton>
            <IconButton>
              <UploadIcon />
            </IconButton>
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <FolderIcon />
            </IconButton>
          </Sheet>
        </Frame>
        <Frame>
          <Sheet
            sx={{
              material: 'toolbar',
              pt: '5px',
              pb: '47px',
              px: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <IconButton>
              <CropFreeIcon />
            </IconButton>
            <IconButton>
              <UploadIcon />
            </IconButton>
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <FolderIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Sheet>
        </Frame>
      </Box>
    </Box>
  );
}
