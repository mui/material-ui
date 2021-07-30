import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/core/Alert';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
}: {
  name: string;
  children: React.ReactElement;
  control?: { prop: string; values: Array<string> };
}) {
  const [propValue, setPropValue] = React.useState(control ? control.values[0] : '');
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
        {React.cloneElement(children, {
          ...(control && {
            [control.prop]: propValue,
          }),
        })}
      </Box>
      <Typography fontWeight="bold" variant="body2">
        {name}
      </Typography>
    </Box>
  );
}

const DesignSystemComponents = () => {
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  return (
    <Container sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <Typography variant="body2" color="primary" fontWeight="bold">
        What do you get?
      </Typography>
      <Typography variant="h2" sx={{ mt: 1, mb: { xs: 2, sm: 4 }, maxWidth: 500 }}>
        Simple, accessible, declaritive <GradientText>components</GradientText>.
      </Typography>
      <Grid>
        <div>
          <Demo name="Button" control={{ prop: 'size', values: ['small', 'medium', 'large'] }}>
            <Button variant="contained" startIcon={<ShoppingCartRounded />}>
              Add to Cart
            </Button>
          </Demo>
        </div>
        <div>
          <Demo
            name="Alert"
            control={{ prop: 'variant', values: ['standard', 'filled', 'outlined'] }}
          >
            <Alert color="info">Check out this alert!</Alert>
          </Demo>
        </div>
        <div>
          <Demo
            name="Text Field"
            control={{ prop: 'variant', values: ['outlined', 'standard', 'filled'] }}
          >
            <TextField label="Basement" defaultValue="Ultraviolet" />
          </Demo>
        </div>
        <div>
          <Demo name="Menu">
            <React.Fragment>
              <Button
                variant="outlined"
                onClick={(event) => setAnchor(event.target as HTMLElement)}
              >
                Click to open
              </Button>
              <Menu open={Boolean(anchor)} anchorEl={anchor} onClose={() => setAnchor(null)}>
                <MenuItem>Contact</MenuItem>
                <MenuItem>Security</MenuItem>
                <MenuItem>About us</MenuItem>
              </Menu>
            </React.Fragment>
          </Demo>
        </div>
        <div>
          <Demo name="Table">
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
