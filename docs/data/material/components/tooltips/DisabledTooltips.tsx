import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function DisabledTooltips() {
  return (
    <Tooltip describeChild title="You don't have permission to do this">
      <Button disabled focusableWhenDisabled>
        A Disabled Button
      </Button>
    </Tooltip>
  );
}
