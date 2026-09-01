import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import CallMadeIcon from '@mui/icons-material/CallMade';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupIcon from '@mui/icons-material/Group';
import HistoryIcon from '@mui/icons-material/History';
import LanguageIcon from '@mui/icons-material/Language';
import ScienceIcon from '@mui/icons-material/Science';
import StorageIcon from '@mui/icons-material/Storage';

const CONTROL_MIN_WIDTH = 140;

function PricingUi() {
  return (
    <Stack sx={{ gap: 'large', alignItems: 'center', maxWidth: 420, mx: 'auto' }}>
      <Stack sx={{ gap: 'xx-small', textAlign: 'center' }}>
        <Typography variant="h2">Pricing</Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Start free. Upgrade to unlock features and raise limits.
        </Typography>
      </Stack>
      <Card variant="outlined" sx={{ width: '100%', borderColor: 'primary.main' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 'small' }}>
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'x-small',
              flexWrap: 'wrap',
            }}
          >
            <Stack direction="row" sx={{ alignItems: 'center', gap: 'x-small' }}>
              <Typography variant="h6" component="h3">
                Pro
              </Typography>
              <Chip label="Most popular" size="small" color="primary" />
            </Stack>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Annual"
              labelPlacement="start"
              slotProps={{ typography: { variant: 'caption' } }}
            />
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Growing professional sites
          </Typography>
          <Divider />
          <Stack direction="row" sx={{ alignItems: 'baseline', gap: 'xx-small' }}>
            <Typography variant="h3" component="p">
              $24
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              per month, billed annually
            </Typography>
          </Stack>
          <Divider />
          <Typography variant="body2">Includes:</Typography>
          <List disablePadding>
            <ListItem disablePadding disableGutters>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText
                primary="Staging and instant rollback"
                slotProps={{ primary: { variant: 'body2' } }}
              />
            </ListItem>
            <ListItem disablePadding disableGutters>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText
                primary="Roles and permissions"
                slotProps={{ primary: { variant: 'body2' } }}
              />
            </ListItem>
            <ListItem disablePadding disableGutters>
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText
                primary="Relational CMS"
                slotProps={{ primary: { variant: 'body2' } }}
              />
            </ListItem>
            <ListItem disablePadding disableGutters>
              <ListItemIcon>
                <CallMadeIcon />
              </ListItemIcon>
              <ListItemText
                primary="Site redirects"
                slotProps={{ primary: { variant: 'body2' } }}
              />
            </ListItem>
            <ListItem disablePadding disableGutters>
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <React.Fragment>
                    Multiple locales{' '}
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      (add-on)
                    </Typography>
                  </React.Fragment>
                }
                slotProps={{ primary: { variant: 'body2' } }}
              />
            </ListItem>
          </List>
        </CardContent>
        <CardActions>
          <Button variant="contained" fullWidth>
            Start with Pro
          </Button>
        </CardActions>
      </Card>
      <Paper variant="outlined" sx={{ width: '100%' }}>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'small',
            flexWrap: 'wrap',
            p: 'small',
          }}
        >
          <Stack sx={{ gap: 'xx-small' }}>
            <Typography variant="h6" component="h3">
              Enterprise
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Custom limits, security review, and dedicated support.
            </Typography>
          </Stack>
          <Button variant="outlined">Request trial</Button>
        </Stack>
      </Paper>
    </Stack>
  );
}

