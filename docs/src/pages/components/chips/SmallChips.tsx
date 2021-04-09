import * as React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

export default function SmallChips() {
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 0.5,
        },
      }}
    >
      <Chip size="small" label="Basic" />
      <Chip
        size="small"
        avatar={<Avatar>M</Avatar>}
        label="Clickable"
        onClick={handleClick}
      />
      <Chip
        size="small"
        avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        label="Deletable"
        onDelete={handleDelete}
      />
      <Chip
        size="small"
        icon={<FaceIcon />}
        label="Clickable Deletable"
        onClick={handleClick}
        onDelete={handleDelete}
      />
      <Chip
        size="small"
        label="Custom delete icon"
        onClick={handleClick}
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      />
      <Chip
        size="small"
        label="Clickable Link"
        component="a"
        href="#chip"
        clickable
      />
      <Chip
        size="small"
        avatar={<Avatar>M</Avatar>}
        label="Primary Clickable"
        clickable
        color="primary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      />
      <Chip
        size="small"
        icon={<FaceIcon />}
        label="Primary Clickable"
        clickable
        color="primary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      />
      <Chip
        size="small"
        label="Deletable Primary"
        onDelete={handleDelete}
        color="primary"
      />
      <Chip
        size="small"
        icon={<FaceIcon />}
        label="Deletable Secondary"
        onDelete={handleDelete}
        color="secondary"
      />
    </Box>
  );
}
