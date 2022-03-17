import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Sheet from '@mui/joy/Sheet';
import Info from '@mui/icons-material/InfoOutlined';
import HistoryEdu from '@mui/icons-material/HistoryEdu';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ViewCompact from '@mui/icons-material/ViewCompact';
import PermMedia from '@mui/icons-material/PermMedia';
import Extension from '@mui/icons-material/Extension';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Settings from '@mui/icons-material/Settings';
import Badge from 'docs/src/_experiment/joy/Badge';

export default function MainNav({ activeIndex }: { activeIndex?: number }) {
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
  return (
    <Sheet
      variant="outlined"
      sx={{
        width: 65,
        display: 'flex',
        flexDirection: 'column',
        borderWidth: '0 1px 0 0',
      }}
    >
      <Box
        sx={{
          px: '0.75rem',
          py: '1rem',
          borderBottom: '1px solid',
          borderColor: 'neutral.outlinedBorder',
        }}
      >
        <Box
          component="img"
          src="https://res.cloudinary.com/practicaldev/image/fetch/s--XsZRGi5O--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/763/988af53b-5d7e-435a-98eb-dd4aff5299d2.png"
          sx={{
            borderRadius: '4px',
            width: 40,
            height: 40,
            display: 'block',
          }}
        />
      </Box>
      <List
        size="sm"
        sx={{
          flexGrow: 1,
          '--List-padding': '12px',
          '--List-radius': '8px',
          '--List-gap': '8px',
          '--List-divider-gap': '8px',
          '& .MuiListItemDecorator-root': {
            justifyContent: 'center',
          },
        }}
      >
        <ListItem>
          <ListItemButton {...activate(0)}>
            <ListItemDecorator>
              <HistoryEdu />
            </ListItemDecorator>
          </ListItemButton>
        </ListItem>
        <ListDivider inset="gutter" />
        <ListItem>
          <ListItemButton {...activate(1)}>
            <ListItemDecorator>
              <ViewCompact />
            </ListItemDecorator>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton {...activate(2)}>
            <ListItemDecorator>
              <PermMedia />
            </ListItemDecorator>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton {...activate(3)}>
            <ListItemDecorator>
              <Info />
            </ListItemDecorator>
          </ListItemButton>
        </ListItem>
        <ListDivider inset="gutter" />
        <ListItem>
          <ListItemButton {...activate(4)}>
            <ListItemDecorator>
              <Extension />
            </ListItemDecorator>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton {...activate(5)}>
            <ListItemDecorator>
              <ShoppingCart />
            </ListItemDecorator>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton {...activate(6)} sx={{ position: 'relative' }}>
            <Badge
              variant="contained"
              sx={{
                position: 'absolute',
                top: '-6px',
                right: '-8px',
              }}
            >
              2
            </Badge>
            <ListItemDecorator>
              <Settings />
            </ListItemDecorator>
          </ListItemButton>
        </ListItem>
      </List>
      <Box
        sx={{
          borderTop: '1px solid',
          borderColor: 'neutral.outlinedBorder',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          py: '1.5rem',
          px: '1rem',
        }}
      >
        <Avatar size="sm">SK</Avatar>
        <Button
          color="neutral"
          variant="outlined"
          size="sm"
          sx={{
            px: 0,
            position: 'absolute',
            right: '-10px',
            bgcolor: 'background.body',
          }}
        >
          <KeyboardArrowRight />
        </Button>
      </Box>
    </Sheet>
  );
}