function ProductUi() {
  const id = React.useId();
  const [plan, setPlan] = React.useState('subscribe');

  return (
    <Stack sx={{ gap: 'medium', maxWidth: 520 }}>
      <Stack direction="row" sx={{ gap: 'medium' }}>
        <Box
          role="img"
          aria-label="Product photography placeholder"
          sx={(theme) => ({
            flexShrink: 0,
            width: `calc(${theme.spacing('xx-large')} * 3)`,
            height: `calc(${theme.spacing('xx-large')} * 3)`,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'action.selected',
            display: 'grid',
            placeItems: 'center',
            color: 'text.disabled',
          })}
        >
          <ScienceIcon sx={(theme) => ({ fontSize: theme.spacing('x-large') })} />
        </Box>
        <Stack sx={{ gap: 'x-small', flexGrow: 1 }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 'x-small' }}>
            <Chip label="DM-02" size="small" variant="outlined" />
            <Typography variant="h3">Daily Multivitamin</Typography>
          </Stack>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 'x-small' }}>
            <Rating value={4.5} precision={0.5} size="small" readOnly />
            <Link component="button" type="button" variant="body2">
              298 reviews
            </Link>
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Covers the nutritional needs of your body with 100% daily value of 20
            essential vitamins and minerals.
          </Typography>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 'x-small' }}>
            <Typography variant="h3" component="p" sx={{ fontWeight: 'bold' }}>
              $39.99
            </Typography>
            <Chip label="New" size="small" color="success" />
          </Stack>
          <Typography variant="body2">
            In stock — <strong>30-day supply</strong> delivered monthly.
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" sx={{ gap: 'small', flexWrap: 'wrap' }}>
        <ToggleButtonGroup
          exclusive
          value={plan}
          onChange={(event, next) => {
            if (next) {
              setPlan(next);
            }
          }}
          aria-label="purchase plan"
          sx={{ flexGrow: 1 }}
        >
          <ToggleButton value="once" sx={{ flexGrow: 1 }}>
            One-time
          </ToggleButton>
          <ToggleButton value="subscribe" sx={{ flexGrow: 1 }}>
            Subscribe and save 15%
          </ToggleButton>
        </ToggleButtonGroup>
        <FormControl size="small" sx={{ minWidth: 96 }}>
          <InputLabel id={`${id}-quantity-label`}>Quantity</InputLabel>
          <Select
            labelId={`${id}-quantity-label`}
            id={`${id}-quantity`}
            label="Quantity"
            defaultValue={1}
          >
            <MenuItem value={1}>1 jar</MenuItem>
            <MenuItem value={2}>2 jars</MenuItem>
            <MenuItem value={3}>3 jars</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack sx={{ gap: 'xx-small' }}>
        <Button variant="contained" fullWidth>
          Start now
        </Button>
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', textAlign: 'center' }}
        >
          30-day risk-free guarantee. Free shipping.
        </Typography>
      </Stack>
      <Stack>
        <Accordion
          defaultExpanded
          disableGutters
          variant="outlined"
          sx={{ '&:not(:last-of-type)': { borderBottom: 0 } }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${id}-benefits-content`}
            id={`${id}-benefits-header`}
          >
            <Typography variant="subtitle2" component="span">
              Benefits
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List disablePadding sx={{ listStyleType: 'disc', pl: 'medium' }}>
              <ListItem disablePadding disableGutters sx={{ display: 'list-item' }}>
                <ListItemText
                  primary="Meets 100% daily value of 20 vitamins and minerals"
                  slotProps={{ primary: { variant: 'body2' } }}
                />
              </ListItem>
              <ListItem disablePadding disableGutters sx={{ display: 'list-item' }}>
                <ListItemText
                  primary="Helps fill daily nutrient gaps with precise dosing"
                  slotProps={{ primary: { variant: 'body2' } }}
                />
              </ListItem>
              <ListItem disablePadding disableGutters sx={{ display: 'list-item' }}>
                <ListItemText
                  primary="Engineered for absorption throughout the tract"
                  slotProps={{ primary: { variant: 'body2' } }}
                />
              </ListItem>
              <ListItem disablePadding disableGutters sx={{ display: 'list-item' }}>
                <ListItemText
                  primary="Bioavailable nutrients your body can use"
                  slotProps={{ primary: { variant: 'body2' } }}
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion disableGutters variant="outlined">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${id}-ingredients-content`}
            id={`${id}-ingredients-header`}
          >
            <Typography variant="subtitle2" component="span">
              Ingredients
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Full ingredient list with sourcing and dosage per capsule.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Stack>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle2">Bundle and save 25%</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Add the daily synbiotic to your routine and save on your first order.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined">Add to order</Button>
        </CardActions>
      </Card>
    </Stack>
  );
}

