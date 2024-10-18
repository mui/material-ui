import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NewFolderIcon from '@mui/icons-material/CreateNewFolder';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ButtonProps } from '@mui/material/Button';
import { ToolbarButton } from './ToolbarButton';
import { Drawer, DrawerHeader, DrawerProps } from './Drawer';

const ListItemUploadButton = React.forwardRef<HTMLLabelElement, ButtonProps>(
  function ListItemUploadButton(props, ref) {
    const { children, ...other } = props;
    return (
      <ListItemButton component="label" {...other} role={undefined} ref={ref}>
        {children}
      </ListItemButton>
    );
  },
);

export interface ToolbarAddItemProps {
  container: DrawerProps['container'];
  listView: boolean;
  handleUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ToolbarAddItem(props: ToolbarAddItemProps) {
  const { container } = props;
  const [open, setOpen] = React.useState(false);
  const { handleUpload, listView } = props;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleUpload?.(event);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ToolbarButton onClick={() => setOpen(true)}>
        <AddIcon fontSize="small" />
      </ToolbarButton>

      <Drawer
        anchor={listView ? 'bottom' : 'right'}
        open={open}
        container={container}
        onClose={() => setOpen(false)}
      >
        <DrawerHeader>
          <Typography fontWeight={500}>Add new</Typography>
        </DrawerHeader>

        <List>
          <ListItem disablePadding>
            <ListItemButton component={ListItemUploadButton}>
              <ListItemIcon>
                <CloudUploadIcon />
              </ListItemIcon>
              <ListItemText>Upload file</ListItemText>
              <input type="file" hidden onChange={handleFileSelect} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => {}} disabled>
              <ListItemIcon>
                <NewFolderIcon />
              </ListItemIcon>
              <ListItemText>New folder</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
}
