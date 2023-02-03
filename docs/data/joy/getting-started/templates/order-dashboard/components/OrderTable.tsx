/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';

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
      name: 'Olivia Ryhe',
      email: 'olivia@email.com',
    },
    subscription: 'Yearly',
  },
  {
    id: 'INV-1232',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      name: 'Olivia Ryhe',
      email: 'olivia@email.com',
    },
    subscription: 'Yearly',
  },
  {
    id: 'INV-1231',
    date: 'Feb 3, 2023',
    status: 'Refunded',
    customer: {
      name: 'Olivia Ryhe',
      email: 'olivia@email.com',
    },
    subscription: 'Yearly',
  },
  {
    id: 'INV-1230',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      name: 'Olivia Ryhe',
      email: 'olivia@email.com',
    },
    subscription: 'Yearly',
  },
  {
    id: 'INV-1229',
    date: 'Feb 3, 2023',
    status: 'Cancelled',
    customer: {
      name: 'Olivia Ryhe',
      email: 'olivia@email.com',
    },
    subscription: 'Yearly',
  },
  {
    id: 'INV-1228',
    date: 'Feb 3, 2023',
    status: 'Cancelled',
    customer: {
      name: 'Olivia Ryhe',
      email: 'olivia@email.com',
    },
    subscription: 'Yearly',
  },
  {
    id: 'INV-1227',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      name: 'Olivia Ryhe',
      email: 'olivia@email.com',
    },
    subscription: 'Yearly',
  },
  {
    id: 'INV-1226',
    date: 'Feb 3, 2023',
    status: 'Cancelled',
    customer: {
      name: 'Olivia Ryhe',
      email: 'olivia@email.com',
    },
    subscription: 'Yearly',
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
              <th style={{ width: 40 }}>
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
                <td>
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
                      <Typography fontWeight="lg" sx={{ display: 'block' }}>
                        {row.customer.name}
                      </Typography>
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
