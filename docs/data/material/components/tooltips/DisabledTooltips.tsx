import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function DisabledTooltips() {
  return (
    <Tooltip describeChild title="You don't have permission to do this">
      <Button disabled style={{ pointerEvents: 'auto' }}>
        A Disabled Button
      </Button>
    </Tooltip>
  );
}
