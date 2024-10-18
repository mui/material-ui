import * as React from 'react';
import {
  GridFilterListIcon,
  useGridApiContext,
  useGridSelector,
  gridFilterActiveItemsSelector,
  GridCheckIcon,
  GridFilterItem,
} from '@mui/x-data-grid-premium';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { Drawer, DrawerHeader, DrawerProps } from './Drawer';
import { ToolbarButton } from './ToolbarButton';
import { FileType } from '../types';
import { FILE_TYPES } from '../constants';

const DATE_MODIFIED_FILTERS = [
  {
    label: 'All',
    id: 'all',
  },
  {
    label: 'Today',
    id: 'today',
    operator: 'onOrAfter',
    value: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
  },
  {
    label: 'Last week',
    id: 'last-week',
    operator: 'onOrAfter',
    value: new Date(
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0),
    ).toISOString(),
  },
  {
    label: 'Last month',
    id: 'last-month',
    operator: 'onOrAfter',
    value: new Date(
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0),
    ).toISOString(),
  },
  {
    label: 'Last 3 months',
    id: 'last-3-months',
    operator: 'onOrAfter',
    value: new Date(
      new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0),
    ).toISOString(),
  },
];

interface ToolbarFilterItemProps {
  listView: boolean;
  container: DrawerProps['container'];
}

export function ToolbarFilterItem(props: ToolbarFilterItemProps) {
  const { listView, container } = props;
  const [open, setOpen] = React.useState(false);
  const apiRef = useGridApiContext();
  const activeFilters = useGridSelector(apiRef, gridFilterActiveItemsSelector);
  const currentFileTypeFilter =
    activeFilters.filter((filter) => filter.field === 'type')?.[0]?.value ?? [];
  const currentDateModifiedFilter = activeFilters.find(
    (filter) => filter.field === 'updatedAt',
  );

  const applyDateModifiedFilter = (filterItem: Omit<GridFilterItem, 'field'>) => {
    if (currentDateModifiedFilter) {
      apiRef.current.deleteFilterItem(currentDateModifiedFilter);
    }

    apiRef.current.upsertFilterItem({
      field: 'updatedAt',
      ...filterItem,
    });
  };

  const resetDateModifiedFilter = () => {
    if (currentDateModifiedFilter) {
      apiRef.current.deleteFilterItem(currentDateModifiedFilter);
    }
  };

  const applyFileTypeFilter = (fileType: FileType, enable: boolean) => {
    apiRef.current.upsertFilterItem({
      id: 'file-type',
      field: 'type',
      operator: 'isAnyOf',
      value: enable
        ? [...currentFileTypeFilter, fileType]
        : currentFileTypeFilter.filter((type: string) => type !== fileType),
    });
  };

  const clearFilters = () => {
    apiRef.current.setFilterModel({
      items: [],
    });
  };

  return (
    <React.Fragment>
      <ToolbarButton onClick={() => setOpen(true)}>
        <Badge badgeContent={activeFilters.length} color="primary" variant="dot">
          <GridFilterListIcon fontSize="small" />
        </Badge>
      </ToolbarButton>

      <Drawer
        anchor={listView ? 'bottom' : 'right'}
        open={open}
        container={container}
        onClose={() => setOpen(false)}
      >
        <DrawerHeader>
          <Typography fontWeight={500}>Filters</Typography>
        </DrawerHeader>

        <List
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              sx={{
                top: 57,
              }}
            >
              Date modified
            </ListSubheader>
          }
        >
          {DATE_MODIFIED_FILTERS.map((option) => {
            const isActive =
              option.id === 'all'
                ? !currentDateModifiedFilter
                : activeFilters.some((filter) => filter.id === option.id);

            return (
              <ListItem disablePadding key={option.id}>
                <ListItemButton
                  onClick={() =>
                    option.id === 'all'
                      ? resetDateModifiedFilter()
                      : applyDateModifiedFilter({
                          id: option.id,
                          operator: option.operator!,
                          value: option.value,
                        })
                  }
                >
                  <ListItemIcon>{isActive ? <GridCheckIcon /> : null}</ListItemIcon>
                  <ListItemText>{option.label}</ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider />

        <List
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              sx={{
                top: 57,
              }}
            >
              File types
            </ListSubheader>
          }
        >
          {FILE_TYPES.map((type) => {
            const isActive = currentFileTypeFilter.includes(type);

            return (
              <ListItem disablePadding key={type}>
                <ListItemButton onClick={() => applyFileTypeFilter(type, !isActive)}>
                  <ListItemIcon>
                    {isActive ? (
                      <CheckBoxIcon color="primary" />
                    ) : (
                      <CheckBoxBlankIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText>{type}</ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={clearFilters}
              disabled={activeFilters.length === 0}
            >
              <ListItemIcon>
                <FilterAltOffIcon />
              </ListItemIcon>
              <ListItemText>Clear filters</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
}
