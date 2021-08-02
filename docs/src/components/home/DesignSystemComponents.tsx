import * as React from 'react';
import {
  styled,
  createTheme,
  ThemeProvider,
  useTheme,
  Theme,
  ThemeOptions,
} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/core/Alert';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Tabs from '@material-ui/core/Tabs';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ShoppingCartRounded from '@material-ui/icons/ShoppingCartRounded';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import GradientText from 'docs/src/components/typography/GradientText';

import CheckCircleRounded from '@material-ui/icons/CheckCircleRounded';
import MailRounded from '@material-ui/icons/MailRounded';
import VerifiedUserRounded from '@material-ui/icons/VerifiedUserRounded';
import HelpCenterRounded from '@material-ui/icons/HelpCenterRounded';

const Grid = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.grey[50],
  // borderColor: theme.palette.divider,
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridAutoRows: '240px',
  [theme.breakpoints.up('sm')]: {
    paddingTop: 1,
    gridTemplateColumns: '1fr 1fr',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
  '& > div': {
    padding: theme.spacing(2),
    alignSelf: 'stretch',
    border: '1px solid',
    borderColor: theme.palette.divider,
    '&:last-of-type': {
      backgroundColor: theme.palette.background.default,
    },
    [theme.breakpoints.only('xs')]: {
      '&:first-of-type': {
        borderTopLeftRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius,
      },
      '&:last-of-type': {
        borderBottomLeftRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
        borderStyle: 'dashed',
      },
      '&:not(:first-of-type)': {
        marginTop: -1,
      },
    },
    [theme.breakpoints.only('sm')]: {
      marginTop: -1,
      '&:first-of-type': {
        borderTopLeftRadius: theme.shape.borderRadius,
      },
      '&:last-of-type': {
        borderBottomRightRadius: theme.shape.borderRadius,
        borderStyle: 'dashed',
      },
      '&:nth-of-type(even)': {
        marginLeft: -1,
      },
      '&:nth-last-of-type(2)': {
        borderBottomLeftRadius: theme.shape.borderRadius,
      },
      '&:nth-of-type(2)': {
        borderTopRightRadius: theme.shape.borderRadius,
      },
    },
    [theme.breakpoints.up('md')]: {
      marginTop: -1,
      '&:not(:nth-of-type(3n + 1))': {
        marginLeft: -1,
      },
      '&:first-of-type': {
        borderTopLeftRadius: theme.shape.borderRadius,
      },
      '&:last-of-type': {
        borderBottomRightRadius: theme.shape.borderRadius,
        borderStyle: 'dashed',
      },
      '&:nth-last-of-type(3)': {
        borderBottomLeftRadius: theme.shape.borderRadius,
      },
      '&:nth-of-type(3)': {
        borderTopRightRadius: theme.shape.borderRadius,
      },
    },
  },
}));

function Demo({
  name,
  children,
  control,
  ...props
}: {
  name: string;
  theme: Theme;
  children: React.ReactElement;
  control?: { prop: string; values: Array<string>; defaultValue?: string };
}) {
  const [propValue, setPropValue] = React.useState(
    control ? control.defaultValue || control.values[0] : '',
  );
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {control ? (
        <Box sx={{ minHeight: 40, ml: -1, mt: -1 }}>
          <Tabs
            value={propValue}
            onChange={(event, value) => setPropValue(value)}
            sx={{
              minHeight: 'initial',
              '& .MuiTabs-indicator': {
                bgcolor: 'transparent',
                '&:before': {
                  height: '100%',
                  content: '""',
                  display: 'block',
                  width: (theme) => `calc(100% - ${theme.spacing(2)})`,
                  bgcolor: 'primary.main',
                  position: 'absolute',
                  top: 0,
                  left: (theme) => theme.spacing(1),
                },
              },
              '& .MuiTab-root': {
                px: 1,
                pt: 0.5,
                minWidth: 'initial',
                minHeight: 'initial',
                fontWeight: 'medium',
              },
            }}
          >
            {control.values.map((value) => (
              <Tab key={value} value={value} label={value} />
            ))}
          </Tabs>
        </Box>
      ) : null}
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ThemeProvider theme={props.theme}>
          {React.cloneElement(children, {
            ...(control && {
              [control.prop]: propValue,
            }),
          })}
        </ThemeProvider>
      </Box>
      <Typography fontWeight="bold" variant="body2">
        {name}
      </Typography>
    </Box>
  );
}

const StyledChip = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  transition: 'none',
  '&.MuiChip-outlined': {
    border: 'none',
    color: theme.palette.text.secondary,
  },
  '&.MuiChip-clickable:active': {
    boxShadow: 'none',
  },
  '&.MuiChip-filled': {
    border: '1px solid',
    borderColor: theme.palette.primary[300],
  },
}));

