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

export default function SmallOutlinedChips() {
  const classes = useStyles();

  function handleDelete() {
    alert('You clicked the delete icon.');
  }

  function handleClick() {
    alert('You clicked the Chip.');
  }

  return (
    <div className={classes.root}>
      <Chip variant="outlined" size="small" label="Basic Chip" className={classes.chip} />
      <Chip
        variant="outlined"
        size="small"
        avatar={<Avatar>MB</Avatar>}
        label="Clickable Chip"
        onClick={handleClick}
        className={classes.chip}
      />
      <Chip
        size="small"
        avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        label="Deletable Chip"
        onDelete={handleDelete}
        className={classes.chip}
      />
      <Chip
        variant="outlined"
        size="small"
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
        variant="outlined"
        size="small"
        icon={<FaceIcon />}
        label="Clickable Deletable Chip"
        onClick={handleClick}
        onDelete={handleDelete}
        className={classes.chip}
      />
      <Chip
        variant="outlined"
        size="small"
        label="Custom delete icon Chip"
        onClick={handleClick}
        onDelete={handleDelete}
        className={classes.chip}
        deleteIcon={<DoneIcon />}
      />
      <Chip
        variant="outlined"
        size="small"
        label="Clickable Link Chip"
        className={classes.chip}
        component="a"
        href="#chip"
        clickable
      />
      <Chip
        variant="outlined"
        size="small"
        avatar={<Avatar>MB</Avatar>}
        label="Primary Clickable Chip"
        clickable
        className={classes.chip}
        color="primary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      />
      <Chip
        variant="outlined"
        size="small"
        icon={<FaceIcon />}
        label="Primary Clickable Chip"
        clickable
        className={classes.chip}
        color="primary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      />
      <Chip
        variant="outlined"
        size="small"
        label="Deletable Primary Chip"
        onDelete={handleDelete}
        className={classes.chip}
        color="primary"
      />
      <Chip
        variant="outlined"
        size="small"
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
        variant="outlined"
        size="small"
        icon={<FaceIcon />}
        label="Deletable Secondary Chip"
        onDelete={handleDelete}
        className={classes.chip}
        color="secondary"
      />
    </div>
  );
}
