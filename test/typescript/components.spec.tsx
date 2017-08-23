import React from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  BottomNavigation,
  BottomNavigationButton,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Snackbar,
  SnackbarContent,
  Switch,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from '../../src';
import Collapse from '../../src/transitions/Collapse';
import { GridList } from '../../src/GridList';
import MobileStepper from '../../src/MobileStepper/MobileStepper';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '../../src/Table';
import { withStyles, StyleRulesCallback } from '../../src/styles';

const log = console.log;
const FakeIcon = () => <div>ICON</div>;

const AppBarTest = () =>
  <AppBar position="static">
    <Toolbar>
      <IconButton color="contrast" aria-label="Menu">
        <FakeIcon />
      </IconButton>
      <Typography type="title" color="inherit">
        Title
      </Typography>
      <Button color="contrast">Login</Button>
    </Toolbar>
  </AppBar>;

const AvatarTest = () => <Avatar alt="Image Alt" src="example.jpg" />;

const BadgeTest = () =>
  <Badge badgeContent={4} color="primary">
    <FakeIcon />
  </Badge>;

const BottomNavigationTest = () => {
  const value = 123;
  const handleChange = (e: React.SyntheticEvent<any>) => log(e);

  return (
    <BottomNavigation value={value} onChange={handleChange} showLabels>
      <BottomNavigationButton label="Recents" icon={<FakeIcon />} />
      <BottomNavigationButton label="Favorites" />
      <BottomNavigationButton label={<span>Nearby</span>} icon={<FakeIcon />} />
    </BottomNavigation>
  );
};

const ButtonTest = () =>
  <div>
    <Button>I am a button!</Button>
    <Button color="contrast">Contrast</Button>
    <Button disabled>Disabled</Button>
    <Button href="#flat-buttons">Link</Button>
    <Button dense>Dense</Button>
    <Button raised>Raised</Button>
    <Button fab color="primary" aria-label="add">
      <FakeIcon />
    </Button>
  </div>;

const IconButtonTest = () =>
  <div>
    <IconButton aria-label="Delete">
      <FakeIcon />
    </IconButton>
    <IconButton aria-label="Delete" disabled>
      <FakeIcon />
    </IconButton>
    <IconButton color="accent" aria-label="Add an alarm">
      <FakeIcon />
    </IconButton>
    <IconButton color="contrast" aria-label="Add to shopping cart">
      <FakeIcon />
    </IconButton>
    <IconButton color="primary" aria-label="Add to shopping cart">
      <FakeIcon />
    </IconButton>
  </div>;

const CardTest = () =>
  <Card>
    <CardContent>
      <Typography type="body1">Word of the Day</Typography>
      <Typography type="headline" component="h2">
        be-nev-o-lent
      </Typography>
      <Typography type="body1">adjective</Typography>
      <Typography component="p">
        well meaning and kindly.<br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button dense>Learn More</Button>
    </CardActions>
  </Card>;

const CardMediaTest = () =>
  <Card>
    <CardHeader
      avatar={<Avatar aria-label="Recipe">R</Avatar>}
      title="Shrimp and Chorizo Paella"
      subheader="September 14, 2016"
    />
    <CardMedia>
      <img src={'image/src.png'} alt="Contemplative Reptile" />
    </CardMedia>
    <CardContent>
      <Typography component="p">
        This impressive paella is a perfect party dish and a fun meal to cook
        together with your guests. Add 1 cup of frozen peas along with the
        mussels, if you like.
      </Typography>
    </CardContent>
    <CardActions disableActionSpacing>
      <IconButton aria-label="Add to favorites">
        <FakeIcon />
      </IconButton>
      <IconButton aria-label="Share">
        <FakeIcon />
      </IconButton>
      <IconButton aria-label="Show more">
        <FakeIcon />
      </IconButton>
    </CardActions>
    <Collapse in={true} transitionDuration="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph type="body2">
          Method:
        </Typography>
        <Typography paragraph>
          Heat 1/2 cup of the broth in a pot until simmering, add saffron and
          set aside for 10 minutes.
        </Typography>
        <Typography paragraph>
          Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
          over medium-high heat. Add chicken, shrimp and chorizo, and cook,
          stirring occasionally until lightly browned, 6 to 8 minutes. Transfer
          shrimp to a large plate and set aside, leaving chicken and chorizo in
          the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
          pepper, and cook, stirring often until thickened and fragrant, about
          10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth;
          bring to a boil.
        </Typography>
        <Typography paragraph>
          Add rice and stir very gently to distribute. Top with artichokes and
          peppers, and cook without stirring, until most of the liquid is
          absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
          shrimp and mussels, tucking them down into the rice, and cook again
          without stirring, until mussels have opened and rice is just tender, 5
          to 7 minutes more. (Discard any mussels that don’t open.)
        </Typography>
        <Typography>
          Set aside off of the heat to let rest for 10 minutes, and then serve.
        </Typography>
      </CardContent>
    </Collapse>
  </Card>;

