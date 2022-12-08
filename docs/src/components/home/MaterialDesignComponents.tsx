import * as React from 'react';
import { deepmerge } from '@mui/utils';
import {
  styled,
  createTheme,
  ThemeProvider,
  useTheme,
  Theme,
  ThemeOptions,
  alpha,
} from '@mui/material/styles';
import { capitalize } from '@mui/material/utils';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ShoppingCartRounded from '@mui/icons-material/ShoppingCartRounded';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import MailRounded from '@mui/icons-material/MailRounded';
import VerifiedUserRounded from '@mui/icons-material/VerifiedUserRounded';
import HelpCenterRounded from '@mui/icons-material/HelpCenterRounded';
import ROUTES from 'docs/src/route';
import Link from 'docs/src/modules/components/Link';

const Grid = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.background.paper
      : alpha(theme.palette.grey[50], 0.4),
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridAutoRows: 240,
  [theme.breakpoints.up('sm')]: {
    gridAutoRows: 260,
    paddingTop: 1,
    gridTemplateColumns: '1fr 1fr',
  },
  [theme.breakpoints.up('md')]: {
    gridAutoRows: 280,
    gridTemplateColumns: '1fr 1fr 1fr',
  },
  '& > div': {
    padding: theme.spacing(2),
    alignSelf: 'stretch',
    border: '1px solid',
    borderColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.primaryDark[600], 0.3)
        : theme.palette.grey[200],
    [theme.breakpoints.only('xs')]: {
      '&:first-of-type': {
        borderTopLeftRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius,
      },
      '&:last-of-type': {
        borderBottomLeftRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
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
              <Tab key={value} value={value} label={capitalize(value)} />
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
      <Typography fontWeight="semiBold" variant="body2">
        {name}
      </Typography>
    </Box>
  );
}

const StyledChip = styled(Chip)(({ theme }) => ({
  fontWeight: 700,
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
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.primary[700] : theme.palette.primary[500],
    color: '#fff',
  },
}));

export function buildTheme(theme: Theme): ThemeOptions {
  return {
    palette: {
      ...theme.palette,
      primary: {
        ...theme.palette.primaryDark,
        main:
          theme.palette.mode === 'dark'
            ? theme.palette.primaryDark[500]
            : theme.palette.primaryDark[800],
      },
      grey: theme.palette.grey,
      info: {
        main: theme.palette.primaryDark[600],
      },
      background: {
        paper: theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : '#fff',
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
        fontSize: '0.875rem',
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
          root: {
            borderRadius: '99px',
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: 24 / 16,
          },
          sizeSmall: {
            padding: theme.spacing(0.5, 1),
          },
          sizeMedium: {
            padding: theme.spacing(0.8, 2),
          },
          sizeLarge: {
            padding: theme.spacing(1, 2),
            fontSize: '1rem',
          },
          contained: {
            color: theme.palette.primaryDark[50],
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[400]
                : theme.palette.primaryDark[600],
          },
          iconSizeSmall: {
            '& > *:nth-of-type(1)': {
              fontSize: '0.875rem',
            },
          },
          iconSizeMedium: {
            '& > *:nth-of-type(1)': {
              fontSize: '0.875rem',
            },
          },
          iconSizeLarge: {
            '& > *:nth-of-type(1)': {
              fontSize: '1rem',
            },
          },
        },
      },
      MuiAlert: {
        defaultProps: {
          icon: <CheckCircleRounded />,
        },
        styleOverrides: {
          root: {
            padding: theme.spacing(2),
            '& .MuiAlert-icon': {
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[100]
                  : theme.palette.primaryDark[800],
            },
          },
          filled: {
            color: theme.palette.primaryDark[50],
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[500]
                : theme.palette.primaryDark[700],
            '& .MuiAlert-icon': {
              color: theme.palette.primary[50],
            },
          },
          outlined: {
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[50]
                : theme.palette.primaryDark[700],
            backgroundColor:
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.primaryDark[700], 0.5)
                : alpha(theme.palette.primaryDark[50], 0.5),
            borderColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[500]
                : theme.palette.primaryDark[300],
            '& .MuiAlert-icon': {
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[100]
                  : theme.palette.primaryDark[800],
            },
          },
          message: {
            padding: 0,
            fontWeight: 500,
          },
          standardInfo: {
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[900]
                : theme.palette.primaryDark[50],
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[50]
                : theme.palette.primaryDark[700],
            border: '1px solid',
            borderColor:
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.primaryDark[500], 0.5)
                : theme.palette.primaryDark[100],
            '& .MuiAlert-icon': {
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[50]
                  : theme.palette.primaryDark[700],
            },
          },
          icon: {
            paddingTop: 1,
            paddingBottom: 0,
            '& > svg': {
              fontSize: '1.125rem',
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
              fontWeight: 700,
            },
            '& .MuiFilledInput-root': {
              backgroundColor:
                theme.palette.mode === 'dark' ? theme.palette.primaryDark[600] : '#fff',
              '&:after': {
                borderColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary[500]
                    : theme.palette.primaryDark[800],
              },
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark' ? theme.palette.primaryDark[500] : '#fff',
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
                    ? theme.palette.primaryDark[500]
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
      MuiTooltip: theme.components?.MuiTooltip,
      MuiPaper: theme.components?.MuiPaper,
      MuiTableCell: deepmerge(theme.components?.MuiTableCell, {
        styleOverrides: {
          root: {
            borderColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[400]
                : theme.palette.divider,
          },
        },
      }),
      MuiPopover: {
        styleOverrides: {
          paper: {
            boxShadow: `0px 4px 20px ${
              theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(170, 180, 190, 0.3)'
            }`,
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
              fontSize: '1.125rem',
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.primary[300]
                  : theme.palette.primaryDark[400],
            },
          },
        },
      },
    },
  };
}

export default function MaterialDesignComponents() {
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const [customized, setCustomized] = React.useState(false);
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  const [theme, setTheme] = React.useState(createTheme({ palette: { mode } }));
  React.useEffect(() => {
    setTheme(createTheme(customized ? buildTheme(globalTheme) : { palette: { mode } }));
  }, [mode, customized, globalTheme]);
  return (
    <div>
      <Box
        sx={{
          mt: { xs: 2, md: 4 },
          mb: 2,
          display: 'flex',
          justifyContent: { sm: 'flex-start', md: 'flex-end' },
        }}
      >
        <StyledChip
          color="primary"
          label="Material Design"
          size="small"
          variant={!customized ? 'filled' : 'outlined'}
          onClick={() => setCustomized(false)}
        />
        <StyledChip
          color="primary"
          label="Custom Theme"
          size="small"
          variant={customized ? 'filled' : 'outlined'}
          onClick={() => setCustomized(true)}
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
            <Alert color="info">Check out this alert!</Alert>
          </Demo>
        </div>
        <div>
          <Demo
            theme={theme}
            name="Text Field"
            control={{ prop: 'variant', values: ['outlined', 'standard', 'filled'] }}
          >
            <TextField id="material-design-textfield" label="Username" defaultValue="Ultraviolet" />
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
            Want to see more?
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 0.5, maxWidth: 250, mx: 'auto' }}
          >
            Check out the docs for details of the complete library.
          </Typography>
          <Button
            component={Link}
            noLinkStyle
            href={ROUTES.documentation}
            endIcon={<KeyboardArrowRightRounded />}
          >
            Learn more
          </Button>
        </Box>
      </Grid>
    </div>
  );
}
