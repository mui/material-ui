import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function NonInteractiveTooltips() {
  // @focus-start @padding 1
  return (
    <Tooltip describeChild title="Add" disableInteractive>
      <Button>Not interactive</Button>
    </Tooltip>
  );
  // @focus-end
}
