import * as React from 'react';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function ExampleFilterStatusCheckbox() {
  const [status, setStatus] = React.useState({
    declinedPayment: true,
    deliveryError: true,
    wrongAddress: false,
  });
  return (
    <Sheet variant="outlined" sx={{ p: 2, borderRadius: 'sm', width: 300 }}>
      <Typography
        id="filter-status"
        sx={{
          textTransform: 'uppercase',
          fontSize: 'xs',
          letterSpacing: 'lg',
          fontWeight: 'lg',
          color: 'text.secondary',
          mb: 2,
        }}
      >
        Filter status
      </Typography>
      <div role="group" aria-labelledby="filter-status">
        <List>
          <ListItem variant="soft" color="danger">
            <Checkbox
              label="Declined Payment"
              color="danger"
              overlay
              checked={status.declinedPayment}
              onChange={(event) =>
                setStatus({ ...status, declinedPayment: event.target.checked })
              }
              sx={{ color: 'inherit' }}
            />
            <Typography textColor="inherit" sx={{ ml: 'auto' }}>
              8
            </Typography>
          </ListItem>
          <ListItem variant="plain" color="warning" sx={{ borderRadius: 'sm' }}>
            <Checkbox
              label="Delivery Error"
              color="warning"
              overlay
              checked={status.deliveryError}
              onChange={(event) =>
                setStatus({ ...status, deliveryError: event.target.checked })
              }
            />
            <Typography textColor="inherit" sx={{ ml: 'auto' }}>
              24
            </Typography>
          </ListItem>
          <ListItem variant="plain" sx={{ borderRadius: 'sm' }}>
            <Checkbox
              label="Wrong Address"
              color="neutral"
              overlay
              checked={status.wrongAddress}
              onChange={(event) =>
                setStatus({ ...status, wrongAddress: event.target.checked })
              }
            />
          </ListItem>
        </List>
      </div>
      <Button
        variant="outlined"
        color="neutral"
        size="sm"
        onClick={() =>
          setStatus({
            declinedPayment: false,
            deliveryError: false,
            wrongAddress: false,
          })
        }
        sx={{ px: 1.5, mt: 1 }}
      >
        Clear All
      </Button>
    </Sheet>
  );
}
