import * as React from 'react';
import { GridRowId, GridRowParams } from '@mui/x-data-grid-premium';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenIcon from '@mui/icons-material/Visibility';
import { FileIcon } from './FileIcon';
import { formatDate, formatSize } from '../utils';
import { Drawer, DrawerHeader, DrawerProps } from './Drawer';
import { RowModel } from '../types';

interface ActionDrawerProps extends DrawerProps {
  params: Pick<GridRowParams<RowModel>, 'row'> | null;
  onPreview: () => void;
  onRename: () => void;
  onDelete: (id: GridRowId) => void;
}

function DrawerContent(
  props: { params: Pick<GridRowParams<RowModel>, 'row'> } & Pick<
    ActionDrawerProps,
    'onDelete' | 'onPreview' | 'onRename'
  >,
) {
  const { params, onDelete, onPreview, onRename } = props;
  return (
    <React.Fragment>
      <DrawerHeader>
        <FileIcon type={params.row.type} sx={{ width: 32, height: 32 }} />
        <Stack gap={0.25}>
          <Typography variant="body1">{params.row.name}</Typography>
          <Stack direction="row" gap={0.5}>
            <Typography variant="caption" color="text.secondary">
              {params.row.createdBy}
            </Typography>
            <Typography variant="caption" color="text.secondary" aria-hidden>
              &middot;
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatSize(params.row.size)}
            </Typography>
          </Stack>
          <Typography variant="caption" color="text.secondary">
            {params.row.updatedAt
              ? `Updated ${formatDate(params.row.updatedAt)}`
              : `Added ${formatDate(params.row.createdAt)}`}
          </Typography>
        </Stack>
      </DrawerHeader>

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={onPreview}>
            <ListItemIcon>
              <OpenIcon />
            </ListItemIcon>
            <ListItemText>Preview</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={onRename}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>Rename</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => onDelete(params.row.id)}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </React.Fragment>
  );
}

export function ActionDrawer(props: ActionDrawerProps) {
  const { params, onPreview, onRename, onDelete, ...other } = props;
  return (
    <Drawer anchor="bottom" {...other}>
      {params && (
        <DrawerContent
          params={params}
          onPreview={onPreview}
          onRename={onRename}
          onDelete={onDelete}
        />
      )}
    </Drawer>
  );
}
