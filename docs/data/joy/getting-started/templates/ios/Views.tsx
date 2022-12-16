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
import ViewOverlay from './ViewOverlay';

export default function Views() {
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
        <ViewOverlay name="Action Sheets">
          <Box
            sx={{
              alignSelf: 'flex-end',
              px: 1,
              pt: '11px',
              pb: '34px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Button sx={{}}>Cancel</Button>
          </Box>
        </ViewOverlay>
      </Box>
    </Box>
  );
}
