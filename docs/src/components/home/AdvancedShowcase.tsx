import * as React from 'react';
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import { debounce } from '@material-ui/core/utils';
import { alpha } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import ShowcaseContainer from 'docs/src/components/home/ShowcaseContainer';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import InfoIcon from '@material-ui/icons/Info';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import DoneIcon from '@material-ui/icons/Done';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';

const ProgressBar = React.memo(function ProgressBar(props: ProgressBarProps) {
  const { value } = props;
  const valueInPercent = value * 100;

  return (
    <Box
      sx={{
        lineHeight: 1,
        position: 'relative',
        p: 0.5,
        borderRadius: '3px',
        width: '100%',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.100'),
      }}
    >
      <Box
        sx={{ fontWeight: 'bold', color: 'text.primary', position: 'relative', zIndex: 1 }}
      >{`${valueInPercent.toLocaleString()} %`}</Box>
      <Box
        sx={{
          borderRadius: '3px',
          position: 'absolute',
          height: '100%',
          left: 0,
          top: 0,
          ...(valueInPercent < 30 && {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'error.800' : 'error.300'),
          }),
          ...(valueInPercent >= 30 &&
            valueInPercent <= 70 && {
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'warning.800' : 'warning.500'),
            }),
          ...(valueInPercent > 70 && {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'success.800' : 'success.400'),
          }),
          width: `${valueInPercent}%`,
        }}
      />
    </Box>
  );
});

interface StatusProps {
  status: string;
}

const Status = React.memo((props: StatusProps) => {
  const { status } = props;
  let label = status;
  if (status === 'PartiallyFilled') {
    label = 'Partial';
  }
  return (
    <Chip
      size="small"
      label={label}
      variant="outlined"
      sx={{
        lineHeight: 1,
        fontSize: '10px',
        fontWeight: 'bold',
        ...(status === 'Open' && {
          borderColor: 'primary.500',
          bgcolor: (theme) => alpha(theme.palette.primary[500], 0.2),
          color: (theme) => (theme.palette.mode === 'dark' ? 'primary.300' : 'primary.700'),
        }),
        ...(status === 'Filled' && {
          borderColor: 'success.500',
          bgcolor: (theme) => alpha(theme.palette.success[500], 0.2),
          color: (theme) => (theme.palette.mode === 'dark' ? 'success.300' : 'success.700'),
        }),
        ...(status === 'PartiallyFilled' && {
          borderColor: 'warning.500',
          bgcolor: (theme) => alpha(theme.palette.warning[500], 0.2),
          color: (theme) => (theme.palette.mode === 'dark' ? 'warning.300' : 'warning.800'),
        }),
        ...(status === 'Rejected' && {
          borderColor: 'error.500',
          bgcolor: (theme) => alpha(theme.palette.error[500], 0.2),
          color: (theme) => (theme.palette.mode === 'dark' ? 'error.300' : 'error.600'),
        }),
      }}
    />
  );
});

function ValueLabelComponent(props: {
  open: boolean;
  value: number;
  children: React.ReactElement;
}) {
  const { children, open, value } = props;
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value} arrow>
      {children}
    </Tooltip>
  );
}

function EditProgress(props: GridCellParams) {
  const { id, value, api, field } = props;
  const [valueState, setValueState] = React.useState(Number(value));

  const updateCellEditProps = React.useCallback(
    (newValue) => {
      api.setEditCellValue({ id, field, value: newValue });
    },
    [api, field, id],
  );

  const debouncedUpdateCellEditProps = React.useMemo(
    () => debounce(updateCellEditProps, 60),
    [updateCellEditProps],
  );

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValueState(newValue as number);
    debouncedUpdateCellEditProps(newValue);
  };

  React.useEffect(() => {
    setValueState(Number(value));
  }, [value]);

  const handleRef = (element: any) => {
    if (element) {
      element.querySelector('[role="slider"]')?.focus();
    }
  };

  return (
    <Slider
      ref={handleRef}
      sx={{
        p: 0,
        height: '100%',
        borderRadius: '0px',
        '& .MuiSlider-rail': {
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.100'),
        },
        '& .MuiSlider-track': {
          border: 0,
          ...(valueState < 0.3 && {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'error.800' : 'error.500'),
          }),
          ...(valueState >= 0.3 &&
            valueState <= 0.7 && {
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'warning.800' : 'warning.500'),
            }),
          ...(valueState > 0.7 && {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'success.800' : 'success.500'),
          }),
        },
        '& .MuiSlider-thumb': {
          cursor: 'col-resize',
          height: '100%',
          width: 5,
          borderRadius: '0px',
          marginTop: 0,
          backgroundColor: alpha('#000000', 0.2),
        },
      }}
      value={valueState}
      max={1}
      step={0.00001}
      onChange={handleChange}
      components={{
        ValueLabel: ValueLabelComponent,
      }}
      valueLabelDisplay="auto"
      valueLabelFormat={(newValue) => `${(newValue * 100).toLocaleString()} %`}
    />
  );
}

