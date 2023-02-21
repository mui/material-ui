import * as React from 'react';
import { Experimental_CssVarsProvider as CssVarsProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
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
  Button: `
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
`,
  'Text field': `
<div>
  <TextField variant="standard" label="Username" />
  <TextField variant="outlined" label="Email" type="email" />
  <TextField variant="filled" label="Password" type="password" />
</div>
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
`,
  Tooltip: `
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
`,
};

export default function CoreComponents() {
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
    <Section bg="comfort">
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="Component library"
              title={
                <Typography variant="h2">
                  <GradientText>40+</GradientText> building block components
                </Typography>
              }
              description="We've built the foundational components for your design system, enabling you to launch that cool product you've been thinking about even faster. We got your back!"
            />
          </Box>
          <Group desktopColumns={2} sx={{ mt: 4, pb: { xs: 0, md: 2 } }}>
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
                      gap: 1,
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
              sx={{
                minHeight: 200,
                maxHeight: demo === 'Table' ? 260 : 'none',
                position: 'relative',
                overflow: 'hidden',
                pt: 5,
              }}
            >
              <Box sx={{ height: 'calc(100% + 40px)', overflow: 'auto', m: -2, p: 2 }}>
                <HighlightedCode
                  copyButtonHidden
                  component={MarkdownElement}
                  code={CODES[demo]}
                  language="jsx"
                />
              </Box>
              <Box
                sx={{
                  pl: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  position: 'absolute',
                  top: 15,
                  left: 10,
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
              <StylingInfo appeared={customized} />
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