const ChipsTest = () =>
  <div>
    <Chip label="Basic Chip" />
    <Chip
      avatar={<Avatar>MB</Avatar>}
      label="Clickable Chip"
      onClick={(e: React.SyntheticEvent<any>) => log(e)}
    />
    <Chip
      avatar={<Avatar src={'image.bmp'} />}
      label="Deletable Chip"
      onRequestDelete={(e: React.SyntheticEvent<any>) => log(e)}
    />
    <Chip
      avatar={
        <Avatar>
          <FakeIcon />
        </Avatar>
      }
      label="Clickable Deletable Chip"
      onClick={(e: React.SyntheticEvent<any>) => log(e)}
      onRequestDelete={(e: React.SyntheticEvent<any>) => log(e)}
    />
  </div>;

const DialogTest = () => {
  const emails = ['username@gmail.com', 'user02@gmail.com'];
  return (
    <Dialog onRequestClose={this.handleRequestClose}>
      <DialogTitle>Set backup account</DialogTitle>
      <div>
        <List>
          {emails.map(email =>
            <ListItem
              button
              onClick={(e: React.SyntheticEvent<any>) => log(e)}
              key={email}
            >
              <ListItemAvatar>
                <Avatar>
                  <FakeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItem>
          )}
          <ListItem button onClick={(e: React.SyntheticEvent<any>) => log(e)}>
            <ListItemAvatar>
              <Avatar>
                <FakeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="add account" />
          </ListItem>
        </List>
      </div>
    </Dialog>
  );
};

const DividerTest = () =>
  <div>
    <Divider />
    <Divider light />
  </div>;

const DrawerTest = () => {
  const open = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };
  return (
    <div>
      <Drawer
        open={open.left}
        onRequestClose={(e: React.SyntheticEvent<any>) => log(e)}
        onClick={(e: React.SyntheticEvent<any>) => log(e)}
      >
        List
      </Drawer>
      <Drawer
        anchor="top"
        open={open.top}
        onRequestClose={(e: React.SyntheticEvent<any>) => log(e)}
        onClick={(e: React.SyntheticEvent<any>) => log(e)}
      >
        List
      </Drawer>
      <Drawer
        anchor="bottom"
        open={open.bottom}
        onRequestClose={(e: React.SyntheticEvent<any>) => log(e)}
        onClick={(e: React.SyntheticEvent<any>) => log(e)}
      >
        List
      </Drawer>
      <Drawer
        anchor="right"
        open={open.right}
        onRequestClose={(e: React.SyntheticEvent<any>) => log(e)}
        onClick={(e: React.SyntheticEvent<any>) => log(e)}
      >
        List
      </Drawer>
    </div>
  );
};

const DockedDrawerTest = () =>
  class DockedDrawer extends React.Component<{}, { docked: boolean }> {
    state = { docked: true };
    render() {
      const docked: true | false = this.state.docked;
      return (
        <Drawer anchor="bottom" open={true} docked={docked}>
          List
        </Drawer>
      );
    }
  };

