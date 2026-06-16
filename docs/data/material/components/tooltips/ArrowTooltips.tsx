import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function ArrowTooltips() {
  return (
    <Tooltip describeChild title="Add" arrow>
      <Button>Arrow</Button>
    </Tooltip>
  );
}
