import * as React from 'react';
import { ThemeProvider, createTheme, styled, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/core/Alert';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Stack from '@material-ui/core/Stack';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import InputRounded from '@material-ui/icons/InputRounded';
import SmartButtonRounded from '@material-ui/icons/SmartButtonRounded';
import TableViewRounded from '@material-ui/icons/TableViewRounded';
import WarningRounded from '@material-ui/icons/WarningRounded';
import ShoppingCartRounded from '@material-ui/icons/ShoppingCartRounded';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import More from 'docs/src/components/action/More';
import Frame from 'docs/src/components/action/Frame';
import { buildTheme } from 'docs/src/components/home/DesignSystemComponents';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';

const DEMOS = ['Button', 'Text field', 'Table', 'Alert', 'Tooltip'] as const;

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 40,
  padding: theme.spacing('2px', 1),
  fontSize: theme.typography.pxToRem(12),
  lineHeight: 18 / 12,
  '&.MuiButton-text': {
    color: theme.palette.grey[400],
  },
  '&.MuiButton-outlined': {
    color: '#fff',
    backgroundColor: theme.palette.primary[700],
    borderColor: theme.palette.primary[500],
    '&:hover': {
      backgroundColor: theme.palette.primary[700],
    },
  },
}));

const CODES = {
  Button: `const Demo = () => (
  <div>
    <Button variant="text" startIcon={<ShoppingCartRounded />}>
      Add to Cart
    </Button>
    <Button variant="contained" startIcon={<ShoppingCartRounded />}>
      Add to Cart
    </Button>
    <Button variant="outlined" startIcon={<ShoppingCartRounded />}>
      Add to Cart
    </Button>
  </div>
);`,
  'Text field': `const Demo = () => (
  <div>
    <TextField variant="standard" label="Username" />
    <TextField variant="outlined" label="Email" type="email" />
    <TextField variant="filled" label="Password" type="password" />
  </div>
);`,
  Table: `const Demo = () => (
  <TableContainer
    component={Paper} 
    variant="outlined"
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
);`,
  Alert: `const Demo = () => (
  <div>
    <Alert variant="standard" color="info">
      Check out this alert!
    </Alert>
    <Alert variant="outlined" color="info">
      Check out this alert!
    </Alert>
    <Alert variant="filled" color="info">
      Check out this alert!
    </Alert>
  </div>
);`,
  Tooltip: `const Demo = () => (
  <div>
    <Tooltip title="This is a tooltip" arrow placement="top">
      <Typography>Top</Typography>
    </Tooltip>
    <Tooltip title="This is a tooltip" arrow placement="right">
      <Typography>Right</Typography>
    </Tooltip>
    <Tooltip title="This is a tooltip" arrow placement="left">
      <Typography>Left</Typography>
    </Tooltip>
    <Tooltip title="This is a tooltip" arrow placement="bottom">
      <Typography>Bottom</Typography>
    </Tooltip>
  </div>
);`,
};

