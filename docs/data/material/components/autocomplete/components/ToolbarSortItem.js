import * as React from 'react';
import PropTypes from 'prop-types';
import {
  useGridApiContext,
  GridArrowUpwardIcon,
  GridArrowDownwardIcon,
  useGridSelector,
  gridSortModelSelector,
  gridColumnDefinitionsSelector,
} from '@mui/x-data-grid-premium';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import { Drawer, DrawerHeader } from './Drawer';
import { ToolbarButton } from './ToolbarButton';

function ToolbarSortItem(props) {
  const { listView, container } = props;
  const [open, setOpen] = React.useState(false);
  const apiRef = useGridApiContext();
  const fields = useGridSelector(apiRef, gridColumnDefinitionsSelector);
  const sortModel = useGridSelector(apiRef, gridSortModelSelector);
  const sortableFields = fields.filter((field) => field.sortable);
  const sortCount = sortModel.length;

  const handleSortChange = (field, sort) => {
    apiRef.current.sortColumn(field, sort, true);
  };

  return (
    <React.Fragment>
      <ToolbarButton onClick={() => setOpen(true)}>
        <Badge badgeContent={sortCount} color="primary" variant="dot">
          <SwapVertIcon fontSize="small" />
        </Badge>
      </ToolbarButton>

      <Drawer
        anchor={listView ? 'bottom' : 'right'}
        open={open}
        container={container}
        onClose={() => setOpen(false)}
      >
        <DrawerHeader>
          <Typography fontWeight={500}>Sort by</Typography>
        </DrawerHeader>

        <List>
          {sortableFields.map((field) => {
            const fieldIndexInSortModel = sortModel.findIndex(
              (sort) => sort.field === field.field,
            );
            const fieldInSortModel = sortModel[fieldIndexInSortModel];
            let nextSort = 'asc';

            if (fieldInSortModel) {
              nextSort = fieldInSortModel.sort === 'asc' ? 'desc' : null;
            }

            return (
              <ListItem key={field.field} disablePadding>
                <ListItemButton
                  onClick={() => handleSortChange(field.field, nextSort)}
                >
                  <ListItemIcon>
                    {fieldInSortModel && (
                      <Badge
                        badgeContent={
                          sortCount > 1 ? fieldIndexInSortModel + 1 : null
                        }
                      >
                        {fieldInSortModel.sort === 'asc' ? (
                          <GridArrowUpwardIcon />
                        ) : (
                          <GridArrowDownwardIcon />
                        )}
                      </Badge>
                    )}
                  </ListItemIcon>
                  <ListItemText>{field.headerName}</ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </React.Fragment>
  );
}

ToolbarSortItem.propTypes = {
  container: PropTypes.func,
  listView: PropTypes.bool.isRequired,
};

export { ToolbarSortItem };