function buildTheme(theme: Theme): ThemeOptions {
  return {
    palette: {
      ...theme.palette,
      primary: {
        ...theme.palette.primaryDark,
        main: theme.palette.primaryDark[800],
      },
      grey: theme.palette.grey,
      info: {
        main: theme.palette.primaryDark[600],
      },
    },
    shape: {
      borderRadius: 10,
    },
    spacing: 10,
    typography: {
      ...theme.typography,
      button: {
        ...theme.typography.button,
        fontSize: '1rem',
        lineHeight: 24 / 16,
      },
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true,
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          text: {
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[100]
                : theme.palette.primaryDark[800],
          },
          sizeMedium: {
            padding: theme.spacing(1, 2),
          },
          sizeLarge: {
            padding: theme.spacing(1.5, 2.5),
            fontSize: '1rem',
            lineHeight: 24 / 16,
          },
          iconSizeSmall: {
            '& > *:nth-of-type(1)': {
              fontSize: 16,
            },
          },
          iconSizeMedium: {
            '& > *:nth-of-type(1)': {
              fontSize: 16,
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            padding: theme.spacing(2),
          },
          message: {
            padding: 0,
            fontWeight: 600,
          },
          standardInfo: {
            backgroundColor: theme.palette.primaryDark[100],
            color: theme.palette.primaryDark[600],
            '& .MuiAlert-icon': {
              color: theme.palette.primaryDark[600],
            },
          },
          icon: {
            paddingTop: 1,
            paddingBottom: 0,
            '& > *': {
              fontSize: 18,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputLabel-outlined.Mui-focused': {
              color:
                theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[800],
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primary[500]
                  : theme.palette.primaryDark[800],
            },
            '& .MuiOutlinedInput-input': {
              backgroundColor:
                theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : '#fff',
              borderRadius: theme.spacing(1),
              borderColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[400]
                  : theme.palette.grey[300],
            },
            '& .MuiInputBase-input': {
              fontWeight: 600,
            },
            '& .MuiFilledInput-root': {
              backgroundColor:
                theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : '#fff',
              '&:after': {
                borderColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary[500]
                    : theme.palette.primaryDark[800],
              },
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : '#fff',
              },
            },
            '& .MuiInputLabel-filled.Mui-focused': {
              color:
                theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[800],
            },
            '& .MuiInput-root.Mui-focused': {
              '&:after': {
                borderColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary[500]
                    : theme.palette.primaryDark[800],
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color:
                theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[800],
            },
          },
        },
      },
      MuiTableCell: theme.components?.MuiTableCell,
      MuiPopover: {
        styleOverrides: {
          paper: {
            boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.1)',
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          list: {
            padding: theme.spacing(1, 0),
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            padding: theme.spacing(1, 2),
            '& svg': {
              fontSize: 18,
              color: theme.palette.primaryDark[400],
            },
          },
        },
      },
    },
  };
}

const DesignSystemComponents = () => {
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const [customized, setCustomized] = React.useState(false);
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  const [theme, setTheme] = React.useState(createTheme({ palette: { mode } }));
  React.useEffect(() => {
    setTheme(createTheme(customized ? buildTheme(globalTheme) : { palette: { mode } }));
  }, [mode, customized, globalTheme]);
  return (
    <Container sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <Typography variant="body2" color="primary" fontWeight="bold">
        What do you get?
      </Typography>
      <Typography variant="h2" sx={{ mt: 1, mb: { xs: 2, sm: 4 }, maxWidth: 500 }}>
        Simple, accessible, declarative <GradientText>components</GradientText>.
      </Typography>
      <Box sx={{ mt: { xs: 2, md: 4 }, mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <StyledChip
          color="primary"
          label="Custom Theme"
          size="small"
          variant={customized ? 'filled' : 'outlined'}
          onClick={() => setCustomized(true)}
        />
        <StyledChip
          color="primary"
          label="Material Design"
          size="small"
          variant={!customized ? 'filled' : 'outlined'}
          onClick={() => setCustomized(false)}
          sx={{ ml: 1 }}
        />
      </Box>
      <Grid>
        <div>
          <Demo
            theme={theme}
            name="Button"
            control={{ prop: 'size', values: ['small', 'medium', 'large'], defaultValue: 'medium' }}
          >
            <Button variant="contained" startIcon={<ShoppingCartRounded />}>
              Add to Cart
            </Button>
          </Demo>
        </div>
        <div>
          <Demo
            theme={theme}
            name="Alert"
            control={{ prop: 'variant', values: ['standard', 'filled', 'outlined'] }}
          >
            <Alert color="info" icon={<CheckCircleRounded />}>
              Check out this alert!
            </Alert>
          </Demo>
        </div>
        <div>
          <Demo
            theme={theme}
            name="Text Field"
            control={{ prop: 'variant', values: ['outlined', 'standard', 'filled'] }}
          >
            <TextField label="Basement" defaultValue="Ultraviolet" />
          </Demo>
        </div>
        <div>
          <Demo theme={theme} name="Menu">
            <React.Fragment>
              <Button onClick={(event) => setAnchor(event.target as HTMLElement)}>
                Click to open
              </Button>
              <Menu
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={() => setAnchor(null)}
                PaperProps={{ variant: 'outlined' }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <MailRounded />
                  </ListItemIcon>
                  Contact
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <VerifiedUserRounded />
                  </ListItemIcon>
                  Security
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <HelpCenterRounded />
                  </ListItemIcon>
                  About us
                </MenuItem>
              </Menu>
            </React.Fragment>
          </Demo>
        </div>
        <div>
          <Demo theme={theme} name="Table">
            <TableContainer
              component={Paper}
              variant="outlined"
              sx={{
                '& .MuiTableBody-root > .MuiTableRow-root:last-of-type > .MuiTableCell-root': {
                  borderBottomWidth: 0,
                },
              }}
            >
              <Table aria-label="demo table">
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert</TableCell>
                    <TableCell>Calories</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Frozen yoghurt</TableCell>
                    <TableCell>109</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cupcake</TableCell>
                    <TableCell>305</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Demo>
        </div>
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
            Want more components?
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 0.5, maxWidth: 250, mx: 'auto' }}
          >
            Check the documentation to see the detais of every component!
          </Typography>
          <Button endIcon={<KeyboardArrowRightRounded />}>Get Started</Button>
        </Box>
      </Grid>
    </Container>
  );
};

export default DesignSystemComponents;