export default function CoreComponents() {
  const [demo, setDemo] = React.useState<typeof DEMOS[number]>(DEMOS[0]);
  const [customized, setCustomized] = React.useState(false);
  const icons = {
    [DEMOS[0]]: <SmartButtonRounded />,
    [DEMOS[1]]: <InputRounded />,
    [DEMOS[2]]: <TableViewRounded />,
    [DEMOS[3]]: <WarningRounded />,
    [DEMOS[4]]: <InfoOutlined />,
  };
  return (
    <Section bg="comfort">
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="What do you get?"
              title={
                <Typography variant="h2">
                  <GradientText>40+</GradientText> building block components
                </Typography>
              }
              description="We have built the foundational components for your design system, enabling you to launch even faster that cool product you've been thinking about. We got your back!"
            />
          </Box>
          <Group desktopColumns={2} sx={{ mt: 4 }}>
            {DEMOS.map((name) => (
              <Highlighter key={name} selected={name === demo} onClick={() => setDemo(name)}>
                <Item
                  icon={React.cloneElement(icons[name], { active: name === demo })}
                  title={name}
                />
              </Highlighter>
            ))}
            <More />
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          <Frame sx={{ height: '100%' }}>
            <Frame.Demo sx={{ flexGrow: 1 }}>
              <ThemeProvider
                theme={(theme: Theme) =>
                  createTheme(
                    customized ? buildTheme(theme) : { palette: { mode: theme.palette.mode } },
                  )
                }
              >
                {demo === 'Button' && (
                  <Box
                    sx={{
                      height: '100%',
                      py: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      '& > button': {
                        mt: 1,
                        mx: 0.5,
                      },
                    }}
                  >
                    <Button variant="text" startIcon={<ShoppingCartRounded />}>
                      Add to Cart
                    </Button>
                    <Button variant="contained" startIcon={<ShoppingCartRounded />}>
                      Add to Cart
                    </Button>
                    <Button variant="outlined" startIcon={<ShoppingCartRounded />}>
                      Add to Cart
                    </Button>
                  </Box>
                )}
                {demo === 'Text field' && (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                    sx={{ height: '100%', py: 2 }}
                  >
                    <TextField variant="standard" label="Username" />
                    <TextField variant="outlined" label="Email" type="email" />
                    <TextField variant="filled" label="Password" type="password" />
                  </Stack>
                )}
                {demo === 'Table' && (
                  <TableContainer
                    component={Paper}
                    variant="outlined"
                    sx={{
                      mx: 'auto',
                      my: 2,
                      maxWidth: 320,
                      '& .MuiTableBody-root > .MuiTableRow-root:last-of-type > .MuiTableCell-root':
                        {
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
                )}
                {demo === 'Alert' && (
                  <Box
                    sx={{
                      height: '100%',
                      py: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      '& > div': {
                        mt: 1,
                        mx: 0.5,
                      },
                    }}
                  >
                    <Alert variant="standard" color="info">
                      Check out this alert!
                    </Alert>
                    <Alert variant="outlined" color="info">
                      Check out this alert!
                    </Alert>
                    <Alert variant="filled" color="info">
                      Check out this alert!
                    </Alert>
                  </Box>
                )}
                {demo === 'Tooltip' && (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                    sx={{ minHeight: 100, py: 2 }}
                  >
                    <Tooltip title="This is a tooltip" arrow placement="top">
                      <Typography color="text.secondary">Top</Typography>
                    </Tooltip>
                    <Box sx={{ '& > *': { display: 'inline-block' } }}>
                      <Tooltip title="This is a tooltip" arrow placement="left">
                        <Typography color="text.secondary">Left</Typography>
                      </Tooltip>
                      <Box sx={{ display: 'inline-block', width: 80 }} />
                      <Tooltip title="This is a tooltip" arrow placement="right">
                        <Typography color="text.secondary">Right</Typography>
                      </Tooltip>
                    </Box>
                    <Tooltip title="This is a tooltip" arrow placement="bottom">
                      <Typography color="text.secondary">Bottom</Typography>
                    </Tooltip>
                  </Stack>
                )}
              </ThemeProvider>
            </Frame.Demo>
            <Frame.Info
              sx={{
                maxHeight: demo === 'Table' ? 260 : 'none',
                position: 'relative',
              }}
            >
              <Box sx={{ height: 'calc(100% + 40px)', overflow: 'auto', m: -2, p: 2 }}>
                <HighlightedCode component={MarkdownElement} code={CODES[demo]} language="jsx" />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'absolute',
                  top: 15,
                  right: 10,
                  zIndex: 10,
                }}
              >
                <StyledButton
                  size="small"
                  variant={customized ? 'text' : 'outlined'}
                  onClick={() => {
                    setCustomized(false);
                  }}
                >
                  Material Design
                </StyledButton>
                <StyledButton
                  size="small"
                  variant={customized ? 'outlined' : 'text'}
                  onClick={() => {
                    setCustomized(true);
                  }}
                  sx={{ ml: 1 }}
                >
                  Custom Theme
                </StyledButton>
              </Box>
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
