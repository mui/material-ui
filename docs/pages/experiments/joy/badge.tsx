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
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import * as React from 'react';

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
  variant: ['contained', 'outlined', 'light'],
} as const;

const InvisibleBadgeButton = () => {
  const [invisible, setInvisible] = React.useState(true);
  return (
    <Badge badgeContent={1} invisible={invisible}>
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
              <Badge badgeContent={100} size="lg" color={color} location="inside">
                <Sheet
                  variant="contained"
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
          }}
        >
          <Sheet
            color="success"
            variant="contained"
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
            {[
              { badgeContent: '1', name: 'Jon Doe' },
              { badgeContent: '2', name: 'Benny' },
              { badgeContent: '3', name: 'Jun' },
            ].map(({ badgeContent, name }) => (
              <Badge
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
                    <IconButton size="sm" variant="text" color="danger" sx={{ mx: 1 }}>
                      <Favorite />
                    </IconButton>
                  </Badge>
                  <IconButton size="sm" variant="text" color="neutral" sx={{ mx: 1 }}>
                    <Share />
                  </IconButton>
                  <IconButton size="sm" variant="text" color="neutral" sx={{ mx: 1 }}>
                    <MoreHoriz />
                  </IconButton>
                </Sheet>
              </Badge>
            ))}
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
