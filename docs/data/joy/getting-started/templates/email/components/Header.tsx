import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Avatar from '@mui/joy/Avatar';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

// Icons import
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="soft"
      color="neutral"
      sx={{ alignSelf: 'center' }}
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between',
      }}
    >
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
        <IconButton
          size="md"
          variant="outlined"
          color="neutral"
          sx={{
            display: { xs: 'none', sm: 'inline-flex' },
            borderRadius: '50%',
          }}
        >
          <LanguageRoundedIcon />
        </IconButton>
        <Button
          variant="plain"
          color="neutral"
          aria-pressed="true"
          component="a"
          href="/joy-ui/getting-started/templates/email/"
        >
          Email
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/team/"
        >
          Team
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/files/"
        >
          File
        </Button>
      </Stack>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
        <Input
          size="sm"
          variant="outlined"
          placeholder="Search anything…"
          startDecorator={<SearchRoundedIcon color="primary" />}
          endDecorator={
            <IconButton
              variant="outlined"
              color="neutral"
              sx={{ bgcolor: 'background.level1' }}
            >
              <Typography level="title-sm" textColor="text.icon">
                ⌘ k
              </Typography>
            </IconButton>
          }
          sx={{
            alignSelf: 'center',
            display: {
              xs: 'none',
              sm: 'flex',
            },
          }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
        >
          <SearchRoundedIcon />
        </IconButton>

        <IconButton
          size="sm"
          variant="soft"
          color="neutral"
          component="a"
          href="/blog/first-look-at-joy/"
          sx={{ alignSelf: 'center' }}
        >
          <BookRoundedIcon />
        </IconButton>
        <ColorSchemeToggle />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            pl: 2,
            ml: 1,
            borderLeft: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Avatar
            src="https://i.pravatar.cc/40?img=2"
            srcSet="https://i.pravatar.cc/80?img=2"
            sx={{ borderRadius: '50%' }}
            size="sm"
          />
          <Box sx={{ ml: 2 }}>
            <Typography level="title-sm" textColor="text.primary">
              Rick Sanchez
            </Typography>
            <Typography level="body-xs" textColor="text.tertiary">
              rick@email.com
            </Typography>
          </Box>
          <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: 1 }}>
            <ExpandMoreRoundedIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
