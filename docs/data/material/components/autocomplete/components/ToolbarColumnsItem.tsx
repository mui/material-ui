import * as React from 'react';
import {
  GridColumnIcon,
  useGridApiContext,
  useGridSelector,
  gridColumnDefinitionsSelector,
  gridColumnVisibilityModelSelector,
} from '@mui/x-data-grid-premium';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ToolbarButton } from './ToolbarButton';
import { Drawer, DrawerHeader, DrawerProps } from './Drawer';

interface ToolbarColumnsItemProps {
  listView: boolean;
  container: DrawerProps['container'];
}

export function ToolbarColumnsItem(props: ToolbarColumnsItemProps) {
  const { listView, container } = props;
  const [open, setOpen] = React.useState(false);
  const apiRef = useGridApiContext();
  const columns = useGridSelector(apiRef, gridColumnDefinitionsSelector);
  const columnVisibilityModel = useGridSelector(
    apiRef,
    gridColumnVisibilityModelSelector,
  );

  const toggleFieldVisibility = (field: string) => {
    apiRef.current.setColumnVisibility(
      field,
      columnVisibilityModel[field] === false,
    );
  };

  return (
    <React.Fragment>
      <ToolbarButton onClick={() => setOpen(true)}>
        <GridColumnIcon fontSize="small" />
      </ToolbarButton>

      <Drawer
        anchor={listView ? 'bottom' : 'right'}
        open={open}
        container={container}
        onClose={() => setOpen(false)}
      >
        <DrawerHeader>
          <Typography fontWeight={500}>Fields</Typography>
        </DrawerHeader>

        <List>
          {columns.map((column) => {
            const isVisible = columnVisibilityModel[column.field] !== false;
            return (
              <ListItem key={column.field} disablePadding>
                <ListItemButton
                  onClick={() => toggleFieldVisibility(column.field)}
                  disabled={column.hideable === false}
                >
                  <ListItemIcon>
                    {isVisible ? (
                      <CheckBoxIcon color="primary" />
                    ) : (
                      <CheckBoxBlankIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText>{column.headerName || column.field}</ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </React.Fragment>
  );
}
