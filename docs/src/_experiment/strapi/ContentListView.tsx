/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
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
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import MainNav from './components/MainNav';
import ContentNav from './components/ContentNav';

const items = [
  { name: 'Chez Léon', description: 'Chez Léon is a human sized Parisian...' },
  { name: 'L’Aristote', description: 'The ideal place to enjoy the french...' },
  { name: 'La part des anges', description: 'Famous wine restaurant in the heart...' },
  { name: 'Saint Michel', description: 'Simply the best fish&chips in town...' },
  { name: 'La maison blanche', description: 'Typical wood fire pizzeria, in the...' },
];

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
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'auto 12% 16% 20% 1fr auto',
              alignItems: 'center',
              p: 1.5,
            }}
          >
            <Box sx={{ px: 2 }}>
              <Checkbox />
            </Box>
            <Link underline="none" component="button" sx={{ typography: 'tableLabel' }}>
              ID
              <ArrowDropDown />
            </Link>
            <Link underline="none" component="button" sx={{ typography: 'tableLabel' }}>
              Cover
              <ArrowDropDown />
            </Link>
            <Link underline="none" component="button" sx={{ typography: 'tableLabel' }}>
              Name
              <ArrowDropDown />
            </Link>
            <Link underline="none" component="button" sx={{ typography: 'tableLabel' }}>
              Description
              <ArrowDropDown />
            </Link>
            <Box sx={{ textAlign: 'right' }}>
              <Button size="sm" color="neutral" variant="outlined">
                <Settings fontSize="md" />
              </Button>
            </Box>
            {items.map(({ name, description }, index) => (
              <React.Fragment key={name}>
                <Box
                  sx={{
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    gridColumn: '1 / -1',
                    my: 1.5,
                  }}
                />
                <Box sx={{ px: 2 }}>
                  <Checkbox />
                </Box>
                <Typography>{index + 1}</Typography>
                <div>
                  <Avatar>{name.substring(0, 1)}</Avatar>
                </div>
                <Typography>{name}</Typography>
                <Typography>{description}</Typography>
                <Box>
                  <IconButton variant="text" color="neutral" size="sm">
                    <Edit />
                  </IconButton>
                  <IconButton variant="text" color="neutral" size="sm" sx={{ ml: 1 }}>
                    <Delete />
                  </IconButton>
                </Box>
              </React.Fragment>
            ))}
          </Box>
        </Sheet>
        <Box sx={{ display: 'flex', mx: '3.5rem', mt: 1.5 }}>
          <Button
            variant="outlined"
            color="neutral"
            endIcon={<ArrowDropDown fontSize="md" />}
            sx={{
              '--Button-gap': '4px',
              '--Icon-color': (theme) => theme.vars.palette.text.tertiary,
              '&:hover': {
                '--Icon-color': 'initial',
              },
            }}
          >
            10
          </Button>
          <Typography level="smallText" sx={{ ml: 1, alignSelf: 'center' }}>
            Entries per page
          </Typography>
          <Box sx={{ mx: 'auto' }} />
          <IconButton size="sm" variant="text" color="neutral" sx={{ color: 'text.tertiary' }}>
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton
            size="sm"
            variant="text"
            color="primary"
            sx={{ bgcolor: 'background.body', boxShadow: 'sm' }}
          >
            1
          </IconButton>
          <IconButton size="sm" variant="text" color="neutral">
            2
          </IconButton>
          <IconButton size="sm" variant="text" color="neutral">
            3
          </IconButton>
          <IconButton size="sm" variant="text" color="neutral">
            ...
          </IconButton>
          <IconButton size="sm" variant="text" color="neutral">
            10
          </IconButton>
          <IconButton size="sm" variant="text" color="neutral" sx={{ color: 'text.tertiary' }}>
            <KeyboardArrowRight />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
