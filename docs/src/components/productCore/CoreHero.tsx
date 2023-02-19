import * as React from 'react';
import {
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import CakeRounded from '@mui/icons-material/CakeRounded';
import CelebrationRounded from '@mui/icons-material/CelebrationRounded';
import AttractionsRounded from '@mui/icons-material/AttractionsRounded';
import ShoppingCartRounded from '@mui/icons-material/ShoppingCartRounded';
import LocalFireDepartment from '@mui/icons-material/LocalFireDepartment';
import AcUnitRounded from '@mui/icons-material/AcUnitRounded';
import FavoriteBorderRounded from '@mui/icons-material/FavoriteBorderRounded';
import ShareRounded from '@mui/icons-material/ShareRounded';
import RateReviewOutlined from '@mui/icons-material/RateReviewOutlined';
import GradientText from 'docs/src/components/typography/GradientText';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import IconImage from 'docs/src/components/icon/IconImage';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMore';
import Rating from '@mui/material/Rating';
import Switch from '@mui/material/Switch';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Badge from '@mui/material/Badge';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ButtonGroup from '@mui/material/ButtonGroup';
import { getDesignTokens } from 'docs/src/modules/brandingTheme';

function ToggleButtons() {
  const [alignment, setAlignment] = React.useState('left');
  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={(event, newAlignment) => {
        setAlignment(newAlignment);
      }}
      aria-label="text alignment"
    >
      <ToggleButton value="left" aria-label="left aligned" size="small">
        <FormatAlignLeftIcon fontSize="small" />
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered" size="small">
        <FormatAlignCenterIcon fontSize="small" />
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned" size="small">
        <FormatAlignRightIcon fontSize="small" />
      </ToggleButton>
      <ToggleButton value="justify" aria-label="justified" size="small" disabled>
        <FormatAlignJustifyIcon fontSize="small" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

function TabsDemo() {
  const [index, setIndex] = React.useState(0);
  return (
    <Paper>
      <Tabs
        value={index}
        onChange={(event, newIndex) => setIndex(newIndex)}
        variant="fullWidth"
        aria-label="icon label tabs example"
      >
        <Tab icon={<CakeRounded fontSize="small" />} label="Cakes" />
        <Tab icon={<CelebrationRounded fontSize="small" />} label="Party" />
        <Tab icon={<AttractionsRounded fontSize="small" />} label="Park" />
      </Tabs>
    </Paper>
  );
}

function BadgeVisibilityDemo() {
  const [count, setCount] = React.useState(1);
  return (
    <Paper
      variant="outlined"
      elevation={0}
      sx={{
        color: 'action.active',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiBadge-root': {
          marginRight: 4,
        },
      }}
    >
      <div>
        <Badge color="primary" badgeContent={count}>
          <ShoppingCartRounded fontSize="small" />
        </Badge>
        <ButtonGroup>
          <Button
            size="small"
            aria-label="reduce"
            onClick={() => {
              setCount(Math.max(count - 1, 0));
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            size="small"
            aria-label="increase"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </div>
    </Paper>
  );
}

function SwitchToggleDemo() {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  return (
    <Box
      sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    >
      <Switch {...label} defaultChecked />
      <Switch {...label} />
      <ToggleButtons />
    </Box>
  );
}

function SlideDemo() {
  const [value, setValue] = React.useState([30, 60]);
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <AcUnitRounded
        fontSize="small"
        color="primary"
        sx={{ opacity: `max(0.4, ${(100 - value[0]) / 100})` }}
      />
      <Slider
        aria-labelledby="temperature-slider"
        value={value}
        onChange={(_, newValue) => setValue(newValue as number[])}
      />
      <LocalFireDepartment
        fontSize="small"
        color="error"
        sx={{ opacity: `max(0.4, ${value[1] / 100})` }}
      />
    </Stack>
  );
}

const { palette: lightPalette } = getDesignTokens('light');
const { palette: darkPalette } = getDesignTokens('dark');

const customTheme = extendTheme({
  cssVarPrefix: 'hero',
  colorSchemes: {
    light: {
      palette: {
        ...(lightPalette?.primary && { primary: lightPalette?.primary }),
        ...(lightPalette?.grey && { grey: lightPalette?.grey }),
        ...(lightPalette?.background && { background: lightPalette?.background }),
      },
    },
    dark: {
      palette: {
        ...(darkPalette?.primary && { primary: darkPalette?.primary }),
        ...(darkPalette?.grey && { grey: darkPalette?.grey }),
        ...(darkPalette?.background && { background: darkPalette?.background }),
      },
    },
  },
});

export default function Hero() {
  return (
    <HeroContainer
      left={
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            fontWeight="bold"
            variant="body2"
            sx={(theme) => ({
              color: 'primary.600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'flex-start' },
              '& > *': { mr: 1 },
              ...theme.applyDarkStyles({
                color: 'primary.400',
              }),
            })}
          >
            <IconImage width={28} height={28} name="product-core" /> MUI Core
          </Typography>
          <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
            Ready to use components, <br />
            <GradientText>free forever</GradientText>
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
            Get a growing list of React components, ready-to-use, free forever, and with
            accessibility always in mind. We&apos;ve built the foundational UI blocks for your
            design system so you don&apos;t have to.
          </Typography>
          <GetStartedButtons />
        </Box>
      }
      rightSx={{
        p: 3,
        minWidth: 2000,
        flexDirection: 'column',
        overflow: 'hidden', // the components on the Hero section are mostly illustrative, even though they're interactive. That's why scrolling is disabled.
      }}
      right={
        <CssVarsProvider theme={customTheme}>
          <Paper sx={{ maxWidth: 780, p: 2, mb: 4 }}>
            <Stepper activeStep={1}>
              <Step>
                <StepLabel>Search for React UI libraries</StepLabel>
              </Step>
              <Step>
                <StepLabel>Spot MUI</StepLabel>
              </Step>
              <Step>
                <StepLabel>Choose MUI</StepLabel>
              </Step>
            </Stepper>
          </Paper>
          <Box
            sx={{
              '& > div': {
                width: 370,
                display: 'inline-flex',
                verticalAlign: 'top',
              },
            }}
          >
            <Stack spacing={4}>
              <div>
                <Accordion
                  elevation={0}
                  variant="outlined"
                  defaultExpanded
                  disableGutters
                  sx={{ borderBottom: 0 }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreRoundedIcon fontSize="small" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="body2">Usage</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      MUI components work in isolation. They are self-supporting, and will only
                      inject the styles they need to display.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion elevation={0} variant="outlined" disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreRoundedIcon fontSize="small" />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography variant="body2">Globals</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      MUI usage experience can be improved with a handful of important globals that
                      you&apos;ll need to be aware of.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion disabled elevation={0} disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreRoundedIcon fontSize="small" />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography variant="body2">Secret Files</Typography>
                  </AccordionSummary>
                </Accordion>
              </div>
              {/* <DatePickerDemo /> */}
              <Alert variant="filled" color="info" icon={<CheckCircleRounded fontSize="small" />}>
                Check out this library!
              </Alert>
              <SwitchToggleDemo />
              <TabsDemo />
              <Paper elevation={0} variant="outlined" sx={{ overflow: 'hidden' }}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Brunch this weekend?"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Michael Scott
                          </Typography>
                          {" — I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Summer BBQ"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            to Jim, Pam and Ryan
                          </Typography>
                          {" — Wish I could come, but I'm out of town this…"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </Paper>
            </Stack>
            <Stack spacing={4} sx={{ ml: 4, '& > .MuiPaper-root': { maxWidth: 'none' } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" startIcon={<ShoppingCartRounded fontSize="small" />}>
                  Add to Cart
                </Button>
                <Button variant="outlined" startIcon={<ShoppingCartRounded fontSize="small" />}>
                  Add to Cart
                </Button>
              </Box>
              <Paper elevation={0} variant="outlined" sx={{ p: 2 }}>
                <Typography
                  id="temperature-slider"
                  component="div"
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: 400 }}
                >
                  Temperature range
                </Typography>
                <SlideDemo />
              </Paper>
              <TextField id="core-hero-input" defaultValue="Ultraviolet" label="Basement" />
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <BadgeVisibilityDemo />
                <Paper
                  variant="outlined"
                  elevation={0}
                  sx={{
                    py: 2,
                    px: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                </Paper>
              </Box>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ bgcolor: 'primary.50', color: 'primary.600', fontWeight: 'bold' }}
                    >
                      YN
                    </Avatar>
                  }
                  title="Yosemite National Park"
                  subheader="California, United States"
                />
                <CardMedia
                  height={125}
                  alt=""
                  component="img"
                  image="/static/images/cards/yosemite.jpeg"
                />
                <CardContent sx={{ pb: 0 }}>
                  <Typography variant="body2" color="text.secondary">
                    Not just a great valley, but a shrine to human foresight, the strength of
                    granite, the power of glaciers, the persistence of life, and the tranquility of
                    the High Sierra. It&apos;s famed for its giant, ancient sequoia trees, and the
                    granite cliffs of El Capitan and Half Dome.
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteBorderRounded fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareRounded fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="share" sx={{ ml: 'auto' }}>
                    <RateReviewOutlined fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            </Stack>
          </Box>
        </CssVarsProvider>
      }
    />
  );
}
