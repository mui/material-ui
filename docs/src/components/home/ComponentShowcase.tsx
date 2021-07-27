import * as React from 'react';
import { ThemeProvider, createTheme, ThemeOptions } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import ContentCopyRounded from '@material-ui/icons/ContentCopyRounded';
import CodeRounded from '@material-ui/icons/CodeRounded';
// import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import brandingTheme, { brandingDesignTokens } from 'docs/src/modules/brandingTheme';
import ReplayRounded from '@material-ui/icons/ReplayRounded';
import { useTimeframes, getMaterialThemeFrames, produceThemeOptions } from './showcase';

const darkBrandingTheme = createTheme({
  ...brandingDesignTokens,
  palette: {
    ...brandingDesignTokens.palette,
    background: {
      paper: brandingDesignTokens.palette.primary[900],
    },
    mode: 'dark',
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableTouchRipple: true,
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 40,
          padding: brandingTheme.spacing(0.5, 1),
        },
        sizeSmall: {
          fontSize: brandingTheme.typography.pxToRem(14),
          lineHeight: 21 / 14,
        },
        text: {
          color: brandingTheme.palette.grey[400],
        },
        outlined: {
          color: '#fff',
          backgroundColor: brandingTheme.palette.primary[700],
          borderColor: brandingTheme.palette.primary[500],
          '&:hover': {
            backgroundColor: brandingTheme.palette.primary[700],
          },
        },
      },
    },
  },
} as ThemeOptions);

const MaterialDesignDemo = () => {
  return (
    <Card elevation={4} sx={{ display: 'flex', p: 2 }}>
      <Avatar src="/static/images/avatar/1.jpg" variant="rounded" sx={{ mr: 2 }} />
      <div>
        <Typography component="div" variant="caption" color="text.secondary">
          Today at 09:40 AM
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
          <Typography component="div" mr={0.5} mb={0.5} fontWeight="bold">
            Merge pull request{' '}
            <Link href="/" underline="none">
              #2021
            </Link>{' '}
            from{' '}
          </Typography>
          <Chip
            size="small"
            label="mui-org/master"
            color="success"
            onClick={() => {}}
            sx={{ mb: 0.5 }}
          />
        </Box>
        <Typography component="div" variant="caption" mb={1.5} color="grey.800">
          Committed by{' '}
          <Link href="/" underline="none" fontWeight="bold">
            Olivier Tassinari
          </Link>
        </Typography>

        <Button variant="outlined" size="small" startIcon={<ContentCopyRounded />} sx={{ mr: 1 }}>
          i88jjd43
        </Button>
        <IconButton size="small">
          <CodeRounded fontSize="small" />
        </IconButton>
      </div>
    </Card>
  );
};

const defaultTheme = createTheme();

const ComponentShowcase = () => {
  const [customized, setCustomized] = React.useState(false);
  const [customTheme, setCustomTheme] = React.useState(createTheme());
  const themeFrames = React.useMemo(() => getMaterialThemeFrames(brandingTheme), []);
  const { frame, done, rerun } = useTimeframes({ run: customized, maxFrame: themeFrames.length });

  React.useEffect(() => {
    const themeOptions = produceThemeOptions(themeFrames, frame);
    setCustomTheme(createTheme(themeOptions));
  }, [frame, themeFrames]);
  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'grey.100',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          minHeight: 300,
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          '& *': {
            transition: '0.4s',
          },
        }}
      >
        <ThemeProvider theme={customized ? customTheme : defaultTheme}>
          <MaterialDesignDemo />
        </ThemeProvider>
      </Box>
      <ThemeProvider theme={darkBrandingTheme}>
        <Box
          borderRadius={'0 0 10px 10px'}
          p={2}
          m={'-1px'}
          bgcolor="background.paper"
          flexGrow={1}
        >
          <Box>
            <Button
              size="small"
              variant={customized ? 'text' : 'outlined'}
              onClick={() => setCustomized(false)}
            >
              Material Design
            </Button>
            <Button
              size="small"
              variant={customized ? 'outlined' : 'text'}
              onClick={() => (done ? rerun() : setCustomized(true))}
              startIcon={done ? <ReplayRounded /> : null}
              sx={{ ml: 1 }}
            >
              {(() => {
                if (done) return 'Rerun';
                if (customized) return 'Customizing...';
                return 'Custom Theme';
              })()}
            </Button>
          </Box>
          {/* <Box position="relative">

            <Box
              height={21 * 5}
              width="100%"
              bgcolor="primary.200"
              position="absolute"
              left={0}
              top={20 + 21 * 6}
              sx={{ opacity: 0.3, pointerEvents: 'none' }}
            />
          </Box> */}
        </Box>
      </ThemeProvider>
    </Paper>
  );
};

export default ComponentShowcase;
