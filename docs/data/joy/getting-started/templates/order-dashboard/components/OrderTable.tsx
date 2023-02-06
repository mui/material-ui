/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const rows = [
  {
    id: 'INV-1234',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      name: 'Olivia Ryhe',
      email: 'olivia@email.com',
    },
    subscription: 'Yearly',
  },
  {
    id: 'INV-1233',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      name: 'Steve Hampton',
      email: 'steve.hamp@email.com',
    },
    subscription: 'Monthly',
  },
  {
    id: 'INV-1232',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      name: 'Ciaran Murray',
      email: 'ciaran.murray@email.com',
    },
    subscription: 'Yearly',
  },
  {
    id: 'INV-1231',
    date: 'Feb 3, 2023',
    status: 'Refunded',
    customer: {
      name: 'Maria Macdonald',
      email: 'maria.mc@email.com',
    },
    subscription: 'Yearly',
  },
  {
    id: 'INV-1230',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      name: 'Charles Fulton',
      email: 'fulton@email.com',
    },
    subscription: 'Yearly',
  },
  {
    id: 'INV-1229',
    date: 'Feb 3, 2023',
    status: 'Cancelled',
    customer: {
      name: 'Jay Hooper',
      email: 'hooper@email.com',
    },
    subscription: 'Yearly',
  },
  {
    id: 'INV-1228',
    date: 'Feb 3, 2023',
    status: 'Cancelled',
    customer: {
      name: 'Krystal Stevens',
      email: 'k.stevens@email.com',
    },
    subscription: 'Monthly',
  },
  {
    id: 'INV-1227',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      name: 'Sachin Flynn',
      email: 's.flyn@email.com',
    },
    subscription: 'Monthly',
  },
  {
    id: 'INV-1226',
    date: 'Feb 3, 2023',
    status: 'Cancelled',
    customer: {
      name: 'Bradley Rosales',
      email: 'brad123@email.com',
    },
    subscription: 'Monthly',
  },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function OrderTable() {
  const [order, setOrder] = React.useState<Order>('desc');
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  return (
    <React.Fragment>
      <Sheet
        variant="soft"
        sx={{
          borderRadius: 'sm',
          p: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
          my: 1,
          mb: 2,
        }}
      >
        <FormControl sx={{ flex: 2, minWidth: 'min-content' }}>
          <FormLabel>Search for order</FormLabel>
          <Input placeholder="Search" startDecorator={<i data-feather="search" />} />
        </FormControl>

        <FormControl sx={{ flex: 1 }}>
          <FormLabel>Status</FormLabel>
          <Select
            placeholder="Filter by status"
            slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
          >
            <Option value="paid">Paid</Option>
            <Option value="pending">Pending</Option>
            <Option value="refunded">Refunded</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
        </FormControl>

        <FormControl sx={{ flex: 1 }}>
          <FormLabel>Category</FormLabel>
          <Select placeholder="All">
            <Option value="all">All</Option>
          </Select>
        </FormControl>

        <FormControl sx={{ flex: 1 }}>
          <FormLabel>Customer</FormLabel>
          <Select placeholder="All">
            <Option value="all">All</Option>
          </Select>
        </FormControl>
      </Sheet>
      <Sheet
        variant="outlined"
        sx={{
          width: '100%',
          boxShadow: 'sm',
          borderRadius: 'sm',
          flex: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': (theme) =>
              theme.vars.palette.background.level2,
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': (theme) =>
              theme.vars.palette.background.level1,
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 48, textAlign: 'center' }}>
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length !== rows.length
                  }
                  checked={selected.length === rows.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked ? rows.map((row) => row.id) : [],
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === rows.length
                      ? 'success'
                      : undefined
                  }
                  sx={{ verticalAlign: 'text-bottom' }}
                />
              </th>
              <th style={{ width: 160 }}>
                <Link
                  underline="none"
                  color="success"
                  component="button"
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  fontWeight="xl"
                  endDecorator={<ArrowDownwardIcon />}
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform:
                        order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                    },
                  }}
                >
                  Invoice
                </Link>
              </th>
              <th style={{ width: 144 }}>Date</th>
              <th style={{ width: 100 }}>Status</th>
              <th style={{ width: 240 }}>Customer</th>
              <th style={{ width: 120 }}>Subscription</th>
              <th style={{ width: 160 }}> </th>
            </tr>
          </thead>
          <tbody>
            {stableSort(rows, getComparator(order, 'id')).map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: 'center' }}>
                  <Checkbox
                    checked={selected.includes(row.id)}
                    color={selected.includes(row.id) ? 'success' : undefined}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row.id)
                          : ids.filter((itemId) => itemId !== row.id),
                      );
                    }}
                    sx={{ verticalAlign: 'text-bottom' }}
                  />
                </td>
                <td>
                  <Typography fontWeight="lg">{row.id}</Typography>
                </td>
                <td>{row.date}</td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        Paid: <i data-feather="check" />,
                        Refunded: <i data-feather="corner-up-left" />,
                        Cancelled: <i data-feather="x" />,
                      }[row.status]
                    }
                    color={
                      {
                        Paid: 'success',
                        Refunded: 'neutral',
                        Cancelled: 'danger',
                      }[row.status] as ColorPaletteProp
                    }
                  >
                    {row.status}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Avatar>T</Avatar>
                    <div>
                      <Typography fontWeight="lg">{row.customer.name}</Typography>
                      <Typography level="body2">{row.customer.email}</Typography>
                    </div>
                  </Box>
                </td>
                <td>{row.subscription}</td>
                <td>
                  <Link fontWeight="lg" component="button" color="neutral">
                    Archive
                  </Link>
                  <Link
                    fontWeight="lg"
                    component="button"
                    color="success"
                    sx={{ ml: 1 }}
                  >
                    Download
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Divider sx={{ my: 3 }} />
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
        }}
      >
        <Button
          size="sm"
          variant="plain"
          color="neutral"
          startDecorator={<i data-feather="arrow-left" />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        <IconButton size="sm" variant="soft" color="neutral">
          1
        </IconButton>
        <IconButton size="sm" variant="plain" color="neutral">
          2
        </IconButton>
        <IconButton size="sm" variant="plain" color="neutral">
          3
        </IconButton>
        <IconButton size="sm" variant="plain" color="neutral">
          ...
        </IconButton>
        <IconButton size="sm" variant="plain" color="neutral">
          8
        </IconButton>
        <IconButton size="sm" variant="plain" color="neutral">
          9
        </IconButton>
        <IconButton size="sm" variant="plain" color="neutral">
          10
        </IconButton>
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="plain"
          color="neutral"
          endDecorator={<i data-feather="arrow-right" />}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