function SettingsUi() {
  const id = React.useId();

  return (
    <Stack sx={{ gap: 'large', maxWidth: 520 }}>
      <Typography variant="h3">Preferences</Typography>
      <Stack
        component="section"
        aria-labelledby={`${id}-general`}
        sx={{ gap: 'x-small' }}
      >
        <Typography
          variant="overline"
          component="h4"
          id={`${id}-general`}
          sx={{ color: 'text.secondary' }}
        >
          General
        </Typography>
        <Paper variant="outlined" sx={{ bgcolor: 'transparent' }}>
          <List disablePadding>
            <ListItem
              divider
              sx={{ gap: 'small', minHeight: 'calc(var(--recipe-cell) * 2)' }}
            >
              <ListItemText
                primary="Default home view"
                secondary="Select which view to display on launch"
                slotProps={{
                  primary: { id: `${id}-home-view`, variant: 'body2' },
                  secondary: { id: `${id}-home-view-desc`, variant: 'caption' },
                }}
              />
              <Select
                labelId={`${id}-home-view`}
                aria-describedby={`${id}-home-view-desc`}
                defaultValue="Dashboard"
                sx={{ minWidth: CONTROL_MIN_WIDTH }}
              >
                <MenuItem value="Dashboard">Dashboard</MenuItem>
                <MenuItem value="My issues">My issues</MenuItem>
                <MenuItem value="Inbox">Inbox</MenuItem>
              </Select>
            </ListItem>
            <ListItem
              divider
              sx={{ gap: 'small', minHeight: 'calc(var(--recipe-cell) * 2)' }}
            >
              <ListItemText
                primary="Display names"
                secondary="Select how names are shown across the interface"
                slotProps={{
                  primary: { id: `${id}-display-names`, variant: 'body2' },
                  secondary: { id: `${id}-display-names-desc`, variant: 'caption' },
                }}
              />
              <Select
                labelId={`${id}-display-names`}
                aria-describedby={`${id}-display-names-desc`}
                defaultValue="Full name"
                sx={{ minWidth: CONTROL_MIN_WIDTH }}
              >
                <MenuItem value="Full name">Full name</MenuItem>
                <MenuItem value="Username">Username</MenuItem>
                <MenuItem value="Initials">Initials</MenuItem>
              </Select>
            </ListItem>
            <ListItem
              divider
              sx={{ gap: 'small', minHeight: 'calc(var(--recipe-cell) * 2)' }}
            >
              <ListItemText
                primary="First day of the week"
                secondary="Used for date pickers"
                slotProps={{
                  primary: { id: `${id}-first-day`, variant: 'body2' },
                  secondary: { id: `${id}-first-day-desc`, variant: 'caption' },
                }}
              />
              <Select
                labelId={`${id}-first-day`}
                aria-describedby={`${id}-first-day-desc`}
                defaultValue="Sunday"
                sx={{ minWidth: CONTROL_MIN_WIDTH }}
              >
                <MenuItem value="Sunday">Sunday</MenuItem>
                <MenuItem value="Monday">Monday</MenuItem>
              </Select>
            </ListItem>
            <ListItem
              sx={{ gap: 'small', minHeight: 'calc(var(--recipe-cell) * 2)' }}
            >
              <ListItemText
                primary="Convert text emoticons into emoji"
                secondary="Strings like :) are replaced as you type"
                slotProps={{
                  primary: { id: `${id}-emoticons`, variant: 'body2' },
                  secondary: { id: `${id}-emoticons-desc`, variant: 'caption' },
                }}
              />
              <Switch
                edge="end"
                defaultChecked
                slotProps={{
                  input: {
                    'aria-labelledby': `${id}-emoticons`,
                    'aria-describedby': `${id}-emoticons-desc`,
                  },
                }}
              />
            </ListItem>
          </List>
        </Paper>
      </Stack>
      <Stack
        component="section"
        aria-labelledby={`${id}-interface`}
        sx={{ gap: 'x-small' }}
      >
        <Typography
          variant="overline"
          component="h4"
          id={`${id}-interface`}
          sx={{ color: 'text.secondary' }}
        >
          Interface and theme
        </Typography>
        <Paper variant="outlined" sx={{ bgcolor: 'transparent' }}>
          <List disablePadding>
            <ListItem
              divider
              sx={{ gap: 'small', minHeight: 'calc(var(--recipe-cell) * 2)' }}
            >
              <ListItemText
                primary="App sidebar"
                secondary="Item visibility, ordering, and badge style"
                slotProps={{
                  primary: { id: `${id}-sidebar`, variant: 'body2' },
                  secondary: { id: `${id}-sidebar-desc`, variant: 'caption' },
                }}
              />
              <Button
                variant="text"
                aria-describedby={`${id}-sidebar-desc`}
                sx={{ mr: '-x-small' }}
              >
                Customize
              </Button>
            </ListItem>
            <ListItem
              divider
              sx={{ gap: 'small', minHeight: 'calc(var(--recipe-cell) * 2)' }}
            >
              <ListItemText
                primary="Theme"
                secondary="Match the system or pick one"
                slotProps={{
                  primary: { id: `${id}-theme`, variant: 'body2' },
                  secondary: { id: `${id}-theme-desc`, variant: 'caption' },
                }}
              />
              <Select
                labelId={`${id}-theme`}
                aria-describedby={`${id}-theme-desc`}
                defaultValue="System"
                sx={{ minWidth: CONTROL_MIN_WIDTH }}
              >
                <MenuItem value="System">System</MenuItem>
                <MenuItem value="Light">Light</MenuItem>
                <MenuItem value="Dark">Dark</MenuItem>
              </Select>
            </ListItem>
            <ListItem
              divider
              sx={{ gap: 'small', minHeight: 'calc(var(--recipe-cell) * 2)' }}
            >
              <ListItemText
                primary="Font size"
                secondary="Adjust the size of text across the app"
                slotProps={{
                  primary: { id: `${id}-font-size`, variant: 'body2' },
                  secondary: { id: `${id}-font-size-desc`, variant: 'caption' },
                }}
              />
              <Select
                labelId={`${id}-font-size`}
                aria-describedby={`${id}-font-size-desc`}
                defaultValue="Default"
                sx={{ minWidth: CONTROL_MIN_WIDTH }}
              >
                <MenuItem value="Small">Small</MenuItem>
                <MenuItem value="Default">Default</MenuItem>
                <MenuItem value="Large">Large</MenuItem>
              </Select>
            </ListItem>
            <ListItem
              sx={{ gap: 'small', minHeight: 'calc(var(--recipe-cell) * 2)' }}
            >
              <ListItemText
                primary="Use pointer cursors"
                secondary="Show a pointer over interactive elements"
                slotProps={{
                  primary: { id: `${id}-pointer`, variant: 'body2' },
                  secondary: { id: `${id}-pointer-desc`, variant: 'caption' },
                }}
              />
              <Switch
                edge="end"

                slotProps={{
                  input: {
                    'aria-labelledby': `${id}-pointer`,
                    'aria-describedby': `${id}-pointer-desc`,
                  },
                }}
              />
            </ListItem>
          </List>
        </Paper>
      </Stack>
    </Stack>
  );
}

const recipeUis = [
  { id: 'pricing', label: 'Pricing', Component: PricingUi },
  { id: 'product', label: 'Product', Component: ProductUi },
  { id: 'settings', label: 'Settings', Component: SettingsUi },
];

export default recipeUis;