const STATUS_OPTIONS = ['Open', 'PartiallyFilled', 'Filled', 'Rejected'];

function EditStatus(props: GridCellParams) {
  const { id, value, api, field } = props;

  const handleChange = (event: any) => {
    api.setEditCellValue({ id, field, value: event.target.value }, event);
    if (!event.key) {
      api.commitCellChange({ id, field });
      api.setCellMode(id, field, 'view');
    }
  };

  const handleClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick') {
      api.setCellMode(id, field, 'view');
    }
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      MenuProps={{
        onClose: handleClose,
      }}
      autoFocus
      fullWidth
      open
    >
      {STATUS_OPTIONS.map((option) => {
        let IconComponent: any = null;
        if (option === 'Rejected') {
          IconComponent = ReportProblemIcon;
        } else if (option === 'Open') {
          IconComponent = InfoIcon;
        } else if (option === 'PartiallyFilled') {
          IconComponent = AutorenewIcon;
        } else if (option === 'Filled') {
          IconComponent = DoneIcon;
        }

        let label = option;
        if (option === 'PartiallyFilled') {
          label = 'Partially Filled';
        }

        return (
          <MenuItem
            key={option}
            value={option}
            dense
            sx={{ '& .MuiListItemIcon-root': { minWidth: 24, '& > svg': { fontSize: '1rem' } } }}
          >
            <ListItemIcon>
              <IconComponent />
            </ListItemIcon>
            <ListItemText primary={label} />
          </MenuItem>
        );
      })}
    </Select>
  );
}

