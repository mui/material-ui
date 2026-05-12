import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function ArrowTooltips() {
  // @focus-start @padding 1
  return (
    <Tooltip describeChild title="Add" arrow>
      <Button>Arrow</Button>
    </Tooltip>
  );
  // @focus-end
}
