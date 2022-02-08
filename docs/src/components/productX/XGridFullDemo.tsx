import * as React from 'react';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator';
import { ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Frame from 'docs/src/components/action/Frame';
import { brandingDarkTheme } from 'docs/src/modules/brandingTheme';
import XGridGlobalStyles from 'docs/src/components/home/XGridGlobalStyles';

const dataGridStyleOverrides = <XGridGlobalStyles selector="#data-grid-full" pro />;

type GridDataType = 'Employee' | 'Commodity';

interface GridPaginationSettings {
  pagination: boolean;
  autoPageSize: boolean;
  pageSize: number | undefined;
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

function SettingsPanel(props: GridToolbarContainerProps) {
  const { onApply, type, size } = props;
  const [sizeState, setSize] = React.useState<number>(size);
  const [typeState, setType] = React.useState<GridDataType>(type);
  const [selectedPaginationValue, setSelectedPaginationValue] = React.useState<number>(-1);

  const handleSizeChange = React.useCallback((event) => {
    setSize(Number(event.target.value));
  }, []);

  const handleDatasetChange = React.useCallback((event) => {
    setType(event.target.value);
  }, []);

  const handlePaginationChange = React.useCallback((event) => {
    setSelectedPaginationValue(event.target.value);
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
        <Select value={sizeState} onChange={handleSizeChange} disableUnderline>
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
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={handleApplyChanges} sx={{ mt: { xs: 2, sm: 0 } }}>
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
    pageSize: undefined,
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
      pageSize: settings.pagesize > 0 ? settings.pagesize : undefined,
    };

    setPagination((currentPaginationSettings: GridPaginationSettings): GridPaginationSettings => {
      if (
        currentPaginationSettings.pagination === newPaginationSettings.pagination &&
        currentPaginationSettings.autoPageSize === newPaginationSettings.autoPageSize &&
        currentPaginationSettings.pageSize === newPaginationSettings.pageSize
      ) {
        return currentPaginationSettings;
      }
      return newPaginationSettings;
    });
  };

  return (
    <Frame>
      <Frame.Demo sx={{ p: 2 }}>
        {dataGridStyleOverrides}
        <Paper
          id="data-grid-full"
          variant="outlined"
          sx={{
            height: 328,
            overflow: 'auto',
            '& .MuiDataGrid-root': {
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : '#fff'),
              '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 14, fontWeight: 'bold' },
              '& .MuiButton-root': { marginLeft: 0, marginRight: 1 },
              '& .MuiDataGrid-renderingZone': {
                '& .MuiDataGrid-cell': {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? 'primaryDark.800' : 'grey.50',
                },
              },
              '& .MuiDataGrid-footerContainer': {
                minHeight: 48,
                borderTop: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'primaryDark.600' : 'grey.200',
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
          }}
        >
          <DataGridPro
            density="compact"
            {...data}
            components={{
              Toolbar: GridToolbar,
            }}
            loading={loading}
            checkboxSelection
            disableSelectionOnClick
            {...pagination}
          />
        </Paper>
      </Frame.Demo>
      <ThemeProvider theme={brandingDarkTheme}>
        <Frame.Info sx={{ p: 1 }}>
          <SettingsPanel onApply={handleApplyClick} size={size} type={type} />
        </Frame.Info>
      </ThemeProvider>
    </Frame>
  );
}
