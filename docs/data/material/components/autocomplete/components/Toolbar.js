import * as React from 'react';
import {
  GridClearIcon,
  GridDeleteIcon,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  selectedGridRowsSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid-premium';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { iconButtonClasses } from '@mui/material/IconButton';
import { ToolbarAddItem } from './ToolbarAddItem';
import { ToolbarColumnsItem } from './ToolbarColumnsItem';
import { ToolbarSortItem } from './ToolbarSortItem';
import { ToolbarDensityItem } from './ToolbarDensityItem';
import { ToolbarFilterItem } from './ToolbarFilterItem';
import { ToolbarButton } from './ToolbarButton';

export function Toolbar(props) {
  const { listView = false, container, handleUpload, handleDelete } = props;
  const apiRef = useGridApiContext();
  const selectedRows = useGridSelector(apiRef, selectedGridRowsSelector);
  const selectionCount = selectedRows.size;
  const showSelectionOptions = selectionCount > 0;

  const handleClearSelection = () => {
    apiRef.current.setRowSelectionModel([]);
  };

  const handleDeleteSelectedRows = () => {
    handleClearSelection();
    handleDelete?.(Array.from(selectedRows.keys()));
  };

  const itemProps = {
    listView,
    container,
  };

  return (
    <GridToolbarContainer
      sx={{
        position: 'relative',
        borderBottom: '1px solid',
        borderColor: 'divider',
        minHeight: 45,
        px: 0.5,
        py: 0.25,
        gap: 0,
      }}
    >
      {showSelectionOptions ? (
        <React.Fragment>
          <ToolbarButton sx={{ mr: 0.5 }} onClick={handleClearSelection}>
            <GridClearIcon fontSize="small" />
          </ToolbarButton>

          <Typography variant="body2">{selectionCount} selected</Typography>

          <ToolbarButton sx={{ ml: 'auto' }} onClick={handleDeleteSelectedRows}>
            <GridDeleteIcon fontSize="small" />
          </ToolbarButton>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box
            sx={{ ml: 0.5, flex: 1, display: 'flex', justifyContent: 'flex-start' }}
          >
            <GridToolbarQuickFilter
              variant="outlined"
              size="small"
              sx={{
                width: '100%',
                maxWidth: 260,
                pb: 0,
                [`& .${iconButtonClasses.root}`]: {
                  mr: -0.5,
                },
                [`& .${outlinedInputClasses.root}`]: {
                  px: 1,
                },
                [`& .${outlinedInputClasses.notchedOutline}`]: {
                  display: 'none',
                },
                [`& .${outlinedInputClasses.root}.Mui-focused .${outlinedInputClasses.notchedOutline}`]:
                  {
                    display: 'block',
                  },
              }}
            />
          </Box>

          <ToolbarColumnsItem {...itemProps} />
          <ToolbarFilterItem {...itemProps} />
          <ToolbarSortItem {...itemProps} />
          <ToolbarDensityItem {...itemProps} />
          <ToolbarAddItem {...itemProps} handleUpload={handleUpload} />
        </React.Fragment>
      )}
    </GridToolbarContainer>
  );
}
