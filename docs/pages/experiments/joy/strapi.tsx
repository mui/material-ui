import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Checkbox from '@mui/joy/Checkbox';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import TextField from '@mui/joy/TextField';
import Sheet from '@mui/joy/Sheet';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import Public from '@mui/icons-material/Public';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Info from '@mui/icons-material/InfoOutlined';
import Code from '@mui/icons-material/Code';
import PlayArrow from '@mui/icons-material/PlayArrowRounded';
import HistoryEdu from '@mui/icons-material/HistoryEdu';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import OpenInNew from '@mui/icons-material/OpenInNew';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import ViewCompact from '@mui/icons-material/ViewCompact';
import PermMedia from '@mui/icons-material/PermMedia';
import Extension from '@mui/icons-material/Extension';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Settings from '@mui/icons-material/Settings';
import Apps from '@mui/icons-material/Apps';
import VpnKey from '@mui/icons-material/VpnKey';
import Webhook from '@mui/icons-material/Webhook';
import Add from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search';
// experiment components
import Badge from 'docs/src/_experiment/joy/Badge';
import { IconFrame } from 'docs/src/_experiment/joy/Sheet';
import { ToggleButton, ToggleButtonGroup } from 'docs/src/_experiment/joy/Toggle';
import SelectField from 'docs/src/_experiment/joy/SelectField';
import strapiTheme from 'docs/src/_experiment/strapi/theme';
import LoginPage from 'docs/src/_experiment/strapi/LoginPage';
import RegisterPage from 'docs/src/_experiment/strapi/RegisterPage';
import HomePage from 'docs/src/_experiment/strapi/HomePage';
import WebhookPage from 'docs/src/_experiment/strapi/WebhookPage';

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