const GridListTest = () =>
  <GridList cellHeight={160} cols={3}>
    <GridListTest cols={1}>
      <img src="img.png" alt="alt text" />
    </GridListTest>,
  </GridList>;

const ListTest = () =>
  <List>
    {[0, 1, 2, 3].map(value =>
      <ListItem
        dense
        button
        key={value}
        onClick={(e: React.SyntheticEvent<any>) => log(e)}
      >
        <Checkbox checked={true} tabIndex="-1" disableRipple />
        <ListItemText primary={`Line item ${value + 1}`} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Comments">
            <FakeIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )}
  </List>;

const MenuTest = () => {
  const anchorEl = document.getElementById('foo');
  const options = [
    'Show all notification content',
    'Hide sensitive notification content',
    'Hide all notification content',
  ];

  return (
    <Menu
      id="lock-menu"
      anchorEl={anchorEl}
      open={true}
      onRequestClose={(e: React.SyntheticEvent<any>) => log(e)}
    >
      {options.map((option, index) =>
        <MenuItem
          key={option}
          selected={false}
          onClick={(e: React.SyntheticEvent<any>) => log(e)}
        >
          {option}
        </MenuItem>
      )}
    </Menu>
  );
};

const PaperTest = () =>
  <Paper elevation={4}>
    <Typography type="headline" component="h3">
      This is a sheet of paper.
    </Typography>
    <Typography type="body1" component="p">
      Paper can be used to build surface or other elements for your application.
    </Typography>
  </Paper>;

const CircularProgessTest = () =>
  <div>
    <CircularProgress />
    <CircularProgress size={50} />
    <CircularProgress color="accent" />
    <CircularProgress color="accent" size={50} />
  </div>;

const LinearProgressTest = () =>
  <div>
    <LinearProgress mode="determinate" value={12} />
    <LinearProgress color="accent" mode="determinate" value={76} />
  </div>;

const SelectionControlTest = () => {
  const state = {
    checkedA: true,
    checkedB: false,
    checkedF: true,
  };

  const handleChange = name => (
    event: React.SyntheticEvent<any>,
    checked: boolean
  ) => log({ [name]: checked });

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedA}
            onChange={handleChange('checkedA')}
            value="checkedA"
          />
        }
        label="Option A"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange('checkedB')}
            value="checkedB"
          />
        }
        label="Option B"
      />
      <FormControlLabel
        control={<Checkbox value="checkedC" />}
        label="Option C"
      />
      <FormControlLabel
        disabled
        control={<Checkbox value="checkedD" />}
        label="Disabled"
      />
      <FormControlLabel
        disabled
        control={<Checkbox checked value="checkedE" />}
        label="Disabled"
      />
      <FormControlLabel
        disabled
        control={<Checkbox checked value="checkedE" indeterminate />}
        label="Indeterminate"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={true}
            onChange={handleChange('checkedF')}
            value="checkedF"
          />
        }
        label="Custom color"
      />
    </FormGroup>
  );
};

const SwitchTest = () => {
  const state = {
    checkedA: true,
    checkedB: false,
    checkedE: true,
  };
  const handleChange = name => (
    event: React.SyntheticEvent<any>,
    checked: boolean
  ) => log({ [name]: checked });

  return (
    <div>
      <Switch
        checked={state.checkedA}
        onChange={handleChange('checkedA')}
        aria-label="checkedA"
      />
      <Switch
        checked={state.checkedB}
        onChange={handleChange('checkedB')}
        aria-label="checkedB"
      />
      <Switch checked={false} aria-label="checkedC" disabled />
      <Switch checked aria-label="checkedD" disabled />
      <Switch
        checked={state.checkedE}
        onChange={handleChange('checkedE')}
        aria-label="checkedD"
      />
    </div>
  );
};

