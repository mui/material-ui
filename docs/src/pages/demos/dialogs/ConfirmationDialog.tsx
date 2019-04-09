import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
  value: string;
  open: boolean;
  onClose: (value: string) => void;
}

const useConfirmationDialogRawStyles = makeStyles({
  paper: {
    width: '80%',
    maxHeight: 435,
  },
});

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const classes = useConfirmationDialogRawStyles();
  const [value, setValue] = React.useState(props.value);
  const radioGroupRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function handleEntering() {
    if (radioGroupRef.current) {
      radioGroupRef.current.focus();
    }
  }

  function handleCancel() {
    props.onClose(props.value);
  }

  function handleOk() {
    props.onClose(value);
  }

  function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
    setValue(newValue);
  }

  const { value: valueProps, onClose, ...otherProps } = props;

  return (
    <Dialog
      classes={classes}
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      {...otherProps}
    >
      <DialogTitle id="confirmation-dialog-title">Phone Ringtone</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="Ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {options.map(option => (
            <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  value: PropTypes.string,
};

const useConfirmationDialogStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ConfirmationDialog() {
  const classes = useConfirmationDialogStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Dione');

  function handleClickListItem() {
    setOpen(true);
  }

  function handleClose(newValue: string) {
    setOpen(false);
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <List>
        <ListItem button divider disabled>
          <ListItemText primary="Interruptions" />
        </ListItem>
        <ListItem
          button
          divider
          aria-haspopup="true"
          aria-controls="ringtone-menu"
          aria-label="Phone ringtone"
          onClick={handleClickListItem}
        >
          <ListItemText primary="Phone ringtone" secondary={value} />
        </ListItem>
        <ListItem button divider disabled>
          <ListItemText primary="Default notification ringtone" secondary="Tethys" />
        </ListItem>
        <ConfirmationDialogRaw open={open} onClose={handleClose} value={value} />
      </List>
    </div>
  );
}

export default ConfirmationDialog;