const columns: Array<GridColDef> = [
  {
    field: 'desk',
    headerName: 'desk',
    width: 72,
    sortable: false,
    editable: true,
  },
  { field: 'commodity', headerName: 'Commodity', width: 110, sortable: false, editable: true },
  { field: 'traderName', headerName: 'Trader Name', width: 130, sortable: false, editable: true },
  {
    field: 'filledQuantity',
    headerName: 'Filled',
    width: 92,
    sortable: false,
    editable: true,
    renderCell: (params: GridCellParams) => {
      return <ProgressBar value={Number(params.value)!} />;
    },
    renderEditCell: (params: GridCellParams) => {
      return <EditProgress {...params} />;
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    sortable: false,
    editable: true,
    renderCell: (params: GridCellParams) => {
      return <Status status={(params.value || '').toString()} />;
    },
    renderEditCell: (params: GridCellParams) => {
      return <EditStatus {...params} />;
    },
  },
];

const rows = [
  {
    desk: 'D-985',
    commodity: 'Adzuki bean',
    traderName: 'Roy Green',
    quantity: '83,996',
    filledQuantity: 1,
    status: 'PartiallyFilled',
  },
  {
    desk: 'D-7896',
    commodity: 'Cotton No.2',
    traderName: 'Philip Bradley',
    quantity: '19,356',
    filledQuantity: 0.504,
    status: 'Filled',
  },
  {
    desk: 'D-1289',
    commodity: 'Oats',
    traderName: 'Sallie Bridges',
    quantity: '21,279',
    filledQuantity: 0.533,
    status: 'Rejected',
  },
  {
    desk: 'D-6414',
    commodity: 'Sugar No.14',
    traderName: 'Mina Lee',
    quantity: '28,872',
    filledQuantity: 0.575,
    status: 'PartiallyFilled',
  },
  {
    desk: 'D-2239',
    commodity: 'Wheat',
    traderName: 'Lottie Hogan',
    quantity: '59,489',
    filledQuantity: 0.36,
    status: 'Filled',
  },
  {
    desk: 'D-4468',
    commodity: 'Rapeseed',
    traderName: 'Alma Shaw',
    quantity: '6,272',
    filledQuantity: 0.375,
    status: 'Open',
  },
  {
    desk: 'D-6830',
    commodity: 'Adzuki bean',
    traderName: 'Clifford Rios',
    quantity: '19,854',
    filledQuantity: 0.586,
    status: 'Open',
  },
  {
    desk: 'D-7791',
    commodity: 'Milk',
    traderName: 'Daniel Floyd',
    quantity: '85,146',
    filledQuantity: 0.205,
    status: 'Rejected',
  },
  {
    desk: 'D-7492',
    commodity: 'Rapeseed',
    traderName: 'Jonathan Gray',
    quantity: '58,957',
    filledQuantity: 0.321,
    status: 'Filled',
  },
  {
    desk: 'D-1807',
    commodity: 'Soybean Meal',
    traderName: 'Bernard Ballard',
    quantity: '12,674',
    filledQuantity: 0.669,
    status: 'Filled',
  },
  {
    desk: 'D-204',
    commodity: 'Oats',
    traderName: 'Aaron Fitzgerald',
    quantity: '72,928',
    filledQuantity: 0.656,
    status: 'Filled',
  },
  {
    desk: 'D-8778',
    commodity: 'Oats',
    traderName: 'Annie Caldwell',
    quantity: '28,315',
    filledQuantity: 0.079,
    status: 'Open',
  },
  {
    desk: 'D-5118',
    commodity: 'Soybean Meal',
    traderName: 'Tyler Rodriguez',
    quantity: '21,687',
    filledQuantity: 0.353,
    status: 'Filled',
  },
  {
    desk: 'D-326',
    commodity: 'Cocoa',
    traderName: 'Andre Wells',
    quantity: '19,277',
    filledQuantity: 0.221,
    status: 'Open',
  },
  {
    desk: 'D-7416',
    commodity: 'Frozen Concentrated Orange Juice',
    traderName: 'Charlie Rodriquez',
    quantity: '83,081',
    filledQuantity: 0.167,
    status: 'Filled',
  },
  {
    desk: 'D-6513',
    commodity: 'Soybeans',
    traderName: 'Winifred Welch',
    quantity: '1,460',
    filledQuantity: 0.01,
    status: 'Filled',
  },
  {
    desk: 'D-4625',
    commodity: 'Sugar No.11',
    traderName: 'Rosetta Pope',
    quantity: '74,019',
    filledQuantity: 0.461,
    status: 'Filled',
  },
  {
    desk: 'D-956',
    commodity: 'Wheat',
    traderName: 'Brett Rios',
    quantity: '75,672',
    filledQuantity: 0.106,
    status: 'PartiallyFilled',
  },
  {
    desk: 'D-4725',
    commodity: 'Robusta coffee',
    traderName: 'Gary Wong',
    quantity: '15,094',
    filledQuantity: 0.133,
    status: 'PartiallyFilled',
  },
  {
    desk: 'D-8581',
    commodity: 'Soybean Oil',
    traderName: 'Oscar Grant',
    quantity: '30,389',
    filledQuantity: 0.695,
    status: 'Filled',
  },
  {
    desk: 'D-7810',
    commodity: 'Oats',
    traderName: 'Hilda Kelley',
    quantity: '69,649',
    filledQuantity: 0.265,
    status: 'Filled',
  },
  {
    desk: 'D-4449',
    commodity: 'Rapeseed',
    traderName: 'Polly Lopez',
    quantity: '85,777',
    filledQuantity: 0.09,
    status: 'PartiallyFilled',
  },
  {
    desk: 'D-3790',
    commodity: 'Sugar No.14',
    traderName: 'Steven Holt',
    quantity: '82,669',
    filledQuantity: 0.484,
    status: 'Rejected',
  },
  {
    desk: 'D-1085',
    commodity: 'Soybean Meal',
    traderName: 'Ollie Conner',
    quantity: '10,977',
    filledQuantity: 0.288,
    status: 'Filled',
  },
  {
    desk: 'D-3437',
    commodity: 'Coffee C',
    traderName: 'Zachary Harper',
    quantity: '80,005',
    filledQuantity: 0.833,
    status: 'Filled',
  },
  {
    desk: 'D-8283',
    commodity: 'Sugar No.11',
    traderName: 'Alex Stokes',
    quantity: '60,681',
    filledQuantity: 0.671,
    status: 'PartiallyFilled',
  },
  {
    desk: 'D-9136',
    commodity: 'Soybeans',
    traderName: 'James Padilla',
    quantity: '30,473',
    filledQuantity: 0.183,
    status: 'Rejected',
  },
  {
    desk: 'D-3621',
    commodity: 'Frozen Concentrated Orange Juice',
    traderName: 'Bettie Powers',
    quantity: '86,105',
    filledQuantity: 0.142,
    status: 'PartiallyFilled',
  },
  {
    desk: 'D-8469',
    commodity: 'Robusta coffee',
    traderName: 'Dorothy Jimenez',
    quantity: '78,438',
    filledQuantity: 0.229,
    status: 'Open',
  },
  {
    desk: 'D-317',
    commodity: 'Cotton No.2',
    traderName: 'Floyd Benson',
    quantity: '54,172',
    filledQuantity: 0.062,
    status: 'Filled',
  },
].map((item) => ({ ...item, id: item.desk }));

interface ProgressBarProps {
  value: number;
}

const code = `
import { DataGrid } from '@material-ui/data-grid';

<DataGrid
  rows={[
    { desk: 'D-985', commodity: 'Adzuki bean', traderName: 'Roy Green', quantity: '83,996', filledQuantity: 1, status: 'PartiallyFilled' },
  ]}
  columns={[
    // an example of column definition
    {
      field: 'filledQuantity',
      headerName: 'Filled',
      editable: true,
      renderCell: (params) => <ProgressBar value={Number(params.value)} />,
      renderEditCell: (params) => <EditProgress {...params} />,
    },
  ]}
  pageSize={4}
  checkboxSelection
  disableSelectionOnClick
  density="compact"
/>`;

export default function DataTable() {
  return (
    <ShowcaseContainer
      previewSx={{
        py: 2,
        '& .MuiDataGrid-root': {
          border: 'none',
          bgcolor: 'background.paper',
          fontSize: '0.75rem',
          borderRadius: '0px',
          '& .MuiCheckbox-root': {
            color: 'grey.700',
            p: 0.5,
            '& > svg': {
              fontSize: '1.25rem',
            },
          },
          // table head elements
          '& .MuiDataGrid-menuIcon svg': {
            fontSize: '1rem',
          },
          '& .MuiDataGrid-columnsContainer': {
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'primaryDark.500' : 'grey.100',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.800' : '#fff'),
          },
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            padding: 0,
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          // -------------------------------
          // table body elements
          '& .MuiDataGrid-viewport': {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : 'grey.50'),
          },
          '& .MuiDataGrid-cell': {
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'primaryDark.500' : 'grey.100',
          },
          '& .MuiDataGrid-editInputCell': {
            fontSize: '0.75rem',
            '& > input': {
              px: 1,
            },
          },
          '& .MuiDataGrid-cell--editing': {
            '& .MuiSelect-root': {
              '& .MuiListItemIcon-root': {
                display: 'none',
              },
              '& .MuiTypography-root': {
                fontSize: '0.75rem',
              },
            },
          },
          '& .MuiTablePagination-root': {
            mr: 1,
            '& .MuiIconButton-root': {
              '&:not([disabled])': {
                color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : 'primary.main'),
              },
              borderRadius: 1,
              p: 0.5,
              border: '1px solid',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? 'primaryDark.700' : 'transparent',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'primaryDark.500' : 'grey.200',
              '&:last-of-type': {
                ml: 1,
              },
              '& > svg': {
                fontSize: '1.25rem',
              },
            },
          },
        },
      }}
      preview={
        <Paper
          variant="outlined"
          sx={{
            overflow: 'hidden',
            width: '100%',
            boxShadow: '0px 4px 20px rgba(61, 71, 82, 0.25)',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.800' : '#fff'),
          }}
        >
          <Box
            sx={{
              textAlign: 'center',
              py: 2,
              position: 'relative',
              borderBottom: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'primaryDark.500' : 'grey.100',
            }}
          >
            <Typography color="primary.main" fontWeight={500}>
              Trades, October 2020
            </Typography>
          </Box>
          <Box sx={{ height: 236 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={4}
              checkboxSelection
              disableSelectionOnClick
              density="compact"
            />
          </Box>
        </Paper>
      }
      code={
        <Box
          sx={{
            p: 2,
            overflow: 'auto',
            flexGrow: 1,
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            '& pre': {
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            },
          }}
        >
          <HighlightedCode component={MarkdownElement} code={code} language="jsx" />
        </Box>
      }
    />
  );
}
