---
productId: material-ui
title: React Dialog component
components: Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide
githubLabel: 'scope: dialog'
materialDesign: https://m2.material.io/components/dialogs
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
githubSource: packages/mui-material/src/Dialog
---

# Dialog

Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.

A Dialog is a type of [modal](/material-ui/react-modal/) window that appears in front of app content to provide critical information or ask for a decision. Dialogs disable all app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.

Dialogs are purposefully interruptive, so they should be used sparingly.

## Introduction

Dialogs are implemented using a collection of related components:

- Dialog: the parent component that renders the modal.
- Dialog Title: a wrapper used for the title of a Dialog.
- Dialog Actions: an optional container for a Dialog's Buttons.
- Dialog Content: an optional container for displaying the Dialog's content.
- Dialog Content Text: a wrapper for text inside of `<DialogContent />`.
- Slide: optional [Transition](/material-ui/transitions/#slide) used to slide the Dialog in from the edge of the screen.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem disablePadding key={email}>
            <ListItemButton onClick={() => handleListItemClick(email)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
```

## Basics

```jsx
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
```

## Alerts

Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.

Most alerts don't need titles.
They summarize a decision in a sentence or two by either:

- Asking a question (for example "Delete this conversation?")
- Making a statement related to the action buttons

Use title bar alerts only for high-risk situations, such as the potential loss of connectivity.
Users should be able to understand the choices based on the title and button text alone.

If a title is required:

- Use a clear question or statement with an explanation in the content area, such as "Erase USB storage?".
- Avoid apologies, ambiguity, or questions, such as "Warning!" or "Are you sure?"

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
```

## Transitions

You can also swap out the transition, the next example uses `Slide`.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
```

## Form dialogs

Form dialogs allow users to fill out form fields within a dialog.
For example, if your site prompts for potential subscribers to fill in their email address, they can fill out the email field and touch 'Submit'.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
```

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

The dialog has a close button added to aid usability.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
```

## Full-screen dialogs

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItemButton>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItemButton>
        </List>
      </Dialog>
    </React.Fragment>
  );
}
```

## Optional sizes

You can set a dialog maximum width by using the `maxWidth` enumerable in combination with the `fullWidth` boolean.
When the `fullWidth` prop is true, the dialog will adapt based on the `maxWidth` value.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';

export default function MaxWidthDialog() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullWidth(event.target.checked);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open max-width dialog
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Optional sizes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="max-width">maxWidth</InputLabel>
              <Select
                autoFocus
                value={maxWidth}
                onChange={handleMaxWidthChange}
                label="maxWidth"
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}
              >
                <MenuItem value={false as any}>false</MenuItem>
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              sx={{ mt: 1 }}
              control={
                <Switch checked={fullWidth} onChange={handleFullWidthChange} />
              }
              label="Full width"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
```

## Responsive full-screen

You may make a dialog responsively full screen using [`useMediaQuery`](/material-ui/react-use-media-query/).

```jsx
import useMediaQuery from '@mui/material/useMediaQuery';

function MyComponent() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return <Dialog fullScreen={fullScreen} />;
}
```

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
```

## Confirmation dialogs

Confirmation dialogs require users to explicitly confirm their choice before an option is committed.
For example, users can listen to multiple ringtones but only make a final selection upon touching "OK".