const SnackbarTest = () =>
  <div>
    <Button onClick={(e: React.SyntheticEvent<any>) => log(e)}>
      Open simple snackbar
    </Button>
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={true}
      autoHideDuration={6e3}
      onRequestClose={(e: React.SyntheticEvent<any>) => log(e)}
      SnackbarContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">Note archived</span>}
      action={[
        <Button
          key="undo"
          color="accent"
          dense
          onClick={(e: React.SyntheticEvent<any>) => log(e)}
        >
          UNDO
        </Button>,
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={(e: React.SyntheticEvent<any>) => log(e)}
        >
          <FakeIcon />
        </IconButton>,
      ]}
    />
  </div>;

const SnackbarContentTest = () => {
  const action = (
    <Button color="accent" dense>
      lorem ipsum dolorem
    </Button>
  );
  return (
    <div>
      <SnackbarContent message="I love snacks." action={action} />
      <SnackbarContent
        message={
          'I love candy. I love cookies. I love cupcakes. \
          I love cheesecake. I love chocolate.'
        }
      />
      <SnackbarContent
        message="I love candy. I love cookies. I love cupcakes."
        action={action}
      />
      <SnackbarContent
        message={
          'I love candy. I love cookies. I love cupcakes. \
          I love cheesecake. I love chocolate.'
        }
        action={action}
      />
    </div>
  );
};

const StepperTest = () =>
  class DotsMobileStepper extends React.Component<{
    classes: { root: string };
  }> {
    state = {
      activeStep: 0,
    };

    handleNext = () => {
      this.setState({
        activeStep: this.state.activeStep + 1,
      });
    };

    handleBack = () => {
      this.setState({
        activeStep: this.state.activeStep - 1,
      });
    };

    render() {
      const classes = this.props.classes;
      return (
        <MobileStepper
          type="dots"
          steps={6}
          position="static"
          activeStep={this.state.activeStep}
          className={classes.root}
          onBack={this.handleBack}
          onNext={this.handleNext}
          disableBack={this.state.activeStep === 0}
          disableNext={this.state.activeStep === 5}
        />
      );
    }
  };

const TableTest = () => {
  const styles: StyleRulesCallback = theme => ({
    paper: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
  });

  let id = 0;
  function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
  }

  const data = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  function BasicTable(props) {
    const classes = props.classes;

    return (
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell numeric>Calories</TableCell>
              <TableCell numeric>Fat (g)</TableCell>
              <TableCell numeric>Carbs (g)</TableCell>
              <TableCell numeric>Protein (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell>
                    {n.name}
                  </TableCell>
                  <TableCell numeric>
                    {n.calories}
                  </TableCell>
                  <TableCell numeric>
                    {n.fat}
                  </TableCell>
                  <TableCell numeric>
                    {n.carbs}
                  </TableCell>
                  <TableCell numeric>
                    {n.protein}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  return withStyles(styles)(BasicTable);
};

const TabsTest = () => {
  const TabContainer = props =>
    <div style={{ padding: 20 }}>
      {props.children}
    </div>;

  const styles = theme => ({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing.unit * 3,
      backgroundColor: theme.palette.background.paper,
    },
  });

  class BasicTabs extends React.Component<{ classes: { root: string } }> {
    state = {
      value: 0,
    };

    handleChange = (event, value) => {
      this.setState({ value });
    };

    render() {
      const classes = this.props.classes;

      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={this.state.value} onChange={this.handleChange}>
              <Tab label="Item One" />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
            </Tabs>
          </AppBar>
          {this.state.value === 0 &&
            <TabContainer>
              {'Item One'}
            </TabContainer>}
          {this.state.value === 1 &&
            <TabContainer>
              {'Item Two'}
            </TabContainer>}
          {this.state.value === 2 &&
            <TabContainer>
              {'Item Three'}
            </TabContainer>}
        </div>
      );
    }
  }

  return withStyles(styles)(BasicTabs);
};

const TextFieldTest = () =>
  <div>
    <TextField id="name" label="Name" value={'Alice'} />
    <TextField id="name" label={<strong>Name</strong>} value={'Alice'} />
    <TextField
      id="name"
      label="Name"
      value={'Alice'}
      onChange={(event: React.SyntheticEvent<any>) =>
        log({ name: event.currentTarget.value })}
    />
  </div>;
