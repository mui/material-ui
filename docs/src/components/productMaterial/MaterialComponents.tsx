import * as React from 'react';
import { Experimental_CssVarsProvider as CssVarsProvider, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button, { buttonClasses } from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import InputRounded from '@mui/icons-material/InputRounded';
import SmartButtonRounded from '@mui/icons-material/SmartButtonRounded';
import TableViewRounded from '@mui/icons-material/TableViewRounded';
import WarningRounded from '@mui/icons-material/WarningRounded';
import ShoppingCartRounded from '@mui/icons-material/ShoppingCartRounded';
import InfoRounded from '@mui/icons-material/InfoRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import More from 'docs/src/components/action/More';
import Frame from 'docs/src/components/action/Frame';
import { customTheme } from 'docs/src/components/home/MaterialDesignComponents';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';
import StylingInfo from 'docs/src/components/action/StylingInfo';
import ROUTES from 'docs/src/route';

const DEMOS = ['Button', 'Text field', 'Table', 'Alert', 'Tooltip'] as const;

const CODES = {
  Button: `
  <Button variant="text" startIcon={<ShoppingCartRounded />}>
  Add item
</Button>
<Button variant="contained" startIcon={<ShoppingCartRounded />}>
  Add item
</Button>
<Button variant="outlined" startIcon={<ShoppingCartRounded />}>
  Add item
</Button>
`,
  'Text field': `
  <TextField variant="standard" label="Username" />
<TextField variant="outlined" label="Email" type="email" />
<TextField variant="filled" label="Password" type="password" />
`,
  Table: `
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
`,
  Alert: `
  <Alert variant="standard" color="info">
  This is an alert!
</Alert>
<Alert variant="outlined" color="info">
  This is an alert!
</Alert>
<Alert variant="filled" color="info">
  This is an alert!
</Alert>
`,
  Tooltip: `
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
`,
};

export default function MaterialComponents() {
  const [demo, setDemo] = React.useState<(typeof DEMOS)[number]>(DEMOS[0]);
  const [customized, setCustomized] = React.useState(false);
  const icons = {
    [DEMOS[0]]: <SmartButtonRounded fontSize="small" />,
    [DEMOS[1]]: <InputRounded fontSize="small" />,
    [DEMOS[2]]: <TableViewRounded fontSize="small" />,
    [DEMOS[3]]: <WarningRounded fontSize="small" />,
    [DEMOS[4]]: <InfoRounded fontSize="small" />,
  };
  return (
    <Section bg="gradient">
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <SectionHeadline
            overline="Component library"
            title={
              <Typography variant="h2">
                <GradientText>40+</GradientText> building block components
              </Typography>
            }
            description="A meticulous implementation of Material Design; every Material UI component meets the highest standards of form and function."
          />
          <Group desktopColumns={2} sx={{ m: -2, p: 2 }}>
            {DEMOS.map((name) => (
              <Highlighter key={name} selected={name === demo} onClick={() => setDemo(name)}>
                <Item icon={React.cloneElement(icons[name])} title={name} />
              </Highlighter>
            ))}
            <More href={ROUTES.components} />
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          <Frame sx={{ height: '100%' }}>
            <Frame.Demo className="mui-default-theme" sx={{ flexGrow: 1 }}>
              <CssVarsProvider theme={customized ? customTheme : undefined}>
                {demo === 'Button' && (
                  <Box
                    sx={{
                      height: '100%',
                      py: 5,
                      gap: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Button variant="text" startIcon={<ShoppingCartRounded />}>
                      Add item
                    </Button>
                    <Button variant="contained" startIcon={<ShoppingCartRounded />}>
                      Add item
                    </Button>
                    <Button variant="outlined" startIcon={<ShoppingCartRounded />}>
                      Add item
                    </Button>
                  </Box>
                )}
                {demo === 'Text field' && (
                  <Stack
                    justifyContent="center"
                    spacing={2}
                    sx={{ p: 2, width: '50%', margin: 'auto' }}
                  >
                    <TextField variant="standard" label="Username" />
                    <TextField variant="outlined" label="Email" type="email" />
                    <TextField
                      variant="filled"
                      label="Password"
                      type="password"
                      autoComplete="new-password" // prevent chrome auto-fill
                    />
                  </Stack>
                )}
                {demo === 'Table' && (
                  <TableContainer
                    component={Paper}
                    variant="outlined"
                    sx={{
                      mx: 'auto',
                      my: 4,
                      maxWidth: '90%',
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
                      gap: 2,
                    }}
                  >
                    <Alert variant="standard" color="info">
                      This is an alert!
                    </Alert>
                    <Alert variant="outlined" color="info">
                      This is an alert!
                    </Alert>
                    <Alert variant="filled" color="info">
                      This is an alert!
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
                    <Tooltip
                      title="Appears on hover"
                      arrow
                      placement="top"
                      slotProps={{ popper: { disablePortal: true } }}
                    >
                      <Typography color="text.secondary">Top</Typography>
                    </Tooltip>
                    <Box sx={{ '& > *': { display: 'inline-block' } }}>
                      <Tooltip
                        title="Always display"
                        arrow
                        placement="left"
                        open
                        slotProps={{ popper: { disablePortal: true } }}
                      >
                        <Typography color="text.secondary">Left</Typography>
                      </Tooltip>
                      <Box sx={{ display: 'inline-block', width: 80 }} />
                      <Tooltip
                        title="Appears on hover"
                        arrow
                        placement="right"
                        slotProps={{ popper: { disablePortal: true } }}
                      >
                        <Typography color="text.secondary">Right</Typography>
                      </Tooltip>
                    </Box>
                    <Tooltip
                      title="Appears on hover"
                      arrow
                      placement="bottom"
                      slotProps={{ popper: { disablePortal: true } }}
                    >
                      <Typography color="text.secondary">Bottom</Typography>
                    </Tooltip>
                  </Stack>
                )}
              </CssVarsProvider>
            </Frame.Demo>
            <Frame.Info
              data-mui-color-scheme="dark"
              sx={{
                minHeight: 220,
                maxHeight: demo === 'Table' ? 260 : 'none',
                position: 'relative',
                overflow: 'hidden',
                p: 0,
                pt: 5,
              }}
            >
              <StylingInfo appeared={customized} />
              <Box
                sx={{
                  overflow: 'auto',
                  pt: 2,
                  pb: 1,
                  px: 2,
                  height: '100%',
                }}
              >
                <HighlightedCode
                  copyButtonHidden
                  component={MarkdownElement}
                  code={CODES[demo]}
                  language="jsx"
                />
              </Box>
              <Box
                sx={(theme) => ({
                  pb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  position: 'absolute',
                  top: 16,
                  left: 12,
                  right: 0,
                  zIndex: 10,
                  background: `linear-gradient(to bottom, ${
                    (theme.vars || theme).palette.common.black
                  } 30%, transparent)`,
                  [`& .${buttonClasses.root}`]: {
                    borderRadius: 40,
                    padding: '2px 10px',
                    fontSize: '0.75rem',
                    lineHeight: 18 / 12,
                  },
                  '& .MuiButton-outlinedPrimary': {
                    backgroundColor: alpha(theme.palette.primary[900], 0.5),
                  },
                })}
              >
                <Button
                  size="small"
                  variant="outlined"
                  color={customized ? 'secondary' : 'primary'}
                  onClick={() => {
                    setCustomized(false);
                  }}
                >
                  Material Design
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color={customized ? 'primary' : 'secondary'}
                  onClick={() => {
                    setCustomized(true);
                  }}
                >
                  Custom theme
                </Button>
              </Box>
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
