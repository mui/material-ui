import * as React from 'react';
import Moon from '@mui/icons-material/DarkMode';
import Favorite from '@mui/icons-material/Favorite';
import Sun from '@mui/icons-material/LightMode';
import MailIcon from '@mui/icons-material/Mail';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import Share from '@mui/icons-material/Share';
import Avatar from '@mui/joy/Avatar';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import Redeem from '@mui/icons-material/Redeem';
import Notifications from '@mui/icons-material/Notifications';
import ViewCompact from '@mui/icons-material/ViewCompact';
import ViewKanban from '@mui/icons-material/ViewKanban';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';

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

const InvisibleBadgeButton = () => {
  const [invisible, setInvisible] = React.useState(true);
  return (
    <Badge badgeContent={1} invisible={invisible} sx={{ '--Badge-radius': '4px' }}>
      <IconButton onClick={() => setInvisible((bool) => !bool)}>
        <MailIcon />
      </IconButton>
    </Badge>
  );
};

const InvisibleBadgeIcon = () => {
  const [invisible, setInvisible] = React.useState(true);
  return (
    <IconButton onClick={() => setInvisible((bool) => !bool)}>
      <Badge badgeContent={1} invisible={invisible} color="danger">
        <MailIcon />
      </Badge>
    </IconButton>
  );
};

export default function JoyBadge() {
  return (
    <CssVarsProvider>
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ px: 3 }}>
          <ColorSchemePicker />
        </Box>
        {/* Examples */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, mt: 5 }}>
          {(['primary', 'danger', 'info', 'success', 'warning', 'neutral'] as const).map(
            (color) => (
              <Badge key={color} badgeContent={100} size="lg" color={color}>
                <Sheet
                  variant="solid"
                  color={color}
                  sx={{ width: 70, height: 70, borderRadius: 35, opacity: 0.8 }}
                />
              </Badge>
            ),
          )}
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Sheet
            color="success"
            variant="solid"
            sx={{
              borderRadius: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              mt: 5,
              p: 3,
              alignItems: 'center',
            }}
          >
            {[{ badgeContent: '1', name: 'Jon Doe' }].map(({ badgeContent, name }) => (
              <Badge
                key={name}
                badgeContent={badgeContent}
                size="lg"
                color={'success'}
                sx={{ width: '100%' }}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              >
                <Sheet
                  variant="outlined"
                  color={'success'}
                  sx={{
                    width: '100%',
                    height: 70,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    pl: 3,
                    backgroundColor: 'var(--joy-palette-background-level1)',
                  }}
                >
                  <Avatar size="lg" src={`/static/images/avatar/${badgeContent}.jpg`} />
                  <Typography
                    level="body1"
                    sx={{ m: 2, color: 'var(--joy-palette-success-textColor)' }}
                  >
                    {name}
                  </Typography>
                  <Badge max={1000} badgeContent={200} color="danger" sx={{ ml: 'auto', mr: 1 }}>
                    <IconButton size="sm" variant="plain" color="danger" sx={{ mx: 1 }}>
                      <Favorite />
                    </IconButton>
                  </Badge>
                  <IconButton size="sm" variant="plain" color="neutral" sx={{ mx: 1 }}>
                    <Share />
                  </IconButton>
                  <IconButton size="sm" variant="plain" color="neutral" sx={{ mx: 1 }}>
                    <MoreHoriz />
                  </IconButton>
                </Sheet>
              </Badge>
            ))}
          </Sheet>
          <Sheet
            sx={{
              bgcolor: 'background.level1',
              '--Badge-ringColor': (theme) => theme.vars.palette.background.level1,
            }}
          >
            <List row sx={{ '--List-gap': '0px' }} size="sm">
              <ListItem>
                <IconButton variant="plain" color="neutral">
                  <Badge color="danger" size="sm">
                    <Redeem />
                  </Badge>
                </IconButton>
              </ListItem>
              <ListItem>
                <IconButton variant="plain" color="neutral">
                  <Badge badgeContent="23" color="danger" size="sm">
                    <Notifications />
                  </Badge>
                </IconButton>
              </ListItem>
              <ListItem>
                <Badge
                  color="success"
                  size="sm"
                  badgeInset="20%"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  sx={{ px: 1 }}
                >
                  <Avatar size="sm" src="/static/images/avatar/1.jpg" />
                </Badge>
              </ListItem>
            </List>
          </Sheet>
          <Sheet>
            <List
              row
              size="sm"
              sx={{
                '--List-decorator-width': '1.5rem',
                '--List-gap': '1rem',
                '--List-item-radius': '8px',
              }}
            >
              <ListItem>
                <ListItemDecorator>
                  <ViewCompact />
                </ListItemDecorator>
                Backlog
                <Badge size="sm" badgeInset="12%" sx={{ alignSelf: 'center', ml: 1 }}>
                  <IconButton
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    sx={{ '--IconButton-size': '20px' }}
                  >
                    <ArrowDropDown />
                  </IconButton>
                </Badge>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemDecorator>
                    <ViewKanban />
                  </ListItemDecorator>
                  <Badge size="sm" badgeInset="2px -3px">
                    View 2
                  </Badge>
                </ListItemButton>
              </ListItem>
            </List>
          </Sheet>
        </Box>
        {/* Props */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, mt: 10 }}>
          {Object.entries(props).map(([propName, propValue]) => (
            <Box
              key={propName}
              sx={{ display: 'flex', flexDirection: 'column', gap: 5, p: 2, alignItems: 'center' }}
            >
              <Typography sx={{ textDecoration: 'underline' }}>{propName}</Typography>
              {propValue.map((value, index) => (
                <Box
                  key={`${index}-${value}`}
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <Badge badgeContent={1} {...{ [propName]: value }}>
                    <MailIcon />
                  </Badge>
                  {value !== undefined && (
                    <Typography level="body3" sx={{ textAlign: 'center', mt: '4px' }}>
                      {`${value}`}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ))}
          <Box
            key={'anchorOrigin'}
            sx={{ display: 'flex', flexDirection: 'column', gap: 5, p: 2, alignItems: 'center' }}
          >
            <Typography sx={{ textDecoration: 'underline' }}>{'anchorOrigin'}</Typography>
            {(
              [
                { vertical: 'top', horizontal: 'right' },
                { vertical: 'top', horizontal: 'left' },
                { vertical: 'bottom', horizontal: 'right' },
                { vertical: 'bottom', horizontal: 'left' },
              ] as const
            ).map((value, index) => (
              <Box
                key={index}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <Badge
                  badgeContent={1}
                  anchorOrigin={{ vertical: value.vertical, horizontal: value.horizontal }}
                >
                  <MailIcon />
                </Badge>
                {value !== undefined && (
                  <Typography level="body3" sx={{ textAlign: 'center', mt: '10px' }}>
                    {`vertical: ${value.vertical}, horizontal: ${value.horizontal}`}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 5, p: 2, alignItems: 'center' }}
          >
            <Typography sx={{ textDecoration: 'underline' }}>Invisible</Typography>
            <InvisibleBadgeIcon />
            <InvisibleBadgeButton />
          </Box>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 5, p: 2, alignItems: 'center' }}
          >
            <Typography sx={{ textDecoration: 'underline' }}>Dot</Typography>
            <Badge color="success" size="sm">
              <MailIcon />
            </Badge>
            <Badge color="success">
              <MailIcon />
            </Badge>
            <Badge color="success" size="lg">
              <MailIcon />
            </Badge>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
