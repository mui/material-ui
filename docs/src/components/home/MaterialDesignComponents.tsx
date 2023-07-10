import * as React from 'react';
import {
  styled,
  Theme,
  ThemeOptions,
  alpha,
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
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
import { getDesignTokens, getThemedComponents } from 'docs/src/modules/brandingTheme';

const Grid = styled('div')(({ theme }) => [
  {
    borderRadius: (theme.vars || theme).shape.borderRadius,
    backgroundColor: alpha(theme.palette.grey[50], 0.4),
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
      borderColor: (theme.vars || theme).palette.grey[200],
      [theme.breakpoints.only('xs')]: {
        '&:first-of-type': {
          borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
          borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
        },
        '&:last-of-type': {
          borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
          borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
        },
        '&:not(:first-of-type)': {
          marginTop: -1,
        },
      },
      [theme.breakpoints.only('sm')]: {
        marginTop: -1,
        '&:first-of-type': {
          borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
        },
        '&:last-of-type': {
          borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
          borderStyle: 'dashed',
        },
        '&:nth-of-type(even)': {
          marginLeft: -1,
        },
        '&:nth-last-of-type(2)': {
          borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
        },
        '&:nth-of-type(2)': {
          borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
        },
      },
      [theme.breakpoints.up('md')]: {
        marginTop: -1,
        '&:not(:nth-of-type(3n + 1))': {
          marginLeft: -1,
        },
        '&:first-of-type': {
          borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
        },
        '&:last-of-type': {
          borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
        },
        '&:nth-last-of-type(3)': {
          borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
        },
        '&:nth-of-type(3)': {
          borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
        },
      },
    },
  },
  theme.applyDarkStyles({
    backgroundColor: (theme.vars || theme).palette.background.paper,
    '& > div': {
      borderColor: alpha(theme.palette.primaryDark[600], 0.3),
    },
  }),
]);

function Demo({
  name,
  children,
  control,
  ...props
}: {
  name: string;
  theme: Theme | undefined;
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
      <Box
        className="mui-default-theme"
        sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <CssVarsProvider theme={props.theme}>
          {React.cloneElement(children, {
            ...(control && {
              [control.prop]: propValue,
            }),
          })}
        </CssVarsProvider>
      </Box>
      <Typography fontWeight="semiBold" variant="body2">
        {name}
      </Typography>
    </Box>
  );
}

const StyledChip = styled(Chip)(({ theme }) => [
  {
    fontWeight: 700,
    transition: 'none',
    '&.MuiChip-outlined': {
      border: 'none',
      color: (theme.vars || theme).palette.text.secondary,
    },
    '&.MuiChip-clickable:active': {
      boxShadow: 'none',
    },
    '&.MuiChip-filled': {
      border: '1px solid',
      borderColor: (theme.vars || theme).palette.primary[300],
      backgroundColor: (theme.vars || theme).palette.primary[500],
      color: '#fff',
    },
  },
  theme.applyDarkStyles({
    '&.MuiChip-filled': {
      backgroundColor: (theme.vars || theme).palette.primary[700],
    },
  }),
]);

