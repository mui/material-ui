import * as React from 'react';
import PropTypes from 'prop-types';

import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Drawer, DrawerHeader } from './Drawer';
import { FileIcon } from './FileIcon';
import { formatDate, formatSize, stringAvatar } from '../utils';

function Thumbnail() {
  return (
    <Box
      sx={(theme) => ({
        aspectRatio: '16/9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.secondary',
        borderRadius: 2,
        gap: 1,
        backgroundColor: 'grey.200',
        ...theme.applyStyles('dark', {
          backgroundColor: 'grey.800',
        }),
      })}
    >
      <VisibilityOffIcon />
      <Typography variant="body2" color="text.secondary">
        No preview available
      </Typography>
    </Box>
  );
}

function DrawerContent(props) {
  const { params, onDescriptionChange, onClose } = props;
  const [description, setDescription] = React.useState(params.row.description || '');
  const avatarProps = stringAvatar(params.row.createdBy);

  const handleSave = (event) => {
    onDescriptionChange(params.row.id, description);
    onClose(event);
  };

  return (
    <React.Fragment>
      <DrawerHeader>
        <FileIcon type={params.row.type} sx={{ width: 32, height: 32 }} />
        <Typography variant="body1">{params.row.name}</Typography>
        <Button
          variant="text"
          onClick={handleSave}
          sx={{
            flexShrink: 0,
            ml: 'auto',
            mr: -1,
          }}
        >
          Save
        </Button>
      </DrawerHeader>

      <Stack p={2} gap={2}>
        <Thumbnail />
        <TextField
          label="Description"
          maxRows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          sx={{ mt: 1 }}
          multiline
        />
        <Divider />
        <Stack gap={0.5}>
          <Typography variant="body2" color="text.secondary">
            Type
          </Typography>
          <Typography variant="body2">{params.row.type}</Typography>
        </Stack>

        <Stack gap={0.5}>
          <Typography variant="body2" color="text.secondary">
            Size
          </Typography>
          <Typography variant="body2">{formatSize(params.row.size)}</Typography>
        </Stack>

        <Stack gap={0.5}>
          <Typography variant="body2" color="text.secondary">
            Created
          </Typography>
          <Typography variant="body2">{formatDate(params.row.createdAt)}</Typography>
        </Stack>

        <Stack gap={0.5}>
          <Typography variant="body2" color="text.secondary">
            Modified
          </Typography>
          <Typography variant="body2">{formatDate(params.row.updatedAt)}</Typography>
        </Stack>

        <Divider />
        <Typography variant="body2" color="text.secondary">
          Owner
        </Typography>

        <Stack direction="row" gap={1.5} alignItems="center">
          <Avatar
            {...avatarProps}
            sx={{ width: 24, height: 24, fontSize: 12, ...avatarProps.sx }}
          />
          <Typography variant="body2">{params.row.createdBy}</Typography>
        </Stack>
      </Stack>
    </React.Fragment>
  );
}

DrawerContent.propTypes = {
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent<{}>} event The event source of the callback.
   */
  onClose: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  params: PropTypes.shape({
    row: PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      createdBy: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      state: PropTypes.oneOf(['pending', 'uploaded']).isRequired,
      type: PropTypes.oneOf([
        'docx',
        'gif',
        'jpeg',
        'jpg',
        'mov',
        'mp4',
        'pdf',
        'png',
        'tiff',
        'txt',
        'webm',
        'webp',
        'zip',
      ]).isRequired,
      updatedAt: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

function DetailsDrawer(props) {
  const { params, listView, onDescriptionChange, onClose, ...other } = props;
  return (
    <Drawer
      anchor={listView ? 'bottom' : 'right'}
      width={360}
      onClose={onClose}
      {...other}
    >
      {params && (
        <DrawerContent
          params={params}
          onDescriptionChange={onDescriptionChange}
          onClose={onClose}
        />
      )}
    </Drawer>
  );
}

DetailsDrawer.propTypes = {
  listView: PropTypes.bool.isRequired,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent<{}>} event The event source of the callback.
   */
  onClose: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  params: PropTypes.shape({
    row: PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      createdBy: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      state: PropTypes.oneOf(['pending', 'uploaded']).isRequired,
      type: PropTypes.oneOf([
        'docx',
        'gif',
        'jpeg',
        'jpg',
        'mov',
        'mp4',
        'pdf',
        'png',
        'tiff',
        'txt',
        'webm',
        'webp',
        'zip',
      ]).isRequired,
      updatedAt: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export { DetailsDrawer };
