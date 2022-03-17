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
// import Input from 'docs/src/_experiment/joy/Input';
// import TextField from 'docs/src/_experiment/joy/TextField';
import SelectField from 'docs/src/_experiment/joy/SelectField';
import strapiTheme from 'docs/src/_experiment/strapi/theme';
import { List, ListItemButton, ListSubheader } from 'docs/src/_experiment/joy/List';

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

      {/* Log in */}
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'var(--joy-palette-background-level1)',
          pt: '100px',
          my: '5rem',
        }}
      >
        <Box
          sx={{
            width: 552,
            mx: 'auto',
            borderRadius: '4px',
            boxShadow: 'var(--joy-shadow-sm)',
            bgcolor: 'var(--joy-palette-background-body)',
            textAlign: 'center',
            px: '3.5rem',
            py: '3rem',
          }}
        >
          <Box
            component="img"
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--XsZRGi5O--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/763/988af53b-5d7e-435a-98eb-dd4aff5299d2.png"
            sx={{
              borderRadius: '1rem',
              width: 72,
              height: 72,
              mx: 'auto',
              display: 'block',
            }}
          />
          <Typography level="h3" sx={{ mt: '1.5rem', mb: '0.375rem', fontWeight: 'bold' }}>
            Welcome back!
          </Typography>
          <Typography sx={{ color: 'var(--joy-palette-text-tertiary)', mb: '2rem' }}>
            Log in to your Strapi account
          </Typography>
          <TextField label="Email" id="email" placeholder="kaidoe@gmail.com" fullWidth />
          <Box sx={{ height: '1.5rem' }} />
          <TextField
            label="Password"
            id="password"
            fullWidth
            endAdornment={
              <Button
                square
                variant="text"
                color="neutral"
                size="sm"
                sx={{ pointerEvents: 'visible' }}
              >
                <Visibility fontSize="lg" />
              </Button>
            }
          />
          <Box sx={{ height: '1.5rem' }} />
          <Checkbox label="Remember me" />
          <Box sx={{ height: '1.5rem' }} />
          <Button fullWidth size="lg">
            Login
          </Button>
        </Box>
        <Box sx={{ textAlign: 'center', py: 1 }}>
          <Button variant="text" sx={{ fontWeight: 'normal' }}>
            Forgot password?
          </Button>
        </Box>
      </Box>

      {/* Sign up */}
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'var(--joy-palette-background-level1)',
          pt: '100px',
          my: '5rem',
        }}
      >
        <Box
          sx={{
            width: 552,
            mx: 'auto',
            borderRadius: '4px',
            boxShadow: 'var(--joy-shadow-sm)',
            bgcolor: 'var(--joy-palette-background-body)',
            textAlign: 'center',
            px: '3.5rem',
            py: '3rem',
          }}
        >
          <Box
            component="img"
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--XsZRGi5O--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/763/988af53b-5d7e-435a-98eb-dd4aff5299d2.png"
            sx={{
              borderRadius: '1rem',
              width: 72,
              height: 72,
              mx: 'auto',
              display: 'block',
            }}
          />
          <Typography level="h3" sx={{ mt: '1.5rem', mb: '0.375rem', fontWeight: 'bold' }}>
            Welcome back!
          </Typography>
          <Typography sx={{ color: 'var(--joy-palette-text-tertiary)', mb: '2rem' }}>
            Your credentials are only used to authenticate yourself on the admin panel. All saved
            data will be stored in your own database.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, '& > *': { flexGrow: 1 } }}>
            <TextField label="First name" id="first-name" placeholder="Kai" fullWidth />
            <TextField label="Last name" id="last-name" placeholder="Doe" fullWidth />
          </Box>
          <Box sx={{ height: '1.5rem' }} />
          <TextField label="Email" id="email" placeholder="kaidoe@gmail.com" fullWidth />
          <Box sx={{ height: '1.5rem' }} />
          <TextField
            label="Password"
            id="password"
            fullWidth
            endAdornment={
              <Button
                square
                variant="text"
                color="neutral"
                size="sm"
                sx={{ pointerEvents: 'visible' }}
              >
                <Visibility fontSize="lg" />
              </Button>
            }
          />
          <Box sx={{ height: '1.5rem' }} />
          <TextField
            label="Password"
            id="password"
            fullWidth
            endAdornment={
              <Button
                square
                variant="text"
                color="neutral"
                size="sm"
                sx={{ pointerEvents: 'visible' }}
              >
                <Visibility fontSize="lg" />
              </Button>
            }
          />
          <Box sx={{ height: '1.5rem' }} />
          <Checkbox label="Keep me updated about the new features and upcoming improvements (by doing this you accept the terms and the privacy policy)." />
          <Box sx={{ height: '1.5rem' }} />
          <Button fullWidth size="lg">
            Let&apos;s start
          </Button>
        </Box>
      </Box>

      {/* Home */}
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'var(--joy-palette-background-level1)',
          display: 'flex',
          my: '5rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 225,
            flexShrink: 0,
            bgcolor: 'var(--joy-palette-background-body)',
            borderRight: '1px solid',
            borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, py: '1.25rem', px: '0.75rem' }}>
            <Box
              component="img"
              alt=""
              src="https://res.cloudinary.com/practicaldev/image/fetch/s--XsZRGi5O--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/763/988af53b-5d7e-435a-98eb-dd4aff5299d2.png"
              sx={{
                borderRadius: '4px',
                width: 32,
                height: 32,
                display: 'block',
              }}
            />
            <div>
              <Typography level="bodyHighlight" sx={{ fontWeight: 'bold' }}>
                Strapi Website
              </Typography>
              <Typography level="smallText">Workplace</Typography>
            </div>
          </Box>
          <Box
            sx={{
              borderBottom: '1px solid',
              borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
            }}
          />
          <Box sx={{ flexGrow: 1, minHeight: 0 }}>
            <List>
              <ListItemButton startIcon={(<Edit />) as any}>Content</ListItemButton>
              <li>
                <Box component="ul" sx={{ p: 0 }}>
                  <ListSubheader>plugins</ListSubheader>
                  <ListItemButton startIcon={(<ViewCompact />) as any}>Builder</ListItemButton>
                  <ListItemButton startIcon={(<PermMedia />) as any}>Builder</ListItemButton>
                  <ListItemButton startIcon={(<Info />) as any}>Builder</ListItemButton>
                </Box>
              </li>
              <li>
                <Box component="ul" sx={{ p: 0 }}>
                  <ListSubheader>general</ListSubheader>
                  <ListItemButton startIcon={(<Extension />) as any}>Plugins</ListItemButton>
                  <ListItemButton startIcon={(<ShoppingCart />) as any}>Marketplace</ListItemButton>
                  <ListItemButton startIcon={(<Settings />) as any}>
                    Settings <Badge sx={{ ml: 'auto' }}>2</Badge>
                  </ListItemButton>
                </Box>
              </li>
            </List>
          </Box>
          <Box
            sx={{
              borderBottom: '1px solid',
              borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
            }}
          />
          <Box sx={{ display: 'flex', px: '1.5rem', py: '1.5rem', gap: 1, alignItems: 'center' }}>
            <Box
              sx={{
                width: 26,
                height: 26,
                borderRadius: '26px',
                bgcolor: 'var(--joy-palette-background-level2)',
              }}
            />
            <Typography sx={{ color: 'var(--joy-palette-text-secondary)' }}>Kai Doe</Typography>
            <Button square variant="outlined" color="neutral" size="sm" sx={{ ml: 'auto' }}>
              <KeyboardArrowLeft />
            </Button>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: 0, px: '3.5rem', py: '2rem' }}>
          <Box sx={{ pl: 4, mb: 5.5 }}>
            <Typography level="h3" sx={{ fontWeight: 'bold', mb: 1.5 }}>
              Welcome 👋
            </Typography>
            <Typography level="subtitle">
              We hope you are making good progress on your project! Feel free to read the latest
              news about Strapi. We are giving our best to improve the product based on your
              feedback.
            </Typography>
            <Button
              variant="text"
              endIcon={<OpenInNew fontSize="sm" />}
              size="sm"
              sx={{ ml: -2, mt: 2 }}
            >
              SEE MORE ON THE BLOG
            </Button>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 352px' },
              gap: 3,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                '& > div': {
                  display: 'flex',
                  gap: 3,
                  p: 3,
                  alignItems: 'center',
                },
              }}
            >
              <Sheet
                sx={{
                  flexDirection: 'row',
                  borderRadius: (theme) => theme.vars.radius.sm,
                  boxShadow: (theme) => theme.vars.shadow.sm,
                }}
              >
                <Sheet variant="light" color="primary" sx={{ p: 2 }}>
                  <Sheet variant="contained" color="primary">
                    <Info />
                  </Sheet>
                </Sheet>
                <div>
                  <Typography level="bodyHighlight" sx={{ fontSize: '1rem' }}>
                    Read the documentation
                  </Typography>
                  <Typography level="subtitle">
                    Discover the concepts, reference, guides and tutorials.
                  </Typography>
                </div>
              </Sheet>
              <Sheet
                sx={{
                  flexDirection: 'row',
                  borderRadius: (theme) => theme.vars.radius.sm,
                  boxShadow: (theme) => theme.vars.shadow.sm,
                }}
              >
                <Sheet sx={{ p: 2 }} variant="light" color="warning">
                  <Sheet variant="contained" color="warning">
                    <Code />
                  </Sheet>
                </Sheet>
                <div>
                  <Typography level="bodyHighlight" sx={{ fontSize: '1rem' }}>
                    Code example
                  </Typography>
                  <Typography level="subtitle">
                    Learn by testing real project developed by the community
                  </Typography>
                </div>
              </Sheet>
              <Sheet
                sx={{
                  flexDirection: 'row',
                  borderRadius: (theme) => theme.vars.radius.sm,
                  boxShadow: (theme) => theme.vars.shadow.sm,
                }}
              >
                <Sheet sx={{ p: 2 }} variant="light" color="secondary">
                  <Sheet variant="contained" color="secondary">
                    <PlayArrow />
                  </Sheet>
                </Sheet>
                <div>
                  <Typography level="bodyHighlight" sx={{ fontSize: '1rem' }}>
                    Tutorial
                  </Typography>
                  <Typography level="subtitle">
                    Discover the concepts, reference, guides and tutorials.
                  </Typography>
                </div>
              </Sheet>
              <Sheet
                sx={{
                  flexDirection: 'row',
                  borderRadius: (theme) => theme.vars.radius.sm,
                  boxShadow: (theme) => theme.vars.shadow.sm,
                }}
              >
                <Sheet sx={{ p: 2 }} variant="light" color="alternate">
                  <Sheet variant="contained" color="alternate">
                    <HistoryEdu />
                  </Sheet>
                </Sheet>
                <div>
                  <Typography level="bodyHighlight" sx={{ fontSize: '1rem' }}>
                    Blog
                  </Typography>
                  <Typography level="subtitle">
                    Discover the concepts, reference, guides and tutorials.
                  </Typography>
                </div>
              </Sheet>
            </Box>
            <Box>
              <Sheet
                sx={{
                  gap: 1.5,
                  p: 3,
                  borderRadius: (theme) => theme.vars.radius.sm,
                  boxShadow: (theme) => theme.vars.shadow.sm,
                }}
              >
                <Typography sx={{ fontWeight: 500 }}>Join the community</Typography>
                <Typography level="subtitle">
                  Discuss with team members, contributors and developers on different channels.
                </Typography>
                <Button
                  variant="text"
                  size="sm"
                  endIcon={<ArrowForward fontSize="md" />}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  SEE OUR ROAD MAP
                </Button>
              </Sheet>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Settings - Webhooks list */}
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'var(--joy-palette-background-level1)',
          display: 'flex',
          my: '5rem',
        }}
      >
        <Box
          sx={{
            width: 64,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'var(--joy-palette-background-body)',
            borderRight: '1px solid',
            borderColor: (theme) => theme.vars.palette.neutral.outlinedBorder,
          }}
        >
          <Box
            sx={{
              px: '0.75rem',
              py: '1rem',
              borderBottom: '1px solid',
              borderColor: (theme) => theme.vars.palette.neutral.outlinedBorder,
            }}
          >
            <Box
              component="img"
              src="https://res.cloudinary.com/practicaldev/image/fetch/s--XsZRGi5O--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/763/988af53b-5d7e-435a-98eb-dd4aff5299d2.png"
              sx={{
                borderRadius: '4px',
                width: 40,
                height: 40,
                display: 'block',
              }}
            />
          </Box>
          <List sx={{ flexGrow: 1, '& > li > button': { width: '100%' }, '& > li+ li': { mt: 1 } }}>
            <li>
              <Button size="sm" square color="neutral" variant="text">
                <HistoryEdu fontSize="md" />
              </Button>
            </li>
            <Box
              role="none"
              sx={{
                my: 2,
                borderBottom: '1px solid',
                borderColor: (theme) => theme.vars.palette.neutral.outlinedBorder,
              }}
            />
            <li>
              <Button size="sm" square color="neutral" variant="text">
                <ViewCompact fontSize="md" />
              </Button>
            </li>
            <li>
              <Button size="sm" square color="neutral" variant="text">
                <PermMedia fontSize="md" />
              </Button>
            </li>
            <li>
              <Button size="sm" square color="neutral" variant="text">
                <Info fontSize="md" />
              </Button>
            </li>
            <Box
              role="none"
              sx={{
                my: 2,
                borderBottom: '1px solid',
                borderColor: (theme) => theme.vars.palette.neutral.outlinedBorder,
              }}
            />
            <li>
              <Button size="sm" square color="neutral" variant="text">
                <Extension fontSize="md" />
              </Button>
            </li>
            <li>
              <Button size="sm" square color="neutral" variant="text">
                <ShoppingCart fontSize="md" />
              </Button>
            </li>
            <li>
              <Button size="sm" square variant="light" sx={{ position: 'relative' }}>
                <Box
                  sx={(theme) => ({
                    position: 'absolute',
                    top: '-6px',
                    right: '-8px',
                    borderRadius: 2,
                    px: '0.5rem',
                    py: '2px',
                    fontWeight: 500,
                    ...theme.variants.contained.primary,
                  })}
                >
                  2
                </Box>
                <Settings fontSize="md" />
              </Button>
            </li>
          </List>
          <Box
            sx={{
              borderTop: '1px solid',
              borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              py: '1.5rem',
              px: '1rem',
            }}
          >
            <Box
              sx={{
                bgcolor: 'var(--joy-palette-neutral-lightBg)',
                borderRadius: '40px',
                width: 26,
                height: 26,
              }}
            />
            <Button
              color="neutral"
              variant="outlined"
              size="sm"
              sx={{
                px: '0',
                position: 'absolute',
                right: '-8px',
                bgcolor: 'var(--joy-palette-background-body)',
              }}
            >
              <KeyboardArrowRight fontSize="sm" />
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: 230,
            borderRight: '1px solid',
            borderColor: (theme) => theme.vars.palette.neutral.outlinedBorder,
          }}
        >
          <Box sx={{ py: '1.5rem', px: '1.5rem' }}>
            <Typography>Settings</Typography>
          </Box>
          <Box
            sx={{
              ml: '1.5rem',
              borderBottom: '1px solid',
              borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
              width: '24px',
            }}
          />
          <List as="nav" aria-describedby="global-settings" sx={{ pr: 0, pl: '0.75rem' }}>
            <ListSubheader id="global-settings">GLOBAL SETTINGS</ListSubheader>
            <ListItemButton startIcon={(<Apps />) as any} variant="text">
              Application
            </ListItemButton>
            <ListItemButton startIcon={(<VpnKey />) as any} variant="text">
              API Tokens
            </ListItemButton>
            <ListItemButton startIcon={(<HistoryEdu />) as any} variant="text">
              Content manager
            </ListItemButton>
            <ListItemButton
              startIcon={(<Webhook />) as any}
              variant="light"
              color="primary"
              sx={{
                borderRight: '1px solid',
                borderColor: 'var(--joy-palette-primary-600)',
                borderRadius: 0,
              }}
            >
              Webhooks
            </ListItemButton>
          </List>
        </Box>
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Box
            sx={{
              px: '3.5rem',
              pt: '2.25rem',
              pb: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Typography level="header1">Webhooks</Typography>
              <Typography sx={{ color: 'var(--joy-palette-text-tertiary)' }}>
                Get POST changes notifications
              </Typography>
            </div>
            <Button startIcon={(<Add />) as any} sx={{ alignSelf: 'center' }}>
              Add new webhook
            </Button>
          </Box>
          <Box sx={{ px: '3.5rem', pb: '1rem', width: 400 }}>
            <Sheet>
              <Input
                placeholder="Search for an entry"
                startAdornment={(<Search />) as any}
                style={{ '--Input-minHeight': '2rem' }}
              />
            </Sheet>
          </Box>
          <Box sx={{ px: '3.5rem', pb: '1rem' }}>
            <Sheet
              sx={{
                display: 'grid',
                gridTemplateColumns: 'min-content minmax(100px, 20%) 1fr 12% min-content',
                boxShadow: (theme) => theme.vars.shadow.sm,
                '& > div': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                },
                '& > div:nth-child(6n + 1)': {
                  pl: '24px',
                  py: '18px',
                  pr: '18px',
                },
                '& > div:nth-child(6n + 5)': {
                  pr: '1rem',
                },
              }}
            >
              <Box>
                <Checkbox />
              </Box>
              <Box>
                <Typography level="tableLabel" sx={{ color: 'var(--joy-palette-text-secondary)' }}>
                  Name
                </Typography>
              </Box>
              <Box>
                <Typography level="tableLabel">URL</Typography>
              </Box>
              <Box>
                <Typography level="tableLabel">Status</Typography>
              </Box>
              <Box />
              <Box
                sx={{
                  gridColumn: '1 / -1',
                  mx: '0.75rem',
                  borderBottom: '1px solid',
                  borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
                  opacity: 0.5,
                }}
              />
              <Box>
                <Checkbox />
              </Box>
              <Box>
                <Typography level="bodyHighlight">Gatsby</Typography>
              </Box>
              <Box>
                <Typography>
                  https://www.gatsbyjs.com/features/jamstack/875ggfDq54juhn98/
                </Typography>
              </Box>
              <Box>
                <Switch checked />{' '}
                <Typography
                  level="smallText"
                  sx={{ color: 'var(--joy-palette-success-textColor)' }}
                >
                  Enabled
                </Typography>
              </Box>
              <Box>
                <Button square variant="text" color="neutral">
                  <Edit fontSize="md" />
                </Button>
                <Button square variant="text" color="neutral">
                  <Delete fontSize="md" />
                </Button>
              </Box>
              <Box
                sx={{
                  gridColumn: '1 / -1',
                  mx: '0.75rem',
                  borderBottom: '1px solid',
                  borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
                  opacity: 0.5,
                }}
              />
              <Box>
                <Checkbox />
              </Box>
              <Box>
                <Typography level="bodyHighlight">Netlify</Typography>
              </Box>
              <Box>
                <Typography>
                  https://www.gatsbyjs.com/features/jamstack/875ggfDq54juhn98/
                </Typography>
              </Box>
              <Box>
                <Switch />{' '}
                <Typography level="smallText" sx={{ color: 'var(--joy-palette-danger-textColor)' }}>
                  Disabled
                </Typography>
              </Box>
              <Box>
                <Button square variant="text" color="neutral">
                  <Edit fontSize="md" />
                </Button>
                <Button square variant="text" color="neutral">
                  <Delete fontSize="md" />
                </Button>
              </Box>
              <Box
                sx={{
                  gridColumn: '1 / -1',
                  mx: '0.75rem',
                  borderBottom: '1px solid',
                  borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
                  opacity: 0.5,
                }}
              />
              <Box>
                <Checkbox />
              </Box>
              <Box>
                <Typography level="bodyHighlight">Blog</Typography>
              </Box>
              <Box>
                <Typography>
                  https://www.gatsbyjs.com/features/jamstack/875ggfDq54juhn98/
                </Typography>
              </Box>
              <Box>
                <Switch />{' '}
                <Typography level="smallText" sx={{ color: 'var(--joy-palette-danger-textColor)' }}>
                  Disabled
                </Typography>
              </Box>
              <Box>
                <Button square variant="text" color="neutral">
                  <Edit fontSize="md" />
                </Button>
                <Button square variant="text" color="neutral">
                  <Delete fontSize="md" />
                </Button>
              </Box>
              <Box
                sx={{
                  gridColumn: '1 / -1',
                  mx: '0.75rem',
                  borderBottom: '1px solid',
                  borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
                  opacity: 0.5,
                }}
              />
              <Button
                variant="light"
                startIcon={
                  (
                    <Box
                      sx={{
                        borderRadius: '50%',
                        display: 'inline-flex',
                        p: '0.25rem',
                        bgcolor: 'var(--joy-palette-primary-lightHoverBg)',
                      }}
                    >
                      <Add />
                    </Box>
                  ) as any
                }
                sx={{
                  '--Button-iconOffsetStep': 0,
                  '--Button-gap': '1rem',
                  p: '20px',
                  justifyContent: 'flex-start',
                  gridColumn: '1 / -1',
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                }}
              >
                Add new webhook
              </Button>
            </Sheet>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
