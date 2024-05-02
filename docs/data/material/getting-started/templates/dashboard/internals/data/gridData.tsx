import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { GridCellParams, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomInt,
} from '@mui/x-data-grid-generator';

const randomTime = () => {
  return `${randomInt(0, 200)}h ${randomInt(0, 59)}m`;
};

export function renderStatus(
  params: GridCellParams<
    { status: 'verified' | 'new' | 'blocked' | 'uncertain' },
    any,
    any
  >,
) {
  const colors: { [index: string]: 'error' | 'success' | 'info' | 'default' } = {
    new: 'info',
    verified: 'success',
    blocked: 'error',
    uncertain: 'default',
  };

  return (
    <Chip
      label={params.value.status}
      color={colors[params.value.status]}
      variant="outlined"
    />
  );
}
export function renderAvatar(
  params: GridCellParams<{ name: string; color: string }, any, any>,
) {
  if (params.value == null) {
    return '';
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: '24px',
        height: '24px',
        fontSize: '0.85rem',
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

export const columns: GridColDef[] = [
  {
    field: 'avatar',
    headerName: 'Avatar',
    display: 'flex',
    renderCell: renderAvatar,
    width: 60,
    valueGetter: (value, row) =>
      row.name == null
        ? null
        : {
            name: row.name,
            color: '#8f9ebc',
          },
  },
  { field: 'name', headerName: 'Name', width: 150, editable: true },
  {
    field: 'status',
    headerName: 'Account status',
    display: 'flex',
    width: 150,
    renderCell: renderStatus,
    valueGetter: (value, row) =>
      !row?.status ? { status: 'uncertain' } : { status: row.status },
  },
  {
    field: 'orders',
    headerName: 'Orders fulfilled',
    width: 150,
    display: 'flex',
    valueGetter: (value, row) =>
      !row?.status || row.status === 'blocked' ? 0 : row.orders,
  },
  {
    field: 'dateCreated',
    headerName: 'First Joined',
    type: 'date',
    width: 150,
    editable: true,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'date',
    width: 150,
    editable: true,
  },
  {
    field: 'timeOnline',
    headerName: 'Time Online',
    type: 'string',
    width: 150,
    editable: true,
  },
];

export const rows: GridRowsProp = [
  {
    id: 1,
    name: randomTraderName(),
    status: 'verified',
    orders: randomInt(0, 300),
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    timeOnline: randomTime(),
  },
  {
    id: 2,
    name: randomTraderName(),
    status: 'verified',
    orders: randomInt(0, 300),
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    timeOnline: randomTime(),
  },
  {
    id: 3,
    name: randomTraderName(),
    status: 'new',
    orders: randomInt(0, 300),
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    timeOnline: randomTime(),
  },
  {
    id: 4,
    name: randomTraderName(),
    status: 'verified',
    orders: randomInt(0, 300),
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    timeOnline: randomTime(),
  },
  {
    id: 5,
    name: randomTraderName(),
    status: 'verified',
    orders: randomInt(0, 300),
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    timeOnline: randomTime(),
  },
  {
    id: 6,
    name: randomTraderName(),
    status: 'blocked',
    orders: randomInt(0, 300),
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    timeOnline: randomTime(),
  },
  {
    id: 7,
    name: randomTraderName(),
    status: 'verified',
    orders: randomInt(0, 300),
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    timeOnline: randomTime(),
  },
  {
    id: 8,
    name: randomTraderName(),
    status: 'new',
    orders: randomInt(0, 300),
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    timeOnline: randomTime(),
  },

  {
    id: 9,
    name: randomTraderName(),
    status: 'verified',
    orders: randomInt(0, 300),
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    timeOnline: randomTime(),
  },
  {
    id: 10,
    name: randomTraderName(),
    status: 'new',
    orders: randomInt(0, 300),
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    timeOnline: randomTime(),
  },
  {
    id: 11,
    name: randomTraderName(),
    status: 'verified',
    orders: randomInt(0, 300),
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    timeOnline: randomTime(),
  },
  {
    id: 12,
    name: randomTraderName(),
    status: 'verified',
    orders: randomInt(0, 300),
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    timeOnline: randomTime(),
  },
];
