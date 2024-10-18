import * as React from 'react';
import {
  DataGridPro,
  GridRenderCellParams,
  GridListColDef,
  GridColDef,
  GridRowParams,
} from '@mui/x-data-grid-pro';
import Box from '@mui/material/Box';
import { useDemoData } from '@mui/x-data-grid-generator';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import MessageIcon from '@mui/icons-material/Message';

function MessageAction(params: Pick<GridRowParams, 'row'>) {
  const handleMessage = () => {
    console.log(`send message to ${params.row.phone}`);
  };
  return (
    <IconButton aria-label="Message" onClick={handleMessage}>
      <MessageIcon />
    </IconButton>
  );
}

function ListViewCell(params: GridRenderCellParams) {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        height: '100%',
        gap: 2,
      }}
    >
      <Avatar sx={{ width: 32, height: 32, backgroundColor: params.row.avatar }} />
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="body2" fontWeight={500}>
          {params.row.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {params.row.position}
        </Typography>
      </Stack>
      <MessageAction {...params} />
    </Stack>
  );
}

const listColDef: GridListColDef = {
  field: 'listColumn',
  renderCell: ListViewCell,
};

const VISIBLE_FIELDS = ['avatar', 'name', 'position'];

export default function ListView() {
  const [isListView, setIsListView] = React.useState(true);

  const { data } = useDemoData({
    dataSet: 'Employee',
    rowLength: 20,
    visibleFields: VISIBLE_FIELDS,
  });

  const columns: GridColDef[] = React.useMemo(() => {
    return [
      ...data.columns,
      {
        type: 'actions',
        field: 'actions',
        width: 75,
        getActions: (params) => [<MessageAction {...params} />],
      },
    ];
  }, [data.columns]);

  const rowHeight = isListView ? 64 : 52;

  return (
    <Box sx={{ width: '100%' }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isListView}
            onChange={(event) => setIsListView(event.target.checked)}
          />
        }
        label="Enable list view"
      />
      <Box
        sx={{
          width: '100%',
          maxWidth: isListView ? 360 : undefined,
          height: 600,
          margin: '0 auto',
        }}
      >
        <DataGridPro
          {...data}
          columns={columns}
          rowHeight={rowHeight}
          unstable_listView={isListView}
          unstable_listColumn={listColDef}
        />
      </Box>
    </Box>
  );
}
