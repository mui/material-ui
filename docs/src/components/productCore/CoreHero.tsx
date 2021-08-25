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
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
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
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import StaticDatePicker from '@material-ui/lab/StaticDatePicker';
import GradientText from 'docs/src/components/typography/GradientText';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import IconImage from 'docs/src/components/icon/IconImage';

const DatePickerDemo = () => {
  const [value, setValue] = React.useState<Date | null>(new Date());
  return (
    <Paper sx={{ '& > div': { bgcolor: 'transparent' } }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Paper>
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
        <Tab icon={<CakeRounded />} label="Cakes" />
        <Tab icon={<CelebrationRounded />} label="Party" />
        <Tab icon={<AttractionsRounded />} label="Park" />
      </Tabs>
    </Paper>
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
              '& > *': { mr: 1, width: 28, height: 28 },
            }}
          >
            <IconImage name="product-core" /> Advanced
          </Typography>
          <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
            Ready to use, <br />
            <GradientText>forever free</GradientText>,<br /> components.
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
            <Stepper activeStep={0}>
              <Step>
                <StepLabel>Select campaign settings</StepLabel>
              </Step>
              <Step>
                <StepLabel>Create an ad group</StepLabel>
              </Step>
              <Step>
                <StepLabel>Create an ad</StepLabel>
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
              <DatePickerDemo />
              <Alert variant="filled" color="info" icon={<CheckCircleRounded />}>
                Check out this alert!
              </Alert>
              <TabsDemo />
              <Paper sx={{ overflow: 'hidden' }}>
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
                            Ali Connors
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
                            to Scott, Alex, Jennifer
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
              <Box sx={{ display: 'flex' }}>
                <Button variant="contained" startIcon={<ShoppingCartRounded />}>
                  Add to Cart
                </Button>
                <Button variant="outlined" startIcon={<ShoppingCartRounded />} sx={{ ml: 2 }}>
                  Add to Cart
                </Button>
              </Box>
              <Paper sx={{ p: 2 }}>
                <Typography sx={{ mb: 1 }} variant="subtitle2">
                  Room temperature range
                </Typography>
                <Stack spacing={2} direction="row" alignItems="center">
                  <AcUnitRounded sx={{ opacity: 0.4 }} />
                  <Slider getAriaLabel={() => 'Temperature range'} defaultValue={[30, 60]} />
                  <LocalFireDepartment sx={{ opacity: 0.4 }} />
                </Stack>
              </Paper>
              <TextField defaultValue="Ultraviolet" label="Basement" />
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ bgcolor: 'primary.100', color: 'primary.700' }}
                      aria-label="recipe"
                    >
                      YN
                    </Avatar>
                  }
                  title="Yosemite National Park"
                  subheader="California, United States"
                />
                <CardMedia
                  sx={{
                    height: 0,
                    paddingTop: '30%', // 16:9
                  }}
                  image="/static/images/cards/yosemite.jpeg"
                  title="Paella dish"
                />
                <CardContent sx={{ pb: 0 }}>
                  <Typography variant="body2" color="text.secondary">
                    It’s famed for its giant, ancient sequoia trees, and for Tunnel View, the iconic
                    vista of towering Bridalveil Fall and the granite cliffs of El Capitan and Half
                    Dome.
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteBorderRounded size="small" />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareRounded size="small" />
                  </IconButton>
                  <IconButton aria-label="share" sx={{ ml: 'auto' }}>
                    <RateReviewOutlined size="small" />
                  </IconButton>
                </CardActions>
              </Card>
              <FormControl component="fieldset">
                <FormLabel component="legend">Do you accept our terms?</FormLabel>
                <RadioGroup
                  aria-label="terms and conditions"
                  defaultValue="yes"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes, I accept the terms and condition."
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No." />
                </RadioGroup>
              </FormControl>
            </Stack>
          </Box>
        </ThemeProvider>
      }
    />
  );
}
