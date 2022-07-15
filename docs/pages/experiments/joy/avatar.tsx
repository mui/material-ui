/* eslint-disable no-alert */
import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import MoreVert from '@mui/icons-material/MoreVert';
import Mouse from '@mui/icons-material/Mouse';

const ColorSchemePicker = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{ minWidth: 40, p: '0.25rem' }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

const props = {
  size: ['sm', 'md', 'lg'],
  color: ['primary', 'danger', 'info', 'success', 'warning', 'neutral'],
  variant: ['solid', 'outlined', 'soft'],
} as const;

export default function JoyAvatar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  return (
    <CssVarsProvider>
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ px: 3 }}>
          <ColorSchemePicker />
        </Box>
        <Box sx={{ my: 2, display: 'flex', gap: 3 }}>
          <AvatarGroup
            size="sm"
            sx={{
              '& .MuiAvatar-root': {
                '&:hover': {
                  boxShadow: 'var(--Avatar-ring), var(--joy-shadow-md)',
                  transform: 'translateY(-2px)',
                },
              },
            }}
          >
            <Avatar src="/static/images/avatar/1.jpg" />
            <Avatar src="/static/images/avatar/2.jpg" />
            <Avatar src="/static/images/avatar/3.jpg" />
            <Avatar>+3</Avatar>
          </AvatarGroup>
          <AvatarGroup sx={{ flexDirection: 'row-reverse' }}>
            <Avatar>+3</Avatar>
            <Avatar src="/static/images/avatar/1.jpg" />
            <Avatar src="/static/images/avatar/2.jpg" />
            <Avatar src="/static/images/avatar/3.jpg" />
          </AvatarGroup>
          <AvatarGroup size="lg" sx={{ '--AvatarGroup-gap': '-0.5rem' }}>
            <Avatar src="/static/images/avatar/1.jpg" />
            <Avatar src="/static/images/avatar/2.jpg" />
            <Avatar src="/static/images/avatar/3.jpg" />
            <Avatar>+3</Avatar>
          </AvatarGroup>
          <AvatarGroup sx={{ writingMode: 'vertical-rl' }}>
            <Avatar src="/static/images/avatar/1.jpg" />
            <Avatar src="/static/images/avatar/2.jpg" />
            <Avatar src="/static/images/avatar/3.jpg" />
            <Avatar sx={{ transform: 'rotate(-90deg)' }}>+3</Avatar>
          </AvatarGroup>
          <AvatarGroup sx={{ flexDirection: 'row-reverse', writingMode: 'vertical-rl' }}>
            <Avatar sx={{ transform: 'rotate(-90deg)' }}>+3</Avatar>
            <Avatar src="/static/images/avatar/1.jpg" />
            <Avatar src="/static/images/avatar/2.jpg" />
            <Avatar src="/static/images/avatar/3.jpg" />
          </AvatarGroup>
        </Box>
        <Box sx={{ my: 2, display: 'flex', gap: 3 }}>
          <AvatarGroup variant="outlined">
            <Avatar src="/static/images/avatar/1.jpg" />
            <Avatar src="/static/images/avatar/2.jpg" />
            <Avatar src="/static/images/avatar/3.jpg" />
            <Avatar sx={{ bgcolor: 'background.level1' }}>+3</Avatar>
          </AvatarGroup>
          <AvatarGroup variant="solid">
            <Avatar src="/static/images/avatar/1.jpg" />
            <Avatar src="/static/images/avatar/2.jpg" />
            <Avatar src="/static/images/avatar/3.jpg" />
            <Avatar>+3</Avatar>
          </AvatarGroup>
        </Box>
        <Box sx={{ my: 2, display: 'flex', gap: 3 }}>
          <AvatarGroup>
            <Avatar src="/static/images/avatar/1.jpg" />
            <Avatar src="/static/images/avatar/2.jpg" />
            <Avatar src="/static/images/avatar/3.jpg" />
            <IconButton
              color="neutral"
              onClick={() => alert('clicked')}
              sx={{
                borderRadius: '50%',
                marginInlineStart: 'var(--Avatar-marginInlineStart)',
                boxShadow: 'var(--Avatar-ring)',
              }}
            >
              <MoreVert />
            </IconButton>
          </AvatarGroup>
          <AvatarGroup variant="solid">
            <Avatar src="/static/images/avatar/1.jpg" />
            <Avatar src="/static/images/avatar/2.jpg" />
            <Avatar src="/static/images/avatar/3.jpg" />
            <Avatar
              onMouseEnter={(event) => setAnchorEl(event.currentTarget)}
              onMouseLeave={() => setAnchorEl(null)}
            >
              <Mouse />
              <PopperUnstyled
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                disablePortal
                placement="right-start"
                style={{ zIndex: 1 }}
              >
                <Sheet
                  variant="outlined"
                  sx={{ mx: 0.5, py: 1, borderRadius: 'xs', minWidth: 160, boxShadow: 'md' }}
                >
                  <List size="sm" sx={{ '--List-item-paddingLeft': '0.5rem', '--List-gap': '0px' }}>
                    <ListItem>
                      <ListItemButton>Show all</ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton>Add more people</ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton>Go to settings</ListItemButton>
                    </ListItem>
                  </List>
                </Sheet>
              </PopperUnstyled>
            </Avatar>
          </AvatarGroup>
        </Box>
        <Box sx={{ my: 2, display: 'flex', gap: 3 }}>
          <Sheet variant="soft" sx={{ p: 2 }}>
            <AvatarGroup>
              <Avatar src="/static/images/avatar/1.jpg" />
              <Avatar src="/static/images/avatar/2.jpg" />
              <Avatar src="/static/images/avatar/3.jpg" />
              <IconButton
                color="neutral"
                onClick={() => alert('clicked')}
                sx={{
                  borderRadius: '50%',
                  marginInlineStart: 'var(--Avatar-marginInlineStart)',
                  boxShadow: 'var(--Avatar-ring)',
                }}
              >
                <MoreVert />
              </IconButton>
            </AvatarGroup>
          </Sheet>
          <Sheet variant="solid" color="danger" sx={{ p: 2 }}>
            <AvatarGroup>
              <Avatar src="/static/images/avatar/1.jpg" />
              <Avatar src="/static/images/avatar/2.jpg" />
              <Avatar src="/static/images/avatar/3.jpg" />
              <Avatar>+99</Avatar>
            </AvatarGroup>
          </Sheet>
          <Sheet variant="solid" color="primary" sx={{ p: 2 }}>
            <AvatarGroup
              size="sm"
              sx={{ '--Avatar-ringColor': 'var(--joy-palette-primary-outlinedBorder)' }}
            >
              <Avatar src="/static/images/avatar/1.jpg" />
              <Avatar src="/static/images/avatar/2.jpg" />
              <Avatar src="/static/images/avatar/3.jpg" />
              <Avatar>+99</Avatar>
            </AvatarGroup>
          </Sheet>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {Object.entries(props).map(([propName, propValue]) => (
            <Box
              key={propName}
              sx={{ display: 'flex', flexDirection: 'column', gap: 5, p: 2, alignItems: 'center' }}
            >
              <Typography sx={{ textDecoration: 'underline' }}>{propName}</Typography>
              {propValue.map((value) => (
                <Box
                  key={value}
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <Avatar {...{ [propName]: value }} />
                  {value && (
                    <Typography level="body3" sx={{ textAlign: 'center', mt: '4px' }}>
                      {value}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
