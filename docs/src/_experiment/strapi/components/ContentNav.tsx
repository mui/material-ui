/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Search from '@mui/icons-material/Search';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Badge from '../../joy/Badge';

export default function ContentNav({ activeIndex }: { activeIndex?: number }) {
  const activate = (index: number) => {
    const selected = index === activeIndex;
    if (typeof activeIndex !== 'number' || !selected) {
      return {};
    }
    return {
      selected: true,
      variant: 'light' as const,
    };
  };
  const dot = (
    <Box
      sx={{
        width: 4,
        height: 4,
        color: 'inherit',
        bgcolor: 'currentColor',
        borderRadius: '50%',
        mr: '4px',
      }}
    />
  );
  return (
    <Box
      sx={{
        width: 230,
        borderRight: '1px solid',
        borderColor: 'neutral.outlinedBorder',
      }}
    >
      <nav aria-labelledby="content">
        <Box sx={{ py: '1.5rem', px: '1.5rem', display: 'flex' }}>
          <Typography id="content" level="header2">
            <b>Content</b>
          </Typography>
          <IconButton
            variant="outlined"
            color="neutral"
            size="sm"
            sx={{ ml: 'auto', mr: -1, bgcolor: 'background.body' }}
          >
            <Search fontSize="md" />
          </IconButton>
        </Box>
        <Box
          sx={{
            ml: '1.5rem',
            borderBottom: '1px solid',
            borderColor: 'neutral.outlinedBorder',
            width: '24px',
          }}
        />
        <List
          aria-labelledby="content"
          size="sm"
          sx={{
            mt: 2,
            pl: '22px',
            '--List-background': 'initial',
            '--List-nestedInsetStart': '0px',
            '--List-gap': '16px',
            '--List-decorator-width': '26px',
            '& .MuiListItemButton-root.Mui-selected': {
              borderRight: '2px solid',
              borderColor: 'currentColor',
            },
            '& .MuiListItemDecorator-root': {
              justifyContent: 'center',
            },
          }}
        >
          <ListItem nested>
            <ListItem id="collection-types" component="div" sx={{ mb: 0.5 }}>
              <Link
                component="button"
                variant="text"
                color="neutral"
                underline="none"
                sx={{ typography: 'tableLabel', color: 'text.secondary' }}
              >
                Collection types <ArrowDropDown />
              </Link>
              <Badge variant="light" color="neutral" sx={{ ml: 'auto', mr: 1.5 }}>
                6
              </Badge>
            </ListItem>
            <List aria-labelledby="collection-types" sx={{ '--List-gap': '0px' }}>
              <ListItem>
                <ListItemButton {...activate(0)}>
                  <ListItemDecorator>{dot}</ListItemDecorator>
                  Like
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton {...activate(1)}>
                  <ListItemDecorator>{dot}</ListItemDecorator>
                  Permission
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton {...activate(2)}>
                  <ListItemDecorator>{dot}</ListItemDecorator>
                  Restaurants
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton {...activate(3)}>
                  <ListItemDecorator>{dot}</ListItemDecorator>
                  Label ID
                </ListItemButton>
              </ListItem>
            </List>
          </ListItem>
          <ListItem nested>
            <ListItem
              id="single-types"
              component="div"
              sx={{ typography: 'tableLabel', color: 'text.secondary', mb: 0.5 }}
            >
              <Link
                component="button"
                variant="text"
                color="neutral"
                underline="none"
                sx={{ typography: 'tableLabel', color: 'text.secondary' }}
              >
                Single types <ArrowDropDown />
              </Link>
              <Badge variant="light" color="neutral" sx={{ ml: 'auto', mr: 1.5 }}>
                6
              </Badge>
            </ListItem>
            <List aria-labelledby="single-types" sx={{ '--List-gap': '0px' }}>
              <ListItem>
                <ListItemButton {...activate(4)}>
                  <ListItemDecorator>{dot}</ListItemDecorator>
                  Categories
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton {...activate(5)}>
                  <ListItemDecorator>{dot}</ListItemDecorator>
                  Label B
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton {...activate(6)}>
                  <ListItemDecorator>{dot}</ListItemDecorator>
                  Label C
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton {...activate(7)}>
                  <ListItemDecorator>{dot}</ListItemDecorator>
                  Label D
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton {...activate(8)}>
                  <ListItemDecorator>{dot}</ListItemDecorator>
                  Label E
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton {...activate(9)}>
                  <ListItemDecorator>{dot}</ListItemDecorator>
                  Label F
                </ListItemButton>
              </ListItem>
            </List>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