export default function Strapi() {
  return (
    <CssVarsProvider theme={strapiTheme}>
      <GlobalStyles styles={{ body: { margin: 0 }, '*': { boxSizing: 'border-box' } }} />
      <Box sx={{ p: 2 }}>
        <ColorSchemePicker />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          px: 2,
          '& > div': {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 2,
          },
          '& > .MuiTypography-header2': {
            mt: 2,
          },
        }}
      >
        <Typography level="header2">Button</Typography>
        <Box sx={{ '& > div': { display: 'flex', alignItems: 'center', gap: 2 } }}>
          <div>
            <Button size="sm">Text</Button>
            <Button>Text</Button>
            <Button size="lg">Text</Button>
            <Button disabled>Text</Button>
          </div>

          <div>
            <Button color="success" size="sm">
              Text
            </Button>
            <Button color="success">Text</Button>
            <Button color="success" size="lg">
              Text
            </Button>
            <Button color="success" disabled>
              Text
            </Button>
          </div>

          <div>
            <Button color="danger" size="sm">
              Text
            </Button>
            <Button color="danger">Text</Button>
            <Button color="danger" size="lg">
              Text
            </Button>
            <Button color="danger" disabled>
              Text
            </Button>
          </div>

          <div>
            <Button variant="outlined" size="sm">
              Text
            </Button>
            <Button variant="outlined">Text</Button>
            <Button variant="outlined" size="lg">
              Text
            </Button>
            <Button variant="outlined" disabled>
              Text
            </Button>
          </div>

          <div>
            <Button variant="outlined" color="success" size="sm">
              Text
            </Button>
            <Button variant="outlined" color="success">
              Text
            </Button>
            <Button variant="outlined" color="success" size="lg">
              Text
            </Button>
            <Button variant="outlined" color="success" disabled>
              Text
            </Button>
          </div>

          <div>
            <Button variant="outlined" color="danger" size="sm">
              Text
            </Button>
            <Button variant="outlined" color="danger">
              Text
            </Button>
            <Button variant="outlined" color="danger" size="lg">
              Text
            </Button>
            <Button variant="outlined" color="danger" disabled>
              Text
            </Button>
          </div>

          <div>
            <Button color="neutral" variant="outlined" size="sm">
              Text
            </Button>
            <Button color="neutral" variant="outlined">
              Text
            </Button>
            <Button color="neutral" variant="outlined" size="lg">
              Text
            </Button>
            <Button color="neutral" variant="outlined" disabled>
              Text
            </Button>
          </div>
        </Box>
        <Typography level="header2">Switch</Typography>
        <Box>
          <Switch defaultChecked />
          <Switch />
        </Box>
        <Typography level="header2">Badge (custom)</Typography>
        <Box>
          <Badge color="neutral">Text</Badge>
          <Badge>Text</Badge>
        </Box>
        <Typography level="header2">ToggleButton (custom)</Typography>
        <Box>
          <div>
            <Typography
              level="smallButtonText"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}
            >
              Toggle field <Public fontSize="xs" color="neutral" />
            </Typography>
            <ToggleButtonGroup role="group">
              <ToggleButton color="danger" pressed>
                Off
              </ToggleButton>
              <ToggleButton>On</ToggleButton>
            </ToggleButtonGroup>
            <Typography level="smallText" sx={{ mt: 0.5, color: 'var(--joy-palette-neutral-600)' }}>
              Description line
            </Typography>
          </div>
          <ToggleButtonGroup>
            <ToggleButton>Off</ToggleButton>
            <ToggleButton pressed>On</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Typography level="header2">TextField</Typography>
        {(() => {
          const eye = (
            <IconButton variant="text" color="neutral" size="sm" sx={{ pointerEvents: 'visible' }}>
              <Visibility fontSize="lg" />
            </IconButton>
          ) as any;
          const label = (
            <React.Fragment>
              Label <Public fontSize="xs" color="neutral" />
            </React.Fragment>
          );
          return (
            <Box>
              <Input placeholder="Placeholder" endAdornment={eye} />
              <TextField
                id="text-field1"
                label={label}
                placeholder="Placeholder"
                helperText="Description line"
                endAdornment={eye}
              />
              <TextField
                id="text-field2"
                label={label}
                error
                placeholder="Placeholder"
                helperText="Description line"
                endAdornment={eye}
              />
              <TextField
                id="text-field3"
                label={label}
                disabled
                placeholder="Disabled"
                helperText="Description line"
                endAdornment={eye}
              />
              <TextField
                id="text-field4"
                label={label}
                disabled
                placeholder="Disabled"
                helperText="Description line"
                startAdornment={<VisibilityOff fontSize="lg" />}
              />
            </Box>
          );
        })()}
        <Typography level="header2">SelectField (custom)</Typography>
        <Box>
          <SelectField
            id="select-field1"
            label={
              <React.Fragment>
                Label <Public fontSize="xs" color="neutral" />
              </React.Fragment>
            }
            placeholder="Placeholder"
            helperText="Description line"
          />
          <SelectField
            id="select-field1"
            error
            label={
              <React.Fragment>
                Label <Public fontSize="xs" color="neutral" />
              </React.Fragment>
            }
            placeholder="Placeholder"
            helperText="Description line"
          />
        </Box>
        <Typography level="header2">Checkbox (custom)</Typography>
        <div>
          <Checkbox id="check1" />
          <Checkbox id="check2" />
          <Checkbox checked id="check3" />
          <Checkbox checked id="check4" />
          <Checkbox indeterminate id="check4" />
          <Checkbox disabled />
          <Checkbox checked disabled />
        </div>
        <Typography level="header2">Sheet</Typography>
        <Box>
          <IconFrame color="primary">
            <Info />
          </IconFrame>
          <IconFrame color="warning">
            <Code />
          </IconFrame>
          <IconFrame color="secondary">
            <PlayArrow />
          </IconFrame>
          <IconFrame color="alternate">
            <HistoryEdu />
          </IconFrame>
        </Box>
      </Box>

      <LoginPage />

      <RegisterPage />

      <HomePage />

      <WebhookPage />
    </CssVarsProvider>
  );
}
