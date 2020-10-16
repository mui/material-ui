import * as React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

export default function DisabledTooltips() {
  const [pending, setPending] = React.useState(false);
  return (
    <div>
      <Tooltip title="You don't have permission to do this">
        <Button disabled>A Disabled Button</Button>
      </Tooltip>

      <Tooltip title={pending ? 'Pending' : 'Fetch'}>
        <Button disabled={pending} onClick={() => setPending(true)}>
          Load
        </Button>
      </Tooltip>
    </div>
  );
}
