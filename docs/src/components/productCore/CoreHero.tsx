import * as React from 'react';
import { ThemeProvider, createTheme, Theme } from '@material-ui/core/styles';
import Alert from '@material-ui/core/Alert';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Stack from '@material-ui/core/Stack';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CheckCircleRounded from '@material-ui/icons/CheckCircleRounded';
import CakeRounded from '@material-ui/icons/CakeRounded';
import CelebrationRounded from '@material-ui/icons/CelebrationRounded';
import AttractionsRounded from '@material-ui/icons/AttractionsRounded';
import ShoppingCartRounded from '@material-ui/icons/ShoppingCartRounded';
import LocalFireDepartment from '@material-ui/icons/LocalFireDepartment';
import AcUnitRounded from '@material-ui/icons/AcUnitRounded';
import FavoriteBorderRounded from '@material-ui/icons/FavoriteBorderRounded';
import ShareRounded from '@material-ui/icons/ShareRounded';
import RateReviewOutlined from '@material-ui/icons/RateReviewOutlined';
import GradientText from 'docs/src/components/typography/GradientText';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import IconImage from 'docs/src/components/icon/IconImage';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/core/Rating';
import Switch from '@material-ui/core/Switch';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
import Badge from '@material-ui/core/Badge';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const ToggleButtons = () => {
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
};

const TabsDemo = () => {
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
};

const BadgeVisibilityDemo = () => {
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
};

const SwitchToggleDemo = () => {
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
};

const SlideDemo = () => {
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
};

export default function Hero() {
  return (
    <HeroContainer
      left={
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            fontWeight="bold"
            variant="body2"
            color={(theme) => (theme.palette.mode === 'dark' ? 'primary.400' : 'primary.600')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'flex-start' },
              '& > *': { mr: 1, width: 28, height: 28 },
            }}
          >
            <IconImage name="product-core" /> Core
          </Typography>
          <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
            Ready to use, <br />
            <GradientText>forever free</GradientText>,<br /> components
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
            Get a growing list of components, ready to use, forever free with built-in
            accessibility. We&apos;ve built the foundational UI blocks for your design system so you
            don&apos;t have to.
          </Typography>
          <GetStartedButtons sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }} />
        </Box>
      }
      rightSx={{
        p: 3,
        minWidth: 2000,
        flexDirection: 'column',
      }}
      right={
        <ThemeProvider
          theme={(theme: Theme) =>
            createTheme({
              palette: {
                mode: theme.palette.mode,
                primary: theme.palette.primary,
                grey: theme.palette.grey,
                background: theme.palette.background,
              },
            })
          }
        >
          <Paper sx={{ maxWidth: 672, p: 2, mb: 4 }}>
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
                width: 320,
                display: 'inline-flex',
                verticalAlign: 'top',
              },
            }}
          >
            <Stack spacing={4}>
              <Box>
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
              </Box>
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
              <TextField defaultValue="Ultraviolet" label="Basement" />
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <BadgeVisibilityDemo />
                <Paper
                  variant="outlined"
                  elevation={0}
                  sx={{
                    py: 2,
                    px: 1,
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
                      sx={{ bgcolor: 'primary.50', color: 'primary.600' }}
                      aria-label="recipe"
                    >
                      <b>YN</b>
                    </Avatar>
                  }
                  title="Yosemite National Park"
                  subheader="California, United States"
                />
                <CardMedia
                  sx={{
                    height: 0,
                    paddingTop: '34%', // 16:9
                  }}
                  image="/static/images/cards/yosemite.jpeg"
                  title="Paella dish"
                />
                <CardContent sx={{ pb: 0 }}>
                  <Typography variant="body2" color="text.secondary">
                    Not just a great valley, but a shrine to human foresight, the strength of
                    granite, the power of glaciers, the persistence of life, and the tranquility of
                    the High Sierra. It’s famed for its giant, ancient sequoia trees, and the
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
        </ThemeProvider>
      }
    />
  );
}