Touching "Cancel" in a confirmation dialog, cancels the action, discards any changes, and closes the dialog.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Phone Ringtone</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function ConfirmationDialog() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Dione');

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue?: string) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="div" role="group">
        <ListItemButton divider disabled>
          <ListItemText primary="Interruptions" />
        </ListItemButton>
        <ListItemButton
          divider
          aria-haspopup="true"
          aria-controls="ringtone-menu"
          aria-label="phone ringtone"
          onClick={handleClickListItem}
        >
          <ListItemText primary="Phone ringtone" secondary={value} />
        </ListItemButton>
        <ListItemButton divider disabled>
          <ListItemText primary="Default notification ringtone" secondary="Tethys" />
        </ListItemButton>
        <ConfirmationDialogRaw
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
      </List>
    </Box>
  );
}
```

## Non-modal dialog

Dialogs can also be non-modal, meaning they don't interrupt user interaction behind it.
Visit [the Nielsen Norman Group article](https://www.nngroup.com/articles/modal-nonmodal-dialog/) for more in-depth guidance about modal vs. non-modal dialog usage.

The demo below shows a persistent cookie banner, a common non-modal dialog use case.

```tsx
import * as React from 'react';
import Stack from '@mui/material/Stack';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function CookiesBanner() {
  const [bannerOpen, setBannerOpen] = React.useState(true);

  const closeBanner = () => {
    setBannerOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" component="nav">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ pt: 3 }}>
        <Toolbar />
        <Typography sx={{ marginBottom: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet.
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet.
        </Typography>
      </Container>
      <TrapFocus open disableAutoFocus disableEnforceFocus>
        <Fade appear={false} in={bannerOpen}>
          <Paper
            role="dialog"
            aria-modal="false"
            aria-label="Cookie banner"
            square
            variant="outlined"
            tabIndex={-1}
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              m: 0,
              p: 2,
              borderWidth: 0,
              borderTopWidth: 1,
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              sx={{ justifyContent: 'space-between', gap: 2 }}
            >
              <Box
                sx={{ flexShrink: 1, alignSelf: { xs: 'flex-start', sm: 'center' } }}
              >
                <Typography sx={{ fontWeight: 'bold' }}>
                  This website uses cookies
                </Typography>
                <Typography variant="body2">
                  example.com relies on cookies to improve your experience.
                </Typography>
              </Box>
              <Stack
                direction={{
                  xs: 'row-reverse',
                  sm: 'row',
                }}
                sx={{
                  gap: 2,
                  flexShrink: 0,
                  alignSelf: { xs: 'flex-end', sm: 'center' },
                }}
              >
                <Button size="small" onClick={closeBanner} variant="contained">
                  Allow all
                </Button>
                <Button size="small" onClick={closeBanner}>
                  Reject all
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Fade>
      </TrapFocus>
    </React.Fragment>
  );
}
```

## Draggable dialog

You can create a draggable dialog by using [react-draggable](https://github.com/react-grid-layout/react-draggable).
To do so, you can pass the imported `Draggable` component as the `PaperComponent` of the `Dialog` component.
This will make the entire dialog draggable.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props: PaperProps) {
  const nodeRef = React.useRef<HTMLDivElement>(null);
  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
}

export default function DraggableDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open draggable dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Subscribe
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
```

## Scrolling long content

When dialogs become too long for the user's viewport or device, they scroll.

- `scroll=paper` the content of the dialog scrolls within the paper element.
- `scroll=body` the content of the dialog scrolls within the body element.

Try the demo below to see what we mean:

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
      <Button onClick={handleClickOpen('body')}>scroll=body</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
```

## Performance

Follow the [Modal performance section](/material-ui/react-modal/#performance).

## Limitations

Follow the [Modal limitations section](/material-ui/react-modal/#limitations).

## Supplementary projects

For more advanced use cases you might be able to take advantage of:

### material-ui-confirm

![stars](https://img.shields.io/github/stars/jonatanklosko/material-ui-confirm?style=social&label=Star)
![npm downloads](https://img.shields.io/npm/dm/material-ui-confirm.svg)

The package [`material-ui-confirm`](https://github.com/jonatanklosko/material-ui-confirm/) provides dialogs for confirming user actions without writing boilerplate code.

## Accessibility

Follow the [Modal accessibility section](/material-ui/react-modal/#accessibility).

# Dialog API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Dialog](https://mui.com/material-ui/react-dialog/)

## Import

```jsx
import Dialog from '@mui/material/Dialog';
// or
import { Dialog } from '@mui/material';
```

## Props

| Name                           | Type                        | Default             | Required | Description |
| ------------------------------ | --------------------------- | ------------------- | -------- | ----------- |
| open                           | `bool`                      | -                   | Yes      |             |
| aria-describedby               | `string`                    | -                   | No       |             |
| aria-labelledby                | `string`                    | -                   | No       |             |
| aria-modal                     | `'false' \| 'true' \| bool` | `true`              | No       |             |
| BackdropComponent (deprecated) | `elementType`               | `styled(Backdrop, { |

name: 'MuiModal',
slot: 'Backdrop',
})({
zIndex: -1,
})`| No | ⚠️ Use`slots.backdrop`instead. While this prop currently works, it will be removed in the next major version. |
| children |`node`| - | No |  |
| classes |`object`| - | No | Override or extend the styles applied to the component. |
| disableEscapeKeyDown |`bool`|`false`| No |  |
| fullScreen |`bool`|`false`| No |  |
| fullWidth |`bool`|`false`| No |  |
| maxWidth |`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| false \| string`|`'sm'`| No |  |
| onClose |`function(event: object, reason: string) => void`| - | No |  |
| PaperComponent |`elementType`|`Paper`| No |  |
| PaperProps (deprecated) |`object`|`{}`| No | ⚠️ Use`slotProps.paper`instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| scroll |`'body' \| 'paper'`|`'paper'`| No |  |
| slotProps |`{ backdrop?: func \| object, container?: func \| object, paper?: func \| object, root?: func \| object, transition?: func \| object }`|`{}`| No |  |
| slots |`{ backdrop?: elementType, container?: elementType, paper?: elementType, root?: elementType, transition?: elementType }`|`{}`| No |  |
| sx |`Array<func \| object \| bool> \| func \| object`| - | No | The system prop that allows defining system overrides as well as additional CSS styles. |
| TransitionComponent (deprecated) |`elementType`|`Fade`| No | ⚠️ Use`slots.transition`instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| transitionDuration |`number \| { appear?: number, enter?: number, exit?: number }`|`{
enter: theme.transitions.duration.enteringScreen,
exit: theme.transitions.duration.leavingScreen,
}`| No |  |
| TransitionProps (deprecated) |`object`| - | No | ⚠️ Use`slotProps.transition` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([Modal](https://mui.com/material-ui/api/modal/)).

## Inheritance

While not explicitly documented above, the props of the [Modal](https://mui.com/material-ui/api/modal/) component are also available on Dialog.

## Theme default props

You can use `MuiDialog` to change the default props of this component with the theme.

## Slots

| Name                                                                                                                             | Default     | Class                  | Description                                |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------- | ------------------------------------------ |
| transition                                                                                                                       | `Collapse`  | -                      | The component that renders the transition. |
| [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component. |
| paper                                                                                                                            | `Paper`     | `.MuiDialog-paper`     | The component that renders the paper.      |
| container                                                                                                                        | `undefined` | `.MuiDialog-container` | The component that renders the container.  |
| backdrop                                                                                                                         | `undefined` | -                      | The component that renders the backdrop.   |
| root                                                                                                                             | `undefined` | `.MuiDialog-root`      | The component that renders the root.       |

## CSS

### Rule name

| Global class | Rule name        | Description                                                   |
| ------------ | ---------------- | ------------------------------------------------------------- |
| -            | paperFullScreen  | Styles applied to the Paper component if `fullScreen={true}`. |
| -            | paperFullWidth   | Styles applied to the Paper component if `fullWidth={true}`.  |
| -            | paperScrollBody  | Styles applied to the Paper component if `scroll="body"`.     |
| -            | paperScrollPaper | Styles applied to the Paper component if `scroll="paper"`.    |
| -            | paperWidthFalse  | Styles applied to the Paper component if `maxWidth=false`.    |
| -            | paperWidthLg     | Styles applied to the Paper component if `maxWidth="lg"`.     |
| -            | paperWidthMd     | Styles applied to the Paper component if `maxWidth="md"`.     |
| -            | paperWidthSm     | Styles applied to the Paper component if `maxWidth="sm"`.     |
| -            | paperWidthXl     | Styles applied to the Paper component if `maxWidth="xl"`.     |
| -            | paperWidthXs     | Styles applied to the Paper component if `maxWidth="xs"`.     |
| -            | scrollBody       | Styles applied to the container element if `scroll="body"`.   |
| -            | scrollPaper      | Styles applied to the container element if `scroll="paper"`.  |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Dialog/Dialog.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Dialog/Dialog.js)

# DialogActions API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Dialog](https://mui.com/material-ui/react-dialog/)

## Import

```jsx
import DialogActions from '@mui/material/DialogActions';
// or
import { DialogActions } from '@mui/material';
```

## Props

| Name           | Type                                              | Default | Required | Description                                                                             |
| -------------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children       | `node`                                            | -       | No       |                                                                                         |
| classes        | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| disableSpacing | `bool`                                            | `false` | No       |                                                                                         |
| sx             | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiDialogActions` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name | Description                                                        |
| ------------ | --------- | ------------------------------------------------------------------ |
| -            | root      | Styles applied to the root element.                                |
| -            | spacing   | Styles applied to the root element unless `disableSpacing={true}`. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/DialogActions/DialogActions.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/DialogActions/DialogActions.js)

# DialogContent API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Dialog](https://mui.com/material-ui/react-dialog/)

## Import

```jsx
import DialogContent from '@mui/material/DialogContent';
// or
import { DialogContent } from '@mui/material';
```

## Props

| Name     | Type                                              | Default | Required | Description                                                                             |
| -------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children | `node`                                            | -       | No       |                                                                                         |
| classes  | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| dividers | `bool`                                            | `false` | No       |                                                                                         |
| sx       | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiDialogContent` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name | Description                                              |
| ------------ | --------- | -------------------------------------------------------- |
| -            | dividers  | Styles applied to the root element if `dividers={true}`. |
| -            | root      | Styles applied to the root element.                      |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/DialogContent/DialogContent.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/DialogContent/DialogContent.js)

# DialogContentText API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Dialog](https://mui.com/material-ui/react-dialog/)

## Import

```jsx
import DialogContentText from '@mui/material/DialogContentText';
// or
import { DialogContentText } from '@mui/material';
```

## Props

| Name     | Type                                              | Default | Required | Description                                                                             |
| -------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children | `node`                                            | -       | No       |                                                                                         |
| classes  | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| sx       | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLParagraphElement).

> Any other props supplied will be provided to the root element ([Typography](https://mui.com/material-ui/api/typography/)).

## Inheritance

While not explicitly documented above, the props of the [Typography](https://mui.com/material-ui/api/typography/) component are also available on DialogContentText.

## Theme default props

You can use `MuiDialogContentText` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name | Description                         |
| ------------ | --------- | ----------------------------------- |
| -            | root      | Styles applied to the root element. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/DialogContentText/DialogContentText.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/DialogContentText/DialogContentText.js)

# DialogTitle API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Dialog](https://mui.com/material-ui/react-dialog/)

## Import

```jsx
import DialogTitle from '@mui/material/DialogTitle';
// or
import { DialogTitle } from '@mui/material';
```

## Props

| Name     | Type                                              | Default | Required | Description                                                                             |
| -------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children | `node`                                            | -       | No       |                                                                                         |
| classes  | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| sx       | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLHeadingElement).

> Any other props supplied will be provided to the root element ([Typography](https://mui.com/material-ui/api/typography/)).

## Inheritance

While not explicitly documented above, the props of the [Typography](https://mui.com/material-ui/api/typography/) component are also available on DialogTitle.

## Theme default props

You can use `MuiDialogTitle` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name | Description                         |
| ------------ | --------- | ----------------------------------- |
| -            | root      | Styles applied to the root element. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/DialogTitle/DialogTitle.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/DialogTitle/DialogTitle.js)

# Slide API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Dialog](https://mui.com/material-ui/react-dialog/)
- [Transitions](https://mui.com/material-ui/transitions/)

## Import

```jsx
import Slide from '@mui/material/Slide';
// or
import { Slide } from '@mui/material';
```

## Props

| Name           | Type                                          | Default  | Required | Description |
| -------------- | --------------------------------------------- | -------- | -------- | ----------- |
| children       | `element`                                     | -        | Yes      |             |
| addEndListener | `func`                                        | -        | No       |             |
| appear         | `bool`                                        | `true`   | No       |             |
| container      | `HTML element \| func`                        | -        | No       |             |
| direction      | `'down' \| 'left' \| 'right' \| 'up'`         | `'down'` | No       |             |
| easing         | `{ enter?: string, exit?: string } \| string` | `{       |

enter: theme.transitions.easing.easeOut,
exit: theme.transitions.easing.sharp,
}`| No |  |
| in |`bool`| - | No |  |
| timeout |`number \| { appear?: number, enter?: number, exit?: number }`|`{
enter: theme.transitions.duration.enteringScreen,
exit: theme.transitions.duration.leavingScreen,
}` | No | |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props)).

## Inheritance

While not explicitly documented above, the props of the [Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props) component are also available on Slide. A subset of components support [react-transition-group](https://reactcommunity.org/react-transition-group/transition/) out of the box.

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Slide/Slide.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Slide/Slide.js)
