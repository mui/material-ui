/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Add from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search';
import FilterList from '@mui/icons-material/FilterList';
import Settings from '@mui/icons-material/Settings';
import MainNav from './components/MainNav';
import ContentNav from './components/ContentNav';

export default function ContentListView() {
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
            <Typography level="header1">Restaurants</Typography>
            <Typography color="text.tertiary">0 entries found</Typography>
          </div>
          <Button startIcon={<Add />} sx={{ alignSelf: 'center' }}>
            Add new entry
          </Button>
        </Box>
        <Box sx={{ px: '3.5rem', display: 'flex', gap: 1 }}>
          <IconButton
            size="sm"
            variant="outlined"
            color="neutral"
            sx={{ bgcolor: 'background.paper' }}
          >
            <Search />
          </IconButton>
          <Button variant="outlined" color="neutral" startIcon={<FilterList />} size="sm">
            Filters
          </Button>
          <Button
            variant="outlined"
            color="neutral"
            endIcon={<ArrowDropDown />}
            size="sm"
            sx={{ ml: 'auto' }}
          >
            Englist - US
          </Button>
        </Box>
        <Sheet sx={{ mx: '3.5rem', mt: 2, borderRadius: 'xs', boxShadow: 'sm' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', p: 1.5 }}>
            <Box sx={{ px: 2 }}>
              <Checkbox />
            </Box>
            <Link
              underline="none"
              component="button"
              sx={{ typography: 'tableLabel', flexBasis: '12%' }}
            >
              ID
              <ArrowDropDown />
            </Link>
            <Link
              underline="none"
              component="button"
              sx={{ typography: 'tableLabel', flexBasis: '16%' }}
            >
              Cover
              <ArrowDropDown />
            </Link>
            <Link
              underline="none"
              component="button"
              sx={{ typography: 'tableLabel', flexBasis: '20%' }}
            >
              Name
              <ArrowDropDown />
            </Link>
            <Link
              underline="none"
              component="button"
              sx={{ typography: 'tableLabel', flexGrow: 1 }}
            >
              Description
              <ArrowDropDown />
            </Link>
            <Button size="sm" color="neutral" variant="outlined">
              <Settings fontSize="md" />
            </Button>
          </Box>
          <Box sx={{ borderTop: '1px solid', borderColor: 'neutral.outlinedBorder', mx: 1.5 }} />
          <Box sx={{ py: 5, textAlign: 'center' }}>
            <Typography level="subtitle" fontWeight="md" justifyContent="center">
              You don’t have the permission to access that content
            </Typography>
            <Button color="primary" variant="outlined" startIcon={<Add />} sx={{ mt: 1.5 }}>
              Add asset
            </Button>
          </Box>
        </Sheet>
      </Box>
    </Box>
  );
}
