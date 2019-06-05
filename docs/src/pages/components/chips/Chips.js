import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

function Chips() {
  const classes = useStyles();

  function handleDelete() {
    alert('You clicked the delete icon.');
  }

  function handleClick() {
    alert('You clicked the Chip.');
  }

  return (
    <div className={classes.root}>
      <Chip label="Basic Chip" className={classes.chip} />
      <Chip
        avatar={<Avatar>MB</Avatar>}
        label="Clickable Chip"
        onClick={handleClick}
        className={classes.chip}
      />
      <Chip
        avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        label="Deletable Chip"
        onDelete={handleDelete}
        className={classes.chip}
      />
      <Chip
        avatar={
          <Avatar>
            <FaceIcon />
          </Avatar>
        }
        label="Clickable Deletable Chip"
        onClick={handleClick}
        onDelete={handleDelete}
        className={classes.chip}
      />
      <Chip
        icon={<FaceIcon />}
        label="Clickable Deletable Chip"
        onClick={handleClick}
        onDelete={handleDelete}
        className={classes.chip}
      />
      <Chip
        label="Custom delete icon Chip"
        onClick={handleClick}
        onDelete={handleDelete}
        className={classes.chip}
        deleteIcon={<DoneIcon />}
      />
      <Chip
        label="Clickable Link Chip"
        className={classes.chip}
        component="a"
        href="#chip"
        clickable
      />
      <Chip
        avatar={<Avatar>MB</Avatar>}
        label="Primary Clickable Chip"
        clickable
        className={classes.chip}
        color="primary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      />
      <Chip
        icon={<FaceIcon />}
        label="Primary Clickable Chip"
        clickable
        className={classes.chip}
        color="primary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      />
      <Chip
        label="Deletable Primary Chip"
        onDelete={handleDelete}
        className={classes.chip}
        color="primary"
      />
      <Chip
        avatar={
          <Avatar>
            <FaceIcon />
          </Avatar>
        }
        label="Deletable Secondary Chip"
        onDelete={handleDelete}
        className={classes.chip}
        color="secondary"
      />
      <Chip
        icon={<FaceIcon />}
        label="Deletable Secondary Chip"
        onDelete={handleDelete}
        className={classes.chip}
        color="secondary"
      />
    </div>
  );
}

export default Chips;