const themedComponents = getThemedComponents();
export function buildTheme(): ThemeOptions {
  return {
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
          text: ({ theme }) =>
            theme.applyDarkStyles({
              color: 'rgba(255 255 255 / 0.72)',
              '&:hover': {
                color: '#fff',
              },
            }),
          root: {
            borderRadius: '99px',
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: 24 / 16,
          },
          sizeSmall: ({ theme }) => ({
            padding: theme.spacing(0.5, 1),
          }),
          sizeMedium: ({ theme }) => ({
            padding: theme.spacing(0.8, 2),
          }),
          sizeLarge: ({ theme }) => ({
            padding: theme.spacing(1, 2),
            fontSize: '1rem',
          }),
          contained: ({ theme }) => ({
            color: (theme.vars || theme).palette.primaryDark[50],
            backgroundColor: (theme.vars || theme).palette.primaryDark[600],
            ...theme.applyDarkStyles({
              backgroundColor: (theme.vars || theme).palette.primaryDark[400],
            }),
          }),
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
          root: ({ theme }) => [
            {
              padding: theme.spacing(2),
              '& .MuiAlert-icon': {
                color: (theme.vars || theme).palette.primaryDark[800],
              },
            },
            theme.applyDarkStyles({
              '& .MuiAlert-icon': {
                color: (theme.vars || theme).palette.primaryDark[100],
              },
            }),
          ],
          filled: ({ theme }) => ({
            color: (theme.vars || theme).palette.primaryDark[50],
            backgroundColor: (theme.vars || theme).palette.primaryDark[700],
            '& .MuiAlert-icon': {
              color: (theme.vars || theme).palette.primary[50],
            },
            ...theme.applyDarkStyles({
              backgroundColor: (theme.vars || theme).palette.primaryDark[500],
            }),
          }),
          outlined: ({ theme }) => [
            {
              color: (theme.vars || theme).palette.primaryDark[700],
              backgroundColor: alpha(theme.palette.primaryDark[50], 0.5),
              borderColor: (theme.vars || theme).palette.primaryDark[300],
              '& .MuiAlert-icon': {
                color: (theme.vars || theme).palette.primaryDark[800],
              },
            },
            theme.applyDarkStyles({
              color: (theme.vars || theme).palette.primaryDark[50],
              backgroundColor: alpha(theme.palette.primaryDark[700], 0.5),
              borderColor: (theme.vars || theme).palette.primaryDark[500],
              '& .MuiAlert-icon': {
                color: (theme.vars || theme).palette.primaryDark[100],
              },
            }),
          ],
          message: {
            padding: 0,
            fontWeight: 500,
          },
          standardInfo: ({ theme }) => [
            {
              backgroundColor: (theme.vars || theme).palette.primaryDark[50],
              color: (theme.vars || theme).palette.primaryDark[700],
              border: '1px solid',
              borderColor: (theme.vars || theme).palette.primaryDark[100],
              '& .MuiAlert-icon': {
                color: (theme.vars || theme).palette.primaryDark[700],
              },
            },
            theme.applyDarkStyles({
              backgroundColor: (theme.vars || theme).palette.primaryDark[900],
              color: (theme.vars || theme).palette.primaryDark[50],
              borderColor: alpha(theme.palette.primaryDark[500], 0.5),
              '& .MuiAlert-icon': {
                color: (theme.vars || theme).palette.primaryDark[50],
              },
            }),
          ],
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
          root: ({ theme }) => [
            {
              '& .MuiInputLabel-outlined.Mui-focused': {
                color: (theme.vars || theme).palette.grey[800],
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: (theme.vars || theme).palette.primaryDark[800],
              },
              '& .MuiOutlinedInput-input': {
                backgroundColor: '#fff',
                borderRadius: theme.spacing(1),
                borderColor: (theme.vars || theme).palette.grey[300],
              },
              '& .MuiInputBase-input': {
                fontWeight: 700,
              },
              '& .MuiFilledInput-root': {
                backgroundColor: '#fff',
                '&:after': {
                  borderColor: (theme.vars || theme).palette.primaryDark[800],
                },
                '&:hover': {
                  backgroundColor: '#fff',
                },
              },
              '& .MuiInputLabel-filled.Mui-focused': {
                color: (theme.vars || theme).palette.grey[800],
              },
              '& .MuiInput-root.Mui-focused': {
                '&:after': {
                  borderColor: (theme.vars || theme).palette.primaryDark[800],
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: (theme.vars || theme).palette.grey[800],
              },
            },
            theme.applyDarkStyles({
              '& .MuiInputLabel-outlined.Mui-focused': {
                color: (theme.vars || theme).palette.grey[500],
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: (theme.vars || theme).palette.primary[500],
              },
              '& .MuiOutlinedInput-input': {
                backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                borderColor: (theme.vars || theme).palette.primaryDark[400],
              },
              '& .MuiFilledInput-root': {
                backgroundColor: (theme.vars || theme).palette.primaryDark[600],
                '&:after': {
                  borderColor: (theme.vars || theme).palette.primary[500],
                },
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primaryDark[500],
                },
              },
              '& .MuiInputLabel-filled.Mui-focused': {
                color: (theme.vars || theme).palette.grey[500],
              },
              '& .MuiInput-root.Mui-focused': {
                '&:after': {
                  borderColor: (theme.vars || theme).palette.primaryDark[500],
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: (theme.vars || theme).palette.grey[500],
              },
            }),
          ],
        },
      },
      MuiTooltip: themedComponents.components?.MuiTooltip,
      MuiPaper: themedComponents.components?.MuiPaper,
      MuiTableCell: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor: (theme.vars || theme).palette.divider,
            ...theme.applyDarkStyles({
              borderColor: (theme.vars || theme).palette.primaryDark[400],
            }),
          }),
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: ({ theme }) => ({
            boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)',
            ...theme.applyDarkStyles({
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
            }),
          }),
        },
      },
      MuiMenu: {
        styleOverrides: {
          list: ({ theme }) => ({
            padding: theme.spacing(1, 0),
          }),
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: ({ theme }) => [
            {
              padding: theme.spacing(1, 2),
              '& svg': {
                fontSize: '1.125rem',
                color: (theme.vars || theme).palette.primaryDark[400],
              },
            },
            theme.applyDarkStyles({
              '& svg': {
                color: (theme.vars || theme).palette.primary[300],
              },
            }),
          ],
        },
      },
    },
  };
}

const { palette: lightPalette, typography, ...designTokens } = getDesignTokens('light');
const { palette: darkPalette } = getDesignTokens('dark');
export const customTheme = extendTheme({
  cssVarPrefix: 'muidocs',
  colorSchemes: {
    light: {
      palette: lightPalette,
    },
    dark: {
      palette: darkPalette,
    },
  },
  ...designTokens,
  ...buildTheme(),
});

export default function MaterialDesignComponents() {
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const [customized, setCustomized] = React.useState(false);
  const theme = customized ? customTheme : undefined;
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
                PaperProps={{ variant: 'outlined', elevation: 0 }}
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
