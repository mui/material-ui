import * as React from 'react';
import { DataGridPro, GridToolbar, GridPaginationModel } from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Frame from 'docs/src/components/action/Frame';
import XGridGlobalStyles from 'docs/src/components/home/XGridGlobalStyles';

type GridDataType = 'Employee' | 'Commodity';

interface GridPaginationSettings {
  pagination: boolean;
  autoPageSize: boolean;
  paginationModel: GridPaginationModel | undefined;
}

interface GridConfigOptions {
  size: number;
  type: GridDataType;
  pagesize: number;
}

interface GridToolbarContainerProps {
  onApply: (options: GridConfigOptions) => void;
  size: number;
  type: GridDataType;
}

const pageSizeOptions = [25, 100, 1000];

function SettingsPanel(props: GridToolbarContainerProps) {
  const { onApply, type, size } = props;
  const [sizeState, setSize] = React.useState<number>(size);
  const [typeState, setType] = React.useState<GridDataType>(type);
  const [selectedPaginationValue, setSelectedPaginationValue] = React.useState<number>(-1);

  const handleSizeChange = React.useCallback((event: SelectChangeEvent<string>) => {
    setSize(Number(event.target.value));
  }, []);

  const handleDatasetChange = React.useCallback((event: SelectChangeEvent<GridDataType>) => {
    setType(event.target.value as GridDataType);
  }, []);

  const handlePaginationChange = React.useCallback((event: SelectChangeEvent<number>) => {
    setSelectedPaginationValue(Number(event.target.value));
  }, []);

  const handleApplyChanges = React.useCallback(() => {
    onApply({
      size: sizeState,
      type: typeState,
      pagesize: selectedPaginationValue,
    });
  }, [sizeState, typeState, selectedPaginationValue, onApply]);

  return (
    <FormGroup
      className="MuiFormGroup-options"
      sx={{
        flexDirection: { xs: 'column', sm: 'row' },
        alignContent: { xs: 'start', sm: 'center' },
        alignItems: { xs: 'start', sm: 'center' },
        '& > *': {
          '&:not(:first-child)': { ml: { xs: 0, sm: 1 } },
          '&:last-child': { ml: 'auto' },
        },
        '& .MuiFilledInput-root': {
          borderRadius: 1,
          backgroundColor: 'transparent',
        },
        '& .MuiInputBase-sizeSmall': {
          fontSize: '0.875rem',
        },
      }}
    >
      <FormControl variant="filled" size="small">
        <InputLabel>Dataset</InputLabel>
        <Select value={typeState} onChange={handleDatasetChange} disableUnderline>
          <MenuItem value="Employee">Employee</MenuItem>
          <MenuItem value="Commodity">Commodity</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" size="small">
        <InputLabel>Rows</InputLabel>
        <Select value={String(sizeState)} onChange={handleSizeChange} disableUnderline>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
          <MenuItem value={10000}>{Number(10000).toLocaleString()}</MenuItem>
          <MenuItem value={100000}>{Number(100000).toLocaleString()}</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" size="small" sx={{ minWidth: 80 }}>
        <InputLabel>Page Size</InputLabel>
        <Select value={selectedPaginationValue} onChange={handlePaginationChange} disableUnderline>
          <MenuItem value={-1}>off</MenuItem>
          <MenuItem value={0}>auto</MenuItem>
          {pageSizeOptions.map((pageSize) => (
            <MenuItem key={pageSize} value={pageSize}>
              {Number(pageSize).toLocaleString()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        onClick={handleApplyChanges}
        sx={{ mt: { xs: 2, sm: 0 }, color: 'primary.300', height: 'fit-content' }}
      >
        Apply changes
      </Button>
    </FormGroup>
  );
}

export default function XGridFullDemo() {
  const [type, setType] = React.useState<GridDataType>('Commodity');
  const [size, setSize] = React.useState(100);
  const { loading, data, setRowLength, loadNewData } = useDemoData({
    dataSet: type,
    rowLength: size,
    maxColumns: 40,
    editable: true,
  });

  const [pagination, setPagination] = React.useState<GridPaginationSettings>({
    pagination: false,
    autoPageSize: false,
    paginationModel: undefined,
  });

  const handleApplyClick = (settings: GridConfigOptions) => {
    if (size !== settings.size) {
      setSize(settings.size);
    }

    if (type !== settings.type) {
      setType(settings.type);
    }

    if (size !== settings.size || type !== settings.type) {
      setRowLength(settings.size);
      loadNewData();
    }

    const newPaginationSettings: GridPaginationSettings = {
      pagination: settings.pagesize !== -1,
      autoPageSize: settings.pagesize === 0,
      paginationModel: settings.pagesize > 0 ? { pageSize: settings.pagesize, page: 0 } : undefined,
    };

    setPagination(newPaginationSettings);
  };

  const handlePaginationModelChange = React.useCallback((newModel: GridPaginationModel) => {
    setPagination((prev) => ({
      ...prev,
      paginationModel: newModel,
    }));
  }, []);

  return (
    <Frame>
      <Frame.Demo sx={{ p: 2 }}>
        <XGridGlobalStyles selector="#data-grid-full" pro />
        <Paper
          id="data-grid-full"
          variant="outlined"
          sx={[
            {
              overflow: 'auto',
              borderRadius: '8px',
              height: 328,
              '& .MuiDataGrid-root': {
                bgcolor: '#fff',
                '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 14, fontWeight: 'bold' },
                '& .MuiButton-root': { marginLeft: 0, marginRight: 1 },
                '& .MuiDataGrid-cell': {
                  bgcolor: 'grey.50',
                },
                '& .MuiDataGrid-footerContainer': {
                  minHeight: 48,
                  borderTop: '1px solid',
                  borderColor: 'grey.200',
                },
                '& .MuiTablePagination-root': {
                  fontSize: '0.75rem',
                  '& p': {
                    fontSize: '0.75rem',
                  },
                  '& .MuiToolbar-root': {
                    minHeight: 48,
                  },
                },
              },
            },
            (theme) =>
              theme.applyDarkStyles({
                '& .MuiDataGrid-root': {
                  bgcolor: 'primaryDark.900',
                  '& .MuiDataGrid-cell': {
                    bgcolor: 'primaryDark.800',
                  },
                  '& .MuiDataGrid-footerContainer': {
                    borderColor: 'primaryDark.600',
                  },
                },
              }),
          ]}
        >
          <DataGridPro
            density="compact"
            {...data}
            components={{
              Toolbar: GridToolbar,
            }}
            loading={loading}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={pageSizeOptions}
            {...pagination}
            onPaginationModelChange={handlePaginationModelChange}
          />
        </Paper>
      </Frame.Demo>
      <Frame.Info data-mui-color-scheme="dark" sx={{ pl: 1, pr: 2, py: 1.5 }}>
        <SettingsPanel onApply={handleApplyClick} size={size} type={type} />
      </Frame.Info>
    </Frame>
  );
}
